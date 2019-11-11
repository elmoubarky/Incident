import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAttachComponent } from './operation-attach.component';

describe('OperationAttachComponent', () => {
  let component: OperationAttachComponent;
  let fixture: ComponentFixture<OperationAttachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationAttachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
