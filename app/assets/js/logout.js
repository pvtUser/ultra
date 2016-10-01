app.currentModule = (function($){
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для выхода");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }
            
            callback();
        }
    }
})(jQuery);