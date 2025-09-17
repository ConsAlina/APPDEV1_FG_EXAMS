import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {
  products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    } else {
      this.products = [
        { id: 1, name: 'Wireless Headphones', price: 59.99, stock: 25 },
        { id: 2, name: 'Smart Watch', price: 120.00, stock: 10 },
        { id: 3, name: 'Bluetooth Speaker', price: 35.50, stock: 40 }
      ];
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  addToCart(product: any) {
    if (product.stock > 0) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((item: any) => item.id === product.id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
