var deletePhoto = {
  
  setup: function() {
    var userImages = $("#last_image").parent().find("img");
    userImages.on('dblclick', deletePhoto.deletePhoto);
  },


  deletePhoto: function(){  
    var photoId = $(this).attr("photoid");
    var userId = $(this).parent().attr("id");

    var url = "/users/"+userId+"/"+"photos"+"/"+photoId;
    console.log(url);

    $.ajax({type: 'DELETE',
            url: url,
            timeout: 5000,
            success: deletePhoto.afterDelete,
            error: function(xhrObj, textStatus, exception) { console.log(exception); }
    });
  },

  afterDelete: function(){
    console.log("all good!!!");
  }

}

$(function() {deletePhoto.setup();})
