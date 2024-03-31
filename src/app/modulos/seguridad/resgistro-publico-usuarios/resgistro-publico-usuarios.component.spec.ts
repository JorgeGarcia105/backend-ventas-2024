import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroPublicoUsuariosComponent } from './resgistro-publico-usuarios.component';

describe('ResgistroPublicoUsuariosComponent', () => {
  let component: ResgistroPublicoUsuariosComponent;
  let fixture: ComponentFixture<ResgistroPublicoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgistroPublicoUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResgistroPublicoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
