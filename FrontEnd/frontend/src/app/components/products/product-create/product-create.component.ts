import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  product: Product = {
    name: "diego",
    price: 200,
  };

  ngOnInit(): void {}

  create() {
    this.productService.create(this.product).subscribe(
      () => {
        this.productService.showMessage("operacao criada com sucesso");
        this.router.navigate(["/products"]);
      },
      () => this.productService.showMessage("Erro ao tentar criar o produto")
    );
  }
  cancelar() {
    this.router.navigate(["/products"]);
    this.productService.showMessage("Operação cancelada");
  }
}
