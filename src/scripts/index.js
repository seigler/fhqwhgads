(function () {
	var brightness = 0, commandLine, commandInput, scanlines, commandHistory, typing;

	var escapeHTML = function (html) {
		var fn = function (tag) {
			var charsToReplace = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&#34;'
			};
			return charsToReplace[tag] || tag;
		};
		return html.replace(/[&<>"]/g, fn);
	};

	var syncTyping = function () {
		var beforeSelection, selection, afterSelection;
		beforeSelection = this.value.slice(0, this.selectionStart);
		selection = this.value.slice(this.selectionStart, this.selectionEnd);
		afterSelection = this.value.slice(this.selectionEnd);
		typing.innerHTML = beforeSelection + (this.selectionStart === this.selectionEnd ? "<span id='cursor'></span>" : "") + "<span id='selection'>" + selection + "</span>" + afterSelection;
	};

	var alterBrightness = function (delta) {
		brightness = Math.max(0, Math.min(1, brightness + delta));
		this.scanlines.style.backgroundColor = "hsla(120, 100%, 32%, " + brightness * 0.6 + ")";
	};


	var setInputEnabled = function (enabled) {
		console.log(enabled);
		if (enabled) {
			commandInput.readOnly = false;
			commandLine.style.display = 'block';
		} else {
			commandInput.readOnly = true;
			commandInput.value = '';
			typing.innerHTML = '';
			commandLine.style.display = 'none';
		}
	};

	var showResponse = function (response) {
		commandHistory.innerHTML += response + '\n';
		setInputEnabled(true);
	};

	var handleForm = function () {
		var val = this.command.value;
		setInputEnabled(false);
		commandHistory.innerHTML += 'a&gt;' + escapeHTML(val) + '\n';
		setTimeout(function() { showResponse('Command not found.'); }, 500);
		return false;
	};

	var init = function() {
		console.log('init');
		commandLine = document.getElementById("commandLine");
		commandInput = document.getElementById("command");
		scanlines = document.getElementById("scanlines");
		commandHistory = document.getElementById("history");
		typing = document.getElementById("typing");

		commandInput.value = "";
		commandInput.oninput = syncTyping;
		commandInput.onkeydown = syncTyping;
		commandInput.onkeyup = syncTyping;
		commandInput.onselect = syncTyping;
		commandInput.onfocus = syncTyping;
		commandInput.focus();
		document.body.onmousedown = function() {
			commandInput.focus();
			return false;
			// a little heavy handed, but works for now
		};
		document.getElementById("knobup").onmousedown = function() {
			alterBrightness(1.0/6);
		};
		document.getElementById("knobdown").onmousedown = function() {
			alterBrightness(-1.0/6);
		};
		document.forms[0].onsubmit = handleForm;

		alterBrightness(-1);
	};

	document.addEventListener("DOMContentLoaded", init);
}());
