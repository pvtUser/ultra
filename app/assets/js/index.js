app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для главной страницы");
            obj = obj || new Object(null);

            /*
            callback = callback || function() {
                return false;
            }
            callback();*/

            var getPosts = function() {

                var resultHtml = '',
                    posts = Backendless.Persistence.of('poster').find();

                for (var i = 0; i < posts.data.length; i++) {
                    console.log(posts.data[i]);
                    //                    resultHtml += '<h4>' + posts.data[i]['title'] + '</h4>';
                        resultHtml += '<div class="col-md-4 card"><div class="card-block"><h4 class="card-title">' +
                            posts.data[i]['title'] +
                            '</h4></div><img src="' +
                            posts.data[i]['image'] +
                            '"><div class="card-block"><p class="card-text">Цена: ' +
                            posts.data[i]['price'] +
                            '</p></div><a href="#" data-toggle="modal" data-target="#myModal' + i + '">Показать полное описание</a></div>' +
                            '<div class="modal fade" id="myModal' + i +
                            '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content">' +
                            '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Полное описание</h4></div><div class="modal-body">' + posts.data[i]['fullDescription'] +
                            '</div></div></div></div>';
                    }

                //console.log(resultHtml);

                $(obj).find('#all-news').html(resultHtml);

                /*var search = window.location.search.substr(1),
	            keys = {};
      
                search.split('&').forEach(function(item) {
                	item = item.split('=');
                	keys[item[0]] = item[1];
                });
      
                console.log(Object.keys(keys));*/

            }

            getPosts();

        }
    }
})(jQuery);