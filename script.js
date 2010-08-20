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

	$(".link").click(function(e) { e.target.focus(); e.target.select(); });

	$("#addNewLink").hover(
		function() {
			$(this).animate({"height": "250px"}, "fast");
		},
		function() {
			$(this).animate({"height": "25px"}, "fast");
		}

	);

});
