app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для выхода");
            obj = obj || new Object(null);
            /*
            callback = callback || function() {
                return false;
            };*/

            var getMyPosts = function() {

                var resultHtml = '';
                var currentUser = Backendless.UserService.getCurrentUser();
                console.log(currentUser);

                var posts = Backendless.Persistence.of('poster').find();
                for (var i = 0; i < posts.data.length; i++) {
                    if (currentUser['ownerId'] == posts.data[i]['ownerId']) {
                        resultHtml += '<div class="col-md-4 card"><div class="card-block"><h4 class="card-title"><a href="#" data-toggle="modal" data-target="#myModal' + i + '">' +
                            posts.data[i]['title'] +
                            '</a></h4></div><img src="' +
                            posts.data[i]['image'] +
                            '"><div class="card-block"><p class="card-text">Цена: ' +
                            posts.data[i]['price'] +
                            ' руб.</p></div></div>' +
                            '<div class="modal fade" id="myModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Полное описание</h4></div><div class="modal-body">' +
                            posts.data[i]['fullDescription'] +
                            '</div></div></div></div>';
                    }
                }
                $(obj).find('#my-news').html(resultHtml);
            }

            getMyPosts();

            //callback();
        }
    }
})(jQuery);