/*
=======
  Utilities function
=======
*/
+function ($, Site) {
  Site.site = Site.site || {};
  _this = Site.site;

  var Utils = function(test){
    this.classToElem = _this.__bind(this.classToElem, this);
  };
  Utils.prototype.classToElem = function(object){
    object.c = object.classes;
    object.t = object.elements;
    var   c  = object.classes,
          t  = object.elements;
           for (var key in c){
              if (c.hasOwnProperty(key)) {
                t.key = key;
                t[key] = $(c[key]);
              }
           }
  }

  _this.utils = new Utils();

}(jQuery, window.Site = window.Site || {});