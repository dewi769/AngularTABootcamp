import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngsuranComponent } from './angsuran.component';

describe('AngsuranComponent', () => {
  let component: AngsuranComponent;
  let fixture: ComponentFixture<AngsuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngsuranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngsuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
