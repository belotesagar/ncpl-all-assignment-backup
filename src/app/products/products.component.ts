import { Component, OnInit } from '@angular/core';
import { Products } from './products.interf';
import { map } from 'rxjs/operators'
import { IndexedDBService } from '../indexed-db.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _indexedDbService: IndexedDBService) { }
  booksData: any = [];
  headers = ["id", "name", "autherName", "price", "language",];

  ngOnInit(): void {
    this.booksData = this._indexedDbService.getAllRecords();
  }

  cartArr = [];
  addtoCart(index) {
    this.cartArr.push(this.booksData[index]);
    this._indexedDbService.addProductCart(this.cartArr);
  }
  items = [];

}
