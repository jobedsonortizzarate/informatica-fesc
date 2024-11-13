import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFechaComponent } from './input-fecha.component';

describe('InputFechaComponent', () => {
  let component: InputFechaComponent;
  let fixture: ComponentFixture<InputFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFechaComponent],
    });
    fixture = TestBed.createComponent(InputFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
