$(function() { 

  var image, imageCounter = 0;
  //take the most recent photo for each user.
  var images = $(".container img").filter("#last_image");
  
  var copy = new Image();
  var firstImage;
  var title;
  var interval;

  function startSlider(obj){
    //firstImage = take most recent image from user.   
    firstImage = $(this);
    
    //title = html item for the current slide show photo title. 
    title = $(this).parent().find("div").find("h3");

    // create an array of the slide images.
    imageCache = [];
    imageCounter = 0;

    // for each photo from user.
    $(this).parent().find("img").each(function() {
      image = new Image();
      image.src = $(this).attr("src");
      image.title = $(this).attr("alt");
      image.photoid = $(this).attr("photoid");
      imageCache[imageCounter] = image;
      imageCounter++;
    });
    imageCounter = 0;

    interval = setInterval(function() {

    imageCounter = (imageCounter + 1) % imageCache.length;
    nextImage = imageCache[imageCounter];

    //update slide show photo.
    firstImage.attr("src", nextImage.src);
    //update slide show photoid. This is used for comments retrieving. 
    firstImage.attr("photoid", nextImage.photoid);
    //update photo title.
    title[0].innerHTML = nextImage.title;
    },1000);
  }

  function stopSlider(){
    //when mouse leaves the slide show area, show the initial photo.
    firstImage.attr("src", imageCache[0].src);
    firstImage.attr("photoid", imageCache[0].photoid);
    title[0].innerHTML = "";
    clearInterval(interval);
  }

  images.on('mouseenter', startSlider).on('mouseleave',stopSlider);
});












