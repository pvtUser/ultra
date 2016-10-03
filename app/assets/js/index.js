app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для главной страницы");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            };

            // $(document).ready(function() {
            //     $('.bxslider').bxSlider();
            // });

            // var savedPoster = Backendless.Persistence.of('poster');
            // console.log(savedPoster);
            // var img = Backendless.Persistence.of('poster').findById('B9A75661-CB5A-2EED-FF26-FC60794C9800');
            // console.log(img);

            callback();
        }
    }
})(jQuery);