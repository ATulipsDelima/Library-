let myLibrary = [];
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
    let title = prompt("enter title of the book ");
    let aurthor = prompt("aurthor' name");
    let pages = prompt("num of pages: ")
    let read = prompt("have you read it? ")

    let new_book = new Book (title, aurthor, parseInt(pages), Boolean(read));
    myLibrary.push(new_book)
    console.log(new_book.info())

}

function generateTableHead(table, data){
    let thread = table.createTHead();
    let row = thread.insertRow();

    for(let key of data){
        let th = document.createElement("th");
        let text = document.createTextNode(key)
        th.appendChild(text)
        row.appendChild(th)
    }

}

let dune = new Book('Dune', 'Frank Herbert', 600 , true);
let when_crickets_cry = new Book ('When Crickets Cry', 'Charles Martin', 334, false);
let win_friends = new Book ('How to Win Friend & Influence People', 'Dale Carnegie', 252, false);

myLibrary.push(dune);
myLibrary.push(when_crickets_cry);
myLibrary.push(win_friends);

let table = document.querySelector("table");
let data = Object.keys(myLibrary[0]);
generateTableHead(table, data);