/*! jQuery UI - v1.11.3 - 2015-02-12
 * http://jqueryui.com
 * Includes: widget.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){/*!
   * jQuery UI Widget 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r,l={},h=e.split(".")[0];return e=e.split(".")[1],n=h+"-"+e,s||(s=i,i=t.Widget),t.expr[":"][n.toLowerCase()]=function(e){return!!t.data(e,n)},t[h]=t[h]||{},o=t[h][e],a=t[h][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new a(t,e)},t.extend(a,o,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),r=new i,r.options=t.widget.extend({},r.options),t.each(s,function(e,s){return t.isFunction(s)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},n=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}()):void(l[e]=s)}),a.prototype=t.widget.extend(r,{widgetEventPrefix:o?r.widgetEventPrefix||e:e},l,{constructor:a,namespace:h,widgetName:e,widgetFullName:n}),o?(t.each(o._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,a,i._proto)}),delete o._childConstructors):i._childConstructors.push(a),t.widget.bridge(e,a),a},t.widget.extend=function(e){for(var s,n,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(s in o[a])n=o[a][s],o[a].hasOwnProperty(s)&&void 0!==n&&(t.isPlainObject(n)?e[s]=t.isPlainObject(e[s])?t.widget.extend({},e[s],n):t.widget.extend({},n):e[s]=n);return e},t.widget.bridge=function(e,s){var n=s.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return a?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")}):(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new s(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;o<s.length-1;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.delegate(c,h,r):i.bind(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}});t.widget}),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,i,s){"use strict";var n="tocify",o="tocify-focus",a="tocify-hover",r="tocify-hide",l="tocify-header",h="."+l,c="tocify-subheader",d="."+c,u="tocify-item",f="."+u,p="tocify-extend-page",g="."+p;t.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var i=this;i.tocifyWrapper=t(".tocify-wrapper"),i.extendPageScroll=!0,i.items=[],i._generateToc(),i.cachedHeights=[],i.cachedAnchors=[],i._addCSSClasses(),i.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),i._setEventHandlers(),t(e).load(function(){i._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){i.extendPageScroll=!1},0)})})},_generateToc:function(){var e,i,s=this,o=s.options.ignoreSelector;return e=-1!==this.options.selectors.indexOf(",")?t(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):t(this.options.context).find(this.options.selectors.replace(/ /g,"")),e.length?(s.element.addClass(n),void e.each(function(e){t(this).is(o)||(i=t("<ul/>",{id:l+e,"class":l}).append(s._nestElements(t(this),e)),s.element.append(i),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(s.options.selectors).length?t(this).filter(s.options.selectors).each(function(){t(this).is(o)||s._appendSubheaders.call(this,s,i)}):t(this).find(s.options.selectors).each(function(){t(this).is(o)||s._appendSubheaders.call(this,s,i)})}))})):void s.element.addClass(r)},_setActiveElement:function(t){var i=this,s=e.location.hash.substring(1),n=i.element.find("li[data-unique='"+s+"']");return s.length?(i.element.find("."+i.focusClass).removeClass(i.focusClass),n.addClass(i.focusClass),i.options.showAndHide&&n.click()):(i.element.find("."+i.focusClass).removeClass(i.focusClass),!s.length&&t&&i.options.highlightDefault&&i.element.find(f).first().addClass(i.focusClass)),i},_nestElements:function(e,i){var s,n,o;return s=t.grep(this.items,function(t){return t===e.text()}),s.length?this.items.push(e.text()+i):this.items.push(e.text()),o=this._generateHashValue(s,e,i),n=t("<li/>",{"class":u,"data-unique":o}).append(t("<a/>",{text:e.text()})),e.before(t("<div/>",{name:o,"data-unique":o})),n},_generateHashValue:function(t,e,i){var s="",n=this.options.hashGenerator;if("pretty"===n){for(s=e.text().toLowerCase().replace(/\s/g,"-"),s=s.replace(/[^\x00-\x7F]/g,"");s.indexOf("--")>-1;)s=s.replace(/--/g,"-");for(;s.indexOf(":-")>-1;)s=s.replace(/:-/g,"-")}else s="function"==typeof n?n(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(s+=""+i),s},_appendSubheaders:function(e,i){var s=t(this).index(e.options.selectors),n=t(e.options.selectors).eq(s-1),o=+t(this).prop("tagName").charAt(1),a=+n.prop("tagName").charAt(1);a>o?e.element.find(d+"[data-tag="+o+"]").last().append(e._nestElements(t(this),s)):o===a?i.find(f).last().after(e._nestElements(t(this),s)):i.find(f).last().after(t("<ul/>",{"class":c,"data-tag":o})).next(d).append(e._nestElements(t(this),s))},_setEventHandlers:function(){var n=this;this.element.on("click.tocify","li",function(i){if(n.options.history&&(e.location.hash=t(this).attr("data-unique")),n.element.find("."+n.focusClass).removeClass(n.focusClass),t(this).addClass(n.focusClass),n.options.showAndHide){var s=t('li[data-unique="'+t(this).attr("data-unique")+'"]');n._triggerShow(s)}n._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(n.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==n.options.theme&&t(this).removeClass(n.hoverClass)}}),t(e).on("resize",function(){n.calculateHeights()}),t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var o,a,r,l,h=t(e).scrollTop(),c=t(e).height(),d=t(i).height(),u=t("body")[0].scrollHeight;if(n.options.extendPage&&(n.webkit&&h>=u-c-n.options.extendPageOffset||!n.webkit&&c+h>d-n.options.extendPageOffset)&&!t(g).length){if(a=t('div[data-unique="'+t(f).last().attr("data-unique")+'"]'),!a.length)return;r=a.offset().top,t(n.options.context).append(t("<div />",{"class":p,height:Math.abs(r-h)+"px","data-unique":p})),n.extendPageScroll&&(l=n.element.find("li.active"),n._scrollTo(t("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var a,r=null;0==n.cachedHeights.length&&n.calculateHeights();var l=t(e).scrollTop();if(n.cachedAnchors.each(function(t){return n.cachedHeights[t]-l<0?void(r=t):!1}),a=t(n.cachedAnchors[r]).attr("data-unique"),o=t('li[data-unique="'+a+'"]'),n.options.highlightOnScroll&&o.length&&!o.hasClass(n.focusClass)){n.element.find("."+n.focusClass).removeClass(n.focusClass),o.addClass(n.focusClass);var h=n.tocifyWrapper,c=t(o).closest(".tocify-header"),d=c.offset().top,u=h.offset().top,f=d-u;if(f>=t(e).height()){var p=f+h.scrollTop();h.scrollTop(p)}else 0>f&&h.scrollTop(0)}n.options.scrollHistory&&e.location.hash!=="#"+a&&a!==s&&(history.replaceState?history.replaceState({},"","#"+a):(scrollV=i.body.scrollTop,scrollH=i.body.scrollLeft,location.hash="#"+a,i.body.scrollTop=scrollV,i.body.scrollLeft=scrollH)),n.options.showAndHideOnScroll&&n.options.showAndHide&&n._triggerShow(o,!0)},0)})})},calculateHeights:function(){var e=this;e.cachedHeights=[],e.cachedAnchors=[];var i=t(e.options.context).find("div[data-unique]");i.each(function(i){var s=(t(this).next().length?t(this).next():t(this)).offset().top-e.options.highlightOffset;e.cachedHeights[i]=s}),e.cachedAnchors=i},show:function(e,i){var s=this;if(!e.is(":visible"))switch(e.find(d).length||e.parent().is(h)||e.parent().is(":visible")?e.children(d).length||e.parent().is(h)||(e=e.closest(d)):e=e.parents(d).add(e),s.options.showEffect){case"none":e.show();break;case"show":e.show(s.options.showEffectSpeed);break;case"slideDown":e.slideDown(s.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(s.options.showEffectSpeed);break;default:e.show()}return e.parent().is(h)?s.hide(t(d).not(e)):s.hide(t(d).not(e.closest(h).find(d).not(e.siblings()))),s},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var i=this;return t.parent().is(h)||t.next().is(d)?i.show(t.next(d),e):t.parent().is(d)&&i.show(t.parent(),e),i},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(h+","+d).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=a),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var i=this,s=i.options.smoothScroll||0,n=i.options.scrollTo;return t("html, body").promise().done(function(){t("html, body").animate({scrollTop:t('div[data-unique="'+e.attr("data-unique")+'"]').next().offset().top-(t.isFunction(n)?n.call():n)+"px"},{duration:s})}),i}})});