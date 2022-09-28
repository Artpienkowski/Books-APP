/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/

{
    'use strict';

    const select = {
        templateOf: {
            books: '#template-book',
            filters: '.filters',
        },

        listOf: {
            booklist: '.books-list',
        },

        containerOf: {
            image: '.book__image',
        },

        imageParams: {
            id: '.book-id'
        },

        
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
    };  

    
    /* write a function to render a booklist in HTML .books-list */
    function render(){

        /* make a loop for each book from dataSource.books */
        for(const eachBook of dataSource.books){
            
            /* add const ratingBgc and rangeWidth */
            const ratingBgc =  determineRatingBgc(eachBook.rating);
            eachBook.ratingBgc = ratingBgc;

            const ratingWidth = eachBook.ratingBgc * 10;
            eachBook.ratingWidth = ratingWidth;

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
        
        
        /* make a const with reference to entire list of images */
        const imageListContainer = document.querySelector(select.listOf.booklist);

        /* add event listener to the entire list of images */
        imageListContainer.addEventListener('dblclick', function(event){
            event.preventDefault();

            /* check if offset Parent of the image contains class .book_image) */
            if(event.target.offsetParent.classList.contains('book__image')){

                /* find clickedElement */
                const clickedElement = event.target.offsetParent;

                /* find const with data-id of the image */
                const bookID = clickedElement.getAttribute('data-id');

                if(!favoriteBooks.includes(bookID)){

                /* add favorite to clicked element */
                clickedElement.classList.add('favorite');
                    
                /* push this book to the favorite books array */
                favoriteBooks.push(bookID);

                /* if it's alreayd in the array */
                }else if(favoriteBooks.includes(bookID)){

                    /* remove class favorite */
                    clickedElement.classList.remove('favorite');

                     /* remove bookID from the array */
                    const indexOfBookId = favoriteBooks.indexOf(bookID);
                    favoriteBooks.splice(indexOfBookId, 1);
                }
            }
        });
        
        
        /* make a reference to the filter form */ 
        const filterContainer = document.querySelector(select.templateOf.filters);

        /* add events listener to the form */
        filterContainer.addEventListener('click', function(event){
            /* find const of clickedElement */
            const clickedElement = event.target;

            /* check if it's a checkbox that was clicked in the whole filters container - event.target */
            if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
                
                /* if checked - push it's value to array */
                if(clickedElement.checked){
                    filters.push(clickedElement.value)

                /* if uncheckes - remove from array */
                } else {
                    const indexOfFilterID = filters.indexOf(clickedElement.value);
                    filters.splice(indexOfFilterID, 1);
                }
            }
            console.log(filters);
            filterBooks();
            
        });
    };

    initActions();
    const filters = [];

    function filterBooks(){
        
        /*for every book */
        for(const book of dataSource.books){
            let shouldBeHidden = false;

            /* for every book check if the filter fits the book */
            for(const filter of filters){
                if(!book.details[filter]){
                    shouldBeHidden = true;
                    break;
                }
            }

            /* if the filter fits the book - hide it, if not - make it visible */
            const bookImageID = document.querySelector(select.containerOf.image + '[data-id="' + book.id + '"]');
            if(shouldBeHidden){
                
                bookImageID.classList.add('hidden');
                }else{

                bookImageID.classList.remove('hidden');
            }
        }
    }

    function determineRatingBgc(rating){

        let background = '';
    
        /* prepare backgrounds for different ratings */
        if(rating < 6){
          background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if(rating > 6 && rating <= 8){
          background = 'linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%)';
        } else if(rating > 8 && rating <= 9){
          background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if(rating > 9){
          background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        return background;
      }

    
}