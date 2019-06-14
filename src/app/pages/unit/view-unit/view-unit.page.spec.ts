import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitPage } from './view-unit.page';

describe('ViewUnitPage', () => {
  let component: ViewUnitPage;
  let fixture: ComponentFixture<ViewUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
