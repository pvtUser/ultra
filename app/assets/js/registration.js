app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для регистрации");
            obj = obj || new Object(null);
            /*
            callback = callback || function() {
                return false;
            }
            callback();*/

            $(obj).find('#registration_button').on('click', function() {
                var user = new Backendless.User();
                user.email = $('#email').val();
                user.password = $('#password').val();
                user.name = $('#firstName').val();

                try {
                    Backendless.UserService.register(user);
                    $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно зарегистрировались!</strong></div>');
                    $('a#login').replaceWith('<a class="nav-link" id="logout" href="#logout">Выйти</a>');
                    $('#add_menu').css('display', '');
                    $('#my_menu').css('display', '');
                    $('#registration_menu').css('display', 'none');
                    document.forms['registration_form'].reset();
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
                        //                        $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно вылогинились!</strong></div>');
                        $('a#logout').replaceWith('<a class="nav-link" id="login" href="#login">Войти</a>');
                        $('#registration_menu').css('display', '');
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
            });
        }
    }
})(jQuery);