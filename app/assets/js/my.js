app.currentModule = (function($) {
    return {
        init: function(obj) {
            console.log("Инициализируем модуль для вывода своих записей");
            obj = obj || new Object(null);

            var getMyPosts = function() {

                var resultHtml = '',
                    currentUser = Backendless.UserService.getCurrentUser(),
                    posts = Backendless.Persistence.of('poster').find({condition: "ownerId=" + "\'" + currentUser['ownerId'] + "\'"});
                
                for (var i = 0; i < posts.data.length; i++) {
                    resultHtml += '<div class="col-md-3"><div class="card"><div class="card-block"><h5 class="card-title">';
                    resultHtml += '<a href="#" data-toggle="modal" data-target="#myModal" data-objectid="' + posts.data[i]['objectId'] + '" onclick="app.getItemNews(this)">';
                    resultHtml += posts.data[i]['title'];
                    resultHtml += '</a>';
                    resultHtml += '<button type="button" class="close" data-objectId="' + posts.data[i]['objectId'] + '" onclick="app.deleteItemNews(this)" data-toggle="tooltip" data-placement="top" title="Удалить">&times;</button>';
                    resultHtml += '</h5></div><div class="card-img"><img src="' + posts.data[i]['image'] + '">';
                    resultHtml += '<a class="card-text" href="#" data-toggle="modal" data-target="#myModal" data-objectid="' + posts.data[i]['objectId'] + '" onclick="app.getItemNews(this)"><span>' + posts.data[i]['shortDescription'] + '</span></a></div>';
                    resultHtml += '<div class="card-block"><p class="card-text">Цена: ';
                    resultHtml += posts.data[i]['price'] + 'руб.</p></div></div></div>';
                }
                $(obj).find('#my-news').html(resultHtml);
            }

            getMyPosts();
            
            var deleteNews = function(){
                
            }
            
            $('.close').on('click', function(){
                console.log('123123');
            })
        }
    }
})(jQuery);