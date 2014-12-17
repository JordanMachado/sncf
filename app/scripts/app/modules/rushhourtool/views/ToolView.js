define([
	'marionette',
	'./ZoneView',
	'text!../templates/ToolViewTemplate.tpl',
	'app/App',
	'styl',
	'app/utils/DataManager',
	'TweenMax',
	'countUp'

], function(Marionette, ZoneView, template, App, styl, DataManager, TweenMax, CountUp) {
	var ZonesView = Backbone.Marionette.ItemView.extend({
		initialize: function(options) {
			console.log('ToolView template');
			console.log(options);
			this.lineId = options.lineId;
			this.gareId = options.gareId;
			this.$el.addClass(this.lineId);

			var date = new Date();
			this.currentHourInMin = date.getHours() * 60 + date.getMinutes();
			var crowdInfo = DataManager.getCrowdInfos(this.currentHourInMin, this.gareId, this.lineId);
			this.lastCrowdCount = crowdInfo.crowdCount;


		},
		serializeData: function() {
			return {
				gareName: DataManager.getGareNameByGareId(this.gareId),
				currentHourInMin: this.currentHourInMin
			};
		},
		onRender: function(view) {
			App.trigger('hide:loader');
			styl.inject('input[type=range]::-webkit-slider-thumb:after, input[type=range]::-ms-thumb:after, input[type=range]::-moz-range-thumb:after', {
				content: "'" + this.getMinueteToTime(this.currentHourInMin) + "'"
			}).apply();
		},
		onShow: function(view) {

			this.$el.find('.gareName').css({
				top: $(window).height() / 1.4 - this.$el.find('.gareName').outerHeight()
			});
			this.$el.find('.gareName').addClass('active');
			this.changeBackgroundColor($('.slider').val())
		},
		onResize: function() {
			console.log('onResize')
			this.$el.find('.gareName').animate({
				top: $(window).height() / 1.4 - this.$el.find('.gareName').outerHeight()
			}, 50);
		},
		className: 'toolView',
		template: _.template(template),
		events: {
			'mousemove .slider': 'onValueChange'
		},
		/*
		 * Litle trick with mousemove for getting the value while user change
		 */
		onValueChange: function(e) {
			if (e.currentTarget.value == this.currentHourInMin) return;
			styl.inject('input[type=range]::-webkit-slider-thumb:after, input[type=range]::-ms-thumb:after, input[type=range]::-moz-range-thumb:after', {
				content: "'" + this.getMinueteToTime(e.currentTarget.value) + "'"
			}).apply();
			this.currentHourInMin = e.currentTarget.value;
			this.changeBackgroundColor(this.currentHourInMin);
		},
		changeBackgroundColor: function(currentTime) {

			var crowdInfo = DataManager.getCrowdInfos(currentTime, this.gareId, this.lineId);
			
			TweenLite.to(this.$el.find('.crowdFilter'), .3, {
				backgroundColor: crowdInfo.color
			});
			var options = {
				  useEasing : true, 
				  useGrouping : true, 
				  separator : '', 
				  prefix : '' ,
				  suffix : '' 
			}
			var demo = new countUp('count', this.lastCrowdCount, crowdInfo.crowdCount, 0, 1, options);
			demo.start();
			this.lastCrowdCount = crowdInfo.crowdCount;

		},

		getMinueteToTime: function(minutes) {

			var min = minutes % 60;
			var hour = (minutes / 60).toFixed(0);
			if (min == 0) {
				min = '00';
			} else if (min < 10) {
				min = '0' + min;
			}
			if (hour >= 24) {
				hour = hour - 24;
			}

			return hour + "h" + min;
		}
	});

	return ZonesView;
});