window.onload = function(){
	
	document.body.onmousewheel = function(){
		checkResolution();
		var client = $(window).scrollTop();
		var doc = $(document).height();
		var win = $(window).height();
	
	}
}
function checkResolution(){

	var screenWidth = screen.height;
	var docWidth = document.body.offsetHeight;
	var client = document.body.clientHeight;
	var cli = $(window).scrollTop();
		var doc = $(document).height();
		var win = $(window).height();
		var a = doc - win;
	
	if(cli==doc - win-100 || cli>doc - win-100){
		infiniteScroll();
	}
}
function checkWidth(){
	var screenWidth = screen.height;
	var docWidth = document.body.offsetHeight;
	if(screenWidth>docWidth){
		infiniteScroll();
	}
}
function infiniteScroll(){
	var main = document.getElementById('block_content');
	var page = main.getAttribute('data-page');
	var ctrl = main.getAttribute('data-ctrl');

	$.ajax({
  			type: "POST",
  			url: ctrl+"/scroll",
  			data: {'page':page},
  			success: function(msg){
  			if(msg !== false){
  			$(main).attr('data-page', parseInt(page)+1);
  			$(main).append(msg);
  			$(window).resize();
  			}
  			
  			 
    		}
		});
}

