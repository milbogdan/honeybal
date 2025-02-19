import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private accountService : AccountService){
  }

  ngOnInit(){
    this.accountService.user$.subscribe((user) =>{
      console.log("user", user)
    });
  }
}
