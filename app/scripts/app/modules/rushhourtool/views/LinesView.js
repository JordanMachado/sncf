define([
	'marionette',
	'../RushHourTool',
	'./LineView',
	'TweenMax',
	'TimeLineLite'
], function(Marionette, RushHourTool, LineView , TweenMax ,TimeLineLite) {

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
				console.log(e);

			})
			// this.on('childview:click:yo',function(){
			// 	console.log('fdp')
			// })
			//this.off('childview:click:yo')

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
			tl.to(childView.$el.find('p'),.5,{y:-childView.$el.find('p').offset().top/2+20});
			tl.staggerTo(childView.$el.find('.zonesContainer li'),.5,{opacity:1,onComplete:function(){
				//RushHourTool.trigger('line:click',{lineId:lineId});

			}},0.2);
			// this.stopListening();
 		 //delete this.childEvents.click;

   //      this.delegateEvents();
   			console.log(childView);
   			
   			//this.stopListening(childView,this.childEvents[0]);
   			//console.log(this.childEvents)
   			this.stopListening(childView,null,function(){
   				console.log('youpi')
   			})

   			//this.childView.off('click:yo')



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