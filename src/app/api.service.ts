import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Contacto } from './contacto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlGet = "http://localhost:8080/contactos";
const apiUrlPost = "http://localhost:8080/contacto";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getContactos (): Observable<Contacto[]> {
    const header = new HttpHeaders(); 
     header.append('Access-Control-Allow-Headers', 'Content-Type'); 
     header.append('Access-Control-Allow-Methods', 'GET'); 
     header.append('Access-Control-Allow-Origin', '*'); 
    return this.http.get<Contacto[]>(apiUrlGet,{headers: header})
      .pipe(
        tap(contacts => console.log('mostrar Contactos')),
        catchError(this.handleError('getContactos', []))
      );
  }
  
  getContacto(id: number): Observable<Contacto> {
    const url = apiUrlGet+'/'+id;
    var json = this.http.get<Contacto>(url).pipe(
      tap(_ => console.log('mostrar contacto id='+id)),
      catchError(this.handleError<Contacto>('getContacto id=${id}'))
    );
    console.log('JSON: '+json[0]+' NORMAL:'+json);
    return json;
  }
  
  addContacto (contacto): Observable<Contacto> {
    return this.http.post<Contacto>(apiUrlPost, contacto, httpOptions).pipe(
      tap((contacto: Contacto) => console.log('contacto agregado w/ id=${product.id}')),
      catchError(this.handleError<Contacto>('addContacto'))
    );
  }
  
  updateContacto (contacto): Observable<any> {
    const url = apiUrlPost;
    return this.http.post(url, contacto, httpOptions).pipe(
      tap(_ => console.log('updated product id=${id}')),
      catchError(this.handleError<any>('updateContacto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      return of(result as T);
    };
  }
}
