import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyPage } from './technology.page';

describe('TechnologyPage', () => {
  let component: TechnologyPage;
  let fixture: ComponentFixture<TechnologyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
