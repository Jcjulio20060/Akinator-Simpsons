import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Simpson {
  id: number;
  name: string;
  occupation: string;
  portrait_path: string; 
  age: number | null;
  gender: string;
  status: string;
  phrases: string[];
  birthdate?: string; 
  first_appearance?: string;
}

export interface SimpsonsApiResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Simpson[];
}

@Injectable({
  providedIn: 'root'
})
export class SimpsonsApiService {
  private baseUri = 'https://thesimpsonsapi.com/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Simpson[]> {
    return this.http.get<SimpsonsApiResponse>(this.baseUri).pipe(
      map(response => response.results)
    );
  }

  getCharacterById(id: number): Observable<Simpson> {
    return this.http.get<Simpson>(`${this.baseUri}/${id}`);
  }
}