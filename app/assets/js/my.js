app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для вывода своих записей");
            obj = obj || new Object(null);
            /*
            callback = callback || function() {
                return false;
            };
            callback();*/

            var getMyPosts = function() {

                var resultHtml = '',
                    currentUser = Backendless.UserService.getCurrentUser(),
                    posts = Backendless.Persistence.of('poster').find({condition: "ownerId=" + "\'" + currentUser['ownerId'] + "\'"});
                
                for (var i = 0; i < posts.data.length; i++) {
                    resultHtml += '<div class="col-md-4"><div class="card">';
                    resultHtml += '<div class="card-block"><h5 class="card-title"><a href="#" data-toggle="modal" data-target="#myModal" data-objectid="' + posts.data[i]['objectId'] + '" onclick="app.getItemNews(this)">';
                    resultHtml += posts.data[i]['title'];
                    resultHtml += '</a></h5></div><div class="card-img"><img src="';
                    resultHtml += posts.data[i]['image'];
                    resultHtml += '"><a class="card-text" href="#" data-toggle="modal" data-target="#myModal" data-objectid="' + posts.data[i]['objectId'] + '" onclick="app.getItemNews(this)"><span>' + posts.data[i]['shortDescription'] + '</span></a></div>';
                    resultHtml += '<div class="card-block"><p class="card-text">Цена: ';
                    resultHtml += posts.data[i]['price'] + 'руб.</p></div></div></div>';
                }
                $(obj).find('#my-news').html(resultHtml);
            }

            getMyPosts();
        }
    }
})(jQuery);