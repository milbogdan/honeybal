import { Component, inject } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  filterService : FilterService = inject(FilterService);
  okiniFilter : number = 0;

  onSearchProducts(search : string){
    this.okiniFilter++;
    if(this.okiniFilter === 3){
      this.okiniFilter = 0;
      this.filterService.updateFilters({searchName : search})
    }
    else if(search === ''){
      this.filterService.updateFilters({searchName : ''})
    }
  }
}
