let myLibrary = [];
 
const toggle = {
    true: false,
    false: true,
};

// get empty table from html
let table = document.querySelector("table");
let add_book = document.querySelector(".add-book")
let form = document.querySelector(".new-book")

// creating buttons for table
let remove = document.createElement("button")
let change = document.createElement("button")
remove.textContent = "remove"
change.textContent = "change"

function Book (title, aurthor, pages, read){
    this.title = title
    this.aurthor = aurthor
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
    if(this.read){
        return this.title + " by " + this.aurthor + ", " + this.pages + " pages, has been read."
    }
    else{
        return this.title + " by " + this.aurthor + ", " + this.pages + " pages, not read yet."
    }
}

function addBookToLibrary() {
    let title = document.querySelector("#title");
    let aurthor = document.querySelector("#aurthor");
    let pages = document.querySelector("#pages");
    let read = document.querySelector("#read");

    let new_book = new Book (title.value, aurthor.value, parseInt(pages.value), (read.value === 'true'));
    // clear input boxes
    title.value = ''
    aurthor.value =''
    pages.value = ''
    read.value = ''

    myLibrary.push(new_book)
    generateRow(table, new_book)
    // rehide form
    form.style.display = "none";

}

//generates table Headers
function generateTableHead(table, data){
    let thread = table.createTHead();
    let row = thread.insertRow();

    for(let key of data){
        let th = document.createElement("th");
        let text = document.createTextNode(key)
        th.appendChild(text)
        row.appendChild(th)
    }
    // add last table header
    let th = document.createElement("th");
    let text = document.createTextNode("change status")
    th.appendChild(text)
    row.appendChild(th)
     th = document.createElement("th");
    text = document.createTextNode("remove")
    th.appendChild(text)
    row.appendChild(th)


}

// generate talble info (aka all books pre-stored in the array)
function generateTable(table, data){
    for (let element of data){
        let row = table.insertRow()
        for(key in element){
            // if value is a function (from prototype) skipp
            if (typeof element[key] === 'function'){continue};
            let cell = row.insertCell()
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
        let remove = document.createElement("button")
        let change = document.createElement("button")
        remove.textContent = "remove"
        change.textContent = "change"
        remove.setAttribute('id', 'remove')
        change.setAttribute('id', 'change')
        let cell1 = row.insertCell()
        let cell2 = row.insertCell()
        cell1.appendChild(change)
        cell2.appendChild(remove)
    }
}

// generates a row for newly added books
function generateRow(table, element){
    let row = table.insertRow()
    for(key in element){
        // if value is a function (from prototype) skipp
        if (typeof element[key] === 'function'){continue};
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text)
    }
        let remove = document.createElement("button");
        let change = document.createElement("button");
        remove.textContent = "remove";
        change.textContent = "change";
        remove.setAttribute('id', 'remove')
        change.setAttribute('id', 'change')
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        cell1.appendChild(change)
        cell2.appendChild(remove)
}



let dune = new Book('Dune', 'Frank Herbert', 600 , true);
let when_crickets_cry = new Book ('When Crickets Cry', 'Charles Martin', 334, false);
let win_friends = new Book ('How to Win Friend & Influence People', 'Dale Carnegie', 252, false);

myLibrary.push(dune);
myLibrary.push(when_crickets_cry);
myLibrary.push(win_friends);



let data = Object.keys(myLibrary[0]);
generateTableHead(table, data);
generateTable(table, myLibrary);

// adding event listners to elements
//unhide form if when add book button is clicked
add_book.addEventListener('click', () =>{
    form.style.display = "flex";
})


table.addEventListener('click', function(e){
    // delete table row and remove rom array
    if(e.target.id === "remove"){
        var i = e.target.parentElement.parentElement.rowIndex
        table.deleteRow(i)
        myLibrary.splice(i -1, 1)
    }
    else if(e.target.id === "change") {
        // get cell to the left of change button
        var cell = e.target.parentElement.previousSibling
        // change toggle content of cell
        cell.textContent = toggle[(cell.textContent == 'true')]
        // update book info
        var i = e.target.parentElement.parentElement.rowIndex -1
        myLibrary[i]["read"] = toggle[myLibrary[i]["read"]]
        
    }
} )