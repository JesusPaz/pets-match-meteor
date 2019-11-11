import  { Meteor } from  'meteor/meteor'
import  Vue from 'vue'
import  Vuetify from  'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const opts = {}
const vuetify = new Vuetify(opts)

import VueMeteorTracker  from 'vue-meteor-tracker'

Vue.use(VueMeteorTracker)

import router  from  '../imports/ui/router'

import App from  '../imports/ui/App'

Meteor.startup(() => {
   new Vue ({
     el: "#app", 
     vuetify,
     router,
     ...App
   }) 
})