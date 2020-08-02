const title = document.querySelector('#title')
const author = document.querySelector('#author')
const ul = document.querySelector('#book-list')


document.querySelector('.button').addEventListener('click', createNewBook)
document.querySelector('#srcBox').addEventListener('keyup', filterBooks)

let books = JSON.parse(localStorage.getItem('books')) || []

// Book class
class Book {
	constructor(title, author) {
		this.title = title
		this.author = author
	}
}

// Create the books
function createNewBook(e) {
	e.preventDefault()

	let titleElement = title.value
	let authorElement = author.value

	if (titleElement === '' || authorElement === '') {
		return 
	} else {
		let newBook = new Book(titleElement, authorElement)
		books.push(newBook)

		renderBooks(newBook)
		saveInStorage()

	}
	

	document.getElementById('title').value = ''
	document.getElementById('author').value = ''
}

// Render the books
function renderBooks(book) {
	ul.innerHTML = ''

	books.forEach((book) => {
		let li = document.createElement('li')
		li.setAttribute('class', 'js-li_class')
		li.innerHTML = `<h2>${book.author} - ${book.title}</h2>`

		let deleteBtn = document.createElement('button')
		deleteBtn.className = 'btn-delete'
		deleteBtn.appendChild(document.createTextNode('X'))
		deleteBtn.setAttribute('onclick', 'deleteBook('+ books.indexOf(book) +')')

		li.appendChild(deleteBtn)

		ul.appendChild(li)	

	})
	

	
}
renderBooks()



// Delete the books
function deleteBook(pos) {
	books.splice(pos, 1)
	renderBooks()
	saveInStorage()
}


// Save the books
function saveInStorage() {
	localStorage.setItem('books', JSON.stringify(books))
}

// Search for books
function filterBooks(event) {
	let textElement = event.target.value.toLowerCase()

	let itemElement = ul.getElementsByTagName('li')

	// Convert to an array
	Array.from(itemElement).forEach((item) => {
		let itemName = item.firstChild.textContent

		// See if it matches
		if (itemName.toLowerCase().indexOf(textElement) != -1) {
			item.style.display = 'block'
		} else {
			item.style.display = 'none'
		}
	})
}
