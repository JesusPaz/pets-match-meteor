import  { Meteor } from  'meteor/meteor'
import  Vue from 'vue'
import  Vuetify from  'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueMeteorTracker  from 'vue-meteor-tracker'
import router  from  '../imports/ui/router'
import App from  '../imports/ui/App'
import VImageInput from 'vuetify-image-input';


Vue.use(Vuetify)
Vue.use(VueMeteorTracker)
Vue.component('VImageInput', VImageInput);


const opts = {}
const vuetify = new Vuetify(opts)


Meteor.startup(() => {
   new Vue ({
     el: "#app", 
     vuetify,
     router,
     ...App
   }) 
})