window.controller = {
    map:false,
    geo:false,
    storage:false,
    handlers:{
        cc:false,
        contexts:[]
    }
}
function initMap(){
    window.controller.storage = window.localStorage || false;
    window.controller.map = new google.maps.Map(document.getElementById('map_container'),{
        center: window.controller.storage != false ? (typeof window.controller.storage.mapLastCoordinates != "undefined"?JSON.parse(window.controller.storage.mapLastCoordinates):{lat: -34.397, lng: 150.644}):{lat: -34.397, lng: 150.644},
        zoom: window.controller.storage != false ? (typeof window.controller.storage.mapZoom != "undefined"?parseInt(window.controller.storage.mapZoom):13):13
    });
    navigator.geolocation.getCurrentPosition(function(e){
        console.log(e);
    });
    window.controller.map.addListener('center_changed',function(){
        if(window.controller.storage != false){
            window.clearTimeout(window.controller.handlers.cc);
            window.controller.handlers.cc = setTimeout(function(){
                window.controller.storage.mapLastCoordinates = JSON.stringify(window.controller.map.getCenter().toJSON());
            },700);
        }
    });
    window.controller.map.addListener('zoom_changed',function(){
        if(window.controller.storage != false){
            window.clearTimeout(window.controller.handlers.cc);
            window.controller.handlers.cc = setTimeout(function(){
                window.controller.storage.mapZoom = window.controller.map.getZoom();
            },700);
        }
    });
    window.controller.map.addListener('click',function(e){
        for(var x=0;x<window.controller.handlers.contexts.length;x++){
            if(typeof window.controller.handlers.contexts[x] != "undefined"){
                window.controller.handlers.contexts[x].div_.remove();
            }
        }
        window.controller.handlers.contexts = [];
        window.controller.handlers.contexts.push(new USGSOverlay(e.latLng,template("ui_pop1")));
    });
    USGSOverlay.prototype = new google.maps.OverlayView();
    function USGSOverlay(bounds,content){
        this.latlng_ = bounds;
        this.map_ = window.controller.map;
        this.div_ = document.createElement('div');
        this.div_.style.position = "absolute";
        this.div_.appendChild(content);
        $(this.div_).on("click",function(e){
            this.remove();
            return false;
        });
        this.setMap(window.controller.map);
    }
    USGSOverlay.prototype.onAdd = function() {
        var panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(this.div_);
    };
    USGSOverlay.prototype.draw = function(){
        var overlayProjection = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if(overlayProjection){
            this.div_.style.left = overlayProjection.x + 'px';
            this.div_.style.top = overlayProjection.y + 'px';
        }
    };
    USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };
    USGSOverlay.prototype.hide = function() {
        if (this.div_) {
            this.div_.style.visibility = 'hidden';
        }
    };
    USGSOverlay.prototype.show = function() {
        if (this.div_) {
          this.div_.style.visibility = 'visible';
        }
    };
    USGSOverlay.prototype.toggle = function() {
        if (this.div_) {
          if (this.div_.style.visibility === 'hidden') {
            this.show();
          } else {
            this.hide();
          }
        }
    };
}
$(document).ready(function(){
    $(document).on("click",".contextMenu",function(e){});
});
function template(slug){
    return $("#"+slug).clone().get(0);
}
var e = {
    add:function(latLng){

    }
}