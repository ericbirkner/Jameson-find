// JavaScript Document
//yo
var timeleft = 30;

if (localStorage.memoriza) {
	timeleft = parseInt(localStorage.memoriza);
}

var empezo = false;
var downloadTimer;

var fotos = Array("1","2","3","4","5");

var puntos = 0;

var total = fotos.length;
var elegido = Math.floor((Math.random() * total) + 1);
console.log(elegido);

var foto1 = fotos[elegido-1];

$(function() {
	
	if(foto1=="1"){
		$('#diferencias .wrapper .img .dot').eq(0).css({right: '78px', bottom: '147px'});
		$('#diferencias .wrapper .img .dot').eq(1).css({'left': '495px', 'top': '57px'});
		$('#diferencias .wrapper .img .dot').eq(2).css({'left': '483px', 'top': '236px'});
		$('#diferencias .wrapper .img .dot').eq(3).css({'left': '199px', 'bottom': '86px'});
		$('#diferencias .wrapper .img .dot').eq(4).css({'right': '259px', 'top': '25px'});	
	}

	if(foto1=="2"){
		$('#diferencias .wrapper .img .dot').eq(0).css({'left': '270px', 'top': '48px'});
		$('#diferencias .wrapper .img .dot').eq(1).css({'right': '331px', 'top': '50px'});
		$('#diferencias .wrapper .img .dot').eq(2).css({'right': '445px', 'top': '277px'});
		$('#diferencias .wrapper .img .dot').eq(3).css({'left': '120px', 'top': '250px'});
		$('#diferencias .wrapper .img .dot').eq(4).css({'left': '352px', 'bottom': '209px'});	
	}
	
	
	if(foto1=="3"){
		$('#diferencias .wrapper .img .dot').eq(0).css({'left': '310px', 'top': '0px'});
		$('#diferencias .wrapper .img .dot').eq(1).css({'right': '252px', 'top': '0px'});
		$('#diferencias .wrapper .img .dot').eq(2).css({'right': '395px', 'top': '177px'});
		$('#diferencias .wrapper .img .dot').eq(3).css({'right': '223px', 'bottom': '83px'});
		$('#diferencias .wrapper .img .dot').eq(4).css({'right': '32px', 'bottom': '180px'});	
	}
	
	if(foto1=="4"){
		$('#diferencias .wrapper .img .dot').eq(0).css({'right': '340px', 'top': '80px'});
		$('#diferencias .wrapper .img .dot').eq(1).css({'right': '110px', 'top': '50px'});
		$('#diferencias .wrapper .img .dot').eq(2).css({'right': '260px', 'top': '277px'});
		$('#diferencias .wrapper .img .dot').eq(3).css({'left': '35px', 'top': '250px'});
		$('#diferencias .wrapper .img .dot').eq(4).css({'left': '352px', 'bottom': '280px'});	
	}
	
	if(foto1=="5"){
		$('#diferencias .wrapper .img .dot').eq(0).css({'left': '475px', 'bottom': '100px'});
		$('#diferencias .wrapper .img .dot').eq(1).css({'right': '225px', 'top': '70px'});
		$('#diferencias .wrapper .img .dot').eq(2).css({'right': '257px', 'top': '310px'});
		$('#diferencias .wrapper .img .dot').eq(3).css({'left': '10px', 'top': '335px'});
		$('#diferencias .wrapper .img .dot').eq(4).css({'left': '137px', 'bottom': '221px'});
	}
	
	$('#diferencias .wrapper .img').css("background-image", "url('img/juego/"+foto1+".png')");
	
    $('#memory--settings-reset').on('click',function(){
		$('#memory--settings-modal').removeClass('show');
		$('#diferencias .wrapper').css('display','block');
		inicio();
		
	});
	
	
	$('#diferencias .wrapper .img .dot').on('click',function(){
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