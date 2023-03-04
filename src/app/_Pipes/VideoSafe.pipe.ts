import {  ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class VideoSafe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    console.log( this.sanitizer.bypassSecurityTrustResourceUrl(url) );
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}