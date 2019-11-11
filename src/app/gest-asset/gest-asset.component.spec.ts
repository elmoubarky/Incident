import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAssetComponent } from './gest-asset.component';

describe('GestAssetComponent', () => {
  let component: GestAssetComponent;
  let fixture: ComponentFixture<GestAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
