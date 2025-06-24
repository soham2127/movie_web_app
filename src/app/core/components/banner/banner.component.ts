// // import { Component, Input, ɵɵNgOnChangesFeature } from '@angular/core';
// import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';

// @Component({
//   selector: 'app-banner',
//   standalone:true,
//   imports: [],
//   templateUrl: './banner.component.html',
//   styleUrl: './banner.component.css'
// })
// export class BannerComponent implements OnChanges {

//   @Input () bannerTitle='';
//   @Input() bannerOverview='';
//   @Input() key='';
//   private Sanitizer=inject(DomSanitizer);
//   videoUrl=this.Sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);



// ngOnChanges(changes: SimpleChanges): void {
//     if(changes['key']){

//       this.videoUrl=this.Sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
//     }
// }
// }

  
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'] // ✅ not styleUrl (typo fix)
})
export class BannerComponent implements OnChanges {

  @Input() bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key = '';

  private sanitizer = inject(DomSanitizer);
  videoUrl: SafeResourceUrl ='';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key'] && this.key) {
      const url = `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
