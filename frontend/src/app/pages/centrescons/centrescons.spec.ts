import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Centrescons } from './centrescons';

describe('Centrescons', () => {
  let component: Centrescons;
  let fixture: ComponentFixture<Centrescons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Centrescons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Centrescons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
