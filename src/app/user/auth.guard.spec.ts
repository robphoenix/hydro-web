import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let mockSnapshot: RouterStateSnapshot;
  let mockAuthService: AuthService;

  class MockAuthService {
    isLoggedIn: boolean;
    redirectUrl: string;
  }

  beforeEach(() => {
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['url'],
    );
    mockAuthService = new MockAuthService() as AuthService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    guard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
  });

  afterEach(() => {
    mockAuthService.redirectUrl = undefined;
    mockAuthService.isLoggedIn = false;
  });

  it('should navigate to login page if not logged in', () => {
    spyOn(router, 'navigate');
    mockAuthService.isLoggedIn = false;

    expect(
      guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot),
    ).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set redirectUrl if not logged in', () => {
    const redirectUrl = '/monitors';
    mockSnapshot.url = redirectUrl;

    guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(mockAuthService.redirectUrl).toBe(redirectUrl);
  });

  it('should activate route if logged in', () => {
    mockAuthService.isLoggedIn = true;
    spyOn(router, 'navigate');

    expect(
      guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot),
    ).toBeTruthy();
  });
});
