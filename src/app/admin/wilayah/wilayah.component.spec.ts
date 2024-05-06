import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahComponent } from './wilayah.component';

describe('WilayahComponent', () => {
  let component: WilayahComponent;
  let fixture: ComponentFixture<WilayahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WilayahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
