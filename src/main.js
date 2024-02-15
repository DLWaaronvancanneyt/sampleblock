require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('title-id').value = title;
	document.getElementById('image-width-id').value = width;
	document.getElementById('image-height-id').value = height;
	document.getElementById('zoom-level-id').value = zoom;
}

function paintSliderValues () {
	document.getElementById('image-width-id-val').innerHTML = document.getElementById('image-width-id').value;
	document.getElementById('image-height-id-val').innerHTML = document.getElementById('image-height-id').value;
	document.getElementById('zoom-level-id-val').innerHTML = document.getElementById('zoom-level-id').value;
}

function paintMap() {
	console.log('painting map');
	title = document.getElementById('title-id').value;
	width = document.getElementById('image-width-id').value;
	height = document.getElementById('image-height-id').value;
	zoom = document.getElementById('zoom-level-id').value;

	sdk.setContent(
		'<h1>'+title+'</h1>' +
		'<p>h1 will be a dynamic component, when you change the title on the lift it will apear on the right</p>'+
		'<p>'+width+'</p>' +
		'<p>'+height+'</p>' +
		'<p>'+zoom+'</p>'
	);
	sdk.setData({
		title: address,
		width: width,
		height: height,
		zoom: zoom
	});
}

sdk.getData(function (data) {
	title = data.title || '';
	width = data.width || 400;
	height = data.height || 300;
	zoom = data.zoom || 15;
	paintSettings();
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
