$(function(){
    
	$(document).on('submit', '#loginform',function(e){
		e.preventDefault();
		$.post($(this).attr("action"), $(this).serialize(), function(d){
		    console.log(d);
		    if('token' in d) {
			$('.err').text("");
			localStorage.token = d.token;
			window.location.reload();
		    } else {
			$('.err').text("Invalid username or password");
		    }
		}, 'json');
	});
  
  
  
});