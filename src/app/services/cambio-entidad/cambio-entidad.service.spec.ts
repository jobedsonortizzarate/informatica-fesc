import { TestBed } from '@angular/core/testing';

import { CambioEntidadService } from './cambio-entidad.service';

describe('CambioEntidadService', () => {
  let service: CambioEntidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioEntidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
