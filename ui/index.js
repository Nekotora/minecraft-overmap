import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
$(function () { 
  $(".loading_cover").fadeOut();
  new Vue({
    el: '#overmap',
    render: h => h(App)
  });
})