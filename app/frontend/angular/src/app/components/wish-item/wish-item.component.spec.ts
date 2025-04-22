import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishItemComponent } from './wish-item.component';

describe('WishItemComponent', () => {
  let component: WishItemComponent;
  let fixture: ComponentFixture<WishItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
