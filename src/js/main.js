import deviceToggle from './modules/deviceToggle';
import wayView from './modules/wayView';
import mobile from './modules/mobile';

$(document).ready(() => {
  let Global  = Global || {};
  // use  _this.function  if you want to reuse it across modules

  Global.mobile =  window.matchMedia( `( max-width: 720px)`).matches;

  // let DeviceToggle = new deviceToggle({
  //   section    : '.section-wrap',
  //   prodInfo   : '.prod-info',
  //   prodCont   : '.section-container',
  //   data       : vivomoveData,
  //   toggle     : '.prod-toggle',
  //   close      : '#close-page',
  //   pattern    : '.pattern-container',
  //   ismobile   : Garmin.site.mobile,
  //   prodSaying : {
  //     selector        : '.prod-saying',
  //     deviceContainer : '.device-container',
  //     sectionTitle    : '.section-title'
  //   }
  // });

  // let WayView = new wayView({
  //   sections : '.section-wrap'
  // });

  // if (Garmin.site.mobile){
  //   _this.Mobile = new mobile({
  //     breakpoint : '720',
  //     sections : '.section-wrap'
  //   });
  // }

})
