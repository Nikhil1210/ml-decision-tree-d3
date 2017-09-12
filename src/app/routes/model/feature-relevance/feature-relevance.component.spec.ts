import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRelevanceComponent } from './feature-relevance.component';

describe('FeatureRelevanceComponent', () => {
  let component: FeatureRelevanceComponent;
  let fixture: ComponentFixture<FeatureRelevanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureRelevanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRelevanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
