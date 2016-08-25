/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

  || Usage ||
  This gets gnarly, but basically toggles an active class on the current section, and gives a preRender padding to toggling the hollow class to everything else.

=======
*/


export default class {
  constructor(options){
    this.options = options;

    this.elements = {
      sections: $(this.options.sections)
    }
    this.init();
  }
  init() {
    this.classViewToggle();
  }

  classViewToggle = () => {
    let sections = this.elements.sections;
    let preRender = 2; // number of sections to pre-paint

    sections.each(function(i){ // loop sections and hide or show based on index
      if (i > preRender){
        $(this).addClass('hollow');
      }
      var sect = $(sections); // What to toggle
      let num = preRender + 1; // Offset for array

      var g = 1;

      let up = new Waypoint({ // Up function
        element: this,
        handler: function(direction){
          sect.filter('.active').removeClass('active'); // run this no matter what
          if (direction == 'up'){
            let next = i > (sections.length - num) ? 1 : i + num; // if we're not the last guy, hide
            let prev = i-preRender;// offset num for array
            $(this.element).addClass('active');
            sect.eq(prev).removeClass('hollow'); // show the previous 2
            sect.eq(next).addClass('hollow'); // hide the next 2
          }
        },
        offset: '-50%'
      });
      let down = new Waypoint({
        element: this,
        handler: function(direction){
          let prev = i >= num ? i-num : sections.length; // make sure there is a previous
          let next = i+preRender; // offset num for array
          if (direction == 'down') { // if we're scrolling down
            $(this.element).addClass('active');
            sect.eq(next).removeClass('hollow'); // Show the next 2
            sect.eq(prev).addClass('hollow'); // hide the previous 2
          }
        },
        offset: '50%'
      });

    })


  }

}





