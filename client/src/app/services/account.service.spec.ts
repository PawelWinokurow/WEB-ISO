import { TestBed } from '@angular/core/testing';
import { serviceModules, externalModules } from '../modules/modules';
import { Account, AccountDTO } from 'src/app/interfaces/account';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';


describe('AccountService', () => {
  let accountService: AccountService;
  let authService: AuthService;

  const newAccount: Account = {
    username: 'user4',
    email: 'pawelwinokurow@gmail.com',
    companyCode: '1100',
    role: 'USER',
    password: 'password',
    passwordOld: 'password'
  }

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
    accountService = TestBed.inject(AccountService);
    authService = TestBed.inject(AuthService);
    await authService.login('admin', 'admin');
  });

  it('createAccount', async () => {
    await accountService.createAccount<AccountDTO>(newAccount).toPromise();
    const accounts = await accountService.getAccounts<[Account]>().toPromise();
    const expectation = accounts.some(acc =>
      acc.username === newAccount.username
      && acc.email === newAccount.email
      && acc.companyCode === newAccount.companyCode
      && acc.role === newAccount.role
    );
    await accountService.deleteAccount<AccountDTO>(newAccount).toPromise();
    expect(expectation).toBeTrue();
  });

  it('deleteAccount', async () => {
    await accountService.createAccount<AccountDTO>(newAccount).toPromise();
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
    //await accountService.createAccount<AccountDTO>(newAccount).toPromise();
    let admin: Account = {
      username: 'admin',
      email: 'admin@admin.de',
      companyCode: '1200',
      role: 'ADMIN',
      password: 'admin',
      passwordOld: 'admin',
      blocked: false
    }
    let updatedAccount = await accountService.updateAccount<AccountDTO>(admin).toPromise();

    expect(updatedAccount && 'account' in updatedAccount).toBeTrue();
  });

  it('blockAccount', async () => {
    await accountService.createAccount<AccountDTO>(newAccount).toPromise();
    newAccount.blocked = !newAccount.blocked;
    let blockedAccount = await accountService.blockAccount<AccountDTO>(newAccount).toPromise();
    await accountService.deleteAccount<AccountDTO>(newAccount).toPromise();
    expect(blockedAccount && blockedAccount.account.blocked === newAccount.blocked).toBeTrue();
  });



});
