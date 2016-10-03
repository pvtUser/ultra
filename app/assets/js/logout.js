app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для выхода");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            };

            $(obj).find('#logout').on('click', function() {
                try {
                    // now log out:
                    Backendless.UserService.logout();
                    console.log("user has been logged out");
                    $('a#logout').replaceWith('<a class="nav-link" id="login" href="#login">Войти</a>');
                    $('#my_menu').css('display', 'none');
                    $('#add_menu').css('display', 'none');
                }
                catch (err) // see more on error handling
                {
                    // logout failed, to get the error code, call err.statusCode
                    console.log("error message - " + err.message);
                    console.log("error code - " + err.statusCode);
                }
            });

            callback();
        }
    }
})(jQuery);