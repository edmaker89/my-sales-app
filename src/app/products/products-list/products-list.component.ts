import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { CartService } from '../../cart.service';
import { CartItem } from '../../cart.dto';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MaterialModule, AsyncPipe, LoadingBarComponent, CurrencyPipe, ProductCardComponent
  ],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit{

  cartService = inject(CartService)
  productService = inject(ProductService)
  fb = inject(FormBuilder)
  products: Product[]
  productsObervable: Observable<Product[]>
  searchForm: FormGroup

  async ngOnInit() {
    this.searchForm = this.fb.group({
      serachTerm: ['']
    })
    this.getProducts()
  }

  private async getProducts(searchTerm?: string) {
    this.productsObervable = this.productService.getAll(searchTerm)
    this.products = await lastValueFrom(this.productsObervable)
  }

  onSearch() {
    this.getProducts(this.searchForm.value.searchTerm)
  }

  onAddToCart(item: Product) {
    const cartItem: CartItem = {
      idProduct: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice
    }
    this.cartService.addItem(cartItem)
    }

}
