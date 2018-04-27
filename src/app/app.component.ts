import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  img_url="https://placehold.it/550x550";
  onSelect(): void {
    $("#invisiable").click();
  }
  onChange(): void {
    var src=($("#invisiable")[0] as HTMLInputElement).value;
    alert(src);
    $("#target_img").attr("src",src);
    //const img1 = require('../assets/img1.png');
  }
}
