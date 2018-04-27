"use strict";var wapConsoleStyle="\n.wap-console-wrap{position:fixed;z-index:9999;padding:2vw;top:2vw;left:2vw;right:2vw;bottom:2vw;background:rgba(0,0,0,0.5);border:2px solid #097125;color:#fff;overflow:hidden;box-sizing:border-box}.wap-console-wrap *{margin:0;padding:0;box-sizing:border-box}.wap-console-wrap.min{width:2vw;height:2vw}.wap-console-wrap.hide{display:none}.wap-console-wrap .fr{float:right}.wap-console-wrap .console-input{display:block;padding:1vw;width:100%;height:300px;color:#fff;background:transparent;border:0;border-top:2px solid #097125;outline:0;resize:none}.wap-console-wrap .console-input::placeholder{color:#fff}.wap-console-wrap .console-output{max-height:80%;overflow-y:scroll}.wap-console-wrap .console-output::-webkit-scrollbar{width:4px}.wap-console-wrap .console-output .input-log,.wap-console-wrap .console-output .output-log{position:relative;padding-left:30px;line-height:2}.wap-console-wrap .console-output .input-log:before,.wap-console-wrap .console-output .output-log:before{content:'';position:absolute;top:0.5em;width:0.8em;height:0.8em;border:2px solid #097125;transform:rotate(45deg)}.wap-console-wrap .console-output .input-log:before{left:0;border-color:#097125 #097125 transparent transparent}.wap-console-wrap .console-output .output-log{border-bottom:1px solid rgba(9,113,37,0.5)}.wap-console-wrap .console-output .output-log:before{left:0.5em;border-color:transparent transparent #097125 #097125}.wap-console-wrap .console-output .output-log .undefined,.wap-console-wrap .console-output .output-log .null{opacity:0.5}.wap-console-wrap .console-output .output-log .number{color:purple}.wap-console-wrap .opt-wrap{padding:10px 0}.wap-console-wrap .opt-wrap .btn{padding:0 10px;font-size:1.2em;color:#fff;border:2px solid #097125;border-radius:6px;background:transparent;outline:0}\n",wapConsoleHTML='\n<div class="console-output" id="console-output"></div>\n<div class="opt-wrap">\n    <button class="btn run">Run</button>\n    <button class="btn min">Min</button>\n    <button class="btn prev">↑</button>\n    <button class="btn next">↓</button>\n    <button class="btn close fr">Close</button>\n    <button class="btn clear fr">Clear</button>\n</div>\n<textarea class="console-input" placeholder="input some code..."></textarea>\n',_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_createClass=function(){function n(o,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(o,n.key,n)}}return function(o,t,e){return t&&n(o.prototype,t),e&&n(o,e),o}}();function _classCallCheck(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}var WapConsole=function(){function WapConsole(){_classCallCheck(this,WapConsole),this.history=[],this.historyIndex=null,this.wrap=document.querySelector(".wap-console-wrap"),this.wrap||this.init(),this.input=this.wrap.querySelector(".console-input"),this.output=this.wrap.querySelector(".console-output"),this.addEventListener()}return _createClass(WapConsole,null,[{key:"logType",get:function(){return{input:0,output:1}}}]),_createClass(WapConsole,[{key:"init",value:function(){var o=this.wrap=document.createElement("div");o.className="wap-console-wrap",o.innerHTML=wapConsoleHTML,document.body.appendChild(o);var t=document.createElement("style");t.innerText=wapConsoleStyle,document.head.appendChild(t)}},{key:"addEventListener",value:function(){var o=this,t=this.wrap;t.addEventListener("click",function(){t.classList.contains("min")&&o.max()},!0),t.querySelector(".run").addEventListener("click",this.run.bind(this)),t.querySelector(".clear").addEventListener("click",this.clear.bind(this)),t.querySelector(".min").addEventListener("click",this.min.bind(this)),t.querySelector(".close").addEventListener("click",this.close.bind(this)),t.querySelector(".prev").addEventListener("click",this.prev.bind(this)),t.querySelector(".next").addEventListener("click",this.next.bind(this)),this._overwriteSystemConsoleLog()}},{key:"run",value:function run(){var code=this.input.value;this._addHistory(code),this.input.value="",this.console(WapConsole.logType.input,code);var result=eval(code);this.console(WapConsole.logType.output,result)}},{key:"_addHistory",value:function(o){this.history[this.history.length-1]!==o&&this.history.push(o),this.historyIndex=null}},{key:"clear",value:function(){this.output.innerHTML=""}},{key:"min",value:function(){this.wrap.classList.add("min")}},{key:"max",value:function(){this.wrap.classList.remove("min")}},{key:"prev",value:function(){if(null===this.historyIndex&&0<this.history.length)this.historyIndex=this.history.length-1;else{if(!(0<this.historyIndex))return;this.historyIndex--}this.input.value=this.history[this.historyIndex]}},{key:"next",value:function(){null!==this.historyIndex&&this.historyIndex<this.history.length-1&&(this.historyIndex++,this.input.value=this.history[this.historyIndex])}},{key:"close",value:function(){this.wrap.classList.add("hide")}},{key:"console",value:function(o){var t=document.createElement("div");o===WapConsole.logType.input?t.className="input-log":t.className="output-log";for(var e=arguments.length,n=Array(1<e?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];t.innerHTML=WapConsole._createHtml.apply(WapConsole,n),this.output.appendChild(t),this.output.scrollTop=this.output.scrollHeight}},{key:"_overwriteSystemConsoleLog",value:function(){var n=this,s=console.log;console.log=function(){for(var o=arguments.length,t=Array(o),e=0;e<o;e++)t[e]=arguments[e];n.console.apply(n,[WapConsole.logType.output].concat(t)),s.apply(void 0,t)}}}],[{key:"_createHtml",value:function(){for(var o=arguments.length,t=Array(o),e=0;e<o;e++)t[e]=arguments[e];return t.map(function(o){return'<span class="'+(void 0===o?"undefined":_typeof(o))+'">'+o+"</span>"}).join(" ")}}]),WapConsole}();