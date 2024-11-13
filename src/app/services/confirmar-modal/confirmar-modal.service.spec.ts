import { TestBed } from '@angular/core/testing';

import { ConfirmarModalService } from './confirmar-modal.service';

describe('ConfirmarModalService', () => {
  let service: ConfirmarModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
