import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Product } from '../product.dto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product: Product

  onAddToCart(product: Product) {
    console.log('TODO')
  }
}
