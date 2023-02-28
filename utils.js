/* 
Codigo reducido
inspirado en p5js
*/
let frame = 0,
	__looping = true,
	mouseX = 0,
	mouseY = 0,
	width = 0,
	height = 0,
	KEY = null,
	touches = [],
	keyIsPressed = false,
	ARROW_UP = "ArrowUp",
	ARROW_LEFT = "ArrowLeft",
	ARROW_RIGHT = "ArrowRight",
	ARROW_DOWN = "ArrowDown",
	__currentCanvas;
// Common
function setCanvas(c) {
	__currentCanvas = c;
}
// JS Math
const PI = Math.PI,
	TAU = Math.PI * 2,
	sin = Math.sin,
	floor = Math.floor,
	round = Math.round,
	cos = Math.cos;
// Init core
(function () {
	"use strict";
	// Animation frame ----------------------------------------------
	window.requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.cancelAnimationFrame =
		window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	// ---------------------------------------------------------------

	// SETUP
	function _setup() {
		const to = setInterval(function () {
			if (typeof setup === "function") {
				try {
					setup();
				} catch (e) {
					console.error(e);
				}
				// Init functions
				if (__currentCanvas) {
					width = __currentCanvas.width;
					height = __currentCanvas.height;
				}else{
                    console.warn("No canvas data. Use 'setCanvas(c)' in setup()");
                }
				_winResize();
				_draw();
				_keyDown();
				_keyUp();
				_mouseMove();
				_touchStart();
				_touchMove();
				_touchEnd();
				// Clear interval
				clearInterval(to);
			}
		}, 100);
	}

	// DRAW
	function _draw() {
		try {
			if (typeof draw === "function") {
				frame++;
				draw();
			}
			if (__looping) {
				window.requestAnimationFrame(_draw);
			}
		} catch (e) {
			console.error(e);
		}
	}

	//
	function _mouseMove() {
		try {
			if (__currentCanvas) {
				window.addEventListener("mousemove", (evt) => {
					var rect = __currentCanvas.getBoundingClientRect();
					mouseX = evt.clientX - rect.left;
					mouseY = evt.clientY - rect.top;
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
	function _touchStart() {
		try {
			if (__currentCanvas) {
				window.addEventListener("touchstart", (evt) => {
					touches = evt.touches;
					if (typeof onTouchStart === "function") {
						onTouchStart(evt);
					}
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
	function _touchEnd() {
		try {
			if (__currentCanvas) {
				window.addEventListener("touchend", (evt) => {
					if (typeof onTouchEnd === "function") {
						onTouchEnd(evt);
					}
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
	function _touchMove() {
		try {
			if (__currentCanvas) {
				window.addEventListener("touchmove", (evt) => {
					var rect = __currentCanvas.getBoundingClientRect();
					mouseX = evt.touches[0].clientX - rect.left;
					mouseY = evt.touches[0].clientY - rect.top;
					touches = evt.touches;
					if (typeof onTouchMove === "function") {
						onTouchMove(evt);
					}
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
	//
	function _keyDown() {
		try {
			window.addEventListener("keydown", (evt) => {
				if (typeof onKeyDown === "function") {
					onKeyDown(evt.key);
				}
				keyIsPressed = true;
				KEY = evt.key;
			});
		} catch (e) {
			console.error(e);
		}
	}
	function _keyUp() {
		try {
			window.addEventListener("keyup", (evt) => {
				if (typeof onKeyUp === "function") {
					onKeyUp(evt.key);
				}
				keyIsPressed = false;
				KEY = null;
			});
		} catch (e) {
			console.error(e);
		}
	}
	function _winResize() {
		try {
			if (typeof onResize === "function") {
				window.addEventListener("resize", (evt) => {
					if (__currentCanvas) {
						width = __currentCanvas.width;
						height = __currentCanvas.height;
					}
					onResize(evt);
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
	_setup();
})();
// function map(v, l1, h1, l2, h2) {
// 	return l2 + ((h2 - l2) * (v - l1)) / (h1 - l1);
// }
function snap(v, s) {
	return Math.floor(v / s) * s;
}
function cloneArray(arr) {
	return arr.slice(0);
}
function asFloat32Array(arr) {
	return new Float32Array(arr);
}
