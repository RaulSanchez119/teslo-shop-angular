import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { Pagination } from "@shared/pagination/pagination";
import { PaginationService } from '@shared/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);


  productResource: ResourceRef<ProductsResponse | undefined> = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      });
    },
  });

}
