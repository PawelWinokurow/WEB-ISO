import { TestBed } from '@angular/core/testing';
import { serviceModules, externalModules } from '../modules/modules';
import { AuthService } from './auth.service';
import { AccountJWT, Account } from 'src/app/interfaces/account';


describe('AuthService', () => {
  let service: AuthService;
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
        ...serviceModules
      ],
      imports: [
        ...externalModules
      ]
    })
    .compileComponents();
    service = TestBed.inject(AuthService);
  });

  it('setSessionTrue', () => {
    expect(service.setSession(account)).toBeTrue();
  });

  it('setSessionFalse', () => {
    expect(service.setSession(null)).toBeFalse();
  });


});
