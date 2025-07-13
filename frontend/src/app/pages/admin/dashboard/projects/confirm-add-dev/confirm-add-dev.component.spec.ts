import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddDevComponent } from './confirm-add-dev.component';

describe('ConfirmAddDevComponent', () => {
  let component: ConfirmAddDevComponent;
  let fixture: ComponentFixture<ConfirmAddDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAddDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAddDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
