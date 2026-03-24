import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {

  productService = inject(ProductsService);
  totalProducts = signal(0);

  async ngOnInit() {
  const { count } = await firstValueFrom(
    this.productService.getProducts({ limit: 1, offset: 0 })
  );
  this.totalProducts.set(count);
}

}
