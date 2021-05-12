import {TestBed} from '@angular/core/testing';
import {ComponentInteractionService} from './component-interaction.service';

describe('ComponentInteractionService', () => {

  let service: ComponentInteractionService;
  beforeEach(() => {
    service = TestBed.get(ComponentInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
