module.exports = function(router){
    // you can add app common logic here
    // router.use(function(req, res, next){
    // });

    // also you can add custom action
    // require /spa/some/hefangshi
    // router.get('/some/:user', router.action('api'));

    // or write action directly
    // router.get('/some/:user', function(req, res){});

    // a restful api example
    // router.route('/book')
    //     // PUT /management/book
    //     .put(router.action('book').put)
    //     // GET /management/book
    //     .get(router.action('book'));
    //
    // router.route('/book/:id')
    //     // GET /management/book/1
    //     .get(router.action('book').get)
    //     // DELETE /management/book/1
    //     .delete(router.action('book').delete);
};
