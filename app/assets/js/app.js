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
