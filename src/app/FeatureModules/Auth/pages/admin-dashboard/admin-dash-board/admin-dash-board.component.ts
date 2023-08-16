import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent implements OnInit {
  admin: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  newBook: any = {
    title: '',
    description: '',
    bookCoverPath: '',
    price: 0,
    imgUrl:'',
  };

  AppUser: any = {
    userEmail: '',
    Discounts: 0,
  };

  isEditing: boolean = false;
  bookdetails: any = {};
  books: any[] = [];

  constructor(private adminService: AdminService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAdminInfo();
  }

  fetchAdminInfo(): void {
    this.authService.getUserAccount().subscribe(
      (response: any) => {
        this.admin.firstName = response.firstName;
        this.admin.lastName = response.lastName;
        this.admin.email = response.email;
      },
      (error: any) => {
        console.error('Error fetching admin information:', error);
      }
    );
  }

  updateAdminInfo(): void {
    this.authService.updateUserAccount(this.admin).subscribe(
      (response: any) => {
        console.log('Admin information updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating admin information:', error);
      }
    );
  }

  setDiscount(): void {
    this.adminService.setDiscountPercentage(this.AppUser).subscribe(
      (response: any) => {
        console.log('Discount set successfully:', response);
      },
      (error: any) => {
        console.error('Error setting discount:', error);
      }
    );
  }


addBook(): void {
  // Send the new book details to the server using HttpClient
  this.http.post('https://localhost:7132/api/Books', this.newBook).subscribe(
    (response: any) => {
      // Handle the response if needed
      console.log('Book added successfully:', response);
    },
    (error: any) => {
      // Handle errors if necessary
      console.error('Error adding book:', error);
    }
  );
}
  editBook(book: any): void {
    this.isEditing = true;
    this.bookdetails.bookId = book.id;
    this.bookdetails = {
      title: book.title,
      author: book.author,
      price: book.price
    };
  }
  getBook(): void {
    if (this.bookdetails.bookId) {
      this.adminService.getBookById(this.bookdetails.bookId).subscribe(
        (response: any) => {
          this.bookdetails = response;
        },
        (error: any) => {
          console.error('Error fetching book:', error);
        }
      );
    } else {
      console.error('Book ID is required');
    }
  }

  updateBook(): void {
    const updatedBook = {
      bookId: this.bookdetails.bookId,
      updatedModel: this.bookdetails
    };
    this.adminService.updateBook(updatedBook).subscribe(
      (response: any) => {
        console.log('Book updated successfully:', response);
        this.isEditing = false;
        this.bookdetails.bookId = 0;
        this.bookdetails = {};
      },
      (error: any) => {
        console.error('Error updating book:', error);
      }
    );
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.adminService.deleteBook(bookId).subscribe(
        (response: any) => {
          console.log('Book deleted successfully:', response);
        },
        (error: any) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
}
