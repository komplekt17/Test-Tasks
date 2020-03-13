window.onload = function() {
	//  включаем редактируемость текстового блока и фокус
	document
		.querySelector('.text-1')
		.setAttribute('contenteditable', 'true');
	//document.querySelector('.text-1').focus();

	// обработчик кликов кнопки
	document.querySelector('.btn-success').onclick = function() {
		var fromLanguage = document.querySelector('[name="input"]').value;
		var toLanguage = document.querySelector('[name="output"]').value;
		var textInput = document.querySelector('.text-1').value;
		var lang = fromLanguage + '-' + toLanguage;
		//console.log(textInput, lang)

		// Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
		var req = new XMLHttpRequest();

		// Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
		// (с примером ниже работать не будет, нужно получить и вставить свой!)
		var API_KEY =
			'trnsl.1.1.20170311T063116Z.89cb13a251cf3362.9ae7b8a2ab404e55386257de5d8e1d0975f3b4eb';

		// Сохраняем адрес API
		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

		// Формируем полный адрес запроса:
		url += '?key=' + API_KEY; // добавляем к запросу ключ API
		url += '&text=' + textInput; // текст для перевода
		url += '&lang=' + lang; // направление перевода: с ... на ...

		// Таким образом формируется строка вида:
		// https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en

		var textOutput = document.querySelector('.text-2');

		// Назначаем обработчик события load
		req.addEventListener('load', function() {
			console.log(req.response); // отображаем в консоли текст ответа сервера
			var response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

			// Проверяем статус-код, который прислал сервер
			// 200 — это ОК, остальные — ошибка или что-то другое
			if (response.code !== 200) {
				textOutput.innerHTML =
					'Произошла ошибка при получении ответа от сервера:\n\n' +
					response.message;
				return;
			}

			// Проверяем, найден ли перевод для данного слова
			if (response.text.length === 0) {
				textOutput.innerHTML =
					'К сожалению, перевод для данного слова не найден';
				return;
			}

			// Проверяем, введён ли текст для перевода
			if (response.text == '') {
				textOutput.innerHTML = 'Вы не ввели текст';
				return;
			}

			// Если все в порядке, то отображаем перевод на странице
			textOutput.innerHTML = response.text.join('<br>'); // вставляем его на страницу
		});

		// Обработчик готов, можно отправлять запрос
		// Открываем соединение и отправляем
		req.open('get', url);
		req.send();
	};
};
