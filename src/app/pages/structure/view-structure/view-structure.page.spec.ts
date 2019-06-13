import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStructurePage } from './view-structure.page';

describe('ViewStructurePage', () => {
  let component: ViewStructurePage;
  let fixture: ComponentFixture<ViewStructurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStructurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
