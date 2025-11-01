import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Simpson {
  _id: string;
  name: string;
  description: string;
  image: string;
  occupation: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimpsonsApi {
  private baseUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacterById(id: string): Observable<Simpson[]> {
    return this.http.get<Simpson[]>(`${this.baseUrl}/characters/${id}`);
  }
}