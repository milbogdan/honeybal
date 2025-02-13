import { Component } from '@angular/core';
import { Product } from '../../../models/Product';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  //Honey products
  products: Product[] = [
    {
      id: 1,
      category_id: 1,
      name: 'Bagremov med',
      description: 'Prirodni bagremov med sa blagim ukusom.',
      in_stock: true,
      size: '500g',
      base_price: 1300,
      discount: 100,
      price: 1200
    },
    {
      id: 2,
      category_id: 1,
      name: 'Livadski med',
      description: 'Med dobijen od cvetnog nektara sa livada.',
      in_stock: true,
      size: '500g',
      base_price: 1200,
      discount: 100,
      price: 1100
    },
    {
      id: 3,
      category_id: 2,
      name: 'Šumski med',
      description: 'Tamni, bogati med sa visokim sadržajem minerala.',
      in_stock: false,
      size: '750g',
      base_price: 1400,
      discount: 100,
      price: 1300
    },
    {
      id: 4,
      category_id: 3,
      name: 'Med sa orasima',
      description: 'Kombinacija prirodnog meda i oraha za dodatnu energiju.',
      in_stock: true,
      size: '500g',
      base_price: 1600,
      discount: 100,
      price: 1500
    },
    {
      id: 4,
      category_id: 3,
      name: 'Med sa orasima',
      description: 'Kombinacija prirodnog meda i oraha za dodatnu energiju.',
      in_stock: true,
      size: '500g',
      base_price: 1600,
      discount: 100,
      price: 1500
    },
    {
      id: 4,
      category_id: 3,
      name: 'Med sa orasima',
      description: 'Kombinacija prirodnog meda i oraha za dodatnu energiju.',
      in_stock: true,
      size: '500g',
      base_price: 1600,
      discount: 100,
      price: 1500
    },
    {
      id: 4,
      category_id: 3,
      name: 'Med sa orasima',
      description: 'Kombinacija prirodnog meda i oraha za dodatnu energiju.',
      in_stock: true,
      size: '500g',
      base_price: 1600,
      discount: 100,
      price: 1500
    },
    {
      id: 4,
      category_id: 3,
      name: 'Med sa orasima',
      description: 'Kombinacija prirodnog meda i oraha za dodatnu energiju.',
      in_stock: true,
      size: '500g',
      base_price: 1600,
      discount: 100,
      price: 1500
    }
  ];
}
