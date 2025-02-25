import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProdcutComponent } from './add-new-prodcut.component';

describe('AddNewProdcutComponent', () => {
  let component: AddNewProdcutComponent;
  let fixture: ComponentFixture<AddNewProdcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewProdcutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
