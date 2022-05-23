/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CropComponent } from './crop.component';

describe('CropComponent', () => {
  let component: CropComponent;
  let fixture: ComponentFixture<CropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
