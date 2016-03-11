var app=angular.module("autocomplete",[]);app.directive("autocomplete",function(){var a=-1;return{restrict:"E",scope:{searchParam:"=ngModel",suggestions:"=data",onType:"=onType",onSelect:"=onSelect",autocompleteRequired:"="},controller:["$scope",function(a){a.selectedIndex=-1,a.initLock=!0,a.setIndex=function(b){a.selectedIndex=parseInt(b)},this.setIndex=function(b){a.setIndex(b),a.$apply()},a.getIndex=function(b){return a.selectedIndex};var b=!0;a.completing=!1,a.$watch("searchParam",function(c,d){d===c||!d&&a.initLock||(b&&"undefined"!=typeof a.searchParam&&null!==a.searchParam&&(a.completing=!0,a.searchFilter=a.searchParam,a.selectedIndex=-1),a.onType&&a.onType(a.searchParam))}),this.preSelect=function(c){b=!1,a.$apply(),b=!0},a.preSelect=this.preSelect,this.preSelectOff=function(){b=!0},a.preSelectOff=this.preSelectOff,a.select=function(c){c&&(a.searchParam=c,a.searchFilter=c,a.onSelect&&a.onSelect(c)),b=!1,a.completing=!1,setTimeout(function(){b=!0},1e3),a.setIndex(-1)}}],link:function(b,c,d){setTimeout(function(){b.initLock=!1,b.$apply()},250);var e="";b.attrs={placeholder:"start typing...","class":"",id:"",inputclass:"",inputid:""};for(var f in d)e=f.replace("attr","").toLowerCase(),0===f.indexOf("attr")&&(b.attrs[e]=d[f]);d.clickActivation&&(c[0].onclick=function(a){b.searchParam||setTimeout(function(){b.completing=!0,b.$apply()},200)});var g={left:37,up:38,right:39,down:40,enter:13,esc:27,tab:9};document.addEventListener("keydown",function(a){var c=a.keyCode||a.which;switch(c){case g.esc:b.select(),b.setIndex(-1),b.$apply(),a.preventDefault()}},!0),document.addEventListener("blur",function(a){setTimeout(function(){b.select(),b.setIndex(-1),b.$apply()},150)},!0),c[0].addEventListener("keydown",function(c){var d=c.keyCode||c.which,e=angular.element(this).find("li").length;if(b.completing&&0!=e)switch(d){case g.up:if(a=b.getIndex()-1,-1>a)a=e-1;else if(a>=e){a=-1,b.setIndex(a),b.preSelectOff();break}b.setIndex(a),-1!==a&&b.preSelect(angular.element(angular.element(this).find("li")[a]).text()),b.$apply();break;case g.down:if(a=b.getIndex()+1,-1>a)a=e-1;else if(a>=e){a=-1,b.setIndex(a),b.preSelectOff(),b.$apply();break}b.setIndex(a),-1!==a&&b.preSelect(angular.element(angular.element(this).find("li")[a]).text());break;case g.left:break;case g.right:case g.enter:case g.tab:a=b.getIndex(),-1!==a?(b.select(angular.element(angular.element(this).find("li")[a]).text()),d==g.enter&&c.preventDefault()):d==g.enter&&b.select(),b.setIndex(-1),b.$apply();break;case g.esc:b.select(),b.setIndex(-1),b.$apply(),c.preventDefault();break;default:return}})},template:'        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">          <input            type="text"            ng-model="searchParam"            placeholder="{{ attrs.placeholder }}"            class="{{ attrs.inputclass }}"            id="{{ attrs.inputid }}"            ng-required="{{ autocompleteRequired }}" />          <ul ng-show="completing && (suggestions | filter:searchFilter).length > 0">            <li              suggestion              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"              index="{{ $index }}"              val="{{ suggestion }}"              ng-class="{ active: ($index === selectedIndex) }"              ng-click="select(suggestion)"              ng-bind-html="suggestion | highlight:searchParam"></li>          </ul>        </div>'}}),app.filter("highlight",["$sce",function(a){return function(b,c){if("function"==typeof b)return"";if(c){var d="("+c.split(/\ /).join(" |")+"|"+c.split(/\ /).join("|")+")",e=new RegExp(d,"gi");d.length&&(b=b.replace(e,'<span class="highlight">$1</span>'))}return a.trustAsHtml(b)}}]),app.directive("suggestion",function(){return{restrict:"A",require:"^autocomplete",link:function(a,b,c,d){b.bind("mouseenter",function(){d.preSelect(c.val),d.setIndex(c.index)}),b.bind("mouseleave",function(){d.preSelectOff()})}}});