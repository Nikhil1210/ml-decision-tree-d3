import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {API_URL} from '../../shared/interfaces/app-config';
import {IModel} from '../../shared/interfaces/IModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ModelService {
  constructor(private http: Http) { }

  public ModelData(): Observable<IModel> {
    return this.http.get(`${API_URL}api/model/modelData`).map((res: Response) => res.json())
    .catch(this.handleError);
  }

    private handleError(error: Response | any) {
    // Placeholder to log errors
    let errMsg: string;
    if (error instanceof Response) {
      try {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } catch (e) {
        errMsg = `${error.status} - ${error.statusText || ''}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
