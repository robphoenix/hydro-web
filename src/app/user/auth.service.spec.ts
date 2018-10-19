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
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  fdescribe('login', () => {
    it('should log in if successfully authenticated', () => {
      const service: AuthService = TestBed.get(AuthService);
      // return a valid token
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });

      // before we've logged in
      expect(service.isLoggedIn).toBe(false);

      // login
      service.login(username, password).subscribe();

      // check the request
      const req = httpMock.expectOne(service.loginUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });

      // return the token
      req.flush('valid_token');

      // check we're now logged in
      expect(service.isLoggedIn).toBe(true);

      httpMock.verify();
    });

    it('should not log in if returned token is invalid', () => {
      const service: AuthService = TestBed.get(AuthService);
      // return an invalid token
      mockJwtHelperService.isTokenExpired.and.returnValue(true);

      // before we've logged in
      expect(service.isLoggedIn).toBe(false);

      // login
      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush('invalid_token');

      // check we're still not logged in
      expect(service.isLoggedIn).toBe(false);

      httpMock.verify();
    });

    it('should create the user if successfully authenticated', () => {
      const service: AuthService = TestBed.get(AuthService);
      // return a valid token
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      // return the decoded token
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });

      // ensure the user is not currently defined
      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();

      // login
      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush('valid_token');

      // check we now have a user
      expect(service.username).toBe(username);
      expect(service.role).toBe(role);

      httpMock.verify();
    });

    it('should not create the user if authentication fails', () => {
      const service: AuthService = TestBed.get(AuthService);
      // return an invalid token
      mockJwtHelperService.isTokenExpired.and.returnValue(true);

      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush('invalid_token');

      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();

      httpMock.verify();
    });
  });
});
