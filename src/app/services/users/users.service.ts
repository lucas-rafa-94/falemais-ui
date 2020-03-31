import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

    //private url = 'https://CrudRegioes-mktdigitaloi.brcom-central-1.oraclecloud.com/api/v1';
    // private url = 'https://oitesteback.herokuapp.com/api/v1';
    private url = 'https://170.254.79.160:8081/db/v1/api/hubspot-user';
    private token = 'YnF1eThuaWdua202MGF0emxtaWpoa2Ixbm5ncGE5ejllbnQ2MGtwd2F5Y2NmNnRmbmJ5cjhhbzB4c3YwYjdheDpXZzM0bjlwcWszR3lOOEFoTG5PU3NqaWx5MHlDTHZlRlJ5Z2huWXljUlJVZ2gxI3RveXk4d0VZaE4wRlNxQmpw';

    getUsuariosCadastrados(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.get(this.url + '/cadastrados'  ,  httpOptions);
    }

    getUsuariosNaoCadastrados(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.get(this.url + '/nao-cadastrados'  ,  httpOptions);
    }

    updateUsuario(payload): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.put(this.url  , payload, httpOptions);
    }

    deleteUsuario(payload): Observable<any> {
        console.log(payload);
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.delete(this.url + '/delete?email=' +  payload , httpOptions);
    }
}
