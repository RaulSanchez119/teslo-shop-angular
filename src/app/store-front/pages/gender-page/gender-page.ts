import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { TitleCasePipe } from '@angular/common';
import { Pagination } from "@shared/pagination/pagination";
import { PaginationService } from '@shared/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, TitleCasePipe, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(this.route.params.pipe(
    map(({ gender }) => gender)
  ));


  productResource: ResourceRef<ProductsResponse | undefined> = rxResource({
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      });
    },
  });


}
