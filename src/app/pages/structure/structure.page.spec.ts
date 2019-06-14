import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePage } from './structure.page';

describe('StructurePage', () => {
  let component: StructurePage;
  let fixture: ComponentFixture<StructurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
