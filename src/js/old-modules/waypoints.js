/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

  || Usage ||
  Add class inview to element, and it will toggle the class opaque off upon entry to viewport

=======
*/

+function($, Site) {
  Site.site = Site.site || {};
  _this = Site.site;
  var Waypoints = function(){
    this.introSlide = _this.__bind(this.introSlide, this);
    this.navScroll = _this.__bind(this.navScroll, this);
    this.subTitle = _this.__bind(this.subTitle, this);
    this.viewable = _this.__bind(this.viewable, this);
    this.init = _this.__bind(this.init, this);
    this.elements = {
        viewable        : $('.inview')
    }
  }

Waypoints.prototype.viewable = function(e){
  var elements = this.elements.viewable;
  elements.addClass('opaque');

  var fadein = function(name){
    $name = $(name);
    $name.removeClass('opaque');
    console.log('fading in');
    $name.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
      $name.removeClass('opaque');
    });
  }
  // Different offset depending on direction
  elements.waypoint(function(direction) {
    if (direction === 'down') {
      fadein(this.element);
    }
  }, {
    offset: '-30%'
  });

}

Waypoints.prototype.init = function(e){
  // Site.site.utils.classToElem(this); // Make Elements from Classes
  this.viewable();
  var mqTablet = window.matchMedia( "( min-width: 620px )");
  if (mqTablet.matches){
    // this.introSlide();
    // this.navScroll();
  }
}

 // Instantiation
 _this.waypoints = new Waypoints(); // attach waypoints to global
 _this.waypoints.init();
}(jQuery, window.Site = window.Site || {});