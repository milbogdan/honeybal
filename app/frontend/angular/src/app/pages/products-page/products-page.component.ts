import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  // windowWidth: number = window.innerWidth;
  
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.windowWidth = window.innerWidth;
  // }
}
