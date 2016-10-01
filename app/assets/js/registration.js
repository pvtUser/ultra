app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для регистрации");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }
            $(document).ready(function() {

                $('#registration_button').on('click', function() {
                    var user = new Backendless.User();
                    user.email = $('#email').val();
                    user.password = $('#password').val();
                    user.name = $('#firstName').val();

                    try {
                        Backendless.UserService.register(user);
                        $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно зарегистрировались!</strong></div>');
                        $('a#login').replaceWith('<a class="nav-link" id="logout" href="#logout">logout</a>');
                    }
                    catch (err) {
                        console.log("error message - " + err.message);
                        console.log("error code - " + err.statusCode);
                        $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Проверьте правильность введенных данных!</strong></div>');
                    }
                });
            });

            callback();
        }
    }
})(jQuery);