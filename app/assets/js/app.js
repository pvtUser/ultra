var APPLICATION_ID = '14469D9E-0DF1-09B9-FF27-2739263FE500',
    SECRET_KEY = 'CE9AA93B-E443-C9C8-FF9B-348911D65300',
    VERSION = 'v1';
    
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
/*
var user = new Backendless.User();
user.email = "james.bond@mi6.co.uk";
user.password = "iAmWatchingU";
 
try
{
  Backendless.UserService.register( user );
}
catch( err )
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}*/



var app = (function($, cont) {

    var initialized = false; // флаг, инициализировано наше приложение или нет
    var $window = $(window); // ссылка на объект window, чтобы вызывать постоянно jquery

    var pages = {}; // ассоциативный массив с описаием страниц src - адрес подгружаемого html, js - адрес подгружаемого js, ключ - hash

    var renderState = function() {
        cont.html(app.state.html);
    }

    var changeState = function(e) {
        // записываем текущее состояние в state
        app.state = pages[window.location.hash];
        // вот тут может выдаваться ошибка "Cannot read property 'init' of undefined". 
        // подумайте, почему происходит ошибка и как от этого можно избавиться?
        app.state.module.init(app.state.html);
        renderState();
    }

    return {
        init: function() {
            $(cont.data('pages')).find('li>a').each(function() {
                var href = $(this).attr("href");

                pages[href] = {
                    src: $(this).data("src"),
                    js: $(this).data("js"),
                };

                $.ajax({
                    url: pages[href].src,
                    method: "GET",
                    dataType: "html",
                    success: function(html) {
                        pages[href].html = $(html); // подумайте, почему так?
                        $.ajax({
                            url: pages[href].js,
                            method: "GET",
                            dataType: "script",
                            success: function(js) {
                                pages[href].module = app.currentModule;
                            }
                        });
                    }
                });
            });
            
            console.log(pages);

            this.state = {} // текущее состояние
            $window.on('hashchange', changeState);
            window.location.hash = window.location.hash || "#index";
            if (!initialized) {
                $window.trigger('hashchange');
            }
            initialized = true;
        },

        debug: function() {
            console.log(pages);
        }
    }

})(jQuery, $('#app'));

app.init();