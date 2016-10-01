app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для входа");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            };

            $(document).ready(function() {
                $('#login_button').on('click', function() {
                    var user;
                    var username = $('#login_email').val();
                    var password = $('#login_pass').val();

                    try {
                        user = Backendless.UserService.login(username, password);
                        $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно залогинились!</strong></div>');
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
    };
})(jQuery);