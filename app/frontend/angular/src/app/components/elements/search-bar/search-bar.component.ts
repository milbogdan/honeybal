import { Component } from '@angular/core';

@Component({
  selector: 'search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  funk(){
    console.log('funk'); 
  }
}
