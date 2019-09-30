import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const COMPONENTS = [
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class MaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/angular.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'hacktoberfest',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/hacktoberfest.svg')
    );
  }
}
