const swiper = new Swiper('.services-slider', {
	loop: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	spaceBetween: 30,

	grabCursor: true,
	speed: 700,

	effect: 'coverflow',
	coverflowEffect: {
		rotate: 40,
		stretch: 0,
		depth: 300,
		modifier: 1.2,
		slideShadows: false,
	},

	autoplay: {
		delay: 1000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},

	// ✅ ADD THESE
	slideToClickedSlide: true,
	watchSlidesProgress: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		0: {
		slidesPerView: 1,
		coverflowEffect: {
			rotate: 20,
			depth: 150
		}
		},
		768: {
			slidesPerView: 3,
			coverflowEffect: {
				rotate: 30,
				depth: 200
			}
		},
		1024: {
			slidesPerView: 3,
		}
	}
});
