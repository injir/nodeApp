function getDir(ele){
	var path = ele.getAttribute('data-src');
	var name = ele.getAttribute('data-undo');
	$.ajax({
	  async:false,	
	  type: 'POST',
	  url: '/articles/dir/list',
	  data: {'path':path, 'undo': name},
	  success: function(msg){
	  	var block = document.getElementById('dir');
	  	$(block).html(msg);
	  }
	});
}
function createName(ele){
	
	var button = document.getElementById('createDir');
	button.setAttribute('data-name',ele.value);
}
function createDir(ele){
	var path = ele.getAttribute('data-src');
	var name = ele.getAttribute('data-name');
	var undo = ele.getAttribute('data-undo');
	$.ajax({
	  async:false,	
	  type: 'POST',
	  url: '/articles/dir/create',
	  data: {'path':path, 'name': name, 'undo': undo},
	  success: function(msg){
	  	var block = document.getElementById('dir');
	  	$(block).html(msg);
	  }
	});
}
function deleteDir(ele){
	var path = ele.getAttribute('data-src');
	var undo = ele.getAttribute('data-undo');
	$.ajax({
	  async:false,	
	  type: 'POST',
	  url: '/articles/delete',
	  data: {'path':path,'undo': undo},
	  success: function(msg){
	  	var block = document.getElementById('dir');
	  	$(block).html(msg);
	  }
	});
}