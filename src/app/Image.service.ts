/**
 * 图片服务类
 * 
 * @class ImageService
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {
    constructor(
      private http: HttpClient
    ){ }
    img_url:string;
    get_img_url(){
      return this.img_url;
    }
    uploadOpenCVphoto(img:FormData) { //把图片包在FormData里传送，nodejs才能得到files
      return this.http
      .post('http://localhost:3000/uploadOpenCVPhoto', img, {
        //responseType: "json"
      })
    }

    downloadOpenCVResultImg(){
      return this.http
      .get('http://localhost:3000/downloadOpenCVResultImg', {
        responseType: "blob"
      })
      .subscribe(  //获取返回数据
        Blob => {  
          var url= window.URL.createObjectURL(Blob); //blob数据类型里存的是一个文件(这里是一张图片)，可直接转成url
          sessionStorage.setItem("Result_img_url",url);
        },  
        error => {  
            console.log("err");  
            console.error(error);  
        }  
      );
    }

    downloadOpenCVResultText(){
      return this.http
      .get('http://localhost:3000/downloadOpenCVResultText', {
        responseType: "blob"
      })
      .subscribe(  //获取返回数据
        blob => {  
          //blob数据类型里存的是一个文件(这里是一个txt)
          var reader = new FileReader();
          reader.readAsText(blob,'utf-8');
          reader.addEventListener("loadend", function() {
             sessionStorage.setItem("Result_text",reader.result);// 包含转化为类型数组的blob
          });
          
        },  
        error => {  
            console.log("err");  
            console.error(error);  
        }  
      );
    }
    
}