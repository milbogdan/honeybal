import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  isMobile = false;

  constructor() {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isMobile = event.target.innerWidth < 768;
    }
  }
}
