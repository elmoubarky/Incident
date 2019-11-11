import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAchatComponent } from './operation-achat.component';

describe('OperationAchatComponent', () => {
  let component: OperationAchatComponent;
  let fixture: ComponentFixture<OperationAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
