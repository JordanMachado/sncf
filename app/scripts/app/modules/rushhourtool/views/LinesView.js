define([
	'marionette',
	'../RushHourTool',
	'./LineView',
	'TweenMax',
	'TimeLineLite',
	'app/App'
], function(Marionette, RushHourTool, LineView , TweenMax ,TimeLineLite, App) {

	var LinesView = Marionette.CollectionView.extend({

		childView: LineView,
		className:'linesContainer',
		childViewOptions: function(line){
			//console.log(line.get('ligne'))
    		return {
    			numberOfLine: RushHourTool.numberOfLine,
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
			tl.to(childView.$el.find('p'),.5,{y:-childView.$el.find('p').offset().top/2+20,onComplete:function(){
				App.navigate('line/'+datas.model.get('id'),{trigger:true})
			}});
		},
		onLineMouseEnter:function(childView) {
			TweenLite.set(childView.$el,{zIndex:10});
			TweenLite.to(childView.$el,.5,{scale:2});
			TweenLite.to(childView.$el.find('p'),.5,{opacity:1,scale:1});
		},
		onLineMouseLeave:function(childView) {
			TweenLite.set(childView.$el,{zIndex:0});
			TweenLite.to(childView.$el,.3,{scale:1});
			TweenLite.to(childView.$el.find('p'),.3,{opacity:0,scale:0});
		}
	});

	return LinesView;
});