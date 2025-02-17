import { Component, Input } from '@angular/core';
import { Product } from '../../../models/Product';

@Component({
  selector: 'product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product! : Product;

}
