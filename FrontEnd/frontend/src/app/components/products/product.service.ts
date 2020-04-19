import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private sncakBat: MatSnackBar) {}
  showMessage(msg: string): void {
    this.sncakBat.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
    console.log(msg);
  }
}
