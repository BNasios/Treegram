var postComment = {

  setup: function() {
    $("#PostComment").on('click', postComment.post);
  },

  post : function(){
    var photoId = $("#comments").attr("photoid");
    var userId = $("#comments").attr("userid");

    var data = $("#area").children().val();
    var url = "/users/"+userId+"/"+"photos"+"/"+photoId+"/"+"comments";

    $.ajax({type: 'POST',
            url: url,
            data:  {data: data},
            timeout: 5000,
            success: postComment.allgood,
            error: function(xhrObj, textStatus, exception) { console.log(exception); }
           });
      return(false);
  },


  allgood : function(data, requestStatus, xhrObject){
    
  }

}



