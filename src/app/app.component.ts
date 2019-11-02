import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'education';
  constructor(private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer){
    this.assetsIcons();  
  }
  assetsIcons(){
    this.iconRegistry.addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/facebook.svg'));
    this.iconRegistry.addSvgIcon('twitter', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/twitter.svg'));
    this.iconRegistry.addSvgIcon('instagram', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'));
    this.iconRegistry.addSvgIcon('whatsapp', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/whatsapp.svg'));
  }
}
