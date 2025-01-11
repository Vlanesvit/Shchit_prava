/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-catalog-nav__slider')) {
		// До этой ширины слайдер будет неактивным
		const breakpoint = window.matchMedia('(min-width: 991.98px)');

		let sliderSwiper;

		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				// Выключаем слайдер
				if (sliderSwiper !== undefined) sliderSwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				// Включаем слайдер
				return enableSwiper();
			}
		};

		// Инициализация слайдера
		const enableSwiper = function () {
			const sliderBlocks = document.querySelectorAll('.rs-catalog-nav');

			sliderBlocks.forEach(sliderBlock => {
				const sliders = sliderBlock.querySelectorAll('.rs-catalog-nav__slider');

				sliders.forEach(slider => {
					const arrowPrev = sliderBlock.querySelector('.rs-catalog-nav__button-prev');
					const arrowNext = sliderBlock.querySelector('.rs-catalog-nav__button-next');
					const pagination = sliderBlock.querySelector('.rs-catalog-nav__pagination');

					sliderSwiper = new Swiper(slider, {
						// // Автопрокрутка
						// autoplay: {
						// 	// Пауза между прокруткой
						// 	delay: 10000,
						// 	// Закончить на последнем слайде
						// 	stopOnLastSlide: false,
						// 	// Отключить после ручного переключения
						// 	disableOnInteraction: false,
						// },

						// Обновить свайпер
						// при изменении элементов слайдера
						observer: true,
						// при изменении родительских элементов слайдера
						observeParents: true,
						// при изменении дочерних элементов слайдера
						observeSlideChildren: true,

						// Скорость смены слайдов
						speed: 500,

						// Включение/отключение
						// перетаскивание на ПК
						simulateTouch: true,
						allowTouchMove: true,
						// Чувствительность свайпа
						touchRadio: 1,
						// Угол срабатывания свайпа/перетаскивания
						touchAngle: 45,

						// Цикличность слайдера
						// loop: true,

						// Анимация переключения
						// effect: 'fade',

						// Курсор перетаскивания
						grabCursor: true,

						// Стрелки
						navigation: {
							prevEl: arrowPrev,
							nextEl: arrowNext,
						},

						// Пагинация
						pagination: {
							el: pagination,
							clickable: true,
							type: 'progressbar'
						},

						// Брекпоинты (адаптив)
						breakpoints: {
							320: {
								slidesPerView: 1.22,
								spaceBetween: 16,
							},
							767.98: {
								slidesPerView: 2.4,
								spaceBetween: 20,
							},
						},
					});
				});

			});
		}

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}

	if (document.querySelector('.rs-product-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-product-slider');
		sliderBlocks.forEach(sliderBlock => {
			const slider = sliderBlock.querySelector('.rs-product-slider__slider');
			const pagination = sliderBlock.querySelector('.rs-product-slider__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-product-slider__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-product-slider__button-prev');

			const sliderSwiper = new Swiper(slider, {
				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 10000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 500,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				// loop: true,

				// Анимация переключения
				// effect: 'fade',

				// Курсор
				grabCursor: true,

				// Пагинация
				pagination: {
					el: pagination,
					clickable: true,
					type: 'progressbar'
					// dynamicBullets: true
				},

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},


				// Брекпоинты (адаптив)
				breakpoints: {
					320: {
						slidesPerView: 1.22,
						spaceBetween: 16,
					},
					767.98: {
						slidesPerView: 2.4,
						spaceBetween: 20,
					},
					1169.98: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1439.98: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
				},
			});
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});