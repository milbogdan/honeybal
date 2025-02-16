import { Component, inject } from '@angular/core';
import { FilterService } from '../../../services/filter.service'

@Component({
  selector: 'view-change',
  standalone: false,
  templateUrl: './view-change.component.html',
  styleUrl: './view-change.component.css'
})
export class ViewChangeComponent {
  viewMode : number = 0;
  filterService : FilterService = inject(FilterService);

  gridMode(){
    this.viewMode=0;
    this.filterService.updateFilters({viewMode:this.viewMode});
  }

  listMode(){
    this.viewMode=1;
    this.filterService.updateFilters({viewMode:this.viewMode});
  }
}
