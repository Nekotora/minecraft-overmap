import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
$(function () { 
  new Vue({
    el: '#overmap',
    render: h => h(App)
  });
})