import { TestBed } from '@angular/core/testing';
import { services, externalModules } from '../../modules/modules';
import { AuthService } from './auth.service';
import { AccountJWT, Account } from 'src/app/interfaces/account';

describe('AuthService', () => {
  let authService: AuthService;
  const account: AccountJWT = {
    idToken: 'token',
    expiresIn: '100000',
    account: <Account> {
      username: 'username',
      email: 'email',
      companyCode: '1100',
      role: 'USER'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...services
      ],
      imports: [
        ...externalModules,
      ]
    })
    .compileComponents(); 
    authService = TestBed.inject(AuthService);
    authService.logout();
    await authService.login('admin', 'admin');
  });

  it('setSessionTrue', () => {
    expect(authService.setSession(account)).toBeTrue();
  });

  it('setSessionFalse', () => {
    expect(authService.setSession(null)).toBeFalse();
  });

  it('logout', () => {
    authService.logout();
    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('logout2', () => {
    authService.logout();
    expect(authService.isLoggedOut()).toBeTrue();
  });

  it('refreshtoken', async () => {
    const token = await authService.refreshToken();
    expect('error' in token).toBeFalse();
  });

});
