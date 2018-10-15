import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

describe('AuthGuard', () => {
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
      providers: [AuthGuard, JwtHelperService],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
