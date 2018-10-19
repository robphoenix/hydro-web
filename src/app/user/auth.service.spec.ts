import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAccessToken } from './access-token';

describe('AuthService', () => {
  let mockJwtHelperService;

  beforeEach(() => {
    mockJwtHelperService = jasmine.createSpyObj('mockJwtHelperService', [
      'isTokenExpired',
      'decodeToken',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: JwtHelperService, useValue: mockJwtHelperService },
      ],
    });
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
