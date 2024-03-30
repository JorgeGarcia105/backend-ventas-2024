import { TestBed } from '@angular/core/testing';

import { SeguridadService } from './seguridad.service';
import { beforeEach } from 'node:test';

describe('SeguridadService', () => {
  let service: SeguridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguridadService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});

