import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesresolvedComponent } from './tachesresolved.component';

describe('TachesresolvedComponent', () => {
  let component: TachesresolvedComponent;
  let fixture: ComponentFixture<TachesresolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TachesresolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TachesresolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
