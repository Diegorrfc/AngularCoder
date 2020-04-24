import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../product.model";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.get(this.route.snapshot.paramMap.get("id")).subscribe(
      (product) => (this.product = product),
      () => this.productService.showMessage("Error")
    );
  }
  delete() {
    this.productService.delete(this.product).subscribe(() => this.cancel());
  }
  cancel() {
    this.router.navigate(["/products"]);
  }
}
