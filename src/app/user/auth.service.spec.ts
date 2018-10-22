import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let mockJwtHelperService;
  // let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: AuthService;
  let router: Router;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

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
        { provide: Router, useValue: routerSpy },
      ],
    });

    // httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  afterEach(() => {
    localStorage.removeItem(service.accessTokenName);

    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
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

    it('should open the subscriptions', () => {
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });
      const token = 'valid_token';

      expect(service.refresh$).toBeFalsy();
      expect(service.validate$).toBeFalsy();

      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush(token);

      expect(service.refresh$.closed).toBe(false);
      expect(service.validate$.closed).toBe(false);
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

    it('should log in on 200 HTTP response', () => {
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });
      const token = 'valid_token';

      service.login(username, password).subscribe();

      httpMock
        .expectOne(service.loginUrl)
        .flush(token, { status: 200, statusText: '' });

      expect(service.isLoggedIn).toBe(true);
      expect(service.username).toBe(username);
      expect(service.role).toBe(role);
      expect(localStorage.getItem(service.accessTokenName)).toEqual(token);
    });

    it('should not log in on 401 HTTP response', () => {
      const errorResponse = JSON.stringify({ errorCode: 'GENERIC_ERROR' });
      service.login(username, password).subscribe(
        () => {},
        (err) => {
          expect(err.error).toBe(errorResponse);

          expect(service.isLoggedIn).toBe(false);
          expect(service.username).toBeFalsy();
          expect(service.role).toBeFalsy();
          expect(localStorage.getItem(service.accessTokenName)).toBeFalsy();
        },
      );

      httpMock
        .expectOne(service.loginUrl)
        .flush(errorResponse, { status: 401, statusText: 'unauthorised' });
    });

    it('should not log in on 500 HTTP response', () => {
      const errorResponse = JSON.stringify({
        errorCode: 'INTERNAL_SERVER_ERROR',
      });
      service.login(username, password).subscribe(
        () => {},
        (err) => {
          expect(err.error).toBe(errorResponse);

          expect(service.isLoggedIn).toBe(false);
          expect(service.username).toBeFalsy();
          expect(service.role).toBeFalsy();
          expect(localStorage.getItem(service.accessTokenName)).toBeFalsy();
        },
      );

      httpMock.expectOne(service.loginUrl).flush(errorResponse, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('logout', () => {
    beforeEach(function() {
      // log user in
      mockJwtHelperService.isTokenExpired.and.returnValue(false);
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });
      const token = 'valid_token';

      service.login(username, password).subscribe();

      httpMock.expectOne(service.loginUrl).flush(token);

      expect(service.isLoggedIn).toBe(true);
      expect(service.username).toBe(username);
      expect(service.role).toBe(role);
      expect(localStorage.getItem(service.accessTokenName)).toEqual(token);
    });

    it('should logout logged in user', () => {
      service.logout();

      expect(service.isLoggedIn).toBe(false);
      expect(service.username).toBeFalsy();
      expect(service.role).toBeFalsy();
      expect(localStorage.getItem(service.accessTokenName)).toBeFalsy();
    });

    it('should navigate to login page', () => {
      service.logout();

      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      expect(navArgs).toEqual(['/login']);
    });

    it('should close the subscriptions', () => {
      expect(service.refresh$.closed).toBe(false);
      expect(service.validate$.closed).toBe(false);

      service.logout();

      expect(service.refresh$.closed).toBe(true);
      expect(service.validate$.closed).toBe(true);
    });
  });

  describe('username', () => {
    it('should return username from JWT in local storage if not already set and logged in', () => {
      mockJwtHelperService.decodeToken.and.returnValue({ username, role });

      expect(service.username).toBeFalsy();

      service.isLoggedIn = true;

      expect(service.username).toBe(username);
      // double check it's actually been set
      service.isLoggedIn = false;
      expect(service.username).toBe(username);
    });
  });
});
