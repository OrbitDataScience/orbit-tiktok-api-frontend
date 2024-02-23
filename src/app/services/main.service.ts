import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 
  constructor(private httpClient : HttpClient) {}

  private url = 'http://192.168.0.101:5000/api/gettiktokdata';

   public sendToBackend(jsonData: any): Observable<any> {
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post(
      this.url,
      jsonData,
      httpOptions
    );
    
  }
}
