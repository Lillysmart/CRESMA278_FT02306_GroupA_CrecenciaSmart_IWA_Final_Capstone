const matches = books;
let page = 1;

import { books } from "./data.js";
import { authors } from "./data.js";
import { BOOKS_PER_PAGE } from "./data.js";
import { genres } from "./data.js";

// check if books exist and that it is an array 
if (!books && Array.isArray(books)) throw new Error("Source required");

/**
 * a fragment to put the books array imported  in 
 */
const fragment = document.createDocumentFragment();

/**
 * create elements and give the elements values/textContent from the books & author,
 * then append the elements to preview(div) and when the preview is clicked open an overlay
 * @param {} book 
 * @returns preview(div),where everything is appended 
 */
const createPreview = (book) => {
  const preview = document.createElement("div");
  preview.classList.add("preview");

  const image = document.createElement("img");
  image.src = book.image;

  const info = document.createElement("div");
 
  const title = document.createElement("h3");
  title.textContent = book.title; // Set the title text

  const author = document.createElement("p");
  author.classList.add("preview__author");
  const authorName = authors[book.author];
  author.textContent = authorName;
  
  const description = document.createElement("p");
  description.classList.add("preview__description");
  description.textContent = book.description;
  description.style.display = "none";

  const published = document.createElement("p");
  published.classList.add("preview__published");
  published.textContent = new Date(book.published).getFullYear();
  published.style.display = "none";

  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(description);
  info.appendChild(published);

  preview.appendChild(image);
  preview.appendChild(info);

  preview.addEventListener("click", () => {
    handlePreview(book);
  });
  return preview;
};

 //take every index in the books array
let extracted = books.slice(0, books.length);
/**
 * loop over extracted ,and take some properties
 *  create a book preview for every book using the createPreview function,
 *  and appends these previews to a fragment. 
 */
for (let i = 0; i < extracted.length; i++) {
  const { author, image, title, id, description, published } = extracted[i];//destructuring
  const preview = createPreview({
    author,
    id,
    image,
    title,
    description,
    published,
  });

  fragment.appendChild(preview);
}

const searchbar = document.querySelector(".header__icon ");
const bookShelf = document.querySelector("[data-list-items]");
bookShelf.appendChild(fragment);


const headerSettingButton = document.querySelector("[data-header-settings]");
const dataSettingOverlay = document.querySelector("[data-settings-overlay]");

const openDataSettingsOverlay = () => {
  dataSettingOverlay.show();
};

headerSettingButton.addEventListener("click", openDataSettingsOverlay);

const closeDatasettingoverlay = () => {
  dataSettingOverlay.removeAttribute("open");
};

const dataSettingsCancel = document.querySelector("[data-settings-cancel]");
dataSettingsCancel.addEventListener("click", closeDatasettingoverlay);

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

const dayDarkColor = day.dark;
const dayLightColor = day.light;
const nightLightColor = night.light;
const nightDarkColor = night.dark;


const themeSelect = document.querySelector("[data-settings-theme]");
const rootElement = document.documentElement;// reference of the root HTML element

// Function to handle theme change
const handleThemeChange = () => {
  const selectedTheme = themeSelect.value;

  // Update the CSS variables based on the selected theme
  if (selectedTheme === "day") {
    rootElement.style.setProperty("--color-light", dayLightColor);
    rootElement.style.setProperty("--color-dark", dayDarkColor);
  } else if (selectedTheme === "night") {
    rootElement.style.setProperty("--color-light", nightLightColor);
    rootElement.style.setProperty("--color-dark", nightDarkColor);
  }
};

const buttons = document.querySelectorAll(".overlay__button_primary");
const saveButton = buttons[2];

themeSelect.addEventListener("change", handleThemeChange);

const handleFormSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission
  handleThemeChange(); // theme change
  dataSettingOverlay.removeAttribute("open");
};
console.log(saveButton);
saveButton.addEventListener("click", handleFormSubmit);

const dataSettingForm = document.querySelector("[data-settings-form]");
console.log(dataSettingForm);

const showMoreButton = document.querySelector("[data-list-button]");

showMoreButton.innerHTML = "show more";


// Adjust the number of books per page 
const totalBooks = matches.length;
let displayedBooks = 0;// number of books currently displayed on the page
/**
 * It calculates the range of books to display on the next page,
 *  creates HTML elements (previews) for those books, and appends them to the bookShelf element.
 *  It also updates the displayedBooks count.
 */
function loadMoreBooks() {
  const nextPageStart = page * BOOKS_PER_PAGE;
  const nextPageEnd = nextPageStart + BOOKS_PER_PAGE;

  const extracted = books.slice(nextPageStart, nextPageEnd);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < extracted.length; i++) {
    const book = extracted[i];
    const preview = createPreview(book);
    fragment.appendChild(preview);
  }

  bookShelf.appendChild(fragment);

  displayedBooks += extracted.length;

  // Calculate the remaining number of books
  const remainingBooks = totalBooks - displayedBooks;

  // Update the "Show More" button text
  if (remainingBooks > 0) {
    showMoreButton.textContent = `Show More (${remainingBooks})`;
  } else {
    showMoreButton.textContent = "No More Books";
    showMoreButton.disabled = true; // Disable the button when no more books are available
  }

  page++;
}

loadMoreBooks();

showMoreButton.addEventListener("click", loadMoreBooks);

console.log(page);
const dataListActive = document.querySelector("[data-list-active]");
console.log(dataListActive);

const overlayPreview = document.querySelector(".overlay__preview");
let dataListImage = document.querySelector("[data-list-image ]");
console.log(dataListImage);

const datalistTitle = document.querySelector("[data-list-title]");
const dataListDesciption = document.querySelector("[data-list-description]");
const dataListSubtitle = document.querySelector("[data-list-subtitle]");

const handlePreview = (book) => {
  dataListActive.show();

  datalistTitle.textContent = book.title;
  dataListImage.src = book.image;
  dataListDesciption.textContent = book.description;

  const authorName =
    authors && authors[book.author] ? authors[book.author] : book.author;

  dataListSubtitle.textContent = `${authorName} (${new Date(
    book.published
  ).getFullYear()})`;
  console.log(dataListSubtitle);
  //document.body.appendChild(dataListActive);
};

const previews = document.querySelectorAll(".preview");
/**
 * iterates over each book preview element in the previews NodeList 
 * and adds a click event listener to each one.
 */
previews.forEach((bookElement) => {
  bookElement.addEventListener("click", () => {
    const book = {
      image: bookElement.querySelector("img").src,
      title: bookElement.querySelector("h3").textContent,
      description: bookElement.querySelector(".preview__description")
        .textContent,
      published: bookElement.querySelector(".preview__published").textContent,
      author: bookElement.querySelector(".preview__author").textContent,
    };
    handlePreview(book);
  });
});

const handleClosePreview = () => {
  dataListActive.close();};

const dataListClose = document.querySelector("[data-list-close]");
dataListClose.addEventListener("click", handleClosePreview);

const SearchTopButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const searchTitle = document.querySelector("[data-search-title]");

const SearchTop = document.querySelectorAll(".overlay__button_primary");
const searchSubmitBtn = buttons[1];
console.log(searchSubmitBtn);

const handleSerchButton = (any) => {
  searchOverlay.show();
  //searchTitle.focus()
};

SearchTopButton.addEventListener("click", handleSerchButton);

const searchAuthorsSelect = document.querySelector("[data-search-authors]");
const searchCancelButton = document.querySelector("[data-search-cancel]");
const searchForm = document.querySelector("[data-search-form]");
const searchGenreSelect = document.querySelector("[data-search-genres]");

const placeHolder = document.createElement("option");
placeHolder.textContent = "All Authors";
searchAuthorsSelect.appendChild(placeHolder);

// Create an option for "All Genres"
const allGenresOption = document.createElement("option");
allGenresOption.value = "any";
allGenresOption.textContent = "All Genres";
searchGenreSelect.appendChild(allGenresOption);

// Add genre options from the genres array
for (const genreId in genres) {
  if (genres.hasOwnProperty(genreId)) {
    const genreName = genres[genreId];
    const option = document.createElement("option");
    option.value = genreId;
    option.textContent = genreName;
    searchGenreSelect.appendChild(option);
  }
}

for (const authorId in authors) {
  if (authors.hasOwnProperty(authorId)) {
    const authorName = authors[authorId];
    const option = document.createElement("option");
    option.value = authorName;
    option.textContent = authorName;
    searchAuthorsSelect.appendChild(option);
  }
}

const handlesearchOverlay = () => {
  searchOverlay.style.display = "none";
};
searchCancelButton.addEventListener("click", handlesearchOverlay);

const errorMessage = document.createElement("p");
errorMessage.textContent = "";
bookShelf.appendChild(errorMessage);

const handleSubmit = (event) => {
  console.log("Submit button clicked");
  event.preventDefault();
  const selectedAuthor = searchAuthorsSelect.value.toLowerCase();
  const searchTerm = searchTitle.value.toLowerCase();
  const selectedGenre = searchGenreSelect.value;

  const filteredBooks = books.filter((book) => {
    const authorMatch =
      selectedAuthor === "all authors" || // Check if 'All Authors' is selected

      // Check if the author name contains the selected author
      authors[book.author].toLowerCase().includes(selectedAuthor); 
    const titleMatch = book.title.toLowerCase().includes(searchTerm);

    const genreMatch =
      selectedGenre === "any" ||
      book.genres.some(
        (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    return authorMatch && titleMatch && genreMatch;
  });

  bookShelf.innerHTML = "";
  console.log(filteredBooks);
  if (filteredBooks.length === 0) {
    // If no results are found, display the error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Filter is too narrow. No results found.";
    bookShelf.appendChild(errorMessage);
  } else {
    filteredBooks.forEach((book) => {
      const bookElement = createPreview(book);
      bookShelf.appendChild(bookElement);
    });
  }
  searchOverlay.close();
  showMoreButton.disabled = true;
  showMoreButton.textContent = "Show More";
};
searchSubmitBtn.addEventListener("click", handleSubmit);
console.log(bookShelf);
