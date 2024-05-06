import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsRoComponent } from './is-ro.component';

describe('IsRoComponent', () => {
  let component: IsRoComponent;
  let fixture: ComponentFixture<IsRoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsRoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
