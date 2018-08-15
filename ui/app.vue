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
      .btn
        i.icon.ion-md-navigate
      .btn(v-on:click="toggel_setPosition()")
        i.icon.ion-md-locate
      .btn
        i.icon.ion-md-settings
    .hud
    .dialogbox
      transition(name="slide-fade")
        .dialog.set_position(v-if="this.panel_setPosition")
          .header
            h4 定位坐标
          .body
            form
              .line.clear
                .pos
                  p X
                  input(v-model="setPosition.x",type="number")
                .pos
                  p Z
                  input(v-model="setPosition.z")
              .submit
                a.button(v-on:click="do_setPosition",type="number")
                  i.icon.ion-md-checkmark
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
      ],
      panel_setPosition:false,
      setPosition:{x:0,z:0}
    }
  },
  mounted() {
    this.initMap()
    this.addPoint({x: 380,y: 73,z: 281},'商店：哞菇Store','bookmark')
    this.addPoint({x: 376,y: 72,z: 259},'商店：Viper','bookmark')
    this.addPoint({x: 367,y: 72,z: 259},'商店：Cat_Lemon','bookmark')
    this.addPoint({x: 357,y: 72,z: 259},'商店：Nekonep','bookmark')
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
    },
    toggel_setPosition: function(){
      !this.panel_setPosition? this.panel_setPosition=true:this.panel_setPosition=false
    },
    do_setPosition:function(){
      var currWorld = overviewer.current_world;
      var currTileset = overviewer.current_layer[currWorld];
      var ovconf = currTileset.tileSetConfig;
      var latlng = overviewer.util.fromWorldToLatLng(parseInt(this.setPosition.x), '64', parseInt(this.setPosition.z), ovconf);
      return overviewer.map.setView(latlng)
    },
    addPoint: function(mcPos,label,glyph){
      var currWorld = overviewer.current_world;
      var currTileset = overviewer.current_layer[currWorld];
      var ovconf = currTileset.tileSetConfig;
      var latlng = overviewer.util.fromWorldToLatLng(parseInt(mcPos.x), parseInt(mcPos.y), parseInt(mcPos.z), ovconf);
      var icon = L.icon.glyph({
        prefix: 'fa',
        glyph: glyph
      })
      //L.marker(latlng, {icon: icon }).bindLabel(label,{ noHide: true }).addTo(overviewer.map);
      L.marker(latlng, {icon: icon }).addTo(overviewer.map).bindTooltip(label).openTooltip();
      return true
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
  display:none;
}
.loading_cover{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0,0,0,.7);
  z-index: 50000;
  color: #fff;
  text-align: center;
}

.loading_cover h2{
  padding-top: 30%;
  font-size: 100px;
  font-weight: lighter;
  font-style: normal;
  letter-spacing: .3em;
  transition: 1s all;
  animation: loading 1s ease-in-out infinite alternate;
}

@keyframes loading
{
from {color: rgba(255,255,255,1);transform: translateY(0)}
to {color: rgba(255,255,255,.5);transform: translateY(15px)}
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}
.clear:after{
  content:"";
  display:block;
  height:0;
  visibility:hidden;
  clear:both;
}
</style>

<style lang="scss" scoped>
.overmap_inner{
  input{
    background: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  .hud{
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: 2000;
    background-image: radial-gradient(hsla(0,0,0,.0),hsla(0,0,0,.2));
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
        color: #66ccff;
      }
      i{
        font-size: 12px;
        padding-left: 5px;
        font-weight: lighter;
        font-style: normal;
      }
    }
  }
  .action{
    right: 5%;
    top: 5%;
    .btn{
      position: relative;
      display: inline-block;
      float: left;
      margin: 0 10px;
      font-size: 20px;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,.5);
      background-color: rgba(0,0,0,.6);
      transition: .3s all;
      cursor: pointer;
    }
    .btn:hover{
      background-color: rgba(0,0,0,1);
    }
  }
  .dialogbox{
    .dialog{
      position: fixed;
      top: 5%;
      left: 5%;
      width: 300px;
      z-index: 2222;
      box-shadow: 0 4px 12px rgba(0,0,0,.5);
      background-color: rgba(0,0,0,.6);
      .header{
        font-size: 14px;
      }
    }
    .dialog>div{
      padding: 10px;
      opacity: 1;
    }
    .submit{
      text-align: right;
      margin-top: 20px;
      .button{
        display: inline-block;
        font-size: 18px;
        padding: 5px 20px;
        transition: .3s all;
        background-color: rgba(255,255,255,.1);
      }
      .button:hover{
        background-color: rgba(255,255,255,.2)
      }
    }
  }
  .dialog.set_position{
    .pos{
      float: left;
      width: 50%;
      input{
        width: 90%;
        padding: 5%;
      }
    }
  }
}
</style>
