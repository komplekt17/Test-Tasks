/*
Разработайте простой текстовый редактор с возможностью сохранения контента в LocalStorage.

Страница должна состоять из:

	Блока с текстом
	Кнопки «Редактировать»
	Кнопок «Сохранить» и «Отмена» (по умолчанию неактивных — disabled)
	Механика работы страницы:

При первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой)
При нажатии на кнопку «Редактировать» блок с текстом становится редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными, а сама кнопка «Редактировать» — неактивной.
При нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage, а режим редактирования отключается (кнопки возвращаются в исходное состояние)
При нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант изLocalStorage, режим редактирования отключается
При следующих перезагрузках страницы содержимое блока с текстом автоматически подтягивается из LocalStorage (последний сохраненный вариант)
*/

// если в LocalStorage есть сохранения
if(localStorage.length != 0){
	// получаем индекс последнего сохранения
	var k = localStorage.length - 1;
	document.querySelector('.edit').innerHTML = localStorage[k];
}
else{
	// сохраняем изначальное значение текста
	var LevelZero = document.querySelector('.edit').innerHTML;
}
// функция добавления в LocalStorage
function addInLocalStorage(key, param){
	localStorage.setItem(key, param);
	console.log('Записано в LocalStorage с ключом: ' + key);
}
// обработчик кликов выбора цвета
document.querySelector('[name="color"]').addEventListener('click', function(ev){
	if(ev.target.value == 1){changeColor(a = 'red')} 
	if(ev.target.value == 2){changeColor(a = 'orange')}
	if(ev.target.value == 3){changeColor(a = 'green')}
	if(ev.target.value == 4){changeColor(a = 'blue')}
	if(ev.target.value == 5){changeColor(a = 'black')}
});

// функция изменения цвета шрифта
function changeColor(x){
	var range = getRangeObject();
	if (range != '') {
		// Создаем спан с жирным стилем
		var wrap = document.createElement('span');
		wrap.style.color = x;
		// Обернем наш Range в спан
		range.surroundContents(wrap);
		// возвращаем  select в исходное состояние
		document.querySelector('[name="color"]').options[0].selected=true;
	} 
	else {
		// возвращаем  select в исходное состояние
		document.querySelector('[name="color"]').options[0].selected=true;
		alert('Сначала выделите текст');
	}
}

// обработчик кликов верхних кнопок
document.querySelector('.up-buttons').addEventListener('click', function(ev){
	//debugger;
	//  клики кнопки "Ж"
	if(ev.target.classList.contains('bold')){
      var range = getRangeObject();
      if (range != '') {
			// Создаем спан с жирным стилем
			var wrap = document.createElement('span');
			wrap.style.fontWeight = 'bold';
			// Обернем наш Range в спан
			range.surroundContents(wrap);
      } 
		else {
			alert('Сначала выделите текст');
      }
	}
	//  клики кнопки "К"
	if(ev.target.classList.contains('italic')){
      var range = getRangeObject(); 
      if (range != '') {
			// Создаем спан с жирным стилем
			var wrap = document.createElement('span');
			wrap.style.fontStyle = 'italic';
			// Обернем наш Range в спан
			range.surroundContents(wrap);
      } 
		else {
			alert('Сначала выделите текст');
      }
	}
	//  клики кнопки "П"
	if(ev.target.classList.contains('underline')){
      var range = getRangeObject(); 
      if (range != '') {
			// Создаем спан с жирным стилем
			var wrap = document.createElement('span');
			wrap.style.textDecoration = 'underline';
			// Обернем наш Range в спан
			range.surroundContents(wrap);
      } 
		else {
			alert('Сначала выделите текст');
      }
	}
});

// обработчик кликов нижних кнопок
document.querySelector('.down-buttons').addEventListener('click', function(evnt){
	//  клики кнопки "редактировать"
	if(evnt.target.classList.contains('btn-success')){
		//  дезактивируем кнопку "редактировать"
		evnt.target.setAttribute('disabled', 'disabled');
		
		//  включаем редактируемость текстового блока и фокус
		document.querySelector('.edit').setAttribute('contenteditable', 'true');
		document.querySelector('.edit').focus();
		
		//  активируем кнопки "сохранить" и "отмена"
		document.querySelector('.btn-primary').removeAttribute('disabled');
		document.querySelector('.btn-danger').removeAttribute('disabled');
		//  активируем кнопки "шрифтов" и "цвета"
		document.querySelector('.bold').removeAttribute('disabled');
		document.querySelector('.italic').removeAttribute('disabled');
		document.querySelector('.underline').removeAttribute('disabled');
		document.querySelector('select').removeAttribute('disabled');
	}
	
	//  клики кнопки "сохранить"
	if(evnt.target.classList.contains('btn-primary')){
		//  дезактивируем кнопку "сохранить" и "отмена"
		evnt.target.setAttribute('disabled', 'disabled');
		document.querySelector('.btn-danger').setAttribute('disabled', 'disabled');
		//  дезактивируем кнопки "шрифтов" и "цвета"
		document.querySelector('.bold').setAttribute('disabled', 'disabled');
		document.querySelector('.italic').setAttribute('disabled', 'disabled');
		document.querySelector('.underline').setAttribute('disabled', 'disabled');
		document.querySelector('select').setAttribute('disabled', 'disabled');
		
		//  выключаем редактируемость текстового блока
		document.querySelector('.edit').removeAttribute('contenteditable');
		
		//  активируем кнопку "редактировать"
		document.querySelector('.btn-success').removeAttribute('disabled');
		
		// блок записи в LocalStorage
		if(localStorage.length = 0){ // если LocalStorage не содержит сохранений
			var key = 0;
			var param = document.querySelector('.edit').innerHTML;
			addInLocalStorage(key, param);
		}
		else{// если LocalStorage содержит сохранения
			var key = localStorage.length; // создаём новый индекс 
			var param = document.querySelector('.edit').innerHTML;
			addInLocalStorage(key, param);
		}
	}
	
	//  клики кнопки "отмена"
	if(evnt.target.classList.contains('btn-danger')){
		//  дезактивируем кнопку "сохранить" и "отмена"
		evnt.target.setAttribute('disabled', 'disabled');
		document.querySelector('.btn-primary').setAttribute('disabled', 'disabled');
		//  дезактивируем кнопки "шрифтов" и "цвета"
		document.querySelector('.bold').setAttribute('disabled', 'disabled');
		document.querySelector('.italic').setAttribute('disabled', 'disabled');
		document.querySelector('.underline').setAttribute('disabled', 'disabled');
		document.querySelector('select').setAttribute('disabled', 'disabled');
		
		//  выключаем редактируемость текстового блока
		document.querySelector('.edit').removeAttribute('contenteditable');
		
		//  активируем кнопку "редактировать"
		document.querySelector('.btn-success').removeAttribute('disabled');
		
		// блок записи в LocalStorage
		if(localStorage.length != 0){// если LocalStorage содержит сохранения
			var g = localStorage.length - 1; // получаем индекс 
			document.querySelector('.edit').innerHTML = localStorage[g];
			console.log('Значений в LocalStorage: '+g);
		}
		else{ // если LocalStorage не содержит сохранений
			alert('Нет предыдущих значений');
			document.querySelector('.edit').innerHTML = LevelZero; 
		}
	}
});
//localStorage.clear();
