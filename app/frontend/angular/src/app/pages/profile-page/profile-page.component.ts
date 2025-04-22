import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { OrderTableComponent } from '../../components/order-table/order-table.component';
import { WishItemComponent } from '../../components/wish-item/wish-item.component';

@Component({
  selector: 'app-profile-page',
  imports: [NavbarComponent, EditUserComponent, OrderTableComponent, WishItemComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}
