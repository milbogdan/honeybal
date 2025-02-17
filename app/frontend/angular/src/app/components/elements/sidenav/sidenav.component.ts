import { Component, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';

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
  router : Router = inject(Router);

  ngOnInit(){
    if (typeof window !== "undefined") {
      this.screenWidth = window.innerWidth;
      this.setCollapsedState();
   }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.setCollapsedState();
  }

  setCollapsedState() {
    if (this.screenWidth > 960) {
      this.collapsed = true;
    } else {
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
}
