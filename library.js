// var books = [{
//         'id': 1,
//         'name': 'Politics of Opportunism',
//         'autherName': 'R P N Singh',
//         'price': 300,
//         'langugae': 'English'
//     },
//     {
//         'id': 2,
//         'name': 'Obama: The Call of History',
//         'autherName': 'Peter Baker',
//         'price': 700,
//         'langugae': 'English'
//     },
//     {
//         'id': 3,
//         'name': 'Mrityunjaya',
//         'autherName': 'Shivaji Sawant',
//         'price': 945,
//         'langugae': 'Marathi'
//     },
//     {
//         'id': 4,
//         'name': 'Musafir',
//         'autherName': 'Achyut Godbole',
//         'price': 1250,
//         'langugae': 'Marathi'
//     },
//     {
//         'id': 5,
//         'name': 'Maharana Pratap',
//         'autherName': 'Kunwar Ishwar Singh Rathore',
//         'price': 495,
//         'langugae': 'Hindi'
//     }
// ]

// localStorage.setItem('books', JSON.stringify(books));
// var cart = [{
//     'id': 1,
//     'name': 'Politics of Opportunism',
//     'autherName': 'R P N Singh',
//     'price': 300,
//     'langugae': 'English'
// }]
// localStorage.setItem('cart', JSON.stringify(cart));
//--**Single Simple Reducer**------------------------------------------------------------------

// var store = Redux.createStore(counter);

// const store = Redux.createStore(rootReducer, composeWithDevTools(
//     applyMiddleware(...middleware)));

// function counter(state = JSON.parse(localStorage.getItem('cart')), action) {
//     if ((state.length == 0) || (typeof state === "undefined")) {
//         return state = [{
//             'id': '',
//             'name': '',
//             'autherName': '',
//             'price': '',
//             'langugae': ''
//         }];
//     } else if (action.type == "cartIncrement") {
//         var newState = Object.assign({}, state, action.item);
//         return newState;

//     } else if (action.type == "cartDecrement") {
//         let newState = [];
//         for (let i = 0; i < state.length; i++) {
//             if (i != action.deleteButton) {
//                 newState.push(state[i])
//             }
//         }
//         return newState;
//     } else {
//         return state;
//     }
// }

//--**using Combined Reducers**---------------------------------------------------------------------------------

var combineReducers = Redux.combineReducers

var rootReducer = combineReducers({
    increment: incrementReducer,
    decrement: decrementReducer
})

var store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var cartArr = [];

function incrementReducer(state = JSON.parse(localStorage.getItem('cart')), action) {
    console.log("state before increment:", state);
    if ((typeof state === "undefined") && (state.length == 0)) {
        return state = [];
    } else if (action.type == "cartIncrement") {
        cartArr = [...state, {
            ...action.item
        }];
        localStorage.setItem('cart', JSON.stringify(cartArr));
        alert("Item Added to the Cart");
        return cartArr;
        // }
    } else {
        return state;
    }
}


function decrementReducer(state = JSON.parse(localStorage.getItem('cart')), action) {
    let newState = []
    let newerstate = [];
    console.log('state before decrement', state);
    if ((typeof state === "undefined") && (state.length == 0)) {
        return state = [];
    } else if (action.type == "cartDecrement") {
        let newState = [...state];
        let deleteButton = parseInt(action.deleteButton);

        newState.forEach(function (item, index) {
            if (index !== deleteButton) {
                newerstate.push(item);
            }
        });

        localStorage.setItem('cart', JSON.stringify(newerstate));
        alert("Item removed from the Cart");
        addToCart();
        ammount(0);
        return newerstate;
    } else {
        return state;
    }
}

function render() {
    var storeState = store.getState();
    console.log("applications initial state:", storeState);
}

render();

store.subscribe(() => console.log("current state:", store.getState()))


//--------------------------------------------------------------------------


var retrievedObject = localStorage.getItem('books');
var data = JSON.parse(retrievedObject)

var inventorySection = document.getElementById("inventry-section");
inventorySection.style.display = "none";

var cartSection = document.getElementById("cart-section");
cartSection.style.display = "none";

var productSection = document.getElementById("product-section");
productSection.style.display = "block";


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
            var cellText = document.createTextNode(data[j].langugae);
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
        store.dispatch({
            type: 'cartIncrement',
            item: data[e.target.id]
        })
    });
    row.appendChild(button);
    tblBody.appendChild(row);
}
tbl.appendChild(tblBody);
body.appendChild(tbl);
tbl.setAttribute("border", "2");



function viewProducts() {
    var retrievedObject = localStorage.getItem('books');
    var data = JSON.parse(retrievedObject);

    var inventorySection = document.getElementById("inventry-section");
    inventorySection.style.display = "none";

    var cartSection = document.getElementById("cart-section");
    cartSection.style.display = "none";

    var productSection = document.getElementById("product-section");
    productSection.style.display = "block";

    if (productSection.style.display === "none") {
        console.log("product is not active");
        var body = document.getElementsByTagName("div")[2];
        console.log("view products", body);
        var tbl = document.createElement("table");
        tbl.classList.add("productTable");
        tbl.style.marginLeft = "20px";
        tbl.style.marginRight = "20px";
        var tblBody = document.createElement("tbody");
        console.log('data length', data.length);

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
                    var cellText = document.createTextNode(data[j].langugae);
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
                store.dispatch({
                    type: 'cartIncrement',
                    item: data[e.target.id]
                })
            });
            row.appendChild(button);
            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);
        body.appendChild(tbl);
        tbl.setAttribute("border", "2");
    }
}

function viewInventory() {

    var cartSection = document.getElementById("cart-section");
    cartSection.style.display = "none";

    var productSection = document.getElementById("product-section");
    productSection.style.display = "none";

    var inventerySection = document.getElementById("inventry-section");

    console.log("inverterysection:", inventerySection);

    if (inventerySection.style.display === "none") {
        inventerySection.style.display = "block";
        var body = document.getElementsByTagName("div")[3];
        console.log('inside invertery body', body);
        var tbl = document.createElement("table");
        tbl.classList.add("inventoryTable");
        tbl.style.marginLeft = "20px";
        tbl.style.marginRight = "20px";
        var tblBody = document.createElement("tbody");
        console.log('data length', data.length);
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
                    var cellText = document.createTextNode(data[j].langugae);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            var button = document.createElement("button");
            button.innerHTML = "edit item";
            button.id = [j];
            button.style.margin = "10px";
            button.addEventListener("click", function (e) {
                var targetButton = e.target.id;
                console.log("target id from table:", e.target.id);

                var currentBookname = data[targetButton].name;
                var currentBookauthor = data[targetButton].autherName;
                var currentBookprice = data[targetButton].price;
                var currentBooklanguage = data[targetButton].langugae;
                console.log("currentBookname", currentBookname);

                var parentTargetId = e.target.id;

                var nameP = document.createElement("p");
                nameP.style.display = "inline-block";
                var nameText = document.createTextNode("Name:");
                nameP.appendChild(nameText);

                var name = document.createElement("INPUT");
                name.setAttribute("id", "name");
                name.value = currentBookname;
                name.style.width = '115px';

                var authorP = document.createElement("p");
                authorP.style.display = "inline-block";
                var authorText = document.createTextNode("authorName:");
                authorP.appendChild(authorText);

                var authorName = document.createElement("INPUT");
                authorName.setAttribute("id", "authorName");
                authorName.value = currentBookauthor;
                authorName.style.width = '115px';

                var priceP = document.createElement("p");
                priceP.style.display = "inline-block";
                var priceText = document.createTextNode("Price:");
                priceP.appendChild(priceText);

                var price = document.createElement("INPUT");
                price.setAttribute("id", "price");
                price.value = currentBookprice;
                price.style.width = '115px';

                var languageP = document.createElement("p");
                languageP.style.display = "inline-block";
                var languageText = document.createTextNode("language:");
                languageP.appendChild(languageText);

                var language = document.createElement("INPUT");
                language.setAttribute("id", "language");
                language.style.width = '115px';
                language.value = currentBooklanguage;

                var editBookbutton = document.createElement("button");
                editBookbutton.innerHTML = "Save Changes";
                editBookbutton.classList.add("bookButton");
                editBookbutton.style.display = "inline-block";
                editBookbutton.addEventListener("click", function (e) {
                    let nameVal = document.getElementById('name').value;
                    let authorVal = document.getElementById('authorName').value;
                    let priceVal = document.getElementById('price').value;
                    let languageVal = document.getElementById('language').value;
                    let allChanges = {
                        'name': nameVal,
                        'autherName': authorVal,
                        'price': priceVal,
                        'langugae': languageVal
                    }

                    console.log("name from book last btm:", allChanges);
                    console.log("your target is:", parentTargetId);

                    var retrievedObjectInventory = localStorage.getItem('books');
                    var outputData = JSON.parse(retrievedObjectInventory)
                    console.log('outputdata', outputData);
                    outputData[parentTargetId] = allChanges;
                    localStorage.setItem('books', JSON.stringify(outputData));
                });

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
            row.appendChild(button);
            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);
        body.appendChild(tbl);
        tbl.setAttribute("border", "2");
    }
}

function addToCart() {

    var inventerySection = document.getElementById("inventry-section");
    inventerySection.style.display = "none";

    var productSection = document.getElementById("product-section");
    productSection.style.display = "none";

    var cartSection = document.getElementById("cart-section");
    cartSection.style.display = "block";


    let getCartObject = localStorage.getItem('cart');
    let cartDetails = JSON.parse(getCartObject);
    // console.log("cart details:", cartDetails);
    if (cartDetails.length == 0) {
        alert("Cart is Empty please add item in cart..");
        cartSection.style.display = "none";
    } else {
        var body = document.getElementsByTagName("div")[4];
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
        for (var j = 0; j < cartDetails.length; j++) {

            var row = document.createElement("tr");
            for (var i = 0; i < 4; i++) {
                var cell = document.createElement("td");
                if (i == 0) {
                    var cellText = document.createTextNode(cartDetails[j].name);
                } else if (i == 1) {
                    var cellText = document.createTextNode(cartDetails[j].autherName);
                } else if (i == 2) {
                    var cellText = document.createTextNode(cartDetails[j].price);
                } else if (i == 3) {
                    var cellText = document.createTextNode(cartDetails[j].langugae);
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
                        buttonNo: cartbuttonNo + 1,
                        quantityVal: parseInt(0)
                    })
                } else {
                    quantityArr.push({
                        buttonNo: cartbuttonNo + 1,
                        quantityVal: parseInt(quantity)
                    })
                }
                if (quantity > 0) {
                    ammountwithquantity(quantityArr);
                } else {
                    ammount(0);
                }
            });
            removed.addEventListener("click", function (e) {
                console.log("inside delete button of cart:", store);
                store.dispatch({
                    type: 'cartDecrement',
                    deleteButton: e.target.id
                })
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

    let getCartDetails = localStorage.getItem('cart');
    let cartDetails = JSON.parse(getCartDetails);

    for (let j = 0; j < quantityArr.length; j++) {
        for (let i = 0; i < cartDetails.length; i++) {
            if (quantityArr[j]['buttonNo'] == cartDetails[i].id) {
                totalCartAmmount += quantityArr[j]['quantityVal'] * parseInt(cartDetails[i].price);
            } else {
                totalCartAmmount += 0 + parseInt(cartDetails[i].price);
            }
        }
    }
    document.getElementsByClassName("falseQuantity")[0].innerHTML = "Total Ammount:" + totalCartAmmount;
}

function ammount(quantity) {

    let getCartObject = localStorage.getItem('cart');
    let cartDetails = JSON.parse(getCartObject);
    var body = document.getElementsByTagName("div")[4];
    let item1 = document.getElementsByClassName("falseQuantity")[0];
    if ((item1 !== null) && (item1 !== undefined)) {
        let total = 0;
        for (var elem of cartDetails) {
            if (elem.price == "") {
                total += parseInt(0);
            } else {
                total += parseInt(elem.price);
            }
        }
        document.getElementsByClassName("falseQuantity")[0].innerHTML = "Total Ammount:" + total;
    } else {
        var checkout = document.createElement("H1");
        let total = 0;
        for (var elem of cartDetails) {
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
            window.print();
        });
        body.appendChild(checkout);
        body.appendChild(button);
    }
}