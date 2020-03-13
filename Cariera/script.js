// запуск времени
var timerId = setInterval(startTimer, 1000);

// градус ротации по дефолту 
var degree = 0;
	
// функция ротации холста
function getRotate(){
	var intrval = 90;
	degree += intrval;
	if(degree > 270){degree = 0}
	var elem = document.querySelector('.quart');
	elem.style.transform = 'rotate('+degree+'deg)';
	elem.style.transition = '.6s';
	console.log(degree);
}
// функция времени
function startTimer() {
	var time = document.querySelector('.time').innerHTML;
	var arr = time.split(":");
	var m = arr[0];
	var s = arr[1];
	if (s == 59) {
		m++;
		if (m < 10) m = "0" + m;
		s = 0;
	}
	else s++;
	if (s < 10) s = "0" + s;
	document.querySelector('.time').innerHTML = m+":"+s;
}

// функция подсчёта пикселей
function countPixel(){
	var coPix = document.querySelectorAll('.quart div');
	var n = 0;
	for(var i = 0; i < coPix.length; i++){
		if(coPix[i].classList.contains('active')){
			n++;
		}
	}
	document.querySelector('.total-pix').innerHTML = n;
}
// функция получения результата
function getResult(){
	
	var time = document.querySelector('.time').innerHTML;
	document.querySelector('.total-time').innerHTML = time;
	
	var elemCanvas = document.querySelector('.quart') 
	html2canvas(elemCanvas, {
		onrendered: function(canvas) {
			document.querySelector('.total-canvas').appendChild(canvas);
		},
		width: 440,
		height: 440
	});
	// масштабируем скриншот
	document.querySelector('.total-canvas').style.transform = 'scale(0.5, 0.5)';
	// активируем модалку
	document.querySelector('.total').style.display = 'block';
	
}

// обработчик кликов
document.querySelector('body').addEventListener('click', function(ev){
	
	// обработчик кликов по пикселям - окрашивание
	if(ev.target.classList.contains('default')){
		// добавляем или убираем class="default"
		ev.target.classList.toggle('active');
		// запуск подсчёта пикселей
		countPixel();
	}
	// обработчик кнопки повернуть
	if(ev.target.classList.contains('one')){
		getRotate();
	}
	// обработчик кнопки результат
	if(ev.target.classList.contains('two')){
		getResult();
		// стопорим таймер
		clearInterval(timerId);
	}
	// обработчик кнопки закрытия модалки
	if(ev.target.classList.contains('close')){
		// сокрытие модалки
		document.querySelector('.total').style.display = 'none';
		// удаляем блок скриншота
		document.querySelector('.total-canvas').innerHTML = '';
	}
	
});
