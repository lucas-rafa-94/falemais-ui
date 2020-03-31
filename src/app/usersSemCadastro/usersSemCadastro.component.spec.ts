import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSemCadastroComponent } from './users.component';

describe('UsuariosComponent', () => {
  let component: UsersSemCadastroComponent;
  let fixture: ComponentFixture<UsersSemCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSemCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSemCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
