var GeoInterface=function e(){function e(e){if(p===!1){var o={zoomLevel:g.getZoom(),stage:global.session.currentStage(),timestamp:new Date};d=new window.CustomEvent("log",{detail:{eventType:"taskComprehended",eventObject:o}}),window.dispatchEvent(d),p=!0}var a={zoomLevel:g.getZoom(),timestamp:new Date};d=new window.CustomEvent("log",{detail:{eventType:"mapMarkerPlaced",eventObject:a}}),window.dispatchEvent(d);var i=e.target,s;b===!1?(t(e),s={},s[h]=i.feature.properties.name,global.network.updateEdge(u[f].id,s),$(".map-node-location").html("<strong>Currently marked as:</strong> <br>"+i.feature.properties.name)):i.feature.properties.name===b?(n(e),b=!1,s={},s[h]=void 0,global.network.updateEdge(u[f].id,s)):(r(),t(e),s={},s[h]=i.feature.properties.name,global.network.updateEdge(u[f].id,s))}function o(){if(void 0!==u[f][h])if(b=u[f][h],"Homeless"===u[f][h]||"Jail"===u[f][h]){s();var e="Homeless";"Jail"===u[f][h]&&(e="in Jail"),$(".map-node-location").html("<strong>Currently marked as:</strong> <br>"+e)}else $.each(w._layers,function(e,o){o.feature.properties.name===u[f][h]&&($(".map-node-location").html("<strong>Currently marked as:</strong> <br>"+u[f][h]),a(o))});else s()}function t(e){var o=e.target;g.fitBounds(e.target.getBounds(),{maxZoom:14}),o.setStyle({fillOpacity:.8,fillColor:v[1]}),global.L.Browser.ie||global.L.Browser.opera||o.bringToFront(),b=o.feature.properties.name}function a(e){var o=e;g.fitBounds(e.getBounds(),{maxZoom:14}),o.setStyle({fillOpacity:.8,fillColor:v[1]}),global.L.Browser.ie||global.L.Browser.opera||o.bringToFront()}function n(e){$(".map-node-location").html(""),b=!1,w.resetStyle(e.target)}function r(){$(".map-node-location").html(""),b=!1,$.each(w._layers,function(e,o){w.resetStyle(o)})}function i(o,t){t.on({click:e})}function s(){g.setView([41.798395426119534,-87.83967137233888],11)}function l(){r();var e={};e[h]="Homeless",global.network.updateEdge(u[f].id,e),$(".map-node-location").html("<strong>Currently marked as:</strong> <br>Homeless")}function m(){r();var e={};e[h]="Jail",global.network.updateEdge(u[f].id,e),$(".map-node-location").html("<strong>Currently marked as:</strong> <br>in Jail")}var d,p=!1,c={},g,u,h="res_chicago_location_p_t0",f=0,w,b=!1,v=["#67c2d4","#1ECD97","#B16EFF","#FA920D","#e85657","#20B0CA","#FF2592","#153AFF","#8708FF"],k=function(){c.destroy()};return c.nextPerson=function(){f<u.length-1&&(r(),f++,$(".current-id").html(f+1),$(".map-node-status").html("Tap on the map to indicate the general area where <strong>"+u[f].nname_t0+"</strong> lives."),o(),f===u.length-1?$(".map-forwards").hide():$(".map-forwards").show(),0===f?$(".map-back").hide():$(".map-back").show())},c.previousPerson=function(){f>0&&(r(),f--,$(".current-id").html(f+1),$(".map-node-status").html("Tap on the map to indicate the general area where <strong>"+u[f].nname_t0+"</strong> lives."),o(),f===u.length-1?$(".map-forwards").hide():$(".map-forwards").show(),0===f?$(".map-back").hide():$(".map-back").show())},c.init=function(){g=global.L.map("map",{maxBounds:[[41.4985986599114,-88.49824022406345],[42.1070175291862,-87.07098424716594]],zoomControl:!1}),global.L.tileLayer("http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.transit/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}",{subdomains:"1234",mapID:"newest",app_id:"FxdAZ7O0Wh568CHyJWKV",app_code:"FuQ7aPiHQcR8BSnXBCCmuQ",base:"base",minZoom:0,maxZoom:20}).addTo(g),$.ajax({dataType:"json",url:"data/census2010.json",success:function(e){w=global.L.geoJson(e,{onEachFeature:i,style:function(){return{weight:1,fillOpacity:0,strokeWidth:.2,color:v[1]}}}).addTo(g),u=global.network.getEdges({from:global.network.getNodes({type_t0:"Ego"})[0].id,type:"Dyad",res_cat_p_t0:"Chicago"}),$(".map-counter").html('<span class="current-id">1</span>/'+u.length),$(".map-node-status").html("Tap on the map to indicate the general area where <strong>"+u[0].nname_t0+"</strong> lives."),o(),$(".map-back").hide(),f===u.length-1?$(".map-forwards").hide():$(".map-forwards").show()}}).error(function(){}),window.addEventListener("changeStageStart",k,!1),$(".map-back").on("click",c.previousPerson),$(".map-forwards").on("click",c.nextPerson),$(".homeless").on("click",l),$(".jail").on("click",m)},c.destroy=function(){g.remove(),window.removeEventListener("changeStageStart",k,!1),$(".map-back").off("click",c.previousPerson),$(".map-forwards").off("click",c.nextPerson),$(".homeless").on("click",l),$(".jail").on("click",m)},c};module.exports=new GeoInterface;