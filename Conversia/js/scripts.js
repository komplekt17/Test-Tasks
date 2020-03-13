$(function(){	
"use strict"	
	// функция генерации случайного значения
	function randomInteger(min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand);
		return rand;
	}
	
	// функция вызова сооообщения о результате
	function popUp(){	
		if(param2.stopImageNumber == param1.stopImageNumber && 
			param2.stopImageNumber == param3.stopImageNumber){
			//debugger;
			var srcImage = $('.roulette-1 img').eq(param2.stopImageNumber).attr('src');
			$('.mess_win > h1').after('<img src="'+srcImage+'"/><img src="'+srcImage+'"/><img src="'+srcImage+'"/>');
			$('.mess_win').fadeIn(300);
		}
		else{
			var srcImage1 = $('.roulette-1 img').eq(param1.stopImageNumber).attr('src');
			var srcImage2 = $('.roulette-2 img').eq(param2.stopImageNumber).attr('src');
			var srcImage3 = $('.roulette-3 img').eq(param3.stopImageNumber).attr('src');
			$('.mess_no-win > h1').after('<img src="'+srcImage1+'"/><img src="'+srcImage2+'"/><img src="'+srcImage3+'"/>');
			$('.mess_no-win').fadeIn(300);
		}
	}
	
	function check(){
		// for(var i in param1){
			// console.log(param1[i]);
		// }
		// for(var j in param2){
			// console.log(param2[j]);
		// }
		// for(var k in param3){
			// console.log(param3[k]);
		// }
		console.log('Скорость вращения: '+param1.speed, param2.speed, param3.speed+'\n');
		console.log('Длительность: '+param1.duration, param2.duration, param3.duration+'\n');
		console.log('Стоп картинка: '+param1.stopImageNumber, param2.stopImageNumber, param3.stopImageNumber+'\n');
	}
	
	// задаём интервал для генерации случайного значения
	var numMin = 0;
	var numMax = 5;
	
	var win = true // переключатель возможности выигрыша
	var a;
	
	// функция генерации нового случйного значения stopImageNumber
	function updateNumber(){
		if(win){// совпадения допускаются
			param1.stopImageNumber = randomInteger(numMin, numMax);
            param2.stopImageNumber = randomInteger(numMin, numMax);
            param3.stopImageNumber = randomInteger(numMin, numMax);
            rouletter1.roulette('option',param1);
            rouletter2.roulette('option',param2);
            rouletter3.roulette('option',param3);
		}
		else{// совпадения НЕ допускаются
			param1.stopImageNumber = randomInteger(numMin, numMax);
			param2.stopImageNumber = randomInteger(numMin, numMax);
			param3.stopImageNumber = randomInteger(numMin, numMax);
			// в случае совпадения
			if(param2.stopImageNumber == param1.stopImageNumber && 
			param2.stopImageNumber == param3.stopImageNumber){
				param2.stopImageNumber = param1.stopImageNumber + 1;
				param3.stopImageNumber = param1.stopImageNumber - 1;
			}
            rouletter1.roulette('option',param1);
            rouletter2.roulette('option',param2);
            rouletter3.roulette('option',param3);
		}
	}
	
	// задаём параметры 1-го слота
	var param1 = {
		speed : 10,
		duration : 2,
		stopImageNumber : a,
		startCallback : function() {
			$('.start').attr('disabled', 'true');
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback : function() {
			$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			$('.start').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
		}
	}
	
	// задаём параметры 2-го слота
	var param2 = {
		speed : 5,
		duration : 3,
		stopImageNumber : a
	}
	
	// задаём параметры 3-го слота
	var param3 = {
		speed : 8,
		duration : 4,
		stopImageNumber : a
	}
	
	// применяем метод roulette() к слотам
	var rouletter1 = $('div.roulette-1');
	rouletter1.roulette(param1);
	var rouletter2 = $('div.roulette-2');
	rouletter2.roulette(param2);
	var rouletter3 = $('div.roulette-3');
	rouletter3.roulette(param3);
	
	// обработчики кнопок
	$('.stop').click(function(){
		updateNumber(); // запуск апдейта номера
		rouletter1.roulette('stop');	
		rouletter2.roulette('stop');	
		rouletter3.roulette('stop');
	});
	
	$('.stop').attr('disabled', 'true');
	
	$('.start, .ball').click(function(){
		// максимальное значение длительности
		var time = Math.max(param1.duration, param2.duration, param3.duration) * 1000 + 1500;
		setTimeout(popUp,time); // запуск окна с выигрышем
		updateNumber(); // запуск апдейта номера
		//check();
		rouletter1.roulette('start');
		rouletter2.roulette('start');
		rouletter3.roulette('start');
		//console.log(time);
		$('.ball').addClass('animate-1');
		$('.stick').addClass('animate-2');
		setTimeout(function(){ // возврат в изначальное
			$('.ball').removeClass('animate-1');
			$('.stick').removeClass('animate-2');
		},1000)
	});
	
	// обработчик кнопки закрыть
	$('.closed').click(function(){
		$('.mess_win, .mess_no-win').fadeOut(300);
		// удаляем картинки кроме закрывашки
		$('.mess_win > img:not(.closed)').remove();
		$('.mess_no-win > img:not(.closed)').remove();
	});
});

