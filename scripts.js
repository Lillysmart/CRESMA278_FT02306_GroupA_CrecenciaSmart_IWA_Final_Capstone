const matches = books
 const  page = 1;

  import { books } from './data.js';
  import { authors } from './data.js';
 
 
 //console.log (authors)
let range =[
    2, 'hi',6
]

if (!books && Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const fragment = document.createDocumentFragment()
const createPreview = (book)=> {
    const preview = document.createElement('div');
    preview.classList.add('preview')

    const image = document.createElement('img');
    //image.classList.add('preview__image');
  image.src = book.image; 

  
  const info = document.createElement('div');
  //info.classList.add('preview__info');

  const title = document.createElement('h3');
  //title.classList.add('preview__title'); // Add a class to the title element (if needed)
  title.textContent = book.title; // Set the title text

  const author = document.createElement('p');
  author.classList.add('preview__author');
  
  
  //const authorName = authors[books.id]
 // console.log (books.author)
  for (const bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      books[bookId].author = authors[bookId];
    }
  }
  
  //console.log(books); // This will give you books with the author property added
  
  // book.id = (authors.id)
  author.textContent =book.id
  //console.log (author)

  info.appendChild(title);
  info.appendChild(author);
  preview.appendChild(image);
  preview.appendChild(info);

  return preview;
   }
  

   const extracted= books.slice(0, 100)
   for (let i = 0; i < extracted.length; i++) {
   //console.log (extracted)
     const { author, image, title, id }=  extracted[i] 
        const preview = createPreview({
            author,
            id,
            image,
            title
        })
    
        fragment.appendChild(preview)
    }

const searchbar =document.querySelector(".header__icon ")
console.log (searchbar)
   const bookShelf = document.querySelector("[data-list-items]")
    bookShelf.appendChild(fragment)

    //bookShelf.innerHTML = ''
    //fragment = document.createDocumentFragment()
     //extracted= 
/*
    for (let i=1;{ author, image, title, id }=extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }*/

    import { BOOKS_PER_PAGE } from './data.js';

 const headerSettingButton = document.querySelector('[data-header-settings]')
 const dataSettingOverlay = document.querySelector('[data-settings-overlay]')
const openDataSettingsOverlay =()=>{
    dataSettingOverlay.show()}

headerSettingButton.addEventListener("click", openDataSettingsOverlay)

  const closeDatasettingoverlay =() =>{
    dataSettingOverlay.removeAttribute('open');}
  
  const dataSettingsCancel = document.querySelector('[data-settings-cancel]');
 dataSettingsCancel.addEventListener('click', closeDatasettingoverlay)



 const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',}

const dayDarkColor = day.dark 
const dayLightColor= day.light
const nightLightColor= night.light
const nightDarkColor= night.dark 


 console.log (dayDarkColor)
 console.log (nightLightColor)

 
 // Get references to the select element and the root HTML element
const themeSelect = document.querySelector('[data-settings-theme]');
const rootElement = document.documentElement;

// Function to handle theme change
const handleThemeChange = () => {
    const selectedTheme = themeSelect.value;
    
    // Update the CSS variables based on the selected theme
    if (selectedTheme === 'day') {
      rootElement.style.setProperty('--color-light', dayLightColor);
      rootElement.style.setProperty('--color-dark', dayDarkColor);
    } else if (selectedTheme === 'night') {
      rootElement.style.setProperty('--color-light', nightLightColor);
      rootElement.style.setProperty('--color-dark', nightDarkColor);
    }
  };

  const buttons = document.querySelectorAll('.overlay__button_primary');
  const saveButton = buttons[2]

  themeSelect.addEventListener('change',handleThemeChange);
  
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    handleThemeChange();// theme change
    dataSettingOverlay.removeAttribute('open'); 
  };
  console.log (saveButton)
saveButton.addEventListener("click",handleFormSubmit)

// Add an event listener to the theme select element

 const dataSettingForm =document.querySelector('[data-settings-form]')
 console.log (dataSettingForm)

 
 
 /*dataSettingOverlay.submit; {
    //preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
   
}

    //data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
   // v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day';
    

    const showMoreButton= document.querySelector('[data-list-button]')  
  
showMoreButton.innerHTML ='show more'

    //showMoreButton = Show (books.length - BOOKS_PER_PAGE)


    if ((!matches.length - page * BOOKS_PER_PAGE > 0)){
        showMoreButton.disabled=true
    }
    


    /*
    `[
        '<span>Show more</span>',
        '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
    ]`*/
    


   /* 
    genres = document.createDocumentFragment()
    element = document.createElement('option')
    element.value = 'any'
    element = 'All Genres'
    genres.appendChild(element)
    
    for ([id, name]; Object.entries(genres); i++) {
        document.createElement('option')
        element.value = value
        element.innerText = text
        genres.appendChild(element)
    }
    
    data-search-genres.appendChild(genres)
    
    authors = document.createDocumentFragment()
    element = document.createElement('option')
    element.value = 'any'
    element.innerText = 'All Authors'
    authors.appendChild(element)
    
    for ([id, name];Object.entries(authors); id++) {
        document.createElement('option')
        element.value = value
        element = text
        authors.appendChild(element)
    }
    
    data-search-authors.appendChild(authors)
    data-search-cancel.click() { data-search-overlay.open === false }
    
    data-list-close.click() { data-list-active.open === false }
    
    data-header-search.click() {
        data-search-overlay.open === true ;
        data-search-title.focus();
    }
    
    data-search-form.click(filters) {
        preventDefault()
        const formData = new FormData(event.target)
        const filters = Object.fromEntries(formData)
        result = []
    
        for (book; booksList; i++) {
            titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
            authorMatch = filters.author = 'any' || book.author === filters.author
    
            {
                genreMatch = filters.genre = 'any'
                for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
            }
    
            if titleMatch && authorMatch && genreMatch => result.push(book)
        }
    
        if display.length < 1 
        data-list-message.class.add('list__message_show')
        else data-list-message.class.remove('list__message_show')
        
    
        
        data-list-items.appendChild(fragments)
        initial === matches.length - [page * BOOKS_PER_PAGE]
        remaining === hasRemaining ? initial : 0
        data-list-button.disabled = initial > 0/*
    
        data-list-button.innerHTML = /* html */ /*`
            <span>Show more</span>
            <span class="list__remaining"> (${remaining})</span>
        `
    
       /* window.scrollTo({ top: 0, behavior: 'smooth' });
        data-search-overlay.open = false
    
    
    data-list-items.click() {
        pathArray = Array.from(event.path || event.composedPath())
        active;
    
        for (node; pathArray; i++) {
            if active break;
            const previewId = node?.dataset?.preview}
        
            for (const singleBook of books) {
                if (singleBook.id === id) active = singleBook
            } 
        }

        (if !active return)
        data-list-active.open === true
        data-list-blur + data-list-image === active.image
        data-list-title === active.title
        
       {data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
        data-list-description === active.description
    }*/
    