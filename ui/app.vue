<template lang="pug">
  div.overmap_inner
    .infobar
      .logo
        h1 #OverMap
      .position_mc
        span <b>X</b><i>{{position_mc['x']}}</i>
        span <b>Y</b><i>{{position_mc['y']}}</i>
        span <b>Z</b><i>{{position_mc['z']}}</i>
    .toolbar
    .action
    .hud
</template>

<script>
import Vue from 'vue';
export default {
  name: "overmap",
  data(){
    return {
      position_mc:[],
      position_map:[123,123,123],
      positionList:[
        {
          name: "Nekotora's Home",
          position_mc: [123,123,123]
        }
      ]
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap: function(){
      if(!overviewer) alert("Overviewer Not Found!")
      var _this = this
      overviewer.map.on('mousemove', function(ev) {
        _this.position_mc = _this.getMapEventPosition(ev)
        return this.position_mc
      });
      overviewer.map.on('click', function(ev) {
        var mcp = _this.getMapEventPosition(ev)
        console.info("click at",mcp)
        return true
      });
    },
    getMapEventPosition: function(ev){
      var currWorld = overviewer.current_world;
      var currTileset = overviewer.current_layer[currWorld];
      var ovconf = currTileset.tileSetConfig;
      var mcp = overviewer.util.fromLatLngToWorld(ev.latlng.lat, ev.latlng.lng, ovconf);
      return mcp
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
body{
  overflow: hidden;
}
.overmap_inner{
  height: 0;
  width: 0;
  z-index: 23333;
}
.overmap_inner>div{
  color: #fff;
  position: absolute;
  z-index: 2333;
  padding: 5px 12px;
}

.leaflet-control-container{
  /*display:none*/
}
</style>

<style lang="scss" scoped>
.overmap_inner{
  .hud{
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: 2000;
    background-image: radial-gradient(hsla(0,0,0,.0),hsla(0,0,0,.5));
  }
  .infobar{
    bottom: 10%;
    right: 5%;
    text-align: right;
    .logo{
      padding-bottom: 10px;
      h1{
        font-size: 30px;
        font-weight: lighter;
        font-style: normal;
        color: #66ccff;
      }
    }
    span{
      display: inline-block;
      padding: 0 5px;
      b{
        font-size: 17px;
        font-weight: lighter;
        color: #66ccff
      }
      i{
        font-size: 12px;
        padding-left: 5px;
        font-weight: lighter;
        font-style: normal;
      }
    }
  }
}
</style>
