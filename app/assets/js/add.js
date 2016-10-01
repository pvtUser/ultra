app.currentModule = (function($){
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для добавления записи");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }
            
            callback();
        }
    }
})(jQuery);


/*
(function(){
    //console.log('yep');
    
    $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/category',
        headers: {"application-id" : "14469D9E-0DF1-09B9-FF27-2739263FE500", "secret-key" : "2EA4DAF8-A0D4-6A10-FF50-19F884C04800"},
        dataType: 'json',
        beforeSend: function() {},
        success: function(data){
            var option,
                itemData = data.data;
            
            //console.log(data.data);
            
            for(var i = 0; itemData.length > i; i++){
                //console.log(data.data[i]);
                
                option += '<option value="' + itemData[i].objectId + '">' + itemData[i].name + '</option>';
            }
            
            $('#categoryId').html(option);
          
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
        complete: function() {}
        
    });
    
    $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/type',
        headers: {"application-id" : "14469D9E-0DF1-09B9-FF27-2739263FE500", "secret-key" : "2EA4DAF8-A0D4-6A10-FF50-19F884C04800"},
        dataType: 'json',
        beforeSend: function() {},
        success: function(data){
            var option,
                itemData = data.data;
            
            //console.log(data.data);
            
            for(var i = 0; itemData.length > i; i++){
                //console.log(data.data[i]);
                
                option += '<option value="' + itemData[i].objectId + '">' + itemData[i].name + '</option>';
            }
            
            $('#type').html(option);
          
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
        complete: function() {}
        
    });
    
    
})()*/