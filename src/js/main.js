(function($){
  Sample.site = Sample.site || {};
  _this = Sample.site;

  _this.__bind = function(fn, me){
    return function(){
      return fn.apply(me, arguments);
    };
  };
})(jQuery, window.Sample = window.Sample || {});
