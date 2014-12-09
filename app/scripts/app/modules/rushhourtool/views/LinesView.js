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


		initialize: function( ){
			this.on('all', function(e){
				//console.log(e);

			});
		},
		/* 
		 * Method called when user select a line
		 */
		onLineClick: function(childView, datas) {

			var lineNameStr = datas.model.attributes.ligne;
			var  lineNameFiltered=lineNameStr.split(" ");
			var lineId = lineNameFiltered[1].toLowerCase();

			var tl = new TimeLineLite();
			tl.set(childView.$el,{position:'absolute'});
			tl.to(childView.$el,.6,{left:'0px',width:$(window).width()+'px'});
			tl.to(childView.$el.find('.logo'),.5,{y:-childView.$el.find('.logo').offset().top/2+$('header').height(),onComplete:function(){
				App.navigate('line/'+datas.model.get('id'),{trigger:true});
			}});
		},
		onLineMouseEnter:function(childView) {
			TweenLite.set(childView.$el,{zIndex:1});
			TweenLite.to(childView.$el,.6,{scale:2});
			TweenLite.to(childView.$el.find('.logo'),.5,{opacity:1,scale:1});
		},
		onLineMouseLeave:function(childView) {
			TweenLite.set(childView.$el,{zIndex:0});
			TweenLite.to(childView.$el,.3,{scale:1});
			TweenLite.to(childView.$el.find('.logo'),.3,{opacity:0,scale:0});
		}
	});

	return LinesView;
});