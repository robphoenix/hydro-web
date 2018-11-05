import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HydroMaterialModule } from 'src/app/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HydroMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [JwtHelperService],
      declarations: [NavbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
