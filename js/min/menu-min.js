var Menu=function n(o){function t(n,o){for(var t in o)o.hasOwnProperty(t)&&(n[t]=o[t]);return n}var e={},i=[],s=!1,c=$(".menu-container"),a=!1,r=function(){e.closeMenu()};return e.options={onBeforeOpen:function(){$(".menu-btn").transition({opacity:0}),$(".menu-btn").hide(),$(".black").hide(),$(".arrow-right").transition({right:-550}),$(".arrow-left").transition({left:-550}),$(".content").addClass("pushed"),$(".pushed").on("click",r)},onAfterOpen:function(){return!1},onBeforeClose:function(){$(".pushed").off("click",r),$(".content").removeClass("pushed")},onAfterClose:function(){$(".black").show(),$(".arrow-right").transition({right:0},1e3),$(".arrow-left").transition({left:0},1e3)}},e.getMenus=function(){return i},e.closeMenu=function(n){n?n.items.find(".icon-close").trigger("click"):$.each(i,function(n){i[n].items.find(".icon-close").trigger("click")})},e.toggle=function(n){var o=n.button[0].getBoundingClientRect(),t=$("."+n.name+"-menu"),i=$("."+n.name+"-menu-container");if(t.addClass("no-transition"),t[0].style.left="auto",t[0].style.top="auto",s===!0)return!1;if(s=!0,n.expanded===!0)e.options.onBeforeClose(),i.removeClass("active"),setTimeout(e.options.onAfterClose,500),s=!1;else{e.options.onBeforeOpen();var c=modifyColor($("."+n.name+"-menu").css("background-color"),-.2);console.log($("."+n.name+"-menu").css("background-color")),console.log(c),$("body").css({"background-color":c}),i.addClass("active"),setTimeout(e.options.onAfterOpen,500),s=!1}setTimeout(function(){t[0].style.left=o.left+"px",t[0].style.top=o.top+"px",n.expanded===!0?(t.removeClass("no-transition"),i.removeClass("open"),n.expanded=!1,$(".menu-btn").transition({opacity:1})):setTimeout(function(){t.removeClass("no-transition"),i.addClass("open"),n.expanded=!0},25)},25)},e.addMenu=function(n,o){var t={};t.name=n,t.expanded=!1,t.button=$('<span class="hi-icon menu-btn '+n+'" style="opacity:0"></span>'),t.button.addClass(o).html(n),c.append(t.button),t.button.css({top:-300});var s=n+"-menu",r=n+"-menu-container";return t.items=$('<div class="morph-button morph-button-sidebar morph-button-fixed '+r+'"><div class="morph-content '+s+'"><div><div class="content-style-sidebar"><span class="icon icon-close">Close the overlay</span><h2>'+n+"</h2><ul></ul></div></div></div></div>"),t.button.after(t.items),t.button.on("click",function(){e.toggle(t)}),t.items.find(".icon-close").on("click",function(){$(".menu-btn").show(),e.toggle(t)}),i.push(t),a===!0?setTimeout(function(){t.button.transition({top:0,opacity:1},1e3).promise().done(function(){a=!1})},500):(a=!0,t.button.transition({top:0,opacity:1},1e3).promise().done(function(){a=!1})),t},e.removeMenu=function(n){n.button.transition({top:-300,opacity:0},1e3,function(){$(n.button).remove(),$(n.items).remove()})},e.addItem=function(n,o,t,i){var s=$('<li><a class="icon icon-server '+t+'" href="#">'+o+"</a></li>");n.items.find("ul").append(s),s.on("click",function(){e.closeMenu(n),setTimeout(function(){i()},500)})},e.init=function(){notify("Menu initialising.",1),t(e.options,o)},e.init(),e};
//# sourceMappingURL=./menu-min.js.map