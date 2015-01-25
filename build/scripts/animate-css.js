// Animate css functions
// http://www.telegraphicsinc.com/2013/07/how-to-use-animate-css/
function animationHover(element, animation){
element = $(element);
element.hover(
  function() {
    element.addClass('animated ' + animation);        
  },
  function(){
    //wait for animation to finish before removing classes
    window.setTimeout( function(){
        element.removeClass('animated ' + animation);
    }, 2000);         
  });
}

function animationClick(element, animation){
  element = $(element);
  element.click(
    function() {
      element.addClass('animated ' + animation);        
      //wait for animation to finish before removing classes
      window.setTimeout( function(){
          element.removeClass('animated ' + animation);
      }, 2000);
        
    });
}


// animate.css
$(document).ready(function() {

  $('.mdi-content-add').each(function() {
      animationClick(this, 'rotateIn');
  });

  // $('#saveFor').click(function(){
  //   $('.mdi-content-add').toggleClass('rotate-45');
  // });

}); // end docready

