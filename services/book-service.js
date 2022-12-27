import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const API_KEY = 'AIzaSyAPZ0iGnif_nDL5PmQ2gyH4JUsUui78X0M'
const BOOK_KEY = 'bookDB'
const GOOGLE_BOOK_KEY = 'googleBookDB'
_createBooks()
getGoogleBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    // addReview,
    // getEmptyReview,
    getDefaultReview,
    saveReview,
    removeReview,
    getNextBookId,
    getPrevBookId,
    getGoogleBooks,
    addGoogleBook,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    // return axios.get(BOOK_KEY, bookId)
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}
function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === 0) idx = books.length
            return books[idx - 1].id
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
        title: '',
        description: utilService.makeLorem(),
        listPrice:
        {
            amount: '',
            currencyCode: 'ILS',
        }
    }
}


//////////REVIEW//////////

function addReview(bookId, review) {
    return storageService.put(BOOK_KEY, book)

}
function getEmptyReview() {
    const date = new Date
    return {
        id: bookId,
        fullName: '',
        rate: 0,
        readAt: date.toLocaleDateString(),
    }
}

function getDefaultReview() {
    return { fullName: '', rating: 0, readAt: '' }
}

function saveReview(bookId, reviewToSave) {
    const books = utilService.loadFromStorage(BOOK_KEY)
    const book = books.find((book) => book.id === bookId)
    const review = _createReview(reviewToSave)
    console.log('review:', review);

    if (!book.reviews) {
        book.reviews = []
    }
    book.reviews.unshift(review)
    utilService.saveToStorage(BOOK_KEY, books)
    return Promise.resolve(review)
}

function removeReview(bookId, reviewId) {
    let books = utilService.loadFromStorage(BOOK_KEY)
    let book = books.find((book) => book.id === bookId)
    const newReviews = book.reviews.filter((review) => review.id !== reviewId)
    book.reviews = newReviews
    utilService.saveToStorage(BOOK_KEY, books)
    return Promise.resolve()
}

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}


//////////REVIEW//////////


function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            {
                "id": "OXeMG8wNskc",
                "title": "metus hendrerit",
                "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
                "authors": [
                    "Barbara Cartland"
                ],
                "publishedDate": 1999,
                "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                "pageCount": 713,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 109,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "JYOJa2NpSCq",
                "title": "morbi",
                "subtitle": "lorem euismod dictumst inceptos mi",
                "authors": [
                    "Barbara Cartland"
                ],
                "publishedDate": 1978,
                "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
                "pageCount": 129,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 44,
                    "currencyCode": "EUR",
                    "isOnSale": true
                }
            },
            {
                "id": "1y0Oqts35DQ",
                "title": "at viverra venenatis",
                "subtitle": "gravida libero facilisis rhoncus urna etiam",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
                "pageCount": 972,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 108,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "kSnfIJyikTP",
                "title": "dictum",
                "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1978,
                "description": "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
                "pageCount": 303,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 30,
                    "currencyCode": "EUR",
                    "isOnSale": true
                }
            },
            {
                "id": "f4iuVmbuKCC",
                "title": "sem himenaeos aptent",
                "subtitle": "interdum per habitasse luctus purus est",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 2011,
                "description": "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
                "pageCount": 337,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 19,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "U2rfZO6oBZf",
                "title": "mi ante posuere",
                "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1978,
                "description": "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
                "pageCount": 748,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/1.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 91,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "xI0wrXaaAcq",
                "title": "non",
                "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
                "pageCount": 65,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 90,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "9laHCEdSpFy",
                "title": "tristique",
                "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
                "pageCount": 299,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/11.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 176,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "nGhVwZvGCGp",
                "title": "urna ornare gravida",
                "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
                "pageCount": 803,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 116,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "Q8Q9Lsd03BD",
                "title": "consequat neque volutpat",
                "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1978,
                "description": "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
                "pageCount": 891,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/5.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 145,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "bd7a76kARao",
                "title": "risus",
                "subtitle": "pretium bibendum pharetra curabitur quisque dictumst",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
                "pageCount": 86,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 157,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            },
            {
                "id": "qKyG0vqeO3e",
                "title": "interdum etiam vulputate",
                "subtitle": "velit sapien eget tincidunt nunc tortor",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
                "pageCount": 882,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/17.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 57,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "2RvT48ZNInj",
                "title": "sagittis justo",
                "subtitle": "etiam primis proin praesent placerat nisi fermentum nisi",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 2011,
                "description": "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
                "pageCount": 598,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/8.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 167,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "5z2s9pDXAYj",
                "title": "quam ullamcorper himenaeos",
                "subtitle": "ut placerat eu dapibus sapien sodales laoreet",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
                "pageCount": 608,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/3.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 150,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "zBZu5cDEWha",
                "title": "quis",
                "subtitle": "suscipit turpis etiam turpis libero lobortis",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
                "pageCount": 583,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/6.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 58,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            },
            {
                "id": "aOI7tQuPZ2f",
                "title": "aliquam aliquet dapibus",
                "subtitle": "neque eu purus euismod placerat adipiscing odio egestas consequat",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
                "pageCount": 497,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/7.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 78,
                    "currencyCode": "USD",
                    "isOnSale": false
                }
            },
            {
                "id": "WBooB82Uvwu",
                "title": "class",
                "subtitle": "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
                "pageCount": 804,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 118,
                    "currencyCode": "ILS",
                    "isOnSale": false
                }
            },
            {
                "id": "xm1z5bbZjlS",
                "title": "vitae",
                "subtitle": "class habitant at commodo semper ligula a bibendum",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1999,
                "description": "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
                "pageCount": 231,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 60,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "u3j6QIKLlJb",
                "title": "rhoncus vivamus",
                "subtitle": "nullam class risus amet senectus scelerisque etiam curabitur",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 1978,
                "description": "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
                "pageCount": 652,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 110,
                    "currencyCode": "USD",
                    "isOnSale": true
                }
            },
            {
                "id": "vxYYYdVlEH3",
                "title": "donec mi ullamcorper",
                "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
                "authors": [
                    "William Shakespeare"
                ],
                "publishedDate": 2011,
                "description": "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
                "pageCount": 904,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 186,
                    "currencyCode": "ILS",
                    "isOnSale": true
                }
            }
        ]
        books.forEach(book => {
            // book.price = book.listPrice.amount
            book.reviews = []
        })
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title) {
    const book = getEmptyBook(title, listPrice.amount)
    book.id = utilService.makeId()
    return book
}

////////STORAGE////////

// function _saveBooksToStorage(books) {
//     utilService.saveToStorage(BOOK_KEY, books)
// }

// function _loadBooksFromStorage() {
//     return utilService.loadFromStorage(BOOK_KEY)
// }

///////////////////////////


function getGoogleBooks() {
    let googlebooks = utilService.loadFromStorage(GOOGLE_BOOK_KEY)
    if (!googlebooks || !googlebooks.length) {
        googlebooks = [
            {
                "kind": "books#volumes",
                "totalItems": 763,
                "items": [
                    {
                        "kind": "books#volume",
                        "id": "zYw3sYFtz9kC",
                        "etag": "Dbzafpdw1Pg",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/zYw3sYFtz9kC",
                        "volumeInfo": {
                            "title": "The Contemporary Thesaurus of Search Terms and Synonyms",
                            "subtitle": "A Guide for Natural Language Computer Searching",
                            "authors": [
                                "Sara D. Knapp"
                            ],
                            "publisher": "Greenwood Publishing Group",
                            "publishedDate": "2000",
                            "description": "Whether your search is limited to a single database or is as expansive as all of cyberspace, you won't find the intended results unless you use the words that work. Now in its second edition, Sara Knapp has updated and expanded this invaluable resource. Unlike any other thesaurus available, this popular guide offers a wealth of natural language options in a convenient, A-to-Z format. It's ideal for helping users find the appropriate word or words for computer searches in the humanities, social sciences, and business. The second edition has added more than 9,000 entries to the first edition's extensive list. Now, the Thesaurus contains almost 21,000 search entries! New or expanded areas include broader coverage of business terms and humanities-including arts literature, philosophy, religion, and music.",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_10",
                                    "identifier": "157356107X"
                                },
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9781573561075"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": true
                            },
                            "pageCount": 718,
                            "printType": "BOOK",
                            "categories": [
                                "Reference"
                            ],
                            "averageRating": 3,
                            "ratingsCount": 1,
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.3.3.0.preview.1",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=zYw3sYFtz9kC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=zYw3sYFtz9kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=zYw3sYFtz9kC&pg=PR21&dq=search+terms&hl=&cd=1&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=zYw3sYFtz9kC&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/The_Contemporary_Thesaurus_of_Search_Ter.html?hl=&id=zYw3sYFtz9kC"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/The_Contemporary_Thesaurus_of_Search_Ter-sample-pdf.acsm?id=zYw3sYFtz9kC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=zYw3sYFtz9kC&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "The searcher needs to be aware of the context from which the <b>search</b> request is derived as well as the context in which the <b>terms</b> will be <b>searched</b> . The broadest and most obvious <b>search</b> context is the database you choose for your <b>search</b>&nbsp;..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "mFT_CgAAQBAJ",
                        "etag": "DjF4JDayVX0",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/mFT_CgAAQBAJ",
                        "volumeInfo": {
                            "title": "Search Terms: Alpha",
                            "authors": [
                                "Travis Hill"
                            ],
                            "publisher": "Travis Hill",
                            "description": "College sophomore Tyler Gallagher loves computers, video games, and Thanksgiving Break. He's timed the arrival of his computer components with the holiday vacation from school to blast aliens and enemy soldiers alike on his brand new, high-end gaming computer. When the parts arrive, it soon becomes apparent that they aren't what he ordered from TechTerritory. Thinking he's the butt of a practical joke, Tyler plays along, and builds the computer with the obviously fake components. His annoyance turns to shock when the computer powers on. His shock turns to a mix of disbelief and wonder when he learns the strange \"quantum\" computer can pull web pages from the near future. Disbelief and wonder soon become fear and uncertainty when he discovers the future might not be so bright. \"Search Terms: Alpha\" is the first half of a new time travel thriller. 52,000 word novel Adult themes / language / mild sexual content",
                            "readingModes": {
                                "text": true,
                                "image": true
                            },
                            "pageCount": 150,
                            "printType": "BOOK",
                            "categories": [
                                "Fiction"
                            ],
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.3.3.0.preview.3",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=mFT_CgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=mFT_CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=mFT_CgAAQBAJ&pg=PT61&dq=search+terms&hl=&cd=2&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=mFT_CgAAQBAJ&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Search_Terms_Alpha.html?hl=&id=mFT_CgAAQBAJ"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": true
                            },
                            "pdf": {
                                "isAvailable": true
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=mFT_CgAAQBAJ&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "Below the logo was the <b>word</b> “Qwerry.” I assumed it was a play on the <b>word</b> “<b>query</b>” and gave it a mental touche. What the hell, I told myself. I didn&#39;t think anything could surprise me, so why worry about an unknown <b>search</b> engine on a&nbsp;..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "DgbhAAAAMAAJ",
                        "etag": "m8jfQG7QL4w",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/DgbhAAAAMAAJ",
                        "volumeInfo": {
                            "title": "Search INFORM.",
                            "publishedDate": "1986",
                            "industryIdentifiers": [
                                {
                                    "type": "OTHER",
                                    "identifier": "UOM:39015014503646"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": false
                            },
                            "pageCount": 362,
                            "printType": "BOOK",
                            "categories": [
                                "ABI/INFORM (Information retrieval system)"
                            ],
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.4.2.0.preview.0",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=DgbhAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=DgbhAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=DgbhAAAAMAAJ&pg=RA1-PP2&dq=search+terms&hl=&cd=3&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=DgbhAAAAMAAJ&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Search_INFORM.html?hl=&id=DgbhAAAAMAAJ"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "NO_PAGES",
                            "embeddable": false,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": false
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=DgbhAAAAMAAJ&hl=&source=gbs_api",
                            "accessViewStatus": "NONE",
                            "quoteSharingAllowed": false
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "SNAjMMp3H5UC",
                        "etag": "gzB7zE9eci8",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/SNAjMMp3H5UC",
                        "volumeInfo": {
                            "title": "Keyword Intelligence",
                            "subtitle": "Keyword Research for Search, Social, and Beyond",
                            "authors": [
                                "Ron Jones"
                            ],
                            "publisher": "John Wiley & Sons",
                            "publishedDate": "2011-10-19",
                            "description": "A unique book on the art and science of keyword research Keyword research can make or break a marketing campaign, an optimization strategy, and pay-per-click ad campaigns. Written by a keyword research expert, this essential resource drills home the importance of targeting the right keywords or phrases in order to get traffic from search engines and social media channels. Author Ron Jones imparts his wisdom and experience for determining which keywords will work based on a searcher's intent and he shows you how to research social, mobile, and video marketing tools that can ultimately become the foundation of a marketing campaign. Boasts detailed how-to information from one of the world's leading keyword research experts Helps you learn how to craft a successful keyword campaign and capture a coveted spot on the first page of a results page Pares down the essential information you need to know to use available tools to get keyword suggestions, forecast web site traffic, perform competitive research, and analyze results Walks you through how to best apply keywords to SEO and PPC campaigns as well as gain visibility with mobile marketing and integrate with traditional marketing efforts Features case studies, examples, tutorials, tips, and previously undocumented techniques No matter your level of experience working with keywords, Keyword Intelligence is the ultimate guide for learning how to best conduct keyword research and craft winning marketing campaigns.",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9781118216910"
                                },
                                {
                                    "type": "ISBN_10",
                                    "identifier": "1118216911"
                                }
                            ],
                            "readingModes": {
                                "text": true,
                                "image": true
                            },
                            "pageCount": 447,
                            "printType": "BOOK",
                            "categories": [
                                "Business & Economics"
                            ],
                            "averageRating": 5,
                            "ratingsCount": 1,
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.7.6.0.preview.3",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=SNAjMMp3H5UC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=SNAjMMp3H5UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=SNAjMMp3H5UC&printsec=frontcover&dq=search+terms&hl=&cd=4&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=SNAjMMp3H5UC&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Keyword_Intelligence.html?hl=&id=SNAjMMp3H5UC"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/Keyword_Intelligence-sample-epub.acsm?id=SNAjMMp3H5UC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "pdf": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/Keyword_Intelligence-sample-pdf.acsm?id=SNAjMMp3H5UC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=SNAjMMp3H5UC&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "This unique, detailed guide to every aspect of keyword research also features case studies, examples, tutorials, tips, and previously undocumented techniques drawn from renowned keyword research expert Ron Jones&#39;s extensive professional ..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "77RZAAAAYAAJ",
                        "etag": "2zlwJBJnTNQ",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/77RZAAAAYAAJ",
                        "volumeInfo": {
                            "title": "Pennsylvania Law Encyclopedia",
                            "publishedDate": "2004",
                            "industryIdentifiers": [
                                {
                                    "type": "OTHER",
                                    "identifier": "PSU:000062618915"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": false
                            },
                            "printType": "BOOK",
                            "categories": [
                                "Law"
                            ],
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.3.2.0.preview.0",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=77RZAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=77RZAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=77RZAAAAYAAJ&q=search+terms&dq=search+terms&hl=&cd=5&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=77RZAAAAYAAJ&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Pennsylvania_Law_Encyclopedia.html?hl=&id=77RZAAAAYAAJ"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "NO_PAGES",
                            "embeddable": false,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": false
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=77RZAAAAYAAJ&hl=&source=gbs_api",
                            "accessViewStatus": "NONE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "<b>SEARCHING</b> As the lexis.com8&quot; computer-assisted legal research service is a full-text database, it allows you to <b>search</b> for virtually any <b>word</b> or combination of <b>words</b>. (The only exceptions are certain &quot;noise <b>words</b>&quot; such as in, on, was,&nbsp;..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "OMOwmLgbMfYC",
                        "etag": "7XYb5Vmc2Mg",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/OMOwmLgbMfYC",
                        "volumeInfo": {
                            "title": "Out's Gay & Lesbian Guide to the Web",
                            "authors": [
                                "J. Harrison Fitch"
                            ],
                            "publisher": "Ziff Davis Press",
                            "publishedDate": "1997",
                            "description": "Describes sites on the World Wide Web of special interest to gay men and lesbians",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_10",
                                    "identifier": "0789710595"
                                },
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9780789710598"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": false
                            },
                            "pageCount": 284,
                            "printType": "BOOK",
                            "categories": [
                                "Social Science"
                            ],
                            "maturityRating": "MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.4.3.0.preview.0",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=OMOwmLgbMfYC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=OMOwmLgbMfYC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=OMOwmLgbMfYC&q=search+terms&dq=search+terms&hl=&cd=6&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=OMOwmLgbMfYC&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Out_s_Gay_Lesbian_Guide_to_the_Web.html?hl=&id=OMOwmLgbMfYC"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "NO_PAGES",
                            "embeddable": false,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": false
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=OMOwmLgbMfYC&hl=&source=gbs_api",
                            "accessViewStatus": "NONE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "<b>Search</b> Options features. Iust keep these simple guidelines in mind: 0 AND <b>searches</b> are possible by selecting the match all <b>terms</b> (AND) option and then entering whatever <b>words</b> you want in the <b>search</b> box. In the above example,&nbsp;..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "T7nuAAAAMAAJ",
                        "etag": "MYH+Y4q0JbY",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/T7nuAAAAMAAJ",
                        "volumeInfo": {
                            "title": "Hands-on Information Literacy Activities",
                            "authors": [
                                "Jane Birks",
                                "Fiona Hunt"
                            ],
                            "publisher": "Neal Schuman Pub",
                            "publishedDate": "2003",
                            "description": "Provides activities designed to help students gain information retrieval skills.",
                            "industryIdentifiers": [
                                {
                                    "type": "OTHER",
                                    "identifier": "UOM:39015056686622"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": false
                            },
                            "pageCount": 135,
                            "printType": "BOOK",
                            "categories": [
                                "Computers"
                            ],
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "1.2.1.0.preview.0",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=T7nuAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=T7nuAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=T7nuAAAAMAAJ&q=search+terms&dq=search+terms&hl=&cd=7&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=T7nuAAAAMAAJ&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Hands_on_Information_Literacy_Activities.html?hl=&id=T7nuAAAAMAAJ"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "NO_PAGES",
                            "embeddable": false,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": false
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=T7nuAAAAMAAJ&hl=&source=gbs_api",
                            "accessViewStatus": "NONE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "(The number should be recorded on the board beside the <b>search term</b>.) c) I am searching for pink AND round. (Write the new search string under the previous one.) d) How many shapes match my <b>search criteria</b>? e) All students with a round&nbsp;..."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "frL0EpijeEMC",
                        "etag": "x/4gk8Fw0YY",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/frL0EpijeEMC",
                        "volumeInfo": {
                            "title": "Web Search: Public Searching of the Web",
                            "authors": [
                                "Amanda Spink",
                                "Bernard J. Jansen"
                            ],
                            "publisher": "Springer Science & Business Media",
                            "publishedDate": "2006-02-21",
                            "description": "This book brings together results from the Web search studies we conducted from 1997 through 2004. The aim of our studies has been twofold: to examine how the public at large searches the Web and to highlight trends in public Web searching. The eight-year period from 1997 to 2004 saw the beginnings and maturity of public Web searching. Commercial Web search engines have come and gone, or endured, through the fall of the dot.com companies. We saw the rise and, in some cases, the demise of several high profile, publicly available Web search engines. The study of the Web search is an exciting and important area of interdisciplinary research. Our book provides a valuable insight into the growth and development of human interaction with Web search engines. In this book, our focus is on the human aspect of the interaction between user and Web search engine. We do not investigate the Web search engines themselves or their constantly changing interfaces, algorithms and features. We focus on exploring the cognitive and user aspects of public Web searching in the aggregate. We use a variety of quantitative and qualitative methods within the overall methodology known as transaction log analysis.",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9781402022692"
                                },
                                {
                                    "type": "ISBN_10",
                                    "identifier": "1402022697"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": true
                            },
                            "pageCount": 199,
                            "printType": "BOOK",
                            "categories": [
                                "Computers"
                            ],
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "preview-1.0.0",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=frL0EpijeEMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=frL0EpijeEMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=frL0EpijeEMC&printsec=frontcover&dq=search+terms&hl=&cd=8&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=frL0EpijeEMC&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Web_Search_Public_Searching_of_the_Web.html?hl=&id=frL0EpijeEMC"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/Web_Search_Public_Searching_of_the_Web-sample-pdf.acsm?id=frL0EpijeEMC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=frL0EpijeEMC&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "This book brings together results from the Web search studies we conducted from 1997 through 2004."
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "Y7JQD8Ihox4C",
                        "etag": "71HPRjjBbWQ",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/Y7JQD8Ihox4C",
                        "volumeInfo": {
                            "title": "Search Engine Optimization For Dummies",
                            "authors": [
                                "Peter Kent"
                            ],
                            "publisher": "John Wiley & Sons",
                            "publishedDate": "2012-07-03",
                            "description": "Increase your online ranking with this beginner guide to SEO! Search engine optimization (SEO) is an integral part of getting a site to rank high in the various search engines in order to attract potential customers. With this new edition of a bestseller, you?ll learn the ins and outs and best practices of successful SEO in order to make your website content more search-engine friendly so that it ranks higher among search engines and draws high-volume traffic. Covers search engine basics to help you get started Introduces new coverage on content marketing and reuse, new tracking tools, platform management, and reputation management Details ways to build search-engine friendly sites, register your site with directories and indexes, and use analysis tools to track results Explains how to use link popularity in order to boost rankings Zeroes in on advertising your site by using pay-per-click options Search Engine Optimization For Dummies, 5th Edition is the fun and friendly place to start learning how to move your site to the top of the rankings.",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9781118396124"
                                },
                                {
                                    "type": "ISBN_10",
                                    "identifier": "111839612X"
                                }
                            ],
                            "readingModes": {
                                "text": true,
                                "image": true
                            },
                            "pageCount": 486,
                            "printType": "BOOK",
                            "categories": [
                                "Computers"
                            ],
                            "averageRating": 5,
                            "ratingsCount": 1,
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": true,
                            "contentVersion": "1.4.4.0.preview.3",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=Y7JQD8Ihox4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=Y7JQD8Ihox4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=Y7JQD8Ihox4C&printsec=frontcover&dq=search+terms&hl=&cd=9&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=Y7JQD8Ihox4C&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/Search_Engine_Optimization_For_Dummies.html?hl=&id=Y7JQD8Ihox4C"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/Search_Engine_Optimization_For_Dummies-sample-epub.acsm?id=Y7JQD8Ihox4C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "pdf": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/Search_Engine_Optimization_For_Dummies-sample-pdf.acsm?id=Y7JQD8Ihox4C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=Y7JQD8Ihox4C&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "Increase your online ranking with this beginner guide to SEO!"
                        }
                    },
                    {
                        "kind": "books#volume",
                        "id": "8WyuDwAAQBAJ",
                        "etag": "/IS3Srf2WpE",
                        "selfLink": "https://www.googleapis.com/books/v1/volumes/8WyuDwAAQBAJ",
                        "volumeInfo": {
                            "title": "The Joy of Search",
                            "subtitle": "A Google Insider's Guide to Going Beyond the Basics",
                            "authors": [
                                "Daniel M. Russell"
                            ],
                            "publisher": "MIT Press",
                            "publishedDate": "2019-09-24",
                            "description": "A Google researcher reveals the art of online searching, offering tips and tricks on how best to use resources like Google and Wikipedia—plus fun facts and fascinating stories We all know how to look up something online by typing words into a search engine. We do this so often that we have made the most famous search engine a verb: we Google it—“Japan population” or “Nobel Peace Prize” or “poison ivy” or whatever we want to know. But knowing how to Google something doesn't make us search experts; there’s much more we can do to access the massive collective knowledge available online. In The Joy of Search, Daniel Russell shows us how to be great online researchers. We don’t have to be computer geeks or a scholar searching out obscure facts; we just need to know some basic methods. Russell demonstrates these methods with step-by-step searches for answers to a series of intriguing questions—from “what is the wrong side of a towel?” to “what is the most likely way you will die?” Along the way, readers will discover essential tools for effective online searches—and learn some fascinating facts and interesting stories. Russell explains how to frame search queries so they will yield information and describes the best ways to use such resources as Google Earth, Google Scholar, Wikipedia, and Wikimedia. He shows when to put search terms in double quotes, how to use the operator (*), why metadata is important, and how to triangulate information from multiple sources. By the end of this engaging journey of discovering, readers will have the definitive answer to why the best online searches involve more than typing a few words into Google.",
                            "industryIdentifiers": [
                                {
                                    "type": "ISBN_13",
                                    "identifier": "9780262042871"
                                },
                                {
                                    "type": "ISBN_10",
                                    "identifier": "0262042878"
                                }
                            ],
                            "readingModes": {
                                "text": false,
                                "image": true
                            },
                            "pageCount": 337,
                            "printType": "BOOK",
                            "categories": [
                                "Computers"
                            ],
                            "averageRating": 5,
                            "ratingsCount": 1,
                            "maturityRating": "NOT_MATURE",
                            "allowAnonLogging": false,
                            "contentVersion": "0.2.1.0.preview.1",
                            "panelizationSummary": {
                                "containsEpubBubbles": false,
                                "containsImageBubbles": false
                            },
                            "imageLinks": {
                                "smallThumbnail": "http://books.google.com/books/content?id=8WyuDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                "thumbnail": "http://books.google.com/books/content?id=8WyuDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                            },
                            "language": "en",
                            "previewLink": "http://books.google.com/books?id=8WyuDwAAQBAJ&printsec=frontcover&dq=search+terms&hl=&cd=10&source=gbs_api",
                            "infoLink": "http://books.google.com/books?id=8WyuDwAAQBAJ&dq=search+terms&hl=&source=gbs_api",
                            "canonicalVolumeLink": "https://books.google.com/books/about/The_Joy_of_Search.html?hl=&id=8WyuDwAAQBAJ"
                        },
                        "saleInfo": {
                            "country": "IL",
                            "saleability": "NOT_FOR_SALE",
                            "isEbook": false
                        },
                        "accessInfo": {
                            "country": "IL",
                            "viewability": "PARTIAL",
                            "embeddable": true,
                            "publicDomain": false,
                            "textToSpeechPermission": "ALLOWED",
                            "epub": {
                                "isAvailable": false
                            },
                            "pdf": {
                                "isAvailable": true,
                                "acsTokenLink": "http://books.google.com/books/download/The_Joy_of_Search-sample-pdf.acsm?id=8WyuDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                            },
                            "webReaderLink": "http://play.google.com/books/reader?id=8WyuDwAAQBAJ&hl=&source=gbs_api",
                            "accessViewStatus": "SAMPLE",
                            "quoteSharingAllowed": false
                        },
                        "searchInfo": {
                            "textSnippet": "But knowing how to Google something doesn&#39;t make us search experts; there’s much more we can do to access the massive collective knowledge available online. In The Joy of Search, Daniel Russell shows us how to be great online researchers."
                        }
                    }
                ]
            }
        ]

        utilService.saveToStorage(GOOGLE_BOOK_KEY, googlebooks)
    }
    return googlebooks
}




function addGoogleBook(item) {
    console.log('item', item);
    const googleBook = {
        id: '',
        title: item.volumeInfo.title ? item.volumeInfo.title : '',
        subtitle: item.volumeInfo.subtitle ? item.volumeInfo.subtitle : '',
        authors: item.volumeInfo.authors ? item.volumeInfo.authors : '',
        publishedDate: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : '',
        description: item.volumeInfo.description ? item.volumeInfo.description : '',
        pageCount: item.volumeInfo.pageCount ? item.volumeInfo.pageCount : '',
        categories: item.volumeInfo.categories ? item.volumeInfo.categories : '',
        thumbnail: item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : '',
        language: item.volumeInfo.language ? item.volumeInfo.language : '',
        'listPrice': {
            amount: '',
            currencyCode: '',
            isOnSale: false
        },
        reviews: []
        
    }
    
    console.log('googleBook:', googleBook)
    return googleBook
}