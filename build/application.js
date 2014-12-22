(function() {
    function escapeHTML(html) {
        var fn = function(tag) {
            var charsToReplace = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&#34;"
            };
            return charsToReplace[tag] || tag;
        };
        return html.replace(/[&<>"]/g, fn);
    }
    function syncTyping() {
        var beforeSelection, selection, afterSelection;
        beforeSelection = this.value.slice(0, this.selectionStart);
        selection = this.value.slice(this.selectionStart, this.selectionEnd);
        afterSelection = this.value.slice(this.selectionEnd);
        document.getElementById("typing").innerHTML = beforeSelection + (this.selectionStart == this.selectionEnd ? "<span id='cursor'></span>" : "") + "<span id='selection'>" + selection + "</span>" + afterSelection;
    }
    var commandline = document.getElementById("command");
    commandline.value = "";
    commandline.oninput = syncTyping;
    commandline.onkeydown = syncTyping;
    commandline.onkeyup = syncTyping;
    commandline.onselect = syncTyping;
    commandline.onfocus = syncTyping;
    commandline.focus();
    document.body.onmousedown = function() {
        commandline.focus();
        return false;
    };
    var brightness = 0;
    function alterBrightness(delta) {
        brightness = Math.max(0, Math.min(1, brightness + delta));
        document.getElementById("scanlines").style.backgroundColor = "hsl(120, 100%, " + 16 * brightness + "%)";
    }
    document.getElementById("knobup").onmousedown = function() {
        alterBrightness(.0625);
    };
    document.getElementById("knobdown").onmousedown = function() {
        alterBrightness(-.0625);
    };
    function handleForm() {
        var history = document.getElementById("history");
        var val = this.command.value;
        this.command.value = "";
        document.getElementById("typing").innerHTML = "";
        history.innerHTML = history.innerHTML + "a>" + escapeHTML(val) + "<br>Command not found.<br>";
        return false;
    }
    document.forms[0].onsubmit = handleForm;
})();
