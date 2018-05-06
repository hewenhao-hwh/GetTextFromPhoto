import { Component,OnInit } from '@angular/core';
import { ImageService } from './Image.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
  }
  constructor(
    private ImageService: ImageService,
    private sanitizer: DomSanitizer,
  ) { }
  title = 'app';
  //img_url="https://placehold.it/550x550";
  target_photo:any;
  img_url:any;
  Text='';

  onSelect(): void {
    document.getElementById("invisiable").click();
  }

  onChange(event:any): void {
    this.target_photo = event.currentTarget.files[0];

    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    this.img_url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.target_photo)); 
    //var t=($("#invisiable")[0] as HTMLInputElement).value;//.value要引用jquery
  }

  onStart():void {

    if(this.target_photo!=null){
      //把图片包在FormData里传送，nodejs才能得到files
      var form = new FormData();  
      form.append("file", this.target_photo);
      this.ImageService.uploadOpenCVphoto(form);
    }
    else{
      alert("请先上传一张本地图片！");
    }
  }

  onReady():void {
    this.ImageService.downloadOpenCVResultImg();
    this.img_url =  this.sanitizer.bypassSecurityTrustUrl(sessionStorage.getItem("Result_img_url"));
    console.log(this.img_url);
    this.ImageService.downloadOpenCVResultText();
    this.Text = sessionStorage.getItem("Result_text");
    console.log(this.Text);
  }
}