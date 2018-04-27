/**
 * 图片类
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
   
    uploadphoto(img:FormData) { //把图片包在FormData里传送，nodejs才能得到files
      return this.http
      .post('http://localhost:3000/uploadOpenCVPhoto', img, {
        //responseType: "json"
      })
      .subscribe(  //获取返回数据
        data => {  
            console.log("data : " + JSON.stringify(data));  
        },  
        error => {  
            console.log("err");  
            console.error(error);  
        }  
      ); 
    }
    
}