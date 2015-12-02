/*
=======
  Class Toggler

  Add Class of "toggle" to element, as well as a 'data-toggle' attribvute
  Function will toggle a class of active on the id or class associated with the attribute.
=======
*/

(function($, Sample) {
  Sample.site = Sample.site || {};
  _this = Sample.site;

  var Carousel = function(){
    this.showPrev = _this.__bind(this.showPrev, this);
    this.setVars = _this.__bind(this.setVars, this);
    this.init = _this.__bind(this.init, this);
    this.cycleClass = _this.__bind(this.cycleClass, this);
    this.classes  = {
      car        : '.carousel-wrap',
      caritem    : '.carousel-item',
      next       : '.cta-next',
      prev       : '.cta-prev'
    }
    this.elements = {};
  }


  Carousel.prototype.setVars = function(e){
    var c  = this.classes,
        t  = this.elements;

    t.carousel      = $(e.currentTarget).parents(c.car);
    t.carouselItems = t.carousel.find(c.caritem);
    t.prev          = t.carousel.find(c.prev);
  }

  Carousel.prototype.showPrev = function(e){
    this.elements.prev.addClass('visible');
  }

  Carousel.prototype.cycleClass = function(e, direction){
    e.preventDefault();
    // console.log(e.currentTarget);
    this.setVars(e);
    this.showPrev();

    var next,
        t  = this.elements,
        current = $('.carousel-item.active');

    if (direction === "prev"){
      next = current.prev();
      if (next.length == 0) {
        next = t.carouselItems.last(); // Infinate
      }
    } else {
      next    = current.next();
      if (next.length == 0) {
        next = t.carouselItems.first(); // Infinate
      }
    }
    current.removeClass('active');
    next.addClass('active');
  }

  Carousel.prototype.init = function(e){
    var direction;
    console.log($(this.classes.next));
    var _this = this;
    $(this.classes.prev).click(function(e) {
      direction = "prev";
      _this.cycleClass(e, direction);
    });
    $(this.classes.next).click(function(e) {
      direction = "next";
      _this.cycleClass(e, direction);
    });
  }

  // Instantiation
  _this.carousel = new Carousel(); // attach carousel to global
  if ($('.carousel')){
    _this.carousel.init();
  }

})(jQuery, window.Sample = window.Sample || {});