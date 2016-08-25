export default class {
  constructor(options){
    let t     = this;
    t.options = options;

    t.classes = {
      section    : t.options.section,
      prodInfo   : t.options.prodInfo,
      prodSaying : t.options.prodSaying.selector,
      prodCont   : t.options.prodCont,
      toggle     : t.options.toggle
    }
    t.elements = {
      toggle : $(t.classes.toggle),
      body   : $('body')
    }
    t.init();
  }

  init(){
    // event listener for plus click
    this.elements.toggle.on('click',this.plusClick);
  }

  setClasses = (e) => {
    e.preventDefault();
    let t             = this.elements;
    let o             = this.options;

    t.clicked         = $(e.currentTarget);
    t.section         = t.clicked.parents(o.section);
    t.prodCont        = t.section.find(o.prodCont);
    t.prodSaying      = t.prodCont.find(o.prodSaying.selector);
    t.prodInfo        = t.prodCont.find(o.prodInfo);
    o.device          = t.prodSaying.data('watch');

    t.deviceContainer = t.prodSaying.find(o.prodSaying.deviceContainer);
    t.sectionTitle    = t.prodSaying.find(o.prodSaying.sectionTitle);
    t.pattern         = t.prodCont.find(o.pattern);
  }

  constructPage = () => {
    let t      = this.elements;
    let d      = this.options.data;
    let device = this.options.device;
    let html   = `\
    <div id="prodinfoWrap">
      <div class="prod-info-wrap">
        <h1 class="bigtitle">${d['titles'][device]}</h1>
        <p class="description" id="description">${d['description']}</p>
        <a href="#" class="btn-svg-wrap">
            <svg viewbox="0 0 102 20" class="btn-svg" id="button">
              <defs>
                 <mask id="mask" y="0" width="110" height="50">
                 <rect x="0" y="0" width="110" height="50" class="btn-svg-rectangle"/>
                 <text class="btn-svg-text" text-anchor="middle" x="51" font-size="10" y="12" dy="1">${d['button'][device]}</text>
                </mask>
              </defs>
                <rect width="102" rx="10" class="btn-svg-rectangle" height="20" mask="url(#mask)" />
          </svg>
          </a>
      </div>
      <figure class="${device}-side device-side" id="deviceSide"></figure>
      <a href="#" id="close-page" class="btn-arrowdown">Close</a>
      </div>`;
    t.prodInfo.html(html);
    t.prodInfoWrap = $('#prodinfoWrap');
    t.bigtitle     = t.prodInfoWrap.find('.bigtitle');
    t.close        = t.section.find(this.options.close);
    t.bigtitle.fitText(.65, { minFontSize: '70px' });
  }

  mobileAnimateOpen = (a) => {

  }
  animateOpen = (a) => {
    let o            = this.options,
        t                  = this.elements,

        openTL             = new TimelineMax({paused:true}), // Timeline
        newin              = new TimelineMax(), // Timeline
        pos                = t.section.offset().top,
        btn                = t.prodInfo.find('.btn-svg-wrap');

        t.deviceSide       = t.prodInfoWrap.find('#deviceSide');
        t.description      = t.prodInfoWrap.find('#description');
        t.sectionTitleCont = t.sectionTitle.find('.section-title-container');
        t.button           = t.prodInfoWrap.find('#button');

    let btnwidth           = btn.width(),
        btnheight          = btn.height(),
        btnpos             = btn.offset(),
        winpos             = window.pageYOffset,
        btn1pos            = t.clicked.offset(),
        btnl               = btnpos.left - btn1pos.left,
        btnt               = btnpos.top - btn1pos.top - (pos - winpos) -4; // no idea why things are 2px off, but they are.

        let blurElem = {a:10};

        function applyBlur(){TweenMax.set(t.deviceSide[0], {webkitFilter:`blur(${blurElem.a}px)`,filter:`blur(${blurElem.a}px)`});}; // function for blur timeline
        newin
           //.to(t.pattern[0], 1, {scale:1.1}, "newin") // zoom pattern
          .from(t.prodInfo[0], .5, {autoAlpha:0, top:"-=200"}, "newin") // fade new stuff in
          .from(t.deviceSide[0], .75, {top:"-=200"}, "newin")
          .from(t.description[0], .75, {top:"-=140%"}, "newin") // move title down
          .from(t.bigtitle[0], 1, {top:"-60%"}, "newin") // move title down
          .set(t.clicked[0], {background:'#fff', boxShadow: 'none'}, "newin")
          .to(t.clicked[0], .25, {width:btnwidth, height: btnheight, ease: Expo.easeOut},"newin+=.5") // change button width



        openTL
          .to(window, .5, {scrollTo:{y: pos}}, "sayingOut") // scroll to top of clicked div
          .set(t.body[0], {overflow:"hidden"}) // scroll to top of clicked div
          .to(t.clicked[0], 1, {x:btnl, y: btnt, ease: Expo.easeOut}, "sayingout") // move button
          .to(t.sectionTitleCont[0], .75, {opacity:0, y:"+=480%",ease: Sine.easeOut}, "sayingOut") // Fade out current saying
          .to(t.deviceContainer[0], 1, {y:"45%", ease: Sine.easeOut}, "sayingOut") // move watch down
          .set(t.prodCont[0], {className:"+=active"})
          .add(newin, "-=.75")
          .from(t.deviceSide[0], 1, {scaleX: 1.1, scaleY:1.1}, "fadeoutin-=1")
          .to(blurElem, 1.25, {a:0, onUpdate:applyBlur}, "fadeoutin-=1")
          .from(t.button[0], .5, {opacity:0, ease: Sine.easeOut}, "fadeoutin-=.25") // fade solid button to see through text
         .to(t.sectionTitle[0], .5, {opacity:0, ease: Sine.easeOut}, "fadeoutin-=.25") // fade solid button to see through text

         ;
         this.elements.openTL = openTL;
         this.elements.openTL.play().timeScale(1.5);
  }

  closeListen = () => {
    this.elements.close.on('click', this.animateClose); // event listener for back click (or scroll)
    this.elements.body.bind('mousewheel', this.bounceEffect);
      // add hammer event listener
  }

  bounceEffect = (e) => {
    let scro = e.originalEvent.wheelDelta/4,
      t = this.elements;

    let updateCss = () => {
      t.bigtitle.css({
        // "-webkit-transform": `translate3d(0, ${scro}px, 0)`,
        "transform": `translate3d(0, ${scro}px, 0)`
      });
      t.description.css({
       //  "-webkit-transform": `translate3d(0, ${scro}px, 0)`,
        "transform": `translate3d(0, ${scro}px, 0)`
      });
      t.deviceSide.css({
        // "-webkit-transform": `translate3d(0, ${scro}px, 0)`,
        "transform": `translate3d(0, ${scro * 2}px, 0)`
      });
    }

    e.preventDefault();
    if (scro < 0) {
      window.requestAnimationFrame(updateCss);
      if (scro < -55) {
        this.animateClose(e);
        this.elements.body.unbind('mousewheel', this.bounceEffect);
      }
    }

  }

  animateClose = (e) => {
    let t       = this.elements;

    e.preventDefault();
    let removestuff = () => {
      t.prodInfoWrap.remove();
      t.prodInfo.attr('style', ''); // remove gsap inline style
      t.body.css('overflow', 'auto'); // double tap that body
    }

    this.elements.openTL.reverse() // scroll to top of clicked div

    this.elements.openTL.eventCallback("onReverseComplete", removestuff);
  }

  plusClick = (e) => {
    let t       = this.elements;
    let o       = this.options;
    this.setClasses(e);
    this.constructPage();
    let mobile = false;
    if (mobile){
      this.mobileAnimateOpen();
      console.log('mobile');
    }else {
      this.animateOpen();
    }
    this.closeListen();
  }
}