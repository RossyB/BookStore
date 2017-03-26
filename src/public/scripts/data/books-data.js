/* globals  */

const http = window.http;

((scope) => {

    scope.booksdata = {
        getBooks(pageNumber, pageSize) {
            return http.getJSON(`/api/books/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        },
        getBookById(id) {
            debugger;
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