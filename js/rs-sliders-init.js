/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-case__text_slider') && document.querySelector('.rs-case__img_slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-case');

		sliderBlocks.forEach(sliderBlock => {
			const sliderText = sliderBlock.querySelector('.rs-case__text_slider');
			const arrowNext = sliderBlock.querySelector('.rs-case__text_button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-case__text_button-prev');
			const sliderImg = sliderBlock.querySelector('.rs-case__img_slider');

			const sliderTextSwiper = new Swiper(sliderText, {
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
				simulateTouch: false,
				allowTouchMove: false,

				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				loop: true,

				// Анимация переключения
				effect: 'fade',

				// Курсор
				grabCursor: true,

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				slidesPerView: 1,
				spaceBetween: 0,
			});

			const sliderImgSwiper = new Swiper(sliderImg, {
				// Обновить свайпер при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 500,

				// Включение/отключение перетаскивания на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				loop: true,

				// Курсор
				grabCursor: true,

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				slidesPerView: 2.487,
				spaceBetween: -95,

				on: {
					// Когда происходит изменение активного слайда
					slideChange: function () {
						const swiper = this; // Получаем текущий экземпляр Swiper

						// Удаляем класс у всех слайдов
						swiper.slides.forEach(slide => {
							slide.classList.remove('swiper-slide-next-next');
						});

						// Получаем индекс активного слайда
						const nextIndex = swiper.activeIndex + 2;

						// Находим следующий слайд с учётом зацикливания (loop)
						const nextNextSlide =
							swiper.slides[
							(nextIndex >= swiper.slides.length) // Если индекс выходит за границы
								? nextIndex - swiper.slides.length // Зацикливаем его
								: nextIndex
							];

						// Добавляем класс следующему слайду после .swiper-slide-next
						if (nextNextSlide) {
							nextNextSlide.classList.add('swiper-slide-next-next');
						}

						// Синхронизация слайдера текста
						sliderTextSwiper.slideTo(swiper.realIndex);
					},
				},
			});
		});
	}

	if (document.querySelector('.rs-reviews__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-reviews__slider');
		sliderBlocks.forEach(sliderBlock => {
			const pagination = sliderBlock.querySelector('.rs-reviews__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-reviews__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-reviews__button-prev');
			const navigation = sliderBlock.querySelector('.rs-reviews__navigation');

			const sliderSwiper = new Swiper(sliderBlock, {
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
						slidesPerView: 1.2,
						spaceBetween: 16,
					},
					539.98: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					767.98: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					991.98: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
					1169.98: {
						slidesPerView: 5,
						spaceBetween: 20,
					},
					1439.98: {
						slidesPerView: 6,
						spaceBetween: 30,
					},
				},
			});
		});
	}

	if (document.querySelector('.rs-news__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-news__slider');
		sliderBlocks.forEach(sliderBlock => {
			const pagination = sliderBlock.querySelector('.rs-news__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-news__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-news__button-prev');

			const sliderSwiper = new Swiper(sliderBlock, {
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
						slidesPerView: 1.2,
						spaceBetween: 16,
					},
					539.98: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					991.98: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
				},
			});
		});
	}

	if (document.querySelector('.rs-services__slider')) {
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
			const sliderBlocks = document.querySelectorAll('.rs-services');

			sliderBlocks.forEach(sliderBlock => {
				const sliders = sliderBlock.querySelectorAll('.rs-services__slider');

				sliders.forEach(slider => {
					const arrowPrev = sliderBlock.querySelector('.rs-services__button-prev');
					const arrowNext = sliderBlock.querySelector('.rs-services__button-next');
					const pagination = sliderBlock.querySelector('.rs-services__pagination');

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
								spaceBetween: 0,
							},
							767.98: {
								slidesPerView: 2.4,
								spaceBetween: 0,
							},
						},
					});
				});

			});
		}

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
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