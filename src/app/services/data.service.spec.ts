import {TestBed} from '@angular/core/testing';
import {DataService} from './data.service';

describe('DataService', () => {

  let service: DataService;
  beforeEach(() => {
    service = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
