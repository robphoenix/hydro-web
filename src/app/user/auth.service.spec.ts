import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAccessToken } from './access-token';
import { HttpClient } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

describe('AuthService', () => {
  let mockJwtHelperService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: AuthService;

  const username = 'username';
  const password = 'password';
  const role = 'admin';

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

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    afterEach(() => {
      localStorage.removeItem(service.accessTokenName);

      httpMock.verify();
    });

    it('should log in if successfully authenticated', () => {
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });
      const token = 'valid_token';

      expect(service.isLoggedIn).toBe(false);
      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();

      service.login(username, password).subscribe();

      const req = httpMock.expectOne(service.loginUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });

      req.flush(token);

      expect(service.isLoggedIn).toBe(true);
      expect(service.username).toBe(username);
      expect(service.role).toBe(role);
      expect(localStorage.getItem(service.accessTokenName)).toEqual(token);
    });

    it('should not log in if returned token is invalid', () => {
      mockJwtHelperService.isTokenExpired.and.returnValue(true);

      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush('invalid_token');

      expect(service.isLoggedIn).toBe(false);
      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();
      expect(localStorage.getItem(service.accessTokenName)).toBeFalsy();
    });

    it('should not log in on 401 HTTP response', () => {
      service.login(username, password).subscribe();

      httpMock
        .expectOne(service.loginUrl)
        .flush(
          { errorCode: 'GENERIC_ERROR' },
          { status: 401, statusText: 'unauthorised' },
        );

      expect(service.isLoggedIn).toBe(false);
      expect(service.username).toBeTruthy();
      expect(service.role).toBeFalsy();
      expect(localStorage.getItem(service.accessTokenName)).toBeTruthy();
    });

    fit('should not log in on 500 HTTP response', () => {
      service.login(username, password).subscribe();

      httpMock
        .expectOne(service.loginUrl)
        .flush(
          { errorCode: 'INTERNAL_SERVER_ERROR' },
          { status: 500, statusText: 'Internal Server Error' },
        );

      expect(service.isLoggedIn).toBe(false);
      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();
      expect(localStorage.getItem(service.accessTokenName)).toBeFalsy();
    });
  });
});
