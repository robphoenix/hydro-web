import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './layout/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        HttpClientTestingModule,
        // https://github.com/auth0/angular2-jwt/issues/476#issuecomment-362805181
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [JwtHelperService],
      declarations: [AppComponent, NavbarComponent],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render the navbar component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(
      fixture.debugElement.query(By.directive(NavbarComponent)).nativeElement,
    ).toBeTruthy();
  }));
});
