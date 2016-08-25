/*
=======
  Class Toggler

  Add Class of "toggle" to element, as well as a 'data-toggle' attribvute
  Function will toggle a class of active on the id or class associated with the attribute.
  this is so gross, needs cleaning up
=======
*/

+function($, Site) {
  Site.site = Site.site || {};
  _this = Site.site;
  var tclass = $('.toggle');

  var toggle = function(e){
    var that         = $(e.currentTarget),
        toggleTarget = that.data('toggle'),
        toggleMe     = true,
        className    = 'active';

    if (that.parents('.tabs').length && that.hasClass('active')){ // stop executing if you're clicking yourself and you aren't a toggle
      return;
    } else if (that.parents('.tabs')){
      var container = that.parents('.tabs');
      container.find('.active').removeClass('active');
    }

    if (that.data('classname')){ // if custom Class
      className = that.data('classname');
      $(toggleTarget).removeAttr('id');
      $(toggleTarget).attr('id', className);
    }

    that.toggleClass('active');
    $(toggleTarget).toggleClass(className);

  }
  if (tclass){
     tclass.click(function(e){
      e.preventDefault();
      if($(e.currentTarget).data('overlay') || $(e.currentTarget).hasClass('overlayMask')){
        $('#navigation').toggleClass('active');
        $('#navToggle').toggleClass('active');
        $('.overlayMask').toggleClass('active');
        // toggle(e);
      }else {
          toggle(e);
      }
     });
  }

// Stupid function for swapping shadows
  var iClass = $('.swap-image');
  if (iClass){
    iClass.click(function(e){
      e.preventDefault();
      var that         = $(e.currentTarget),
          toggleTarget = that.data('toggle'),
          srcTarget    = $('#shadow-img'),
          className    = that.data('classname');

          if ($(e.currentTarget).hasClass('active')){
            return;
          }else {
            $('.swap-image.active').removeClass('active');
            $(e.currentTarget).addClass('active');
             if ($(toggleTarget).hasClass(className)){
               var src = $(srcTarget).attr("src").replace("dark-noshadow.png", "dark.png");
               $(toggleTarget).removeClass(className);
               $(srcTarget).attr("src", src);
              } else {
                var src = $(srcTarget).attr("src").replace("dark.png", "dark-noshadow.png");
                console.log(src);
                $(toggleTarget).addClass(className);
                $(srcTarget).attr("src", src);
              }
            }
    });
  }

}(jQuery, window.Site = window.Site || {});