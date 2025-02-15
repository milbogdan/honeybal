import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private filterState = new BehaviorSubject<any>({categories: [], inStock: null});
    filter$ = this.filterState.asObservable();

    updateFilters(newFilters: any) {
        this.filterState.next(newFilters);
    }
}