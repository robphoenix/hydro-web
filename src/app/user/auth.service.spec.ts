import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  describe('isValidToken', () => {
    it('should return opposite to JWTHelperService.isTokenExpired()', () => {
      mockJwtHelperService.isTokenExpired.and.returnValue(true);
      const service: AuthService = TestBed.get(AuthService);
      expect(service.isValidToken()).toEqual(false);
    });

    it('should be called with given token', () => {
      const service: AuthService = TestBed.get(AuthService);
      const token = 'token';
      service.isValidToken(token);
      expect(mockJwtHelperService.isTokenExpired).toHaveBeenCalledWith(token);
    });

    it('should be called with access token if no token given', () => {
      const service: AuthService = TestBed.get(AuthService);
      const token = 'access_token';
      service.accessToken = token;
      service.isValidToken();
      expect(mockJwtHelperService.isTokenExpired).toHaveBeenCalledWith(token);
    });
  });
});
