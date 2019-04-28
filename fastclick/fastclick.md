## 为什么要用？
- 移动设备上的浏览器默认会在用户点击屏幕大约300ms后才触发点击事件，因为移动到会有双击缩放功能，所以需要判断是双击还是单击。
- 会出现用户体验差，或点击穿透的问题。
- 事件触发的顺序：
  - touchstart
  - touchmove
  - touchend
  - mouserover
  - mouseenter
  - mousedown
  - click
## 原理：
- 利用touch事件没有300m延迟的特性，在touchend触发时主动触发一次click事件，同时阻止浏览器300ms后的click。
## 哪些情况不需要用？
- PC 浏览器
- Android版Chrome 32+浏览器，如果设置viewport meta的值为width=device-width，这种情况下浏览器会马上出发点击事件，不会延迟300毫秒。
```<meta name="viewport" content="width=device-width, initial-scale=1">```
- 所有版本的Android Chrome浏览器，如果设置viewport meta的值有user-scalable=no，浏览器也是会马上出发点击事件。
- IE11+浏览器设置了css的属性touch-action: manipulation，它会在某些标签（a，button等）禁止双击事件，IE10的为-ms-touch-action: manipulation
## 使用方法：
	```
	import FastClick from 'fastclick'
	FastClick.attach(document.body)
	```
## node:
- 立即执行函数构建独立空间作用域。
- 最开始的分号，防止前面代码没有写分号，解析出错。
- 注释，在函数前面注释，说明用途和参数的含义，在函数内注释，说明意图就可以。
	 - 	
	 /**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
- Node.prototype.removeEventListener------?
- navigator.userAgent
- 手机设备判断：
- 为一个元素添加onclick事件，要考虑这个元素上面是否有onclick事件，如果有，先将他对应的时间添加到AddEventListener里面，再把onclick清空，即设置为null，因为onclick事件只能执行一个事件函数，AddEventListener，可以执行多个事件函数。
- needsClick：是否需要浏览器原生的click事件，对于disable的textarea，和input， 还有 input的type为file且为ios6，video标签，直接返回true，其他根据class中是否有needsClick 关键字判断。
- needsFocus：该函数的目的是确认是否需要利用focus来模拟click事件。对于一些不能focus的元素返回false，还有textarea、input的有些type， 会返回true，其他用className判断。
- document.activeElement -- 获得当前获得焦点的元素。安卓有些设备获得焦点的元素必须得blur了才可以click。document.activeElement.blur()
- element.scrollTop， 元素滚动条内的顶部隐藏部分的高度。
- setSelectionRange方法作用在input标签上，可以为当前元素设定被选中范围。
- 自定义事件方法：
		clickEvent = document.createEvent('MouseEvents');
		// initMouseEvent 该特性已经从 Web 标准中删除
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		// 给这个事件加的标签，方便跟踪。
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
- 现在比较推荐的自定义事件方法：
	```
	//直接用构造函数
	var event = new Event('build');
	// Listen for the event.
	elem.addEventListener('build', function (e) { ... }, false);
	// Dispatch the event.
	elem.dispatchEvent(event);
	```
- getTargetElementFromEventTarget， 用于获取目标元素，如果是文本节点，需要返回event.parentNode。
- onTouchStart：
	 - 如果是多点触摸（判断，event.targetTouches.length > 1），直接返回。
	 - event.targetTouches 里面包含对象的属性：
	 	 - clientX、clientY：触摸点在浏览器窗口中的横/纵坐标。
		 - pageX、pageY：触摸点在页面中的横/纵坐标。  // 用的比较多
		 - screenX、screenY：触摸点在屏幕中横/纵坐标。
		 - identifier：触摸点唯一标识ID
	 - window.getSelection()方法可以返回一个Selection对象，用于表示用户选择的文本范围或插入符的当前位置。只有受信任的事件才会取消选择iOS上的文本
	 - updateScrollParent， 如果target是可滚动图层的子元素，触发该元素的事件要确保不触发 父元素的滚动。
	 - event.timeStamp 事件属性可返回一个时间戳。指示发生事件的日期和时间
	 - 如果两次touch之间的间隔太短，阻止touch的默认事件。
- touchHasMoved：
	 - 如果横向或纵向移动的距离大于设定的值，就返回true。
- onTouchMove：
	 - 如果元素已经移动了或者targetElement 不是事件触发的元素，将targetment 设置为null， trackingClick 设置为false，并返回true
- findControl：
	 - element.control , 是H5新增加的表单属性。在标签内部放置一个表单元素，并且通过该标签的control属性来访问该表单元素。
	 ```
	 <form action="" method="post">
		<label id="label">
			邮编:
			<input type="text" name="text"value="" maxlength="6">
			<small>请输入六位数字</small>
		</label>
		<input type="button" value="设置默认值" onclick="setValue()">
	</form>
	<script type="text/javascript">
		function setValue(){
			var label = document.getElementById('label');
			var textbox = label.control;
			textbox.value='10010';
		}
	</script>
	 ```
	 - element.htmlFor,设置或返回 lable 的 for 属性的值。for 属性指定 label 要绑定到哪一个表单元素。
- onTouchEnd:
	- document.elementFromPoint(x, y),x 和 y 是坐标数值, 不需要单位比如px, 返回当前文档上处于指定坐标位置最顶层的元素, 坐标是相对于包含该文档的浏览器窗口的左上角为原点来计算的, 通常 x 和 y 坐标都应为正数.
	 - 如果点击的是label标签，targetelement应该是label对应的表单元素。
	 - this.lastClickTime，上一次点击后的时间戳，this.trackingClickStart，本次点击开始的时间。阻止快速双击，超时就不进行click模拟了， 走原生流程。
	 - 不需要原生的click事件的元素，阻止其他默认事件，并发送模拟的click。
## 源码解析
```
// 构造函数
function FastClick(layer, options) {
		var oldOnClick;
		options = options || {};
		this.trackingClick = false; 
		this.trackingClickStart = 0;
		this.targetElement = null;
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.lastTouchIdentifier = 0;
		this.layer = layer;
		// 下面这些参数，不建议自定义覆盖，大幅度修改可能让整个库的功效大打折扣。
		this.touchBoundary = options.touchBoundary || 10;
		this.tapDelay = options.tapDelay || 200;
		this.tapTimeout = options.tapTimeout || 700;
		// 不需要 fastclick 的浏览器会直接return 掉， 不会执行下面的所有代码。
		if (FastClick.notNeeded(layer)) {
			return;
		}
		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}
		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		// 将所有的 方法的 this 绑定到 该实例上。
		// 为什么要绑定呢？ 因为这些事件最后都会被添加到元素的事件上，在事件函数中，this指向绑定的元素，所以要先绑定在该实例上，以后就不会变了。
		// 这些方法在后面都会定义的。
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		// 为layer 添加mouse 事件，触发时执行 this 对应的事件，事件冒泡。
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// 有一些浏览器不支持 stopImmediatePropagation 方法，这里是修复。
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// 如果已经存在onclick事件，需先用 addEventListener 绑定事件并清空。
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}
```
```
// 定义一些手机型号的判断结果
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

```
```
// 判断元素是否需要原生的click事件。
FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}
		// 如果没有意外情况，检测是不是有needsclick的class，确定是不是需要。
		return (/\bneedsclick\b/).test(target.className);
	};

```
```
// 是否需要利用focus来模拟click事件。对于一些不能focus的元素返回false，还有textarea、input的有些type， 会返回true，其他用className判断。
FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};
```
```
// 自定义并发送 clickEvent事件。
FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;
		// 一些安卓设备，active的元素需要先blur。
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}
		touch = event.changedTouches[0];
		// 自定义‘clickEvent’事件
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};
```
```
// 确定事件类型，安卓设备上，select标签没有click事件，使用mousedown事件。
	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};
```
```
// 为元素绑定 foucs 事件。
	FastClick.prototype.focus = function(targetElement) {
		var length;
		// IOS7 设备，某些input标签，无法获取 selectionStart和selectionEnd 属性，只需要检测类型。setSelectionRange方法作用在input标签上，可以为当前元素设定被选中范围。
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

```
```
// 跟新滚动的父元素。为 scrollParent.fastClickLastScrollTop 设置隐藏的高度。
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;
		// 检查目标元素是否包含在某个 scrollable 元素内。一直向上递归检查，直到根元素
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			 // 判断元素的父元素，
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// element.scrollTop， 元素滚动条内的顶部隐藏部分的高度。
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};
```
```
// 获取目标元素，文字节点 的目标元素是父节点
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

```
```
// touchstart 事件。 
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;
		 // 应该忽略 多点触摸 事件
		if (event.targetTouches.length > 1) {
			return true;
		}
		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];
		if (deviceIsIOS) {
			// Only trusted events will deselect text on iOS (issue #49)
			//  window.getSelection()方法可以返回一个Selection对象，用于表示用户选择的文本范围或插入符的当前位置。
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}
			if (!deviceIsIOS4) {
			 	// ios4 上面的兼容
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}
				this.lastTouchIdentifier = touch.identifier;
				this.updateScrollParent(targetElement);
			}
		}
		this.trackingClick = true;
		// event.timeStamp 事件属性可返回一个时间戳。指示发生事件的日期和时间
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;
		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;
		// 阻止快速双击事件
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}
		return true;
	};

```
```
// touchhasmoved 事件。如果横向/纵向移动太大，则返回true，否则返回false
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;
		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}
		return false;
	};
```
```
// touchmove 事件。如果 trackingClick为false 返回true， 如果目标元素与事件元素不同或元素已经移动了，将 trackingClick 置为false， targetElement 置为null。
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};
```
```
// findControl，返回label 对应的元素。
	FastClick.prototype.findControl = function(labelElement) {
		// element.control , 是H5新增加的表单属性。在标签内部放置一个表单元素，并且通过该标签的control属性来访问该表单元素。
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}
		// element.htmlFor,设置或返回 lable 的 for 属性的值。for 属性指定 label 要绑定到哪一个表单元素。
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};
```
```
// onTouchEnd 事件，
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}
		// 阻止快速双击
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}
		// 超时，执行原生click
		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;
		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;
		// 一些 ios 设备，正在执行 transition 或 scroll 的元素，事件的 targetElement无效，需要重新检测。
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];
			// 从位置获得元素。
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}
		// 对 label 元素 做处理。
		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				// 为元素 设置 focus。
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}
			this.focus(targetElement);
			this.sendClick(targetElement, event);
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}
		if (!this.needsClick(targetElement)) {
			event.preventDefault(); // 阻止之后的 click
			this.sendClick(targetElement, event); // 发送模拟的 click 事件
		}
		return false;
	};
```
```
// 取消点击事件 
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};
```
```
// 判断这次鼠标事件 是否有效。
	FastClick.prototype.onMouse = function(event) {
		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}
		// event.forwardedTouchEvent ， 给事件加的标记，方便跟踪
		if (event.forwardedTouchEvent) {
			return true;
		}

		// event 对象的 cancelable 事件，返回一个布尔值。如果用 preventDefault() 方法可以取消与事件关联的默认动作，则为 true，否则为 fasle。
		if (!event.cancelable) {
			return true;
		}
		// 不需要元素的click事件，或 已经取消了下次点击
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
			// 阻止冒泡，并阻止该事件的其他事件被调用。
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {
				event.propagationStopped = true;
			}
			event.stopPropagation();
			event.preventDefault();

			return false;
		}
		// 允许 mouse 事件
		return true;
	};
```
```
// click事件。
	FastClick.prototype.onClick = function(event) {
		var permitted;
		//1、出界会置为false，2成功模拟了一次完成tap并阻止click也会置为false，3、避免三方库影响
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18)
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}
		// 如果不允许鼠标事件， targetelement 置为 null，返回false， 如果允许鼠标事件，返回 true
		permitted = this.onMouse(event);
		if (!permitted) {
			this.targetElement = null;
		}
		return permitted;
	};
```
```
//  移除事件绑定。
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};
```
```
// 不需要 fastclick 的 情况
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;
		// 不支持 touch 事件
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};
```
``` 
// 执行构造函数初始化
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};
```
```
// 立即执行函数内部的。
	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
```
