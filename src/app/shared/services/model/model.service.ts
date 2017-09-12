import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Subject} from 'rxjs/RX';
import {API_URL} from '../../interfaces/app-config';
import {IModel} from '../../interfaces/IModel';

@Injectable()
export class ModelService {
  constructor(private http: Http) { }

  public ModelData(): Observable<IModel> {
    return this.http.get(`${API_URL}api/model/modelData`).map((res: Response) => res.json());
  }
}
