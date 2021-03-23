import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../indexed-db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: any = [];
  headers = ["id", "name", "autherName", "price", "language"];
  totalAmmount = 0;
  constructor(private _indexedDbService: IndexedDBService) { }

  ngOnInit(): void {
    this.cartData = this._indexedDbService.getAllCartRecords();
  }

  ngAfterViewChecked() {
    let result = this._indexedDbService.ammount(0);
    this.totalAmmount = result;
  }

  deleteProduct(index) {
    let itemId = this.cartData[index].id;
    this._indexedDbService.deleteCartProduct(itemId);
  }

  quantityArr = [];

  editQuantity(index) {
    var quantity = parseInt(prompt("Please enter quantity"));
    if (quantity == null) {
      this.quantityArr.push({
        buttonNo: this.cartData[index].id,
        quantityVal: parseInt("0")
      })
    } else {
      this.quantityArr.push({
        buttonNo: this.cartData[index].id,
        quantityVal: quantity
      })
      if (quantity > 0) {

        let result = this._indexedDbService.ammountwithquantity(this.quantityArr);
        this.totalAmmount = result;

      } else {
        let result = this._indexedDbService.ammount(0);
        this.totalAmmount = result;
      }
    }
  }




}
