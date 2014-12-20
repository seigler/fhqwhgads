(function(){
	function escapeHTML(html) {
		var fn=function(tag) {
			var charsToReplace = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&#34;'
			};
			return charsToReplace[tag] || tag;
		}
		return html.replace(/[&<>"]/g, fn);
	}

	function syncTyping() {
		var beforeSelection, selection, afterSelection;
		beforeSelection = this.value.slice(0, this.selectionStart);
		selection = this.value.slice(this.selectionStart, this.selectionEnd)
		afterSelection = this.value.slice(this.selectionEnd)
		document.getElementById("typing").innerHTML = beforeSelection + (this.selectionStart == this.selectionEnd ? "<span id='cursor'></span>" : "") + "<span id='selection'>" + selection + "</span>" + afterSelection;
	}
	var commandline = document.getElementById("command");
	commandline.value = "";
	commandline.focus();
	commandline.onkeydown = syncTyping;
	commandline.onkeyup = syncTyping;
	commandline.onselect = syncTyping;

	function handleForm() {
		var scrollback = document.getElementById('scrollback');
		var val = this.command.value;
		this.command.value = '';
		document.getElementById("typing").innerHTML = '';
		scrollback.innerHTML = scrollback.innerHTML + 'a>' + escapeHTML(val) + '<br>Command not found.<br>';
		return false;
	}
	document.forms[0].onsubmit = handleForm;
}());
