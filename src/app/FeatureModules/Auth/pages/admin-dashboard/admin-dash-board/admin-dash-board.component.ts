import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Core/Services/admin.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {
  admin: any = {
    name: '',
    email: '',
    password: ''
  };
  discountPercentage: number = 0;
  books: any[] = [];
  selectedBook: any = {};
  isEditing: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Fetch Admin Information
    this.fetchAdminInfo();

    // Fetch Book List
    this.fetchBooks();
  }

  // Fetch Admin Information
  fetchAdminInfo(): void {
    this.adminService.getAdminInfo().subscribe(
      (response: any) => {
        this.admin = response;
      },
      (error: any) => {
        console.error('Error fetching admin information:', error);
      }
    );
  }

  // Update Admin Information
  updateAdminInfo(): void {
    this.adminService.updateAdminInfo(this.admin).subscribe(
      (response: any) => {
        console.log('Admin information updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating admin information:', error);
      }
    );
  }

  // Set Discount Percentage
  setDiscountPercentage(): void {
    this.adminService.setDiscountPercentage(this.discountPercentage).subscribe(
      (response: any) => {
        console.log('Discount percentage set successfully:', response);
      },
      (error: any) => {
        console.error('Error setting discount percentage:', error);
      }
    );
  }

  // Fetch Book List
  fetchBooks(): void {
    this.adminService.getBooks().subscribe(
      (response: any) => {
        this.books = response;
      },
      (error: any) => {
        console.error('Error fetching book list:', error);
      }
    );
  }

  // Add New Book
  addBook(): void {
    this.selectedBook = {};
    this.isEditing = true;
  }

  // Edit Book
  editBook(book: any): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
  }

  // Update Book
  updateBook(): void {
    if (this.isEditing) {
      // Update existing book
      this.adminService.updateBook(this.selectedBook).subscribe(
        (response: any) => {
          console.log('Book updated successfully:', response);
          this.fetchBooks(); // Refresh book list
          this.cancelEdit();
        },
        (error: any) => {
          console.error('Error updating book:', error);
        }
      );
    } else {
      // Add new book
      this.adminService.addBook(this.selectedBook).subscribe(
        (response: any) => {
          console.log('Book added successfully:', response);
          this.fetchBooks(); // Refresh book list
          this.cancelEdit();
        },
        (error: any) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }

  // Delete Book
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.adminService.deleteBook(bookId).subscribe(
        (response: any) => {
          console.log('Book deleted successfully:', response);
          this.fetchBooks(); // Refresh book list
        },
        (error: any) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }

  // Cancel Add/Edit Book
  cancelEdit(): void {
    this.selectedBook = {};
    this.isEditing = false;
  }
}
