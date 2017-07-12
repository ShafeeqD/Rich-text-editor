// Set default behaviour
var editorSettings = {
  bold: false,
  underline: false,
  italic: false,
  strikeThrough: false,
  updateSettings: function(command, elementID, callback) {
    this[command] = editorField.document.queryCommandState(command);
    if (callback) {
      callback(elementID, command);
    }
  }
};
// function for enable iframe editable onload
function enableEditor() {
  editorField.document.designMode = "on";
  editorField.focus();
}
// Toggle class
function toggleClass(elementID, key) {
  var element = document.getElementById(elementID);
  if (editorSettings[key]){
    element.className = 'btn btn-on';
  }
  else {
    element.className = 'btn'
  }
}
// Execute commands
function executeEditorActions(command, arg) {
  if (command) {
    editorField.document.execCommand(command, false, (arg === "undefined"? null:arg));
  }
}
// Handle click
function handleClick(elementID, command) {
  executeEditorActions(command);
  editorSettings.updateSettings(command, elementID, toggleClass);
}
// Upload image
function uploadImage(elementID, command) {
  var url = prompt("Enter image URL",'');
  if (url) {
    executeEditorActions(command, url);
  }
}
//Selection change listener
editorField.document.addEventListener("selectionchange", function() {
  if (editorField.document.body.firstChild !== null) {
    editorSettings.updateSettings("bold", "btnBold", toggleClass);
    editorSettings.updateSettings("italic", "btnItalic", toggleClass);
    editorSettings.updateSettings("underline", "btnUnderline", toggleClass);
    editorSettings.updateSettings("strikeThrough", "btnStrikeThrough", toggleClass);
  }
});
// Printing html tag on backspace
editorField.document.addEventListener("keydown", function functionName(event) {
  if (event.keyCode === 8) {
    var selectionNode = editorField.getSelection().anchorNode.parentNode;
    console.log("html tag", selectionNode.nodeName);
  }
});
