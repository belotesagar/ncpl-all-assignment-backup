import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
  {
    path: 'homepage', component: HomepageComponent, children: [{
      path: 'products', component: ProductsComponent
    }, {
      path: 'inventory', component: InventoryComponent
    },
    {
      path: 'cart', component: CartComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
