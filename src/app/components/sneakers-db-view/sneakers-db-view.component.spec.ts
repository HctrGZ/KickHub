import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakersDBViewComponent } from './sneakers-db-view.component';

describe('SneakersDBViewComponent', () => {
  let component: SneakersDBViewComponent;
  let fixture: ComponentFixture<SneakersDBViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SneakersDBViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakersDBViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
