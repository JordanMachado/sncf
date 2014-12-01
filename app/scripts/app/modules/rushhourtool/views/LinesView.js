define([
	'marionette',
	'../RushHourTool',
	'./LineView',
	'TweenMax',
], function(Marionette, RushHourTool, LineView , TweenMax) {

	var LinesView = Marionette.CollectionView.extend({
		childView: LineView,
		className:'linesContainer',
		childViewOptions: function(line){
			console.log(line.get('ligne'))
    		return {
    			numberOfLine: RushHourTool.numberOfLine,
    			// ligne zone collection
    			zones: new Backbone.Collection([{id: 2,name:'coucou'},{id: 1,name:'coucou'},{id: 4,name:'coucou'}])

    		}
  		},

		tagName: 'ul',
		childEvents: {
			'click': 'onLineClick',
			'mouseenter': 'onLineMouseEnter',
			'mouseleave':'onLineMouseLeave'
		},
		/* 
		 * Method called when user select a line
		 */
		onLineClick: function(childView, datas) {
			childView.$el.addClass('selected');

			var lineNameStr = datas.model.attributes.ligne;
			var  lineNameFiltered=lineNameStr.split(" ");
			var lineId = lineNameFiltered[1].toLowerCase();

			
			TweenLite.set(childView.$el,{position:'absolute'});
			TweenLite.to(childView.$el,.6,{left:'0px',width:$(window).width()+'px',onComplete:function(){
				RushHourTool.trigger('line:click',{
				lineId:lineId
			});
			}});

			TweenLite.to(childView.$el.find('p'),.5,{y:-51});
			TweenLite.to(childView.$el.find('ul'),.5,{display:'block'});
		},
		onLineMouseEnter:function(childView) {
			//transform in timeline
			TweenLite.set(childView.$el,{zIndex:10});
			TweenLite.to(childView.$el,.5,{scale:2});
			TweenLite.set(childView.$el.find('p'),{scale:0});
			TweenLite.to(childView.$el.find('p'),.5,{opacity:1,scale:1});



		},
		onLineMouseLeave:function(childView) {
			//transform in timeline and stragger
			this.children.each(function(view){
				TweenLite.set(view.$el,{zIndex:0});
				TweenLite.to(view.$el,.4,{scale:1,onComplete:function(){

				}});
				TweenLite.to(view.$el.find('p'),.5,{opacity:0});
			})

		}
	});

	return LinesView;
});