/* global Backendless */
/* global jquery */
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
                    posts,
                    search = window.location.hash.split('?')[1];
                
                if(search){
                
                    var keys_string = '';
          
                    search.split('&').forEach(function(item) {
                    	item = item.split('=');
                    	
                    	//генерируем condition (строку поиска) выглядит #index?categoryId='<objeсtId категории>'
                    	keys_string += item[0] + '.' + ['objectId'] + "=" + "\'" + item[1] + "\'";
                    });
                    
                    console.log(keys_string);
                    
                    posts = Backendless.Persistence.of('poster').find({condition: keys_string});
                    $('#myModal').modal('hide');
                    
                }else{
                    posts = Backendless.Persistence.of('poster').find();
                    
                    console.log(posts);
                }

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

                $(obj).find('#all-news').html(resultHtml);



                

            };

            getPosts();

        }
    }
})(jQuery);