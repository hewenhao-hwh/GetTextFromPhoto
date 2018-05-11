import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { ImageService } from './Image.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      maxPercent:100,
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      titleFontSize:'35',
      unitsFontSize:'30',
      subtitle:"Running..",
      subtitleFontSize:'20',
      animationDuration: 300
    })
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
