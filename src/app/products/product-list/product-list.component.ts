import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ UpperCasePipe, CurrencyPipe, SlicePipe, AsyncPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product
  errorMessage: string

  private productService = inject(ProductService)
  private router = inject(Router)

  constructor() {

  }

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  pageNumber = 1

  previousPage() {
    this.selectedProduct = null
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.pageNumber--
  }

  nextPage() {
    this.selectedProduct = null
    this.start += this.pageSize
    this.end += this.pageSize
    this.pageNumber++
  }


  products$: Observable<Product[]> = this
                                        .productService
                                        .products$
                                        .pipe(
                                          catchError(
                                            error => {
                                              this.errorMessage = error
                                              return EMPTY
                                            }
                                          )
                                        )

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('/products/' + product.id)
  }
}
