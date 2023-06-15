export class CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number = 0;

  constructor(id: number, title: string, price: number, quantity: number = 1) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
