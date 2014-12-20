(function(){
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
}());
