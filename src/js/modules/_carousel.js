/*
=======
  Generic Carousel

  Toggles active class on next item. Pairs nicely with carousel.scss

  || HTML structure ||
  .cta-next, .cta-prev  =  Carousel next and previous toggles
  +-- .carousel-wrap
  |   +-- .carousel-item
  |   +-- .carousel-item
  |   +-- .cta-prev
  |   +-- .cta-next

  || Options ||
  Add class Auto to .carousel-wrap to invoke automatic functionality

=======
*/

+function($, Site) {
  Site.site = Site.site || {};
  _this = Site.site;

  var Carousel = function(e){
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
    this.contextClasses  = {
      car        : $(e),
      caritem    : $(e).find('.carousel-item'),
      next       : $(e).find('.cta-next'),
      prev       : $(e).find('.cta-prev')
    }
    this.elements = {};
  }


  Carousel.prototype.setVars = function(e, clicky){
    var c  = this.classes,
        t  = this.elements;
    if (clicky == "true"){
      t.carousel      = $(e.currentTarget).parents(c.car);
      t.prev          = t.carousel.find(c.prev);
      t.next          = t.carousel.find(c.next);
    } else {
      t.carousel      = $(e);
    }
    t.carouselItems = t.carousel.find(c.caritem);
  }

  Carousel.prototype.showPrev = function(e){
    this.elements.prev.addClass('visible');
  }

  Carousel.prototype.cycleClass = function(e, direction, click){
    if (click == "true"){
      e.preventDefault();
      this.setVars(e, click);
      this.showPrev();
    }else {
      this.setVars(e, "false");
    }
    var next,
        t  = this.elements,
        current = t.carousel.find('.carousel-item.active');
    if (direction === "prev"){
      next = current.prev(this.classes.caritem);
      if (next.length == 0) {
        next = t.carouselItems.last(); // Infinate
      }
    } else {
      next    = current.next(this.classes.caritem);
      if (next.length == 0) {
        next = t.carouselItems.first(); // Infinate
      }
    }
    current.removeClass('active');
    next.addClass('active');
  }

  Carousel.prototype.init = function(e){
    var direction, carouselItems,
        direction = "next",
        click     = "true";

    this.elements.car = this.contextClasses.car;

    var __this = this;
    $(this.contextClasses.prev).click(function(e) {
      direction = "prev";
      __this.cycleClass(e, direction, click);
    });
    $(this.contextClasses.next).click(function(e) {
      __this.cycleClass(e, direction, click);
    });
    this.elements.car.each(function(i, e){
      if ($(e).hasClass('auto')){
        click = "false";
        setInterval(function(){__this.cycleClass(e, direction, click)}, 6000);
      }
    });
  }

  // Instantiation
  // this.carousel = new Carousel(); // attach carousel to global
  $('.carousel-wrap').each(function(i, e){
    new Carousel(e).init(e);
  });

}(jQuery, window.Site = window.Site || {});