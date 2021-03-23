import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DBSchema, openDB, IDBPDatabase } from 'idb';
declare var db: any;
@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  public storagename = 'books';
  public cartName = 'cart';
  allCartData = [];

  addData(item) {
    var transaction = db.transaction([this.storagename], "readwrite");
    var objectStore = transaction.objectStore("books");
    item.forEach(function (book) {
      var request = objectStore.add(book);
      request.onsuccess = function (event) {
        console.log("new data stored successfully");
      };
    });
  }

  getAllRecords() {

    var transaction = db.transaction([this.storagename], "readwrite");
    transaction.oncomplete = function (event) {
      console.log('Transaction completed.');
    };
    transaction.onerror = function (event) {
      console.log("Transaction not opened due to error: " + transaction.error);
    };
    let getAllStore = transaction.objectStore("books");
    let objectStoreRequest = getAllStore.getAll();
    var data = [];
    objectStoreRequest.onsuccess = function (event) {
      let allRecords = objectStoreRequest.result;
      allRecords.forEach(function (book) {
        data.push(book);
      });
    }
    return data;
  }

  getAllCartRecords() {

    var transaction = db.transaction(["cart"], "readwrite");
    transaction.oncomplete = function (event) {
      console.log('Transaction completed.');
    };
    transaction.onerror = function (event) {
      console.log("Transaction not opened due to error: " + transaction.error);
    };

    let getAllStore = transaction.objectStore("cart");
    let objectStoreRequest = getAllStore.getAll();
    var data = [];
    objectStoreRequest.onsuccess = function (event) {
      let allRecords = objectStoreRequest.result;
      allRecords.forEach(function (book) {
        data.push(book);
      });
    }
    this.allCartData = data;
    return data;
  }

  addProductCart(cartArr) {
    var transaction = db.transaction(["cart"], "readwrite");
    var objectStore = transaction.objectStore("cart");
    cartArr.forEach(function (book) {
      var request = objectStore.add(book);
      request.onsuccess = function (event) {
        alert("book added to the cart");
      };
    });
  }

  deleteCartProduct(index) {
    var request = db.transaction([this.cartName], "readwrite")
      .objectStore("cart")
      .delete(index);
    request.onsuccess = function (event) {
      alert("item removed from cart");
    };
    request.onerror = function (event) {
      alert("data is not available in database");
    }
  }

  addProductBook(data) {
    var transaction = db.transaction(["books"], "readwrite");
    var objectStore = transaction.objectStore("books");
    // data.forEach(function (book) {
    var request = objectStore.add(data);
    request.onsuccess = function (event) {
      alert("new book added successfully!");
    };
    // });
  }

  deleteInventoryProduct(index) {
    var request = db.transaction([this.storagename], "readwrite")
      .objectStore("books")
      .delete(index);
    request.onsuccess = function (event) {
      alert("item removed from Inventory");
    };
    request.onerror = function (event) {
      alert("data is not available in database");
    }
  }

  updateInventoryProduct(data) {
    var transaction = db.transaction(["books"], "readwrite");
    var objectStore = transaction.objectStore("books");
    // item.forEach(function (book) {
    var request = objectStore.put(data);
    request.onsuccess = function (event) {
      alert("Book Updated Successfully");
    };
    // });
  }

  totalCartAmmount = 0;

  ammountwithquantity(quantityArr) {
    console.log("quantity arr:", quantityArr);
    let myRecord = this.allCartData;

    for (let j = 0; j < quantityArr.length; j++) {
      for (let i = 0; i < myRecord.length; i++) {
        if (quantityArr[j]['buttonNo'] == myRecord[i].id) {
          this.totalCartAmmount += quantityArr[j]['quantityVal'] * myRecord[i].price;
        } else {
          this.totalCartAmmount += 0 + myRecord[i].price;
        }
      }
    }
    console.log("total cart ammount in ammountwithquantity:", this.totalCartAmmount);
    return this.totalCartAmmount;
  }
  ammount(quantity) {

    console.log('quantityArr in ammount', quantity);

    let myRecord = this.allCartData;
    if (quantity !== 0) {
      let totalAmmount = 0;
      for (let i = 0; i < myRecord.length; i++) {
        totalAmmount += quantity * myRecord[i].price;
      }
      return totalAmmount;
    } else {
      let total = 0;
      for (var elem of myRecord) {
        if (elem.price == "") {
          total += parseInt("0");
        } else {
          total += parseInt(elem.price);
        }
      }
      return total;
    }
  }
}

