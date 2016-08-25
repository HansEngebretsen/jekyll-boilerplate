/*
=======
  Mobile Specific styling and JS

=======
*/


export default class {
  constructor(options){
    this.options = options;
    this.options.mqTablet = window.matchMedia( `( max-width: ${this.options.breakpoint}px)`)
    this.elements = {
      sections: $(this.options.sections)
    }
    this.init();
  }
  init() {
    if (this.options.mqTablet.matches){
     this.ios();
     // if it's mobile, only load 10 yo.
    }
  }

  staticHeights = () => {
    let bodyh = screen.height;
    const toolbar = bodyh - $(window).outerHeight();
    const setHeight = (o) => {
      let h = bodyh;
      o.height(h);
    }
    const setHeight2 = (o) => {
      let h = o.outerHeight();
      o.height(h);
    }
    const setTop = (o) => {
      let t = parseInt(o.css('top')) + toolbar/2;
      o.css("top", t);
    }

    // this is so nasty, fix me
    setHeight($('html'));
    setHeight($('body'));
    setHeight($('.section-wrap'));
    setHeight($('.pattern-wrap'));
    setHeight($('.prod-saying'));

    setHeight2($('.device-container'));
    setHeight2($('.section-title'));

    setTop($('.device-container'));
    setTop($('.section-title'));
    setHeight($('.pattern-container'));
  }
  ios = () => {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS){
      $('html').addClass('ios');
    } else {
          this.staticHeights();

    }
  }
  scroller = () => {
    let pos = {};
    let t = this.elements;
    t.sections.each(function(i){
      let dat = i;
      pos[dat] = this.offsetTop;
      console.log(i);
    });
      let choseSection;
    window.addEventListener("scroll", function(event){
      let curscroll = $(window).scrollTop();
      for(let key in pos){
        if(pos.hasOwnProperty(key)){
          let value = pos[key];
          if ( (value + pos[ 1 ]) >= curscroll && curscroll <= value){
            let l = $(t.sections[ key ]);
            if(!l.hasClass('inview')){
              $(t.sections).filter('.inview').removeClass('inview');
             $(t.sections[ key ]).removeClass('hollow').addClass('inview');
            }
            return;
          }
        }
      }

    });

  }
}
