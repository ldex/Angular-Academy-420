import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';

  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http
                  .post<Product>(this.baseUrl, newProduct)
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  getProductById(id: number): Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
              )
  }

  resetList() {
    this.initProducts()
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        tap(console.table),
                        delay(1500), // Just for the demo!!!
                        catchError(this.handleError),
                        shareReplay()
                      )
  }

  private handleError(error: HttpErrorResponse) {
    // in a real world app, you may send the error to the server using some remote logging infrastructure
    // instead of just logging it to the console
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMsg);
    // return an observable with a user-facing error message
    return throwError(() => 'Something bad happened; please try again later.');
  }

}
