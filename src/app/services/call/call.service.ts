import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CallService {

  constructor(private http: HttpClient) { }

    private url = 'https://hubapi.falemaisvoip.com.br:8443/db/v1/api/log-audit';
    // private url = 'http://localhost:8081/db/v1/api/log-audit';
    private token = 'YnF1eThuaWdua202MGF0emxtaWpoa2Ixbm5ncGE5ejllbnQ2MGtwd2F5Y2NmNnRmbmJ5cjhhbzB4c3YwYjdheDpXZzM0bjlwcWszR3lOOEFoTG5PU3NqaWx5MHlDTHZlRlJ5Z2huWXljUlJVZ2gxI3RveXk4d0VZaE4wRlNxQmpw';

    getCall(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.get(this.url  ,  httpOptions);
    }

    deleteLogs(filter): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.delete(this.url + "/filter?max=" + filter.max + "&min=" + filter.min ,  httpOptions);
    }
}
