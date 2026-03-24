import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {

  product = input.required<Product>();

  imageUrl = computed(() => {
    return `${environment.baseUrl}/files/product/${this.product().images[0]}`
  });
}
