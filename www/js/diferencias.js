// JavaScript Document
//yo
var timeleft = 30;

if (localStorage.diferencias) {
	timeleft = parseInt(localStorage.diferencias);
}

var empezo = false;
var downloadTimer;

var fotos = Array("1","2");

var puntos = 0;

var total = fotos.length;
var elegido = Math.floor((Math.random() * total) + 1);
console.log(elegido);

var foto1 = fotos[elegido-1];
var foto2 = foto1+foto1;



$(function() {
	
	if(foto2=="11"){
		$('#diferencias .wrapper .img2 .dot').eq(0).css({'right': '137px', 'top': '88px'});
		$('#diferencias .wrapper .img2 .dot').eq(1).css({'left': '182px', 'top': '70px'});
		$('#diferencias .wrapper .img2 .dot').eq(2).css({'right': '247px', 'top': '249px'});
		$('#diferencias .wrapper .img2 .dot').eq(3).css({'left': '181px', 'top': '137px'});
		$('#diferencias .wrapper .img2 .dot').eq(4).css({'right': '52px', 'top': '60px'});	
	}
	
	if(foto2=="22"){
		$('#diferencias .wrapper .img2 .dot').eq(0).css({'right': '58px', 'top': '110px'});
		$('#diferencias .wrapper .img2 .dot').eq(1).css({'right': '214px', 'top': '20px'});
		$('#diferencias .wrapper .img2 .dot').eq(2).css({'right': '215px', 'top': '277px'});
		$('#diferencias .wrapper .img2 .dot').eq(3).css({'left': '66px', 'top': '196px'});
		$('#diferencias .wrapper .img2 .dot').eq(4).css({'right': '52px', 'top': '18px'});	
	}
	
	$('#diferencias .wrapper .img1').css("background-image", "url('img/diferencias/"+foto1+".jpg')");
	$('#diferencias .wrapper .img2').css("background-image", "url('img/diferencias/"+foto2+".jpg')");
	
    $('#memory--settings-reset').on('click',function(){
		$('#memory--settings-modal').removeClass('show');
		$('#diferencias .wrapper').css('display','block');
		inicio();
		
	});
	
	
	$('#diferencias .wrapper .img2 .dot').on('click',function(){
		if($(this).hasClass("pulse")){
			console.log('no vale');
		}else{
			$(this).css('opacity','1').addClass('pulse animated infinite');
			puntos++;
		}
		
		if(puntos==5){
			gameOver();
		}
		
		
	});
	
});

function inicio(){
	
	if(!empezo){
		document.getElementById("cronometro").style.display="block";
	    console.log('inicio el juego');
		empezo = true;
		setTimeout(function(){
			
			downloadTimer = setInterval(function(){
			timeleft--;
			document.getElementById("cronometro").textContent = timeleft;
			if(timeleft <= 0){
				//
				console.log(timeleft);
				
				gameOver();
			}
			},1000);			
		},
		500);
		return;
	}else{
		return false;	
	}	
}

function gameOver(){
    var msg;
	clearInterval(downloadTimer);
    if(timeleft>0){
		msg = "¡Felicitaciones!";
		document.getElementById("memory--end-game-message").href="premio.html"; 
	}else{
		msg = "Fin del juego";
	}
	document.getElementById('memory--end-game-message').textContent = msg;			
	document.getElementById("memory--end-game-modal").classList.toggle('show');
	
}