$(document).ready(function() {

	$("#btnStore").click(function() {

		try {
			localStorage.setItem("name", "Hello World!"); //saves to the database, "key", "value"
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
		$("#result").html(localStorage.getItem('name'));
	});

	$("#addNewLink .link").click(function(e) { $(this).select(); });

	$("#addNewLink").hover(
		function() {
			$(this).animate({"height": "250px"}, "fast");
		},
		function() {
			$(this).animate({"height": "25px"}, "fast");
		}
	);

	$("#linkList .note").hover(
		function() {
			$(this).css("display", "block");
		},
		function() {
			$(this).css("display", "none");
		}
	);

	var open = false;
	$("#trashTop").click(function() {
		if(open) {
			$("#trashBin").animate({"height": "25px"});
			open = false;
		} else {
			$("#trashBin").animate({"height": "250px"});
			open = true;
		}
	});

	$(".btnAdd").bind("click", addLink);

});

function addLink() {
	// Clone the Add New area:
	var link = $("#addNewLink").clone().removeAttr("id").removeAttr("style");
	link.children("header,.btnAdd").remove().children(".link,.note").removeAttr("contenteditable").removeAttr("class");
	$("#linkList").append(link);
}
