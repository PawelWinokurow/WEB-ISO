import { TestBed } from '@angular/core/testing';
import { services, externalModules } from '../modules/modules';
import { Account, AccountDTO } from 'src/app/interfaces/account';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

describe('AccountService', () => {
  let accountService: AccountService;
  let authService: AuthService;

  const newAccount: Account = {
    username: 'user4',
    email: 'user4@user4.com',
    companyCode: '1100',
    role: 'USER',
    password: 'password',
    passwordOld: 'password'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...services
      ],
      imports: [
        ...externalModules,
      ]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    authService = TestBed.inject(AuthService);
    await authService.login('admin', 'admin');
    await accountService.deleteAccount<AccountDTO>(newAccount).toPromise();
    await accountService.createAccount<AccountDTO>(newAccount).toPromise();
  });

  it('createAccount', async () => {
    const accounts = await accountService.getAccounts<[Account]>().toPromise();
    const expectation = accounts.some(acc =>
      acc.username === newAccount.username
      && acc.email === newAccount.email
      && acc.companyCode === newAccount.companyCode
      && acc.role === newAccount.role
    );
    expect(expectation).toBeTrue();
  });
  
    it('deleteAccount', async () => {
      await accountService.deleteAccount<AccountDTO>(newAccount).toPromise();
      const accounts = await accountService.getAccounts<[Account]>().toPromise();
      const expectation = accounts.some(acc =>
        acc.username === newAccount.username
        && acc.email === newAccount.email
        && acc.companyCode === newAccount.companyCode
        && acc.role === newAccount.role
        && acc.blocked == newAccount.blocked
      );
      expect(expectation).toBeFalse();
    });
  
    it('updateAccount', async () => {
      let changedAccount: Account = {
        ...newAccount
      }
      delete changedAccount.password
      delete changedAccount.passwordOld
      changedAccount.companyCode = '9999'
      let updatedAccount = await accountService.updateAccount<AccountDTO>(changedAccount).toPromise();
      expect(updatedAccount && 'account' in updatedAccount).toBeTrue();
    });
  
    it('blockAccount', async () => {
      newAccount.blocked = !newAccount.blocked;
      let blockedAccount = await accountService.updateAccount<AccountDTO>(newAccount).toPromise();
      expect(blockedAccount && blockedAccount.account.blocked == newAccount.blocked).toBeTrue();
    });
  
});
