import { Component, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../models/User';

interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() onToggleSideNav : EventEmitter<SideNavToggle> = new EventEmitter<SideNavToggle>();
  collapsed : boolean = false;
  screenWidth = 0;
  navData = navbarData;
  user : User | null = null;
  private destroy$ = new Subject<void>();
  router : Router = inject(Router);
  accountService : AccountService = inject(AccountService);

  ngOnInit(){
    if (typeof window !== "undefined") {
      this.screenWidth = window.innerWidth;
      this.setCollapsedState();
    }

    this.accountService.user$.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (user) => {
        // console.log(this.accountService.user$);
        this.user = user;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.setCollapsedState();
  }

  setCollapsedState() {
    if (this.screenWidth < 768) {
      this.collapsed = false;
    } 
    this.emitToggleEvent();
  }

  toggleCollapse() : void{
    this.collapsed = !this.collapsed;
    this.emitToggleEvent();
  }

  closeSidenav() : void{
    this.collapsed = false;
    this.emitToggleEvent();
  }

  emitToggleEvent() {
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }

  logout(){
    this.router.navigate(['/login']);
    this.accountService.logout().subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
