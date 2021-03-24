const dbName = "master_books";

var request = indexedDB.open(dbName, 2);
var db;

request.onerror = function (event) {
    console.log("getting error in book");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success book");
}

var bookData = [{
        id: 1,
        name: 'Politics of Opportunism',
        autherName: 'R P N Singh',
        price: 300,
        language: 'English'
    },
    {
        id: 2,
        name: 'Obama: The Call of History',
        autherName: 'Peter Baker',
        price: 700,
        language: 'English'
    },
    {
        id: 3,
        name: 'Mrityunjaya',
        autherName: 'Shivaji Sawant',
        price: 945,
        language: 'Marathi'
    },
    {
        id: 4,
        name: 'Musafir',
        autherName: 'Achyut Godbole',
        price: 1250,
        language: 'Marathi'
    },
    {
        id: 5,
        name: 'Maharana Pratap',
        autherName: 'Kunwar Ishwar Singh Rathore',
        price: 495,
        language: 'Hindi'
    }
];

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("books", {
        keyPath: "id",
        autoIncrement: true
    });

    objectStore.createIndex("name", "name", {
        unique: true
    });

    objectStore.transaction.oncomplete = function (event) {
        console.log("books database transaction is complete");
        var customerObjectStore = db.transaction("books", "readwrite").objectStore("books");
        bookData.forEach(function (book) {
            customerObjectStore.add(book);
        });
    };

};

function deleteData(item) {
    var request = db.transaction(["books"], "readwrite")
        .objectStore("books")
        .delete(item);
    request.onsuccess = function (event) {
        alert("data deleted");
    };
    request.onerror = function (event) {
        alert("data is not available in database");
    }
}

function deleteCartData(item) {
    var request = db.transaction(["cart"], "readwrite")
        .objectStore("cart")
        .delete(item);
    request.onsuccess = function (event) {
        alert("item removed from cart");
    };
    request.onerror = function (event) {
        alert("data is not available in database");
    }
}

function addData(item) {
    var transaction = db.transaction(["books"], "readwrite");
    var objectStore = transaction.objectStore("books");
    item.forEach(function (book) {
        var request = objectStore.add(book);
        request.onsuccess = function (event) {
            console.log("new data stored successfully");
        };
    });
}

function ProductaddToCart(item) {
    var transaction = db.transaction(["cart"], "readwrite");
    var objectStore = transaction.objectStore("cart");
    item.forEach(function (book) {
        var request = objectStore.add(book);
        request.onsuccess = function (event) {
            alert("item added in cart");
        };
    });
}

function updateData(item, index) {
    var transaction = db.transaction(["books"], "readwrite");
    var objectStore = transaction.objectStore("books");
    item.forEach(function (book) {
        console.log("item in loop:", book)
        var request = objectStore.put(book);
        request.onsuccess = function (event) {
            alert("new data updated successfully");
        };
    });
}


function viewProducts() {

    let item = document.getElementsByClassName("inventoryTable")[0];
    let item2 = document.getElementsByClassName("AddNewButton")[0];
    let item3 = document.getElementsByClassName("AddNewButton")[1];

    if (item !== undefined || item2 !== undefined || item3 !== undefined) {
        item.parentNode.removeChild(item);
        item2.parentNode.removeChild(item2);
        item3.parentNode.removeChild(item3);
    } else {

        var transaction = db.transaction(["books"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            console.log("Transaction not opened due to error: " + transaction.error);
        };

        var objectStore = transaction.objectStore("books");
        var objectStoreRequest = objectStore.getAll();
        objectStoreRequest.onsuccess = function (event) {

            var myRecord = objectStoreRequest.result;
            var data = myRecord;
            var body = document.getElementsByTagName("div")[2];
            var tbl = document.createElement("table");
            tbl.classList.add("productTable");
            tbl.style.marginLeft = "20px";
            tbl.style.marginRight = "20px";
            var tblBody = document.createElement("tbody");
            var row = tbl.insertRow(-1);
            var header = ['BookName', 'AutherName', 'Price', 'Language', 'Action'];
            for (var i = 0; i < 5; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = header[i];
                row.appendChild(headerCell);
            }
            for (var j = 0; j < data.length; j++) {
                var row = document.createElement("tr");
                for (var i = 0; i < 4; i++) {
                    var cell = document.createElement("td");
                    if (i == 0) {
                        var cellText = document.createTextNode(data[j].name);
                    } else if (i == 1) {
                        var cellText = document.createTextNode(data[j].autherName);
                    } else if (i == 2) {
                        var cellText = document.createTextNode(data[j].price);
                    } else if (i == 3) {
                        var cellText = document.createTextNode(data[j].language);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                var button = document.createElement("button");
                button.innerHTML = "Add to Cart";
                button.id = [j];
                button.style.margin = "10px";
                var cartArr = [];
                button.addEventListener("click", function (e) {
                    cartArr.push(data[e.target.id]);
                    console.log("cart array:", cartArr);
                    let elementNO = e.target.id;
                    ProductaddToCart(cartArr);
                });
                row.appendChild(button);
                tblBody.appendChild(row);
            }
            tbl.appendChild(tblBody);
            body.appendChild(tbl);
            tbl.setAttribute("border", "2");
        }
    }
}


function viewInventory() {

    let item2 = document.querySelectorAll(".cartTable");
    let item3 = document.getElementsByClassName("falseQuantity")[0];
    let item = document.getElementsByClassName("productTable")[0];
    if (item !== undefined) {
        item.parentNode.removeChild(item);
    } else if (item2.length !== 0) {
        for (const elem of item2) {
            elem.remove();
        }
    } else if (item3 !== undefined) {
        item3.parentNode.removeChild(item3);
    } else {

        var transaction = db.transaction(["books"], "readwrite");

        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            console.log("Transaction not opened due to error: " + transaction.error);
        };
        var objectStore = transaction.objectStore("books");

        var objectStoreRequest = objectStore.getAll();

        objectStoreRequest.onsuccess = function (event) {
            console.log("request successful in viewInventory");
            var myRecord = objectStoreRequest.result;
            console.log("all books data in viewInventory:", myRecord);
            var data = myRecord;

            var body = document.getElementsByTagName("div")[2];
            var tbl = document.createElement("table");
            tbl.classList.add("inventoryTable");
            tbl.style.marginLeft = "20px";
            tbl.style.marginRight = "20px";
            var tblBody = document.createElement("tbody");
            var row = tbl.insertRow(-1);
            var header = ['BookName', 'AutherName', 'Price', 'Language', 'Action'];
            for (var i = 0; i < 5; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = header[i];
                row.appendChild(headerCell);
            }
            for (var j = 0; j < data.length; j++) {
                var row = document.createElement("tr");
                for (var i = 0; i < 4; i++) {
                    var cell = document.createElement("td");
                    if (i == 0) {
                        var cellText = document.createTextNode(data[j].name);
                    } else if (i == 1) {
                        var cellText = document.createTextNode(data[j].autherName);
                    } else if (i == 2) {
                        var cellText = document.createTextNode(data[j].price);
                    } else if (i == 3) {
                        var cellText = document.createTextNode(data[j].language);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                var button = document.createElement("button");
                button.innerHTML = "Add New Book";
                button.id = [j];
                button.classList.add("AddNewButton");
                button.style.marginLeft = "219px";
                button.style.marginBottom = "10px";
                button.addEventListener("click", function (e) {
                    var targetButton = e.target.id;
                    console.log("target id from table:", e.target.id);
                    var parentTargetId = e.target.id;
                    var idP = document.createElement("p");
                    idP.style.display = "inline-block";
                    var idText = document.createTextNode("id:");
                    idP.appendChild(idText);

                    var id = document.createElement("INPUT");
                    id.setAttribute("id", "idd");
                    id.style.width = '115px';

                    var nameP = document.createElement("p");
                    nameP.style.display = "inline-block";
                    var nameText = document.createTextNode("Name:");
                    nameP.appendChild(nameText);

                    var name = document.createElement("INPUT");
                    name.setAttribute("id", "name");
                    name.style.width = '115px';

                    var authorP = document.createElement("p");
                    authorP.style.display = "inline-block";
                    var authorText = document.createTextNode("authorName:");
                    authorP.appendChild(authorText);

                    var authorName = document.createElement("INPUT");
                    authorName.setAttribute("id", "authorName");
                    authorName.style.width = '115px';

                    var priceP = document.createElement("p");
                    priceP.style.display = "inline-block";
                    var priceText = document.createTextNode("Price:");
                    priceP.appendChild(priceText);

                    var price = document.createElement("INPUT");
                    price.setAttribute("id", "price");
                    price.style.width = '115px';

                    var languageP = document.createElement("p");
                    languageP.style.display = "inline-block";
                    var languageText = document.createTextNode("language:");
                    languageP.appendChild(languageText);

                    var language = document.createElement("INPUT");
                    language.setAttribute("id", "language");
                    language.style.width = '115px';
                    var editBookbutton = document.createElement("button");
                    editBookbutton.innerHTML = "Add Book";
                    editBookbutton.classList.add("bookButton");
                    editBookbutton.style.display = "inline-block";
                    editBookbutton.addEventListener("click", function (e) {
                        let idVal = parseInt(document.getElementById('idd').value);
                        let nameVal = document.getElementById('name').value;
                        let authorVal = document.getElementById('authorName').value;
                        let priceVal = parseInt(document.getElementById('price').value);
                        let langugeVal = document.getElementById('language').value;
                        let allChanges = [{
                            id: idVal,
                            name: nameVal,
                            autherName: authorVal,
                            price: priceVal,
                            language: langugeVal
                        }];
                        addData(allChanges);
                    });

                    idP.appendChild(id);
                    body.appendChild(idP);

                    nameP.appendChild(name);
                    body.appendChild(nameP);

                    authorP.appendChild(authorName);
                    body.appendChild(authorP);

                    priceP.appendChild(price);
                    body.appendChild(priceP);

                    languageP.appendChild(language);

                    body.appendChild(languageP);
                    body.appendChild(editBookbutton);

                });

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "delete";
                deleteButton.classList.add("bookButton");
                deleteButton.style.display = "inline-block";
                deleteButton.id = [j];
                deleteButton.addEventListener("click", function (e) {
                    var targetButton = e.target.id;
                    var item = myRecord[targetButton].id;
                    deleteData(item);
                });

                var updateButton = document.createElement("button");
                updateButton.innerHTML = "update";
                updateButton.classList.add("bookButton");
                updateButton.style.display = "inline-block";
                updateButton.id = [j];
                updateButton.addEventListener("click", function (e) {

                    let targetButton = e.target.id;
                    let currentBookId = data[targetButton].id;
                    let currentBookname = data[targetButton].name;
                    let currentBookauthor = data[targetButton].autherName;
                    let currentBookprice = data[targetButton].price;
                    let currentBooklanguage = data[targetButton].language;

                    let parentTargetId = e.target.id;

                    let nameP = document.createElement("p");
                    nameP.style.display = "inline-block";
                    let nameText = document.createTextNode("Name:");
                    nameP.appendChild(nameText);

                    let name = document.createElement("INPUT");
                    name.setAttribute("id", "name");
                    name.value = currentBookname;
                    name.style.width = '115px';

                    let authorP = document.createElement("p");
                    authorP.style.display = "inline-block";
                    let authorText = document.createTextNode("authorName:");
                    authorP.appendChild(authorText);

                    let authorName = document.createElement("INPUT");
                    authorName.setAttribute("id", "authorName");
                    authorName.value = currentBookauthor;
                    authorName.style.width = '115px';

                    let priceP = document.createElement("p");
                    priceP.style.display = "inline-block";
                    let priceText = document.createTextNode("Price:");
                    priceP.appendChild(priceText);

                    let price = document.createElement("INPUT");
                    price.setAttribute("id", "price");
                    price.value = currentBookprice;
                    price.style.width = '115px';

                    let languageP = document.createElement("p");
                    languageP.style.display = "inline-block";
                    let languageText = document.createTextNode("language:");
                    languageP.appendChild(languageText);

                    let language = document.createElement("INPUT");
                    language.setAttribute("id", "language");
                    language.style.width = '115px';
                    language.value = currentBooklanguage;

                    let updateBookbutton = document.createElement("button");
                    updateBookbutton.innerHTML = "Update Book";
                    updateBookbutton.classList.add("bookButton");
                    updateBookbutton.style.display = "inline-block";
                    updateBookbutton.id = [j];
                    updateBookbutton.addEventListener("click", function (e) {
                        console.log("update button index:", targetButton);
                        let nameVal = document.getElementById('name').value;
                        let authorVal = document.getElementById('authorName').value;
                        let priceVal = parseInt(document.getElementById('price').value);
                        let langugeVal = document.getElementById('language').value;
                        let allChanges = [{
                            id: currentBookId,
                            name: nameVal,
                            autherName: authorVal,
                            price: priceVal,
                            language: langugeVal
                        }];
                        updateData(allChanges, targetButton);
                    });

                    nameP.appendChild(name);
                    body.appendChild(nameP);

                    authorP.appendChild(authorName);
                    body.appendChild(authorP);

                    priceP.appendChild(price);
                    body.appendChild(priceP);

                    languageP.appendChild(language);

                    body.appendChild(languageP);
                    body.appendChild(updateBookbutton);
                });

                row.appendChild(updateButton);
                row.appendChild(deleteButton);
                tblBody.appendChild(row);
            }

            tbl.appendChild(tblBody);
            body.appendChild(button);
            body.appendChild(tbl);
            tbl.setAttribute("border", "2");

        }
    }
}

function addToCart() {

    let item = document.getElementsByClassName("productTable")[0];
    let item2 = document.getElementsByClassName("inventoryTable")[0];
    let item3 = document.getElementsByClassName("AddNewButton")[0];
    let item4 = document.getElementsByClassName("AddNewButton")[1];
    if (item !== undefined) {
        item.parentNode.removeChild(item);
        item2.parentNode.removeChild(item2);
        item3.parentNode.removeChild(item3);
        item4.parentNode.removeChild(item4);
    }
    // else if (item2 !== undefined || item3!==undefined) {
    //     item2.parentNode.removeChild(item2);
    //     item3.parentNode.removeChild(item3);
    // }
    else {
        var transaction = db.transaction(["cart"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            console.log("Transaction not opened due to error: " + transaction.error);
        };

        var objectStore = transaction.objectStore("cart");
        var objectStoreRequest = objectStore.getAll();
        objectStoreRequest.onsuccess = function (event) {

            var myRecord = objectStoreRequest.result;
            console.log("all cart data in cart function", myRecord);
            var data = myRecord;

            var body = document.getElementsByTagName("div")[2];
            var tbl = document.createElement("table");
            tbl.classList.add("cartTable");
            tbl.style.marginLeft = "20px";
            tbl.style.marginRight = "20px";
            var tblBody = document.createElement("tbody");
            var row = tbl.insertRow(-1);
            var header = ['BookName', 'AutherName', 'Price', 'Language', 'Action'];

            for (var i = 0; i < 5; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = header[i];
                row.appendChild(headerCell);
            }
            for (var j = 0; j < myRecord.length; j++) {
                console.log("cartdetails.length:", myRecord.length);
                var row = document.createElement("tr");
                for (var i = 0; i < 4; i++) {
                    var cell = document.createElement("td");
                    if (i == 0) {
                        var cellText = document.createTextNode(myRecord[j].name);
                    } else if (i == 1) {
                        var cellText = document.createTextNode(myRecord[j].autherName);
                    } else if (i == 2) {
                        var cellText = document.createTextNode(myRecord[j].price);
                    } else if (i == 3) {
                        var cellText = document.createTextNode(myRecord[j].language);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                var button = document.createElement("button");
                button.innerHTML = "edit quantity";
                button.style.margin = "10px";
                button.id = [j];
                var removed = document.createElement("button");
                removed.innerHTML = "delete";
                removed.id = [j];
                var quantityArr = [];
                button.addEventListener("click", function (e) {
                    var cartbuttonNo = e.target.id;
                    var quantity = prompt("Please enter quantity");
                    if (quantity == null) {
                        quantityArr.push({
                            buttonNo: myRecord[cartbuttonNo].id,
                            quantityVal: parseInt(0)
                        })
                    } else {
                        quantityArr.push({
                            buttonNo: myRecord[cartbuttonNo].id,
                            quantityVal: parseInt(quantity)
                        })
                        if (quantity !== 0) {
                            ammountwithquantity(quantityArr);
                        } else {
                            ammount(0);
                        }
                    }
                });

                removed.addEventListener("click", function (e) {
                    deleteButton = e.target.id;
                    let itemno = myRecord[deleteButton].id;
                    deleteCartData(itemno);
                    ammount(0);
                });
                row.appendChild(button);
                row.appendChild(removed);
                tblBody.appendChild(row);
            }
            tbl.appendChild(tblBody);
            body.appendChild(tbl);
            tbl.setAttribute("border", "2");
            ammount(0);
        }

    }

    var totalCartAmmount = 0;

    function ammountwithquantity(quantityArr) {
        console.log("quantity arr:", quantityArr);
        var transaction = db.transaction(["cart"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            console.log("Transaction not opened due to error: " + transaction.error);
        };

        var objectStore = transaction.objectStore("cart");
        var objectStoreRequest = objectStore.getAll();
        objectStoreRequest.onsuccess = function (event) {
            let myRecord = objectStoreRequest.result;
            var data = myRecord;
            for (let j = 0; j < quantityArr.length; j++) {
                for (let i = 0; i < myRecord.length; i++) {
                    if (quantityArr[j]['buttonNo'] == myRecord[i].id) {
                        totalCartAmmount += quantityArr[j]['quantityVal'] * myRecord[i].price;
                    } else {
                        totalCartAmmount += 0 + myRecord[i].price;
                    }
                }
            }
            console.log("total cart ammount in ammountwithquantity:", totalCartAmmount);
            document.getElementsByClassName("falseQuantity")[0].innerHTML = "Total Ammount:" + totalCartAmmount;
        }
    }
}

function ammount(quantity) {
    var transaction = db.transaction(["cart"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log('Transaction completed.');
    };
    transaction.onerror = function (event) {
        console.log("Transaction not opened due to error: " + transaction.error);
    };

    var objectStore = transaction.objectStore("cart");
    var objectStoreRequest = objectStore.getAll();
    objectStoreRequest.onsuccess = function (event) {

        let myRecord = objectStoreRequest.result;
        var data = myRecord;
        if (quantity !== 0) {
            var body = document.getElementsByTagName("div")[2];
            var checkout = document.createElement("H1");
            let totalAmmount = 0;
            for (let i = 0; i < myRecord.length; i++) {
                totalAmmount += quantity * myRecord[i].price;
            }
            checkout.innerHTML = "Total Ammount:" + totalAmmount;
            checkout.classList.add("totalAmmount");
            checkout.style.marginLeft = "315px";
            checkout.classList.add("trueQuantity");
            var button = document.createElement("button");
            button.innerHTML = "Checkout";
            button.classList.add("trueQuantity");
            button.style.marginLeft = "365px";

            button.classList.add("cartTable");
            body.appendChild(checkout);
            body.appendChild(button);
            let item1 = document.getElementsByClassName("falseQuantity")[0];
            let item2 = document.getElementsByClassName("falseQuantity")[1];
            item1.parentNode.removeChild(item1);
            item2.parentNode.removeChild(item2);
        } else {
            var body = document.getElementsByTagName("div")[2];
            var checkout = document.createElement("H1");
            let total = 0;
            for (var elem of myRecord) {
                console.log("elem:", elem.price == "");
                if (elem.price == "") {
                    total += parseInt(0);
                } else {
                    total += parseInt(elem.price);
                }
            }
            checkout.innerHTML = "Total Ammount:" + total;
            checkout.style.marginLeft = "315px";
            checkout.classList.add("falseQuantity");
            var button = document.createElement("button");
            button.innerHTML = "Checkout";
            button.classList.add("falseQuantity");
            button.style.marginLeft = "365px";
            button.addEventListener("click", function (e) {
                window.print()
            });
            body.appendChild(checkout);
            body.appendChild(button);
        }
    }
}