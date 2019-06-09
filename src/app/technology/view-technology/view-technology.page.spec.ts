import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTechnologyPage } from './view-technology.page';

describe('ViewTechnologyPage', () => {
  let component: ViewTechnologyPage;
  let fixture: ComponentFixture<ViewTechnologyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTechnologyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTechnologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
