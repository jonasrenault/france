import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public getData(url: string): Promise<any> {
    return this.http.get(url).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }

}
