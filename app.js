// Search book 
const searchBook = () => {
    //get search Value 
    const searchBook = document.getElementById('search-book');
    const searchValue = searchBook.value;
    if (searchValue.length === 0) {
        const url = `http://openlibrary.org/search.json?q=facebook`;
        // fetch search data 
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
    } else {
        const url = `http://openlibrary.org/search.json?q=${searchValue}`;
        // fetch search data 
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
    }
    //reset search Value 
    searchBook.value = '';
}

const displayBooks = data => {
        // set total result 
        if (data.length === 0) {
            document.getElementById('not-found').style.display = "block";
            const displayContainer = document.getElementById('books-content');
            displayContainer.textContent = '';
            const totalResult = document.getElementById('total-result');
            totalResult.innerText = '';
        } else {
            const result = data.length;
            const totalResult = document.getElementById('total-result');
            const totalText = `Search Result Total:${result}`;
            totalResult.innerText = totalText;
            //get element 
            const displayContainer = document.getElementById('books-content');
            displayContainer.textContent = '';
            // create elements  
            data.splice(0, 20).forEach(docs => {
                const div = document.createElement('div');
                div.classList.add('col');
                const coverImage = `https://covers.openlibrary.org/b/id/${docs.cover_i}-L.jpg`;
                div.innerHTML = `
                    <div class="card">
                        <img src="${coverImage}" class="card-img-top" alt="${docs.title}">
                        <div class="card-body">
                             <h5 class="card-title title text-info">${docs.title}.</h5>
                             <h5 class="card-title author">Author Name: ${docs.author_name}.</h5>
                             <h5 class="card-text publish">Publisher: ${docs.publisher}.</h5>
                             <h5 class="card-text first-publish">First Publish: ${docs.first_publish_year}.</h5>
                        </div>
                    </div>
                    `;
                displayContainer.appendChild(div);
                document.getElementById('not-found').style.display = "none";
            });
        }

    }
    // call search books
searchBook();