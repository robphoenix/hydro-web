import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [JwtHelperService],
      declarations: [AppComponent, HeaderComponent],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'hydro-web'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hydro-web');
  }));

  xit('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to hydro-poc!',
    );
  }));
});
