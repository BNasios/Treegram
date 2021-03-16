var CommentsPopup = {
  setup: function() {
    var popupDiv = $('<div id="photoComments"></div>');
    popupDiv.hide().appendTo($('body'));

    // take the most recent photo for each user
    var images = $(".container img").filter("#last_image");
    images.on('click', CommentsPopup.commentsInfo);
  },

  commentsInfo : function() {
    console.log($(this))
    var photoId = String($(this).attr("photoId"));
    var userId = $(this).parent().attr("id");    

    var data = String(userId)+"/"+String(photoId);
    var url = "/users/"+String(userId);

    $.ajax({type: 'GET',
            url: url,
            data:  data,
            timeout: 5000,
            success: CommentsPopup.showPhotoComments,
            error: function(xhrObj, textStatus, exception) { console.log(exception); }
           });
    return(false);
  },

  showPhotoComments: function(data, requestStatus, xhrObject){
    var oneFourth = Math.ceil($(window).width() / 4);
    $('#photoComments').css({'left': oneFourth,'width': 2*oneFourth, 'height':300,'top': 250}).html(data).show().bind(this);
    $('#closeLink').click(CommentsPopup.hidePhotoComments);

    $(function() {postComment.setup();})
  },

  hidePhotoComments: function(){
    console.log("hide");
    $('#photoComments').hide();
    CommentsPopup.setup();
  }


}

$(function() {CommentsPopup.setup()})



