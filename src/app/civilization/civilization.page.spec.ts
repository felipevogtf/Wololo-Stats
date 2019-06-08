import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilizationPage } from './civilization.page';

describe('CivilizationPage', () => {
  let component: CivilizationPage;
  let fixture: ComponentFixture<CivilizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilizationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
