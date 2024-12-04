import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router)

  //product: Product;
  product$: Observable<Product>

  deleteProduct(id: number) {
    this
      .productService
      .deleteProduct(id)
      .subscribe(
        {
          next: () => {
            console.log('Product was deleted on the server.')
            this.productService.resetList()
            this.router.navigateByUrl('/products')
          },
          error: (error) => {
            console.log('Could not delete the product, error: ' + error)
          }
        }
      )
  }

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
