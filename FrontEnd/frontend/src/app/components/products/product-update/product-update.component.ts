import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../product.model";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    id: 12,
    name: "diego",
    price: 10,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get("id"));
    this.productService.get(this.route.snapshot.paramMap.get("id")).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => this.productService.showMessage("Error")
    );
  }
  updateProduct() {
    this.productService.update(this.product).subscribe(
      () => {
        this.productService.showMessage("Atualizado");
      },
      () => this.productService.showMessage("Error")
    );
    this.cancel();
  }
  cancel() {
    this.router.navigate(["/products"]);
  }
}
