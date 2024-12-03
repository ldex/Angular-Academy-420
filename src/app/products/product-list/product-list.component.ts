import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [ UpperCasePipe, CurrencyPipe, ProductDetailComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product

  errorMessage: string

  private productService = inject(ProductService)

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
  }
}