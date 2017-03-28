'use strict';

module.exports = function(data) {
    return {
        getBooks(req, res) {
            // use query parameters for paging
            // it's a good idea to provide default parameters in case of invalid input
            let pageNumber = +req.query.pageNumber || 0,
                pageSize = +req.query.pageSize || 6,
                prop = req.query.prop || 'addedAt',
                arrange = +req.query.arrange || -1;

            console.log(req.query);
            console.log(pageNumber);
            console.log(pageSize);

            // negative page numbers don't make sense
            if (pageNumber < 0) {
                pageNumber = 0;
            }

            // don't allow negative pages
            if (pageSize < 0) {
                pageSize = 6;
            }

            // it's good practice to have an upped bound on page size, otherwise your endpoint might be exploited
            if (pageSize > 50) {
                pageSize = 50;
            }

            data.getPagedBooks(pageNumber, pageSize, prop, arrange)
                .then(books => res.status(200).json(books))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        createBook(req, res) {
            const owner = req.user,
                title = req.body.title,
                author = req.body.author,
                description = req.body.description,
                price = req.body.price,
                bookImageUrl = req.body.bookImageUrl,
                category = req.body.category;

            // if invalid data, respond with meaningful status code and message
            if (!title) {
                res.status(400).json({
                    success: false,
                    message: 'Book must have title!'
                });
                return;
            }
            data.createBook({ title, author, description, price, bookImageUrl, category }, owner)
                .then(dbBook => res.status(201).json({
                    success: true,
                    message: "The book is added",
                    book: dbBook
                }))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        bookById(req, res) {
            // code with middleware
            res.status(200).json(req.data.book);

        },
        updateBook(req, res) {
            const id = req.params.bookId,
                newTitle = req.body.title,
                newAuthor = req.body.author,
                newDescription = req.body.description,
                newBookIsbn = req.body.bookIsbn,
                newRrice = req.body.price,
                newBookImageUrl = req.body.bookImageUrl,
                newCategory = req.body.category;

            data.updateBookById(id, {
                    title: newTitle,
                    author: newAuthor,
                    description: newDescription,
                    bookIsbn: newBookIsbn,
                    price: newRrice,
                    bookImageUrl: newBookImageUrl,
                    category: newCategory
                })
                .then(dbBook => res.status(200).json(dbBook))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        removeBook(req, res) {
            const id = req.params.bookId;

            data.removeBookById(id)
                .then(removedBook => res.status(200).json(removedBook))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        createComment(req, res) {
            const bookId = req.params.bookId,
                content = req.body.content,
                author = req.user;

            data.createCommentForBook(bookId, { content }, author)
                .then(comment => res.status(201).json(comment))
                .catch(error => {
                    console.log(error);
                    res.json(error);
                });
        },
        getCommentsForBook(req, res) {
            // capitalizing on middleware
            res.status(200).json(req.data.book.comments);
        }
    }
}