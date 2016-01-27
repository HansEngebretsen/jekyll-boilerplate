/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

  || Usage ||
  Add class inview to element, and it will toggle the class opaque off upon entry to viewport

=======
*/

(function($, Garmin) {
  Garmin.site = Garmin.site || {};
  _this = Garmin.site;
  var Waypoints = function(){
    this.introSlide = _this.__bind(this.introSlide, this);
    this.navScroll = _this.__bind(this.navScroll, this);
    this.subTitle = _this.__bind(this.subTitle, this);
    this.viewable = _this.__bind(this.viewable, this);
    this.init = _this.__bind(this.init, this);
    this.elements = {
        intro           : $('#intro'),
        content         : $('#maincontent'),
        scrollContainer : $('#scrollContainer'),
        breadcrumbs     : $('.breadcrumbs'),
        subtitle        : $('#subtitle'),
        viewable        : $('.inview'),
        sections        : $('.section')
    }
  }

Waypoints.prototype.introSlide = function(e){
  var content = this.elements.content,
      intro   = this.elements.intro,
      cheight = content.outerHeight();

  content.outerHeight(cheight); // Set Static height on main content
  this.elements.scrollContainer.height(cheight + intro.outerHeight()); // Set height of scrolling element
  content.addClass('is-fixed'); // Fix the content

  var inview = new Waypoint.Inview({
    element: intro,
    enter: function(direction){
      content.addClass('is-fixed');
      intro.removeClass('is-relative');
    },
    exited: function(direction){
      content.removeClass('is-fixed');
      intro.addClass('is-relative');
    }
  })
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


Waypoints.prototype.navScroll = function(e){
  var navigation = $('#navigation');
  var waypointrs = new Waypoint({
    element: navigation,
    handler: function(direction){
      if (direction == 'down' ){
        navigation.removeClass('active');
      } else if (direction == 'up'){
        navigation.addClass('active');
      }
    },
    offset: -20
  })
}

Waypoints.prototype.subTitle = function(e){
  var subtitle = this.elements.subtitle,
      sections = this.elements.sections;
  var bump = function(name){
    subtitle.addClass('bump');
    subtitle.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
      subtitle.removeClass('bump');
      subtitle.html(name);
    });
  }
  var bumpnswap = function(dat){
    var name = $(dat).data('subtitle');
    bump(name);
  }
  bumpnswap(sections); // get the first name on load

  // Different offset depending on direction
  sections.waypoint(function(direction) {
    if (direction === 'down') {
      bumpnswap(this.element);
    }
  }, {
    offset: '-70%'
  });

  sections.waypoint(function(direction) {
    if (direction === 'up') {
     bumpnswap(this.element);
    }
  }, {
    offset: '-130%'
  });

}

Waypoints.prototype.init = function(e){
  this.breadCrumb();
  this.subTitle();
  this.viewable();
  var mqTablet = window.matchMedia( "( min-width: 620px )");
  if (mqTablet.matches){
    this.introSlide();
    this.navScroll();
  }
}

 // Instantiation
 _this.waypoints = new Waypoints(); // attach waypoints to global
 _this.waypoints.init();
})(jQuery, window.Garmin = window.Garmin || {});