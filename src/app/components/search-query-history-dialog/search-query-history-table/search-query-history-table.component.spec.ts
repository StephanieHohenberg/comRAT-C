import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SearchQueryHistoryTableComponent} from "./search-query-history-table.component";

describe('SearchQueryHistoryTableComponent', () => {
  let component: SearchQueryHistoryTableComponent;
  let fixture: ComponentFixture<SearchQueryHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchQueryHistoryTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
