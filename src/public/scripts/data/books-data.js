/* globals  */

const http = window.http;

((scope) => {

    scope.booksdata = {
        getBooks() {
            return http.getJSON("/api/books");
        },
        getBookById(id) {
            return http.getJSON(`/api/books/${id}`);
        },
        addBook(book) {
            return http.postJSON("/api/books", book);
        },
        addComment(bookId, comment) {
            return http.putJSON("/api/books/" + bookId + "/comments", comment);
        },
    }

})(window)