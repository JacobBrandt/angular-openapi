import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResourceViewComponent } from './api-resource-view.component';

describe('ApiResourceViewComponent', () => {
  let component: ApiResourceViewComponent;
  let fixture: ComponentFixture<ApiResourceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiResourceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
