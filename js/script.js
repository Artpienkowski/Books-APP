/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/

{
    'use strict';

    const select = {
        templateOf: {
            books: '#template-book',
        },

        listOf: {
            booklist: '.books-list',
        },

        containerOf: {
            image: '.book__image',
        },

        imageParams: {
            id: '.book-id'
        }
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
    };  

    
    /* write a function to render a booklist in HTML .books-list */
    function render(){

        /* make a loop for each book from dataSource.books */
        for(const eachBook of dataSource.books){
            
            /* generate HTML for each book based on template */
            const generatedHTML = templates.bookTemplate(eachBook);
            
            /* create element using utils.createElementFromHTML */
            const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
            
            /* find booklist container */
            const bookListContainer = document.querySelector(select.listOf.booklist);
            
            /* add DOM element to the booklist */
            bookListContainer.appendChild(bookDOMElement);
        }
    }

    render();
  
 

    /* write a function initActions to add a book to a favorite list */
    function initActions(){

        /* make an empty array with favorite books */
        const favoriteBooks = [];

        /* make a const with reference to entire image list */
        const imageContainer = document.querySelectorAll(select.containerOf.image);

        /* make loop for every image */
        for(const image of imageContainer){

            /* add event listener to every image */
            image.addEventListener('dblclick', function(event){
                event.preventDefault();

                /* find clickedElement */
                const clickedElement = this;

                /* add favorite to clickedelement */
                clickedElement.classList.add('favorite');

                /* find const with data-id of the image */
                const bookID = clickedElement.getAttribute('data-id');

                /* push this book to the favorite books array */
                favoriteBooks.push(bookID);
        
            });
        }    
    };

    initActions();

    
}