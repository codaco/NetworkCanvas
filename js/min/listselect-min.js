var ListSelect=function e(t){var n={};n.options={targetEl:$(".container"),variables:[],heading:"This is a default heading",subheading:"And this is a default subheading"},extend(n.options,t);var o=function(){var e={},t=$(this).data("nodeid");$(this).data("selected")===!0?($(this).data("selected",!1),$(this).css({border:"2px solid #eee",background:"#eee"}),$.each(n.options.variables,function(t,n){e[n.value]=void 0}),network.updateNode(network.getNodes({type_t0:"Ego"})[0].id,e)):($(this).data("selected",!0),$(this).css({border:"2px solid red",background:"#E8C0C0"}),$.each(n.options.variables,function(n,o){o.value===t?e[o.value]=1:console.log(t)}),network.updateNode(network.getNodes({type_t0:"Ego"})[0].id,e))},i=function(){n.destroy()},a=function(){session.nextStage()};return n.destroy=function(){notify("Destroying listSelect.",0),$(document).off("click",".item",o),$(document).off("click",".continue",a),window.removeEventListener("changeStageStart",i,!1)},n.init=function(){n.options.targetEl.append('<h1 class="text-center">'+n.options.heading+"</h1>"),n.options.targetEl.append('<p class="lead text-center">'+n.options.subheading+"</p>"),n.options.targetEl.append('<div class="form-group list-container"></div>'),$.each(n.options.variables,function(e,t){var n=$('<div class="item" data-nodeid="'+t.value+'"><h3><strong>'+t.label+"</strong></h3></div>"),o={type_t0:"Ego"};o[t.value]=1,network.getNodes(o).length>0&&(n.data("selected",!0),n.css({border:"2px solid red",background:"#E8C0C0"})),$(".list-container").append(n)}),$(document).on("click",".item",o),$(document).on("click",".continue",a),window.addEventListener("changeStageStart",i,!1)},n.init(),n};