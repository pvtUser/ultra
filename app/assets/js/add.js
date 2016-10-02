app.currentModule = (function($){
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для добавления записи");
            obj = obj || new Object(null);
            
            // я пока еще не понял зачем на callback
            /*
            callback = callback || function() {
                return false;
            }
            callback();*/
        
            var category = Backendless.Persistence.of('category').find();  /*global Backendless*/
            var type     = Backendless.Persistence.of('type').find();
            
            function setHtml(data, container){
                
                var option = '',
                    itemData = data.data;

                for(var i = 0; itemData.length > i; i++){
                    option += '<option value="' + itemData[i].objectId + '">' + itemData[i].name + '</option>';
                }
                
                $(obj).find(container).html(option);
            }
            
            setHtml(category, '#categoryId');
            setHtml(type, '#type');
            
            /*дальше повесить обработчик события отправки формы + валидация + отправка в базу и ответ*/
            
            $(obj).find('#button-add').on('click', function(){
                console.log($(this));
            })
            
        }
    }
})(jQuery);
