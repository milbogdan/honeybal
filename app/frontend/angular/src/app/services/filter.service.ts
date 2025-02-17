import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    data = {
        viewMode: 0,
        searchName: '',
        categories: [],
        inStock: null
    }

    private filterState = new BehaviorSubject<any>(this.data);
    filter$ = this.filterState.asObservable();

    updateFilters(newFilters: any) {
        const updateFilter = {
            ...this.filterState.getValue(), 
            ...newFilters
        };
        
        this.filterState.next(updateFilter);
    }

    getFilters() {
        return this.filterState.getValue();
    }

}