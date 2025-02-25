import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChangeComponent } from './view-change.component';

describe('ViewChangeComponent', () => {
  let component: ViewChangeComponent;
  let fixture: ComponentFixture<ViewChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
