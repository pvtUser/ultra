/* global Backendless */
/* global jQuery */
var APPLICATION_ID = '14469D9E-0DF1-09B9-FF27-2739263FE500',
    SECRET_KEY = 'CE9AA93B-E443-C9C8-FF9B-348911D65300',
    VERSION = 'v1';

Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var app = (function($, cont) {

    var initialized = false; // флаг, инициализировано наше приложение или нет
    var $window = $(window); // ссылка на объект window, чтобы вызывать постоянно jquery

    var pages = {}; // ассоциативный массив с описаием страниц src - адрес подгружаемого html, js - адрес подгружаемого js, ключ - hash

    var renderState = function() {
        cont.html(app.state.html);
    };

    var changeState = function(e) {
        // записываем текущее состояние в state
        var hash = window.location.hash.split('?')[0];
        
        //console.log(hash);
        app.state = pages[hash];
        
        // вот тут может выдаваться ошибка "Cannot read property 'init' of undefined". 
        // подумайте, почему происходит ошибка и как от этого можно избавиться?
        app.state.module.init(app.state.html);
        renderState();
    };

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
                    async: false,
                    dataType: "html",
                    success: function(html) {
                        pages[href].html = $(html); // подумайте, почему так?
                        $.ajax({
                            url: pages[href].js,
                            method: "GET",
                            async: false,
                            dataType: "script",
                            success: function(js) {
                                pages[href].module = app.currentModule;
                            }
                        });
                    }
                });

                //код для отрисовки меню залогину
                var currentUser = Backendless.UserService.getCurrentUser();
                //console.log(currentUser)
                if (currentUser == null) {
                    $('#add_menu').css('display', 'none');
                    $('#my_menu').css('display', 'none');
                }
                else {
                    $('#add_menu').css('display', '');
                    $('#my_menu').css('display', '');
                    $('#registration_menu').css('display', 'none');
                    $('a#login').replaceWith('<a class="nav-link" id="logout" href="#logout">Выйти</a>');
                    $('#logout').on('click', function() {
                        Backendless.UserService.logout();
                        $('a#logout').replaceWith('<a class="nav-link" id="login" href="#login">Войти</a>');
                        $('#add_menu').css('display', 'none');
                        $('#my_menu').css('display', 'none');
                        $('#registration_menu').css('display', '');
                    });
                }
                //конец кода    

            });

            this.state = {} // текущее состояние
            $window.on('hashchange', changeState);
            window.location.hash = window.location.hash || "#index";
            if (!initialized) {
                $window.trigger('hashchange');
            }
            initialized = true;
            $('[data-toggle="tooltip"]').tooltip();
        },

        debug: function() {
            console.log(pages);
        },
        
        getItemNews: function(objectId){
            var itemNews = Backendless.Persistence.of('poster').findById($(objectId).data('objectid')),
                innerContent = '';
            
            innerContent += '<p>' + itemNews['fullDescription'] + '</p>';
            innerContent += '<p><small>Категория: <a href="#index?categoryId=' + itemNews.categoryId['objectId'] + '">' + itemNews.categoryId['name'] + '</a></small></p>';
            innerContent += '<p><small>Тип объявления: <a href="#index?type=' + itemNews.type['objectId'] + '">' + itemNews.type['name'] + '</a></small></p>';
            
            $('#myModal .modal-title').html(itemNews['title']);
            $('#myModal .modal-body').html(innerContent);
        
        },
        
        deleteItemNews: function(objectId){
            Backendless.Persistence.of('poster').remove($(objectId).data('objectid'));
            window.location.reload();
        }
    }

})(jQuery, $('#app'));

app.init();