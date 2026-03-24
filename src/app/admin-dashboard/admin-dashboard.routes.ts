import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";
import { IsAdminGuard } from "@auth/guards/is-admin.guard";
import { DashboardPage } from "./pages/dashboard-page/dashboard-page";


export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    canMatch: [
      IsAdminGuard,
    ],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'products',
        component: ProductsAdminPage,
      },
      {
        path: 'products/:id',
        component: ProductAdminPage,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ]
  }
]

export default adminDashboardRoutes;
