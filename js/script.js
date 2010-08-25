$(document).ready(function() {
	loadNotes();

	$("#addNewLink .link").click(function(e) { $(this).select(); });

	$(".top").click(function() {
		var parent = $(this).parent();
		if(parent.css('height') == "175px") {
			parent.animate({"height": "25px"});
		} else {
			parent.animate({"height": "175px"}, "fast", null, function() {if(parent.attr("id") == "addNewLink") $("#addNewLink .note").focus();});
		}
	});

	$(".add").click(function() { addNote(null, "#linkList");});
	$(".delete").live("click", deleteNote);

});

$(window).unload(function() {
	saveNotes();
});


function loadNotes() {
	var numNotes = localStorage.getItem("microNotes.notes.size");
	for(i=0; i<numNotes; i++) {
		addNote( localStorage.getItem("microNotes.notes."+i), "#linkList", true );
	}

	var numTrash = localStorage.getItem("microNotes.trash.size");
	for(i=0; i<numTrash; i++) {
		addNote( localStorage.getItem("microNotes.trash."+i), "#trashList", true );
	}
}

function saveNotes() {
	// Save the good notes:
	var numNotes = 0;
	$("#linkList").children().each(function (i) {
		localStorage.setItem("microNotes.notes."+i, $(this).children(".note").html());
		numNotes = i+1;
	});
	localStorage.setItem("microNotes.notes.size", numNotes);

	var numTrash = 0;
	$("#trashList").children().each(function (i) {
		localStorage.setItem("microNotes.trash."+i, $(this).children(".note").html());
		numTrash = i+1;
	});
	localStorage.setItem("microNotes.trash.size", numTrash);
}

function addNote(text, target, append) {
	if($("#addNewLink .note").text() == "" && text == null) return false;
	var note = $("#addNewLink").clone().removeAttr("id").removeAttr("style");
	note.children("header,.add").remove();

	if(text == null)
		text = $.trim( convertUrls( $("#addNewLink .note").html() ) );
	
	note.children(".note").removeAttr("contenteditable").html( text );

	if(!append)
		$(target).prepend(note);
	else
		$(target).append(note);

	$("#addNewLink .note").text("");
	$("#addNewLink .top").click();
	$("a[href^='http']").attr('target','_blank');
}

function deleteNote(e) {
	// Move the section from the list to the trash:
	var section = $(e.target).closest("section");
	section.prependTo("#trashList");
	// Check for more than 10:
	if( $("#trashList").children().size() > 10) {
		$("#trashList").children("section:last").remove();
		console.log("Overage!");
	}
}

function convertUrls(text) {
	var exp = new RegExp('[\"\'>]*\b(?:(?:https?|ftp|file)://|www\.|ftp\.)[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$]');
	return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}

function flashRed(target) {
	$()
}

