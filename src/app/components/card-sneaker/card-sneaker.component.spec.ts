import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSneakerComponent } from './card-sneaker.component';

describe('CardSneakerComponent', () => {
  let component: CardSneakerComponent;
  let fixture: ComponentFixture<CardSneakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSneakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSneakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
