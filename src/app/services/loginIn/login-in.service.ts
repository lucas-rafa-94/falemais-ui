import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class LoginInService {

     private url = 'http://170.254.79.160:8084/admin/v1/api/login';
    //  private url = 'http://localhost:8081/admin/v1/api/login';

  constructor(private http: HttpClient) {}

      getName() {
        return 'Login';
  }
   postGetToken(data): Observable<any> {
       const httpOptions = {
           headers: new HttpHeaders({
               'Accept':  'application/json',
               'authorization': 'Basic ' + 'YnF1eThuaWdua202MGF0emxtaWpoa2Ixbm5ncGE5ejllbnQ2MGtwd2F5Y2NmNnRmbmJ5cjhhbzB4c3YwYjdheDpXZzM0bjlwcWszR3lOOEFoTG5PU3NqaWx5MHlDTHZlRlJ5Z2huWXljUlJVZ2gxI3RveXk4d0VZaE4wRlNxQmpw'
           })
       };
       return this.http.post(this.url  , data , httpOptions);
   }
}


