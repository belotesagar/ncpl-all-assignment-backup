import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IndexedDBService } from '../indexed-db.service';
import { Products } from '../products/products.interf';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @ViewChild('userForm') userForm: NgForm;
  constructor(private _indexedDbService: IndexedDBService) { }
  booksData = [];
  editMode: boolean = false;
  headers = ["id", "name", "autherName", "price", "language"];

  ngOnInit(): void {
    this.booksData = this._indexedDbService.getAllRecords();
  }

  ngAfterViewChecked() {
    console.log("input changes");
    // this.booksData = this._indexedDbService.getAllRecords();
  }

  deleteProduct(index) {
    if (confirm('Do you want to Delete this Book??')) {
      let itemId = this.booksData[index].id;
      this._indexedDbService.deleteInventoryProduct(itemId);
    }
  }

  editProduct(productId, index) {
    this.editMode = true;
    this.userForm.setValue({
      autherName: this.booksData[index].autherName,
      id: this.booksData[index].id,
      language: this.booksData[index].language,
      name: this.booksData[index].name,
      price: this.booksData[index].price
    })
  }

  items = [];

  onAddProduct(data: Products) {
    if (this.editMode == true) {
      this._indexedDbService.updateInventoryProduct(data);
    }
    else {
      this._indexedDbService.addProductBook(data);
    }
  }

}
