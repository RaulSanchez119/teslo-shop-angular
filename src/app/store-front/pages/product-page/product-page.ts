import { Component, inject, input, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel, DecimalPipe],
  templateUrl: './product-page.html',
})
export class ProductPage {

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);


  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource: ResourceRef<Product | undefined> = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => this.productService.getProductByIdSlug(params.idSlug)
  });
}
