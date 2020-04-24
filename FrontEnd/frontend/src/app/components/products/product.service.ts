import { Injectable, ErrorHandler } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:3000/products";

  constructor(private sncakBat: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.sncakBat.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError
        ? ["show-message-error", "mat-simple-snackbar-action"]
        : ["show-message-success"],
    });
  }

  create(product: Product): Observable<Product> {
    console.log("aqui");
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  get(id: string): Observable<Product> {
    const url = `${this.baseUrl}\\${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}\\${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}\\${product.id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um error", true);
    return EMPTY;
  }
}
