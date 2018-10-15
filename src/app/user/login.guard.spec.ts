import { TestBed, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
      providers: [LoginGuard, JwtHelperService],
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
