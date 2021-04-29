import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * Contains application  header and is also the parent component of the NewISOComponent.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  selectedLanguage = 'DE';

  constructor(public router: Router, public dictionaryService: DictionaryService,
    public storageService: StorageService, public authService: AuthService) {
  }

  /**
   * Click on the reset button triggers this method. The method navigates to the LoginComponent.
   */
  reset() {
    this.router.navigate(['/login']);
  }

  /**
   * Click on the logout button triggers this method. The method navigates to the LoginComponent.
   */
  logout() {
    this.authService.logout();
    this.authService.stopChecking();
    this.reset();
  }
}
