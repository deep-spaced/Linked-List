$(document).ready(function() {
	loadNotes();

	$("#addNewLink .link").click(function(e) { $(this).select(); });

	$(".top").click(function() {
		var parent = $(this).parent();
		if(parent.css('height') == "175px") {
			parent.animate({"height": "20px"});
		} else {
			parent.animate({"height": "175px"});
		}
	});

	$(".add").click(function() { addNote();});
	$(".delete").live("click", deleteNote);

});

$(window).unload(function() {
	saveNotes();
});


function loadNotes() {
	var numNotes = localStorage.getItem("microNotes.notes.size");
	for(i=0; i<numNotes; i++) {
		addNote( localStorage.getItem("microNotes.notes."+i) );
	}

	var numTrash = localStorage.getItem("microNotes.trash.size");
	for(i=0; i<numTrash; i++) {
		addNote( localStorage.getItem("microNotes.trash."+i), true );
	}

	console.log("Number of notes restored: "+numNotes);
	console.log("Number of trash restored: "+numTrash);
}

function saveNotes() {
	// Save the good notes:
	var numNotes = 0;
	$("#linkList").children().each(function (i) {
		localStorage.setItem("microNotes.notes."+i, $(this).children(".note").html());
		numNotes = i;

		console.log("Saved a note! note = "+localStorage.getItem("microNotes.notes."+i));
	});
	localStorate.setItem("microNotes.notes.size", numNotes);

	var numTrash = 0;
	$("#trashList").children().each(function (i) {
		localStorage.setItem("microNotes.trash."+i, $(this).children(".note").html());
		numTrash = i;

		console.log("Saved a note! trash = "+localStorage.getItem("microNotes.trash."+i));
	});
	localStorate.setItem("microNotes.trash.size", numTrash);

	console.log("Number of notes saved: "+localStorate.getItem("microNotes.notes.size"));
	console.log("Number of trash saved: "+localStorate.getItem("microNotes.trash.size"));
}

function addNote(text, trash) {
	if($("#addNewLink .note").text() == "" && text == null) return false;
	var note = $("#addNewLink").clone().removeAttr("id").removeAttr("style");
	note.children("header,.add").remove();

	if(text == null)
		text = convertUrls( $("#addNewLink .note").text() );
	
	note.children(".note").removeAttr("contenteditable").html( text );

	if(!trash)
		$("#linkList").prepend(note);
	else
		$("#trashList").prepend(note);

	$("#addNewLink .note").text("");
	$("#addNewLink .top").click();
}

function deleteNote(e) {
	// Move the section from the list to the trash:
	var section = $(e.target).closest("section");
	localStorage.removeItem("microNotes.notes."+section.attr("rel"));
	section.prependTo("#trashList");
	// Check for more than 10:
	if( $("#trashList").children().size() > 3) {
		$("#trashList").children("section:last").remove();
		console.log("Overage!");
	}
}

function convertUrls(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp,"<a href='$1'>$1</a>"); 
}

function flashRed(target) {
	$()
}

