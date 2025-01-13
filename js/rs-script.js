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

document.addEventListener("DOMContentLoaded", () => {
	// Получаем все видео-блоки
	const videoBlocks = document.querySelectorAll(".video");

	videoBlocks.forEach((block) => {
		const video = block.querySelector(".video-tag");
		const playButton = block.querySelector(".video-play");
		const elementsToHide = block.querySelector(".video-block");

		// Сохраняем изначальный постер
		const poster = video.getAttribute("poster");

		// Обработчик для кнопки
		playButton.addEventListener("click", () => {
			if (video.paused) {
				// Запуск видео
				video.play();
				video.setAttribute("controls", ""); // Добавляем атрибут controls
				playButton.classList.add("playing");
				elementsToHide.style.display = "none"; // Скрываем элементы
				video.removeAttribute("poster"); // Убираем постер
			} else {
				// Остановка видео
				video.pause();
				video.currentTime = 0; // Сброс воспроизведения к началу
				video.setAttribute("poster", poster); // Восстанавливаем постер
				video.removeAttribute("controls"); // Убираем атрибут controls
				playButton.classList.remove("playing");
				elementsToHide.style.display = ""; // Показываем элементы
			}
		});

		// Обработчик для завершения видео
		video.addEventListener("ended", () => {
			video.currentTime = 0; // Сброс к началу
			video.setAttribute("poster", poster); // Восстанавливаем постер
			video.removeAttribute("controls"); // Убираем атрибут controls
			playButton.classList.remove("playing");
			elementsToHide.style.display = ""; // Показываем элементы
		});
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

function parallaxImageVanilla(imageSelector) {
	const images = document.querySelectorAll(imageSelector);

	function updateParallax() {
		const windowHeight = window.innerHeight;

		images.forEach(image => {
			const rect = image.getBoundingClientRect(); // Положение и размеры изображения
			const imageCenter = rect.top + rect.height / 2; // Центр изображения
			const viewportCenter = windowHeight / 2; // Центр области просмотра

			// Вычисляем прогресс на основе разницы между центрами
			const progress = (imageCenter - viewportCenter) / windowHeight;

			// Ограничиваем прогресс для минимального смещения
			const offset = Math.max(-1, Math.min(1, progress)) * 10; // Смещение от -10% до 10%

			// Применяем трансформацию с плавным движением
			image.style.transform = `translateY(${offset}%)`;
		});
	}

	// Добавляем обработчики событий
	window.addEventListener('scroll', updateParallax);
	window.addEventListener('resize', updateParallax); // Пересчитываем на изменение размера экрана

	// Вызываем функцию один раз при загрузке страницы
	updateParallax();
}
parallaxImageVanilla('.rs-services__bg img');

function strokeTextAnimation(elem) {
	const texts = document.querySelectorAll(elem);

	texts.forEach(text => {
		const lines = text.innerHTML.split("<br>");
		text.innerHTML = lines.map((line, index) => {
			const delay = 100 + (index * 100);
			return `
        <div style="overflow: hidden;">
          <span style="display: block;" class="line" data-aos="fade-up" data-aos-delay="${delay}">${line.trim()}</span>
        </div>`;
		}).join("");
	});

	// Обновляем AOS для учета новых элементов
	AOS.refresh();
}

window.addEventListener('load', function () {
	strokeTextAnimation('h1');
	strokeTextAnimation('h2');
	strokeTextAnimation('.rs-banner__desc h3');
});

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
Спойлеры/аккордионы
==================================== */
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller

Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');

	function spollerClassInit() {
		spollersArray.forEach(spoller => {
			if (spoller) {
				const spollersItem = spoller.querySelectorAll('[class*="_item"]')

				spoller.classList.add('spollers')

				spollersItem.forEach(item => {
					if (item) {
						const spollerTitle = item.querySelector('[class*="_title"]')
						const spollerBody = item.querySelector('[class*="_body"]')

						item.classList.add('spollers__item')
						if (spollerTitle) {
							spollerTitle.classList.add('spollers__title')
						}
						if (spollerBody) {
							spollerBody.classList.add('spollers__body')
						}
					}
				});
			}
		});
	}
	spollerClassInit()

	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length) {
				spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.closest('.spollers__item').querySelector('.spollers__body').hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.closest('.spollers__item').querySelector('.spollers__body').hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.closest('[data-spoller]')) {
				const spollerTitle = el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.closest('.spollers__item').querySelector('.spollers__body'), spollerSpeed);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
			if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
			}
		}
		// Закрытие при клике вне спойлера
		const spollersClose = document.querySelectorAll('[data-spoller-close]');
		if (spollersClose.length) {
			document.addEventListener("click", function (e) {
				const el = e.target;
				if (!el.closest('[data-spollers]')) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]');
						if (spollersBlock.classList.contains('_spoller-init')) {
							const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
							spollerClose.classList.remove('_spoller-active');
							_slideUp(spollerClose.nextElementSibling, spollerSpeed);
						}
					});
				}
			});
		}
	}
}
if (document.querySelector('[data-spollers]')) {
	spollers()
}

/* ====================================
Табы
==================================== */
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	// Получаем хэш из URL
	const hash = getHash();
	if (hash && hash.startsWith('tab-')) {
		tabsActiveHash = hash.replace('tab-', '').split('-');
	}

	if (tabs.length > 0) {
		resetTabs();
		handleHashChange();

		// Отслеживание изменения хэша
		window.addEventListener('hashchange', handleHashChange);

		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});
	}

	// Инициализация медиа-запросов
	let mdQueriesArray = dataMediaQueries(tabs, "tabs");
	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			mdQueriesItem.matchMedia.addEventListener("change", () => {
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
			setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		});
	}

	// Сброс вкладок
	function resetTabs() {
		document.querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
	}

	// Функция обработки изменения хэша
	function handleHashChange() {
		const hash = getHash();
		if (hash && hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-');
			const tabsBlockIndex = tabsActiveHash[0];
			const tabsTabIndex = tabsActiveHash[1];

			const tabsBlock = document.querySelector(`[data-tabs-index="${tabsBlockIndex}"]`);
			if (tabsBlock) {
				const tabTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
				const tabItems = tabsBlock.querySelectorAll('[data-tabs-item]');

				if (tabTitles[tabsTabIndex] && tabItems[tabsTabIndex]) {
					tabsBlock.querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
					tabItems[tabsTabIndex].querySelectorAll('._tab-active').forEach(el => el.classList.remove('_tab-active'));
					tabTitles[tabsTabIndex].classList.add('_tab-active');
					tabItems[tabsTabIndex].classList.add('_tab-active');
					// Плавный скролл к верху блока табов
					tabsBlock.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		}
	}

	// Инициализация табов
	function initTabs(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles] button');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsTitles.length > 0 && tabsContent.length > 0) {
			tabsContent.forEach((content, index) => {
				if (tabsTitles[index]) {
					tabsTitles[index].setAttribute('data-tabs-title', '');
					content.setAttribute('data-tabs-item', '');

					// Если хэш блока не совпадает, добавляем активный класс
					if (!tabsActiveHashBlock && index === 0) {
						tabsTitles[index].classList.add('_tab-active');
						content.classList.add('_tab-active');
					}

					if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
						tabsTitles[index].classList.add('_tab-active');
						content.classList.add('_tab-active');
					}
				}
			});
		}
	}

	// Расстановка заголовков по медиа-запросам
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			const tabsTitles = tabsMediaItem.item.querySelector('[data-tabs-titles]');
			const tabsContent = tabsMediaItem.item.querySelector('[data-tabs-body]');
			const tabTitles = Array.from(tabsMediaItem.item.querySelectorAll('[data-tabs-title]'));
			const tabItems = Array.from(tabsMediaItem.item.querySelectorAll('[data-tabs-item]'));

			if (matchMedia.matches) {
				tabItems.forEach((content, index) => {
					tabsContent.append(tabTitles[index]);
					tabsContent.append(content);
					tabsMediaItem.item.classList.add('_tab-spoller');
				});
			} else {
				tabTitles.forEach((title, index) => {
					tabsTitles.append(title);
					tabsMediaItem.item.classList.remove('_tab-spoller');
				});
			}
		});
	}

	// Обновление состояния табов
	function setTabsStatus(tabsBlock) {
		const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

		tabsContent.forEach((content, index) => {
			if (tabsTitles[index].classList.contains('_tab-active')) {
				content.classList.add('_tab-active');
				setHash(`tab-${tabsBlockIndex}-${index}`);
			} else {
				tabsTitles[index].classList.remove('_tab-active')
				content.classList.remove('_tab-active');
			}
		});
	}

	// Обработка кликов по заголовкам табов
	function setTabsAction(e) {
		const tabTitle = e.target.closest('[data-tabs-title]');
		if (tabTitle) {
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				tabsBlock.querySelectorAll('[data-tabs-title]._tab-active').forEach(item => item.classList.remove('_tab-active'));
				tabTitle.classList.add('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
			AOS.refresh()
		}
	}
}
if (document.querySelector('[data-tabs]')) {
	tabs()
}

/* ====================================
Инициализация галереи
==================================== */
Fancybox.bind("[data-fancybox]", {
	// Отключение возврата картинки к блоку
	hideClass: false, // Убирает стандартную анимацию
	dragToClose: false, // Отключает перетаскивание для закрытия

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

// Получение хеша в адресе сайта
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}
// Указание хеша в адресе сайта
function setHash(hash) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	history.pushState('', '', hash);
}
