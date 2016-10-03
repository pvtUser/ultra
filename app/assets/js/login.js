app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для входа");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            };
            //            $(obj).find('#output').remove('.alert');

            $(obj).find('#login_button').on('click', function() {
                console.log($(obj).find('#login_button'));
                var user;
                var username = $('#login_email').val();
                var password = $('#login_pass').val();
                var stayLoggedIn = true;

                try {
                    user = Backendless.UserService.login(username, password, stayLoggedIn);
                    var userObjectId = Backendless.LocalCache.get("current-user-id");
                    console.log(userObjectId);
                    $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно залогинились!</strong></div>');
                    $('a#login').replaceWith('<a class="nav-link" id="logout" href="#logout">Выйти</a>');
                    document.forms['login_form'].reset();
                    $('#add_menu').css('display', '');
                    $('#my_menu').css('display', '');
                    $('#registration_menu').css('display', 'none');
                }
                catch (err) {
                    console.log("error message - " + err.message);
                    console.log("error code - " + err.statusCode);
                    $('#output').prepend('<div class="alert alert-warning alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Проверьте правильность введенных данных!</strong></div>');
                }

                $('#logout').on('click', function() {
                    try {
                        // now log out:
                        Backendless.UserService.logout();
                        console.log("user has been logged out");
                        $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно вылогинились!</strong></div>');
                        $('a#logout').replaceWith('<a class="nav-link" id="login" href="#login">Войти</a>');
                        $('#add_menu').css('display', 'none');
                        $('#my_menu').css('display', 'none');
                        $('#registration_menu').css('display', '');
                    }
                    catch (err) // see more on error handling
                    {
                        // logout failed, to get the error code, call err.statusCode
                        console.log("error message - " + err.message);
                        console.log("error code - " + err.statusCode);
                    }
                });
            });

            callback();
        }
    };
})(jQuery);