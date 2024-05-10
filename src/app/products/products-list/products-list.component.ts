import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product.dto';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MaterialModule, AsyncPipe, LoadingBarComponent, CurrencyPipe
  ],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit{
  
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

}
