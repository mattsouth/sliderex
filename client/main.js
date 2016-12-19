import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// see https://forums.meteor.com/t/initializing-bootstrap-slider-as-node-module-doesnt-work/27859
import 'bootstrap-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';

import './main.html';

Template.test.onCreated(function testOnCreated() {
  this.testvar = new ReactiveVar(0);
});

Template.test.onRendered(function testOnRendered() {
  Template.instance().$('.slider').slider();
  // TODO: make slider reactive
});

Template.test.helpers({
  testvar() {
    return Template.instance().testvar.get();
  },
});

Template.test.events({
  'click button'(event, instance) {
    let val = parseInt($("input").val())
    if (Number.isInteger(val) && val>=0 && val<=10) {
      instance.testvar.set(val);
    }
  },
  'slide .slider'(event, instance) {
    let val=parseInt(event.value);
    instance.testvar.set(val);
  }
});
