// функция звукового сопровождения
function getSound(sound) {
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = sound; // Указываем путь к звуку
	if ($('#mute').hasClass('unmute')) {
		audio.autoplay = true; // Автоматически запускаем
	} else {
		audio.autoplay = false; // Автоматически НЕ запускаем
	}
}

// функция генерации случайного значения
function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
}
// функция генерации сообщения и счёта
function getMessage(param, x1, x2, y1, y2) {
	$('.mess').text(param); // сообщение о событии
	$('.count').text('Счёт ' + x1 + ':' + x2); // сообщение о счёте
	$('.message')
		.fadeIn(1000)
		.fadeOut(2000); // появление(исчезновение) сообщения
	$('.ball').animate({ left: y1 + '%', top: y2 + '%' }, 3000); // координаты мяча
}

// счёт по умолчанию
var n1 = 0;
var n2 = 0;

// сообщения
var mess1 = 'Гооол!';
var mess2 = 'Аут!';
var mess3 = 'Штанга!';

// задаём интервал для генерации случайного значения
var oX = 48.8;
var numMin_X1 = 1; // минимальная координата X левой половины
var numMax_X2 = 4; // максимальная координата X левой половины 47
var numMin_X3 = 93; // минимальная координата X правой половины 49
var numMax_X4 = 95; // максимальная координата X правой половины
var numMin_Y = 1; // минимальная координата Y 42
var numMax_Y = 95; // максимальная координата Y 53
/*
	var X1 = 3; // координата X левых ворот
	var X2 = 94; // координата X правых ворот
	var Y1 = 42; // верхняя Y координата ворот
	var Y2 = 53; // нижняя Y координата ворот
*/

// обработчик кнопки mute
$('#mute').on('click', function() {
	$(this).toggleClass('unmute');
	// снимаем с паузы фоновый звук, если класс есть
	if ($('#mute').hasClass('unmute')) {
		$('audio').trigger('play');
	}
	// ставим на паузу фоновый звук, если класс отсутствует
	else {
		$('audio').trigger('pause');
	}
});

// обработчик клика
$('.ball').on('click', function() {
	getSound('audio/ball.mp3');
	// расчитываем координату X
	// если мяч на правой половине, то перемещаем его на левую
	if (oX > 48.8) {
		oX = randomInteger(numMin_X1, numMax_X2);
	}
	// если мяч на левой половине, то перемещаем его на правую
	else {
		oX = randomInteger(numMin_X3, numMax_X4);
	}
	// расчитываем координату Y
	var oY = randomInteger(numMin_Y, numMax_Y); //
	// анимируем мяч при полете
	$(this)
		.attr('src', 'img/ball.gif')
		.animate(
			{
				left: oX + '%',
				top: oY + '%',
				width: '170px',
				height: '170px'
			},
			1000,
			function() {
				// останавливаем анимацию мяча и возвращаем первоначальные размеры
				$(this)
					.attr('src', 'img/ball.png')
					.animate({ width: '30px', height: '30px' }, 100);
				// координаты мяча, если гол в левые ворота
				if (oX <= 3 && oY <= 53 && oY >= 42) {
					// Гооол! + устанавливаем мяч на середину поля
					getMessage(mess1, ++n1, n2, (k1 = '48.8'), (k2 = '47.8'));
					getSound('audio/goal.mp3');
				}
				// координаты мяча, если гол в правые ворота
				else if (oX >= 94 && oY <= 53 && oY >= 42) {
					// Гооол! + устанавливаем мяч на середину поля
					getMessage(mess1, n1, ++n2, (k1 = '48.8'), (k2 = '47.8'));
					getSound('audio/goal.mp3');
				}
				// координаты мяча, если аут для левых ворот
				else if ((oX <= 4 && oY >= 53 + 4) || (oX <= 4 && oY <= 42 - 3)) {
					// Аут + устанавливаем мяч на вратарскую линию
					getMessage(mess2, n1, n2, (k1 = '21.8'), (k2 = '47.8'));
					getSound('audio/svistok-short.mp3');
				}
				// координаты мяча, если аут для правых ворот
				else if (
					(oX >= 94 && oY >= 53 + 4) ||
					(oX >= 94 && oY <= 42 - 3)
				) {
					// Аут + устанавливаем мяч на вратарскую линию
					getMessage(mess2, n1, n2, (k1 = '75.8'), (k2 = '47.8'));
					getSound('audio/svistok-short.mp3');
				}
				// координаты мяча, если штанга левых ворот
				else if (
					(oX <= 4 && oY < 42 && oY > 42 - 3) ||
					(oX <= 4 && oY < 53 + 4 && oY > 53)
				) {
					// Штанга! + рикошет мяча в штрафную
					getMessage(mess3, n1, n2, (k1 = '10'), (k2 = '47.8'));
					getSound('audio/shtanga.mp3');
				}
				// координаты мяча, если штанга правых ворот
				else if (
					(oX >= 94 && oY < 42 && oY > 42 - 3) ||
					(oX >= 94 && oY < 53 + 4 && oY > 53)
				) {
					// Штанга! + рикошет мяча в штрафную
					getMessage(mess3, n1, n2, (k1 = '90'), (k2 = '47.8'));
					getSound('audio/shtanga.mp3');
				}
			}
		);
});
