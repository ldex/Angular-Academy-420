import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private activatedRoute = inject(ActivatedRoute)
  private productService = inject(ProductService)

  product: Product;
  product$: Observable<Product>

  constructor() {
    let id = this.activatedRoute.snapshot.params.id

    this.product$ = this.productService.getProductById(id)

    // this.productService
    //         .getProductById(id)
    //         .pipe(
    //           takeUntilDestroyed()
    //         )
    //         .subscribe(
    //           result => this.product = result
    //         )
  }

}
