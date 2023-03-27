	document.oncontextmenu=function(e){return false;}
	function click(){ 
	if(event.button==2){ 
		alert('N0!!!'); 
		} 
	} 
	document.onmousedown=click 
	$(document).keydown(function(){
		return key(arguments[0])});
	function key(e){var keynum;
			if(window.event){keynum=e.keyCode;}
			else if(e.which){keynum=e.which;}
			if(keynum==123){return false;}
	}
	$(document).keydown(function(e){
		   if( e.ctrlKey  == true && e.keyCode == 83 ){
			  alert('NO！！');
			  return false; 
		   };
	});