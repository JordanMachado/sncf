define([
	'marionette',
	'./ZoneView',
	'text!../templates/ToolViewTemplate.tpl',
	'app/App',
	'styl',
	'app/utils/DataManager'

], function(Marionette, ZoneView, template, App, styl, DataManager) {
	var ZonesView = Backbone.Marionette.ItemView.extend({
		initialize: function(options) {
			console.log('ToolView template')
			this.$el.addClass(options.lineId);
			console.log(options)
			this.gareId = options.gareId;
			var date = new Date();
			this.hoursInMin = date.getHours()*60;

		},
		serializeData: function() {
			return {
				gareName: DataManager.getGareNameByGareId(this.gareId),
				currentHourInMin: this.hoursInMin
			};
		},
		onRender: function(view) {
			App.trigger('hide:loader');
			styl.inject('input[type=range]::-webkit-slider-thumb:after, input[type=range]::-ms-thumb:after, input[type=range]::-moz-range-thumb:after', {
				content: "'" + this.getMinueteToTime(this.hoursInMin) +"'"
			}).apply();
		},
		onShow: function(view){

			this.$el.find('.gareName').css({
				top: $(window).height() / 1.4 - this.$el.find('.gareName').outerHeight()
			});
			this.$el.find('.gareName').addClass('active');	
		},
		onResize: function() {
			console.log('onResize')
			this.$el.find('.gareName').animate({
				top: $(window).height() / 1.4 - this.$el.find('.gareName').outerHeight()
			}, 100);
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
			styl.inject('input[type=range]::-webkit-slider-thumb:after, input[type=range]::-ms-thumb:after, input[type=range]::-moz-range-thumb:after', {
				content: "'"+this.getMinueteToTime(e.currentTarget.value)+"'"
			}).apply();
		},
		getMinueteToTime: function(minutes) {

			var min = minutes % 60;
			var hour = (minutes/60).toFixed(0);

			if(min == 0) {
				min = '00';
			} else if(min<10) {
				min = '0'+min;
			}
			if(hour>=24) {
				hour = hour - 24;
			}

			return hour+"h"+min;
		}
	});

	return ZonesView;
});