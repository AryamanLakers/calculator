// $("body").keyup(function(e){
// 	    //this will delete the last element---by backspace
// 		if(e.originalEvent.key==="Backspace"){
// 		    var new_text=$(".result").text().slice(0,-1);
// 			$(".result").text(new_text);
// 			}
	
// });

// $(".global").click(function(e){
// 	$(".result").addClass("result_when_clicked");
// 	var current=e.currentTarget.value;
// 	$(".result").append(current);
// });

// $(".eq.global").click(function(){

// });

function gethistory(){
	return $(".history_value").text();
}
function printhistory(num){
	$(".history_value").text(num);
}
function getcurrent(){
	return $(".current_value").text();
}
function printcurrent(num){
	
	if(num==""){
		$(".current_value").text("");
	}
	 
	else{
	$(".current_value").text(getformatted(num));
	}
}

//to add comma to numbers
function getformatted(num){
	if(num=="."){return ".";}
	else if(num=="-"){
		return "";
	}
	var n =new Number(num);
	var value=n.toLocaleString("en");
	return value;
}

//when we press CE 
$(".ce").click(function(){
	printcurrent("");
	printhistory("");
});

//to remove comma from numbers when we want to add or sub
function reverse(num){
	return Number(num.replace(/,/g,''));
}


$(".operator").click(function(e){


	if(this.value=="Del"){
		var output=reverse(getcurrent()).toString();
		if(output){
			var new_text=output.slice(0,-1);
			printcurrent(new_text);
		}
	}
	else{

		var output=getcurrent();
		var history=gethistory();

		if(output==""&&history!=""){
			if(isNaN(history[history.length-1])){
			var k=gethistory().slice(0,-1);
			printhistory(k);
			k=k+this.value;
			printhistory(k);
		}
		}
		if(output!="" || history!=""){

			output=output==""?output:reverse(output);
			history=history+output;
			if(this.value=="="){
				var result=eval(history);
				//alert(result);
				printcurrent(result);
				printhistory("");
			}else{
				var last=gethistory()[gethistory().length-1];
				if(last!=this.value){
				history=history+this.value;
				printhistory(history);
				printcurrent("");}
			}
		}
	}
});

$(".numbers").click(function(){
	if(this.value=="." ){
		var currentpos=reverse(getcurrent());
		var kk=currentpos+this.value;
		printcurrent(kk);
	}
	else{
	var output=reverse(getcurrent());
	if(output!=NaN){
		output=output+this.value;
		printcurrent(output);

	}}
});

//for cursor change

$("html").mousemove(function(e){
	$(".circle").css({"top":e.pageY-30+"px","left":e.pageX-30+"px"});
});
$(".button_container").hide().fadeIn();

//adding animation expand class
$("html").click(function(){
	$(".circle").addClass("expand");
	setTimeout(function(){
		$(".circle").removeClass("expand");
	},500);
});