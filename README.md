## Book App 

A CRUD application which manages a book entity.

## See it in Action - [Book App](https://yael273.github.io/missBook/)

![miss-book](https://user-images.githubusercontent.com/118633927/226449789-3ed9840e-ea66-4c8b-87ef-02d49999af96.png)

### Features List
- Google books API- using the Google books API to fetch a list of books which match
the search term. We used debounce to minimize API calls.
When adding a book from the Google books API, we use a function that converts the
argument passed to it, from the Google books API format to the format we have
used in our database, and adds it to the application’s book database in local
storage. 
- Reviews- the user can add a review on each book.
-  User messages using the event bus
- Routing 
