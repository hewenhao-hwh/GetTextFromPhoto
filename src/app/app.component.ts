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
  circle_progress_percent="0";
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
      if((document.getElementsByName("myGroup").item(0) as HTMLInputElement).checked){
        console.log("是OpenCV");
        this.ImageService.uploadOpenCVphoto(form);
      }
      else if((document.getElementsByName("myGroup").item(1) as HTMLInputElement).checked){
        console.log("是OCR");
        var language="";
        var lan=document.getElementsByName("myLanguage");
        for(var i=0; i<lan.length; i++){
          if((lan.item(i) as HTMLInputElement).checked){
            language += (lan.item(i) as HTMLInputElement).value+'+'; //如果选中，将value添加到变量s中
          }
        }
        language=language.substring(0,language.length-1);
        form.append("language",language)
        this.ImageService.uploadOCRphoto(form);
      }
      this.circle_progress_percent="100";
      document.getElementById("floating_layer").style.display="block";
    }
    else{
      alert("请先上传一张本地图片！");
    }
    setTimeout(function () {
      document.getElementById("ready").style.display="block";
    }, '40000');
  }

  onReady():void {
    if((document.getElementsByName("myGroup").item(0) as HTMLInputElement).checked){
      console.log("是OpenCV");
      this.ImageService.downloadOpenCVResultText();
      this.ImageService.downloadOpenCVResultImg();
    }
    else if((document.getElementsByName("myGroup").item(1) as HTMLInputElement).checked){
      console.log("是OCR");
      this.ImageService.downloadOCRResultText();
    }
    this.target_photo=null;
    setTimeout(function () {
      document.getElementById("read").click();
    }, '1000');
  }

  onCancel():void{
    document.getElementById("floating_layer").style.display="none";
    document.getElementById("ready").style.display="none";
    this.circle_progress_percent="0";
  }

  getURL():any{
    if(this.img_url!=null)
        return this.img_url;
    return "https://placehold.it/550x550";
  }

  getResult():any{
    this.ImageService.downloadOpenCVResultImg();
    this.img_url =  this.sanitizer.bypassSecurityTrustUrl(sessionStorage.getItem("Result_img_url"));
    console.log(this.img_url);
  }

  onRead():void{
    if((document.getElementsByName("myGroup").item(0) as HTMLInputElement).checked){
      this.Text = sessionStorage.getItem("Result_text");
      this.img_url =  this.sanitizer.bypassSecurityTrustUrl(sessionStorage.getItem("Result_img_url"));
      console.log(this.Text);
      console.log(this.img_url);
    }
    else if((document.getElementsByName("myGroup").item(1) as HTMLInputElement).checked){
      this.Text = sessionStorage.getItem("Result_text");
      console.log(this.Text);
    }
    this.onCancel();
  }

  onLan():void{
    document.getElementById("language").style.display="block";
  }
  noLan():void{
    document.getElementById("language").style.display="none";
  }
}