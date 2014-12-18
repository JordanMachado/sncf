define([
	'marionette',
	'./LineView',
	'TweenMax',
	'TimeLineLite',
	'app/App',
], function(Marionette, LineView , TweenMax ,TimeLineLite, App) {

	var LinesView = Marionette.CollectionView.extend({

		childView: LineView,
		className:'linesView',
		childViewEventPrefix: "line:event",
		childViewOptions: function(line){
    		return {
    			numberOfLine: this.collection.length,
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
			this.stopListening();
			var lineNameStr = datas.model.attributes.ligne;
			var  lineNameFiltered=lineNameStr.split(" ");
			var lineId = lineNameFiltered[1].toLowerCase();

			var tl = new TimeLineLite();
			tl.set(childView.$el,{position:'absolute'});
			tl.to(childView.$el,.6,{left:'0px',width:$(window).width()+'px',x:0});
			var displacement = -childView.$el.find('.logo').offset().top/2+61;
			tl.to(childView.$el.find('.logo'),.5,{y:displacement,onComplete:function(){
				App.navigate('line/'+datas.model.get('id'),{trigger:true});
			}});
		},
		onLineMouseEnter:function(childView) {

			TweenLite.set(childView.$el,{zIndex:1});
			var displacement = 0;
			if(this.$el.find('.line').first().attr('class') == childView.$el.attr('class')) {
				displacement = childView.$el.width()/4;
			} else if(this.$el.find('.line').last().attr('class') == childView.$el.attr('class')) {
				displacement = -childView.$el.width()/4;
			}
			TweenLite.to(childView.$el,.6,{scale:2,x:displacement});
			TweenLite.to(childView.$el.find('.logo'),.5,{opacity:1,scale:1});
		},
		onLineMouseLeave:function(childView) {

			TweenLite.set(childView.$el,{zIndex:0});
			TweenLite.to(childView.$el,.3,{scale:1,x:0});
			TweenLite.to(childView.$el.find('.logo'),.3,{opacity:0,scale:0});
		},
		onRender: function () {
        	App.trigger('hide:loader');
    	}

	});

	return LinesView;
});