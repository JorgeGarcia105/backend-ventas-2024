import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validarSesionInactivaGuard } from './validar-sesion-activa.guard';

describe('validarSesionActivaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validarSesionInactivaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
