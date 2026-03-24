import { Component, inject, ResourceRef, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/pagination/pagination.service';
import { Pagination } from "@shared/pagination/pagination";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productPerPage = signal(10);

  productResource: ResourceRef<ProductsResponse | undefined> = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productPerPage()
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
        limit: params.limit,
      });
    },
  });

}
