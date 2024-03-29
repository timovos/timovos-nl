/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

!function($){$.extend($.ui.tabs.prototype,{rotation:null,rotationDelay:null,continuing:null,rotate:function(ms,continuing){var self=this,o=this.options;(1<ms||null===self.rotationDelay)&&void 0!==ms&&(self.rotationDelay=ms),void 0!==continuing&&(self.continuing=continuing);var rotate=self._rotate||(self._rotate=function(e){clearTimeout(self.rotation),self.rotation=setTimeout(function(){var t=o.active;self.option("active",++t<self.anchors.length?t:0)},ms),e&&e.stopPropagation()}),stop=self._unrotate||(self._unrotate=continuing?function(e){t=o.active,rotate()}:function(e){e.clientX&&self.rotate(null)});return ms?(this.element.bind("tabsactivate",rotate),this.anchors.bind(o.event+".tabs",stop),rotate()):(clearTimeout(self.rotation),this.element.unbind("tabsactivate",rotate),this.anchors.unbind(o.event+".tabs",stop),delete this._rotate,delete this._unrotate),1===ms&&(ms=self.rotationDelay),this},pause:function(){this.options;this.rotate(0)},unpause:function(){this.options;this.rotate(1,this.continuing)}})}(jQuery);