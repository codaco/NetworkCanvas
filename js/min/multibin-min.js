var MultiBin=function e(o){var t={},i;t.options={targetEl:$(".container"),edgeType:"Dyad",variable:{label:"multibin_variable",values:["Variable 1"]},heading:"Default Heading",subheading:"Default Subheading."};var n=!1;extend(t.options,o);var a=function(){t.destroy()},l=function(){var e=i,o={to:e};extend(o,t.options.criteria);var n=network.getEdges(o)[0],a={};$.each(t.options.followup.questions,function(e){var o=$("#"+t.options.followup.questions[e].variable).val();a[t.options.followup.questions[e].variable]=o}),extend(n,a),network.updateEdge(n.id,n),$.each(t.options.followup.questions,function(e){$("#"+t.options.followup.questions[e].variable).val("")}),$(".followup").hide()},s=function(){$("#"+t.options.followup.variable).val(""),$(".followup").hide()},d=function(e){e.stopPropagation(),e.target!==e.currentTarget&&n===!0&&($(".container").children().removeClass("invisible"),$(".copy").removeClass("node-bin-active"),$(".copy").addClass("node-bin-static"),$(".copy").children("h1, p").show(),$(".copy").removeClass("copy"),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1}),n=!1)},r=function(e){if(e.stopPropagation(),n===!1){if($(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!0}),!$(this).hasClass(".node-bin-active")){$(".container").children().not(this).addClass("invisible");var o=$(this).offset(),t=$(this);t.offset(o),t.addClass("node-bin-active copy"),t.removeClass("node-bin-static"),t.children("h1, p").hide(),t.children(".active-node-list").children(".node-item").css({top:0,left:20,opacity:0}),setTimeout(function(){t.addClass("node-bin-active"),$.each($(".active-node-list").children(),function(e,o){setTimeout(function(){$(o).transition({left:0,opacity:1})},20*e)})},100)}n=!0}},c=function(e){e.stopPropagation();var o=$(this),i=$(this).parent().parent().data("index");if($(this).parent().hasClass("active-node-list")){var n=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,to:o.data("node-id"),type:t.options.edgeType})[0].id,a={};a[t.options.variable.label]="","undefined"!=typeof t.options.followup&&$.each(t.options.followup.questions,function(e,o){a[o.variable]=""}),network.updateEdge(n,a),$(this).fadeOut(400,function(){$(this).appendTo(".node-bucket"),$(this).css("display","");var e="people";1===$(".c"+i).children(".active-node-list").children().length&&(e="person"),$(".c"+i).children("p").html(0===$(".c"+i).children(".active-node-list").children().length?"(Empty)":$(".c"+i).children(".active-node-list").children().length+" "+e+".")})}};return t.destroy=function(){notify("Destroying multiBin.",0),window.removeEventListener("changeStageStart",a,!1),$(".node-bin-static").off("click",r),$(".node-item").off("click",c),$(".content").off("click",d),$(".followup-submit").off("click",l),$(".followup-cancel").off("click",s)},t.init=function(){t.options.targetEl.append("<h1>"+t.options.heading+"</h1>"),t.options.targetEl.append('<p class="lead">'+t.options.subheading+"</p>"),t.options.targetEl.append('<div class="node-bucket"></div>'),"undefined"!=typeof t.options.followup&&(t.options.targetEl.append('<div class="followup overlay"></div>'),$.each(t.options.followup.questions,function(e){$(".followup").append("<h2>"+t.options.followup.questions[e].prompt+'</h2><div class="row form-group"><input type="text" class="form-control '+t.options.followup.questions[e].variable+'" id="'+t.options.followup.questions[e].variable+'" required="" placeholder="Answer here..."></div>')}),$(".followup").append('<div class="row form-group"><button type="submit" class="btn btn-primary btn-block followup-submit">Continue</button></div>'),"undefined"!=typeof t.options.followup.cancel&&$(".overlay").children().last(".form-group").prepend('<button type="submit" class="btn btn-warning btn-block followup-cancel">'+t.options.followup.cancel+"</button>"));for(var e=Math.floor(.66*t.options.variable.values.length),o=$(".container").outerWidth()/e,n=o;2*n>$(".container").height()-300;)n=.98*n;var p=network.getEdges(t.options.criteria);$.each(t.options.variable.values,function(e,o){var n=$('<div class="node-bin node-bin-static c'+e+'" data-index="'+e+'"><h1>'+o+'</h1><p class="lead">(Empty)</p><div class="active-node-list"></div></div>');n.data("index",e),t.options.targetEl.append(n),$(".c"+e).droppable({accept:".draggable",drop:function(o,n){var a=n.draggable,l=$(this);"undefined"!=typeof t.options.followup&&t.options.followup.trigger.indexOf(t.options.variable.values[e])>=0&&($(".followup").show(),$("#"+t.options.followup.questions[0].variable).focus(),i=$(a).data("node-id")),$(a).appendTo(l.children(".active-node-list"));var s={};s[t.options.variable.label]=t.options.variable.values[e];var d=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,to:$(a).data("node-id"),type:t.options.edgeType})[0].id;console.log(s),console.log(d),network.updateEdge(d,s);var r="people";1===$(".c"+e+" .active-node-list").children().length&&(r="person"),$(".c"+e+" p").html($(".c"+e+" .active-node-list").children().length+" "+r+".");var c=$(".c"+e);c.transition({scale:1.2},200,"ease"),setTimeout(function(){c.transition({background:c.data("oldBg")},200,"ease"),c.transition({scale:1},200,"ease")},0)},over:function(){$(this).data("oldBg",$(this).css("background-color")),$(this).stop().transition({background:"rgba(255, 193, 0, 1.0)"},400,"ease")},out:function(){$(this).stop().transition({background:$(this).data("oldBg")},500,"ease")}})}),$(".node-bin").css({width:n-20,height:n-20}),$(".node-bin h1").css({marginTop:n/3}),$.each($(".node-bin"),function(e,o){var t=$(o).offset();$(o).data("oldPos",t),$(o).css(t)}),$(".node-bin").css({position:"absolute"}),$.each(p,function(e,o){var i=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,type:"Dyad",to:o.to})[0];if(void 0!==o[t.options.variable.label]&&""!==o[t.options.variable.label]){e=t.options.variable.values.indexOf(o[t.options.variable.label]),$(".c"+e).children(".active-node-list").append('<div class="node-item draggable" data-node-id="'+o.to+'">'+i.nname_t0+"</div>");var n="people";1===$(".c"+e).children(".active-node-list").children().length&&(n="person"),$(".c"+e).children("p").html(0===$(".c"+e).children(".active-node-list").children().length?"(Empty)":$(".c"+e).children(".active-node-list").children().length+" "+n+".")}else $(".node-bucket").append('<div class="node-item draggable" data-node-id="'+o.to+'">'+i.nname_t0+"</div>")}),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1}),window.addEventListener("changeStageStart",a,!1),$(".node-bin-static").on("click",r),$(".node-item").on("click",c),$(".content").on("click",d),$(".followup-submit").on("click",l),$(".followup-cancel").on("click",s)},t.init(),t};