import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SearchQueryHistoryDialogComponent} from "./search-query-history-dialog.component";

describe('SearchQueryHistoryDialogComponent', () => {
  let component: SearchQueryHistoryDialogComponent;
  let fixture: ComponentFixture<SearchQueryHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchQueryHistoryDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
