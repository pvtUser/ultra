/*global Backendless*/
/*global jQuery*/
/*global app*/
app.currentModule = (function($){
    return {
        init: function(obj) {
            console.log("Инициализируем модуль для добавления записи");
            obj = obj || new Object(null);
            
            var setOptionSelect = function(table, container){
                
                var data = Backendless.Persistence.of(table).find(),
                    option = '',
                    itemData = data.data;

                for(var i = 0; itemData.length > i; i++){
                    option += '<option value="' + itemData[i].objectId + '">' + itemData[i].name + '</option>';
                }
                
                $(obj).find(container).html(option);
            };
            
            setOptionSelect('category', '#categoryId');
            setOptionSelect('type', '#type');
            
            /*дальше повесить обработчик события отправки формы + отправка в базу и ответ*/
            
            var Post = function(args){
                args = args || {};
                this.___class = 'poster';
                this.categoryId = args.categoryId || "";
                this.fullDescription = args.fullDescription || "";
                this.image = args.image || "";
                //this.images = ;
                this.price = args.price ? parseInt(args.price) : 0;
                this.shortDescription = args.shortDescription || "";
                this.special = args.special == "1" ? true : false;
                this.title = args.title || "";
                this.type = args.type || "";
            };
            
            var Category = function(args){
                args = args || {};
                this.___class = 'category';
                this.objectId = args.objectId || "";
            };
            
            var Type = function(args){
                args = args || {};
                this.___class = 'type';
                this.objectId = args.objectId || "";
            };
            
            $(obj).find('#file').on('change', function(evt){
               var file = evt.target.file; // FileList object
               console.log(file);
            });
            
            
            $(obj).find('#uploadFile').on('click', function(){
                
               var callback = {};
             
               callback.success = function(result){
                   alert('Файл успешно загружен!');
                   //alert( "File successfully uploaded. Path to download: " + result.fileURL );
                   
                   $(obj).find('input[name=hiddenfile]').val(result.fileURL);
               }
              
               callback.fault = function(result){
                   alert( "error - " + result.message );
               }
              
               Backendless.Files.upload( file, 'app', true, callback);
            });
            
            $(obj).find('#button-add').on('click', function(){
                
                var _ = $(obj);
                
                var posterObject = new Post({
                    
                    categoryId : new Category({
                        objectId : _.find("#categoryId").val()
                    }),
                    fullDescription : _.find("#fullDescription").val(),
                    image : _.find('#hiddenfile').val(),
                    price : _.find('#price').val(),
                    shortDescription : _.find('#shortDescription').val(),
                    special : _.find('input[name="special"]:checked').val(),
                    title : _.find('#title').val(),
                    type : new Type({
                        objectId : _.find('#type').val()
                    })
                });
                
                try{
                    Backendless.Persistence.of('poster').save(posterObject);
                    $('#output').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Вы успешно добавили объявление!</strong></div>');
                    document.forms['add-news'].reset();
                }catch(err){
                    alert('Что-то не так!');
                }
                
            });
            
        }
    };
})(jQuery);
 