import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPage } from './unit.page';

describe('UnitPage', () => {
  let component: UnitPage;
  let fixture: ComponentFixture<UnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
