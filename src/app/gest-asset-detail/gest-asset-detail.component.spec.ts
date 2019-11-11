import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAssetDetailComponent } from './gest-asset-detail.component';

describe('GestAssetDetailComponent', () => {
  let component: GestAssetDetailComponent;
  let fixture: ComponentFixture<GestAssetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestAssetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
