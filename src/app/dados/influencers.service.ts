import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  constructor(private _http: HttpClient) { }

  addInfluencer(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/influencers', data);
  }

  getInfluencerLista(): Observable<any> {
    return this._http.get('http://localhost:3000/influencers');
  }

  alteracaoInfluencer(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/influencers/${id}`, data);
  }

  deletandoInfluencer(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/influencers/${id}`);
  }
}
