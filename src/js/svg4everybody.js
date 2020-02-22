!function(a, b) {
	`function` === typeof define && define.amd ? define([], function() {
		return a.svg4everybody = b()
		;
	}) : `object` === typeof exports ? module.exports = b() : a.svg4everybody = b()
	;
}(this, function() {
	function a(a, b) {
		if (b) {
			let c = !a.getAttribute(`viewBox`) && b.getAttribute(`viewBox`); let d = document.createDocumentFragment(); let e = b.cloneNode(!0); for (c && a.setAttribute(`viewBox`, c); e.childNodes.length;) {
				d.appendChild(e.firstChild);
			} a.appendChild(d)
			;
		}
	} function b(b) {
		b.onreadystatechange = function() {
			if (b.readyState === 4) {
				let c = document.createElement(`x`); c.innerHTML = b.responseText, b.s.splice(0).map(function(b) {
					a(b[0], c.querySelector(`#` + b[1].replace(/(\W)/g, `\\$1`)))
					;
				})
				;
			}
		}, b.onreadystatechange()
		;
	} function c(c) {
		function d() {
			for (var c; c = e[0];) {
				let j = c.parentNode; if (j && /svg/i.test(j.nodeName)) {
					let k = c.getAttribute(`xlink:href`); if (f && (!g || g(k, j, c))) {
						let l = k.split(`#`); let m = l[0]; let n = l[1]; if (j.removeChild(c), m.length) {
							let o = i[m] = i[m] || new XMLHttpRequest(); o.s || (o.s = [], o.open(`GET`, m), o.send()), o.s.push([j, n]), b(o)
							;
						} else {
							a(j, document.getElementById(n));
						}

					}
				}
			}h(d, 17)
			;
		}c = c || {}; var e = document.getElementsByTagName(`use`); var f = `shim` in c ? c.shim : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537; var g = c.validate; var h = window.requestAnimationFrame || setTimeout; var i = {}; f && d()
		;
	} return c
	;
});
