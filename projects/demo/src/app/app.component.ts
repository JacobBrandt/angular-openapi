import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static darkThemeName = 'dark-theme';
  theme = 'dark';
  overlayContainer: OverlayContainer;

  constructor(overlayContainer: OverlayContainer, matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.overlayContainer = overlayContainer;
    this.applyTheme();

    matIconRegistry.addSvgIcon("github-mark", domSanitizer.bypassSecurityTrustResourceUrl("assets/github-mark.svg"));
  }

  applyTheme() {
    const body = document.getElementById('app-body');
    if (body) {
      if (this.theme === 'dark') {
        body.classList.add(AppComponent.darkThemeName);
        this.overlayContainer.getContainerElement().classList.add(AppComponent.darkThemeName);
      } else {
        body.classList.remove(AppComponent.darkThemeName);
        this.overlayContainer.getContainerElement().classList.remove(AppComponent.darkThemeName);
      }
    }
  }

  toggleTheme() {
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }

    this.applyTheme();
  }
}
