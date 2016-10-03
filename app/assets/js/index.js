app.currentModule = (function($){
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для главной страницы");
            obj = obj || new Object(null);
            
            /*
            callback = callback || function() {
                return false;
            }
            callback();*/
            
            var getPosts = function(){
                
                var resultHtml = '',
                    posts = Backendless.Persistence.of('poster').find();
                
                for(var i = 0; i < posts.data.length; i++){
                    console.log(posts.data[i]);
                    resultHtml += '<h4>' + posts.data[i]['title'] + '</h4>';
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