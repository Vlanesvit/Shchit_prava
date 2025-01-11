document.addEventListener('DOMContentLoaded', () => {
	// Находим все элементы с классом .rs-btn
	const buttons = document.querySelectorAll('.rs-btn');

	buttons.forEach(button => {
		// Сохраняем текст кнопки
		const buttonText = button.textContent.trim();

		// Удаляем все текстовые узлы внутри кнопки, чтобы оставить только вложенные элементы
		Array.from(button.childNodes).forEach(node => {
			if (node.nodeType === Node.TEXT_NODE) {
				button.removeChild(node);
			}
		});

		// Если есть текст, создаем обертку <span> для текста
		if (buttonText) {
			const textSpan = document.createElement('span');
			textSpan.className = 'rs-btn__text';
			textSpan.textContent = buttonText;
			button.appendChild(textSpan);
		}

		// Получаем размеры элемента
		const { width, height } = button.getBoundingClientRect();

		// Создаем SVG
		const svgNamespace = 'http://www.w3.org/2000/svg';
		const svg = document.createElementNS(svgNamespace, 'svg');
		svg.setAttribute('width', `${width}px`);
		svg.setAttribute('height', `${height}px`);
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		svg.classList.add('border');

		// Создаем первую линию
		const bgLine = document.createElementNS(svgNamespace, 'polyline');
		bgLine.setAttribute('points', `${width - 1},1 ${width - 1},${height - 1} 1,${height - 1} 1,1 ${width - 1},1`);
		bgLine.classList.add('bg-line');

		// Создаем вторую линию
		const hlLine = document.createElementNS(svgNamespace, 'polyline');
		hlLine.setAttribute('points', `${width - 1},1 ${width - 1},${height - 1} 1,${height - 1} 1,1 ${width - 1},1`);
		hlLine.classList.add('hl-line');

		// Добавляем линии в SVG
		svg.appendChild(bgLine);
		svg.appendChild(hlLine);

		// Добавляем SVG в кнопку
		button.appendChild(svg);
	});
});

function wrapMenuText(items) {
	const links = document.querySelectorAll(items);

	links.forEach(link => {
		const text = link.childNodes;
		text.forEach(node => {
			if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
				const span = document.createElement('span');
				span.textContent = node.nodeValue;
				node.replaceWith(span);
			}
		});
	});
}
wrapMenuText('.rs-header__menu a')

/* ====================================
Проверка поддержки webp, добавление класса webp или no-webp для HTML
==================================== */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp()

/* ====================================
Проверка мобильного браузера
==================================== */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass()

/* ====================================
Добавление loaded для HTML после полной загрузки страницы
==================================== */
function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
addLoadedClass()

/* ====================================
Инициализация галереи
==================================== */
Fancybox.bind("[data-fancybox]", {
	Thumbs: {
		type: 'classic',
	},
});

document.addEventListener('DOMContentLoaded', function () {
	const timers = document.querySelectorAll('.timer');

	timers.forEach(timer => {
		// Парсим дату из атрибута data-timer
		const dateStr = timer.dataset.timer;
		const parseDate = dateStr => {
			const [date, time] = dateStr.split(' ');
			const [day, month, year] = date.split('.').map(Number);
			const [hours, minutes] = time.split(':').map(Number);
			return new Date(year, month - 1, day, hours, minutes);
		};

		// Конечная дата
		const deadline = parseDate(dateStr);
		let timerId = null;

		// Функция склонения числительных
		function declensionNum(num, words) {
			return words[
				num % 100 > 4 && num % 100 < 20
					? 2
					: [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
			];
		}

		// Добавляем ведущий ноль для чисел меньше 10
		function addLeadingZero(num) {
			return num < 10 ? `0${num}` : num;
		}

		// Объект для элементов таймера
		const elements = {
			days: {
				container: timer.querySelector('.timer__days'),
				span: timer.querySelector('.timer__days span'),
				title: ['день', 'дня', 'дней'],
			},
			hours: {
				container: timer.querySelector('.timer__hours'),
				span: timer.querySelector('.timer__hours span'),
				title: ['час', 'часа', 'часов'],
			},
			minutes: {
				container: timer.querySelector('.timer__minutes'),
				span: timer.querySelector('.timer__minutes span'),
				title: ['минута', 'минуты', 'минут'],
			},
			seconds: {
				container: timer.querySelector('.timer__seconds'),
				span: timer.querySelector('.timer__seconds span'),
				title: ['секунда', 'секунды', 'секунд'],
			},
		};

		// Функция обновления таймера
		function countdownTimer() {
			const diff = deadline - new Date();

			// Если время истекло, остановить таймер
			if (diff <= 0) {
				clearInterval(timerId);
				return;
			}

			const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
			const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
			const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
			const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

			// Обновляем значения и атрибуты для каждого элемента
			if (elements.days.span) elements.days.span.textContent = addLeadingZero(days);
			if (elements.hours.span) elements.hours.span.textContent = addLeadingZero(hours);
			if (elements.minutes.span) elements.minutes.span.textContent = addLeadingZero(minutes);
			if (elements.seconds.span) elements.seconds.span.textContent = addLeadingZero(seconds);
			if (elements.days.container) elements.days.container.dataset.title = declensionNum(days, elements.days.title);
			if (elements.hours.container) elements.hours.container.dataset.title = declensionNum(hours, elements.hours.title);
			if (elements.minutes.container) elements.minutes.container.dataset.title = declensionNum(minutes, elements.minutes.title);
			if (elements.seconds.container) elements.seconds.container.dataset.title = declensionNum(seconds, elements.seconds.title);

			// Скрываем блоки, если значение 0, но оставляем их, если есть более крупные единицы времени
			if (days === 0) elements.days.container.remove();
			if (days === 0 && hours === 0) elements.hours.container.remove();
			if (days === 0 && hours === 0 && minutes === 0) elements.minutes.container.remove();
			if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) elements.seconds.container.remove();
		}

		// Запуск таймера
		countdownTimer();
		timerId = setInterval(countdownTimer, 1000);
	});
});

/* ====================================
Добавить картинкам draggable="false"
==================================== */
const imgs = document.getElementsByTagName('img');
for (let i = 0; i < imgs.length; i++) {
	imgs[i].setAttribute('draggable', false);
}

//========================================================================================================================================================

// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}

// Уникализация массива
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

//========================================================================================================================================================
// Вспомогательные модули блокировки прокрутки
let bodyLockStatus = true;
let bodyLockToggle = (delay = 300) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			// el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

//========================================================================================================================================================
// Вспомогательные модули плавного раскрытия и закрытия объекта
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
