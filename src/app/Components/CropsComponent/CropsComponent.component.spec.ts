/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CropsComponentComponent } from './CropsComponent.component';

describe('CropsComponentComponent', () => {
  let component: CropsComponentComponent;
  let fixture: ComponentFixture<CropsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CropsComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
