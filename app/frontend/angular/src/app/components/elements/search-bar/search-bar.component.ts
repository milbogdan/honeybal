import { Component, inject } from '@angular/core';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  filterService : FilterService = inject(FilterService);

  onSearchProducts(search : string){
    this.filterService.updateFilters({searchName : search})
  }
}
