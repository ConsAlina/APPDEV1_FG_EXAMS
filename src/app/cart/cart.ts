import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html'
})
export class Cart implements OnInit {
  cart: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getTotal(item: any) {
    return item.price * item.quantity;
  }

  getGrandTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cart = [];
  }

  buy() {
    const rawProducts = localStorage.getItem('products');
    if (!rawProducts) return;

    let products = JSON.parse(rawProducts);

    this.cart.forEach(cartItem => {
      const product = products.find((p: any) => p.id === cartItem.id);
      if (product) {
        product.stock = Math.max(0, product.stock - cartItem.quantity);
      }
    });

    localStorage.setItem('products', JSON.stringify(products));
    this.clearCart();

    // ✅ redirect without popup
    this.router.navigate(['/product-list']);
  }
}
