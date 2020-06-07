function playSound(character){
	var audio1=new Audio('sounds/'+character+'.mp3');
	audio1.play();
}
for(var i=0;i<document.querySelectorAll(".drum").length;i++){
	document.querySelectorAll("button")[i].addEventListener("click",function(){
		playSound(this.innerHTML) //this.innerHTML gives the inner HTML of the button
	});	
	document.querySelectorAll("button")[i].addEventListener("keydown",function(e){ //calling an anonymous function
		playSound(e.key); //e.key gives the value of the key that was pressed.
	});
}