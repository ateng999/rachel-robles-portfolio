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

// SELECT ALL COUNTERS
const counters = document.querySelectorAll('.counter');

// ANIMATION FUNCTION
const animateCounter = (el) => {
	const target = +el.getAttribute('data-target');
	const suffix = el.getAttribute('data-suffix') || '';

	const duration = target < 20 ? 800 : 1500; // adaptive timing
	let startTime = null;

	// EASING FUNCTION (smooth finish)
	const easeOut = t => 1 - Math.pow(1 - t, 3);

	const update = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const progress = timestamp - startTime;
		const percent = Math.min(progress / duration, 1);
		const eased = easeOut(percent);

		const value = Math.floor(eased * target);

		el.textContent = value + suffix;

		if (percent < 1) {
		requestAnimationFrame(update);
		} else {
		el.textContent = target + suffix; // final exact value
		}
	};

	requestAnimationFrame(update);
	};

	// INTERSECTION OBSERVER (TRIGGER ON SCROLL)
	const observer = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
		animateCounter(entry.target);
		obs.unobserve(entry.target); // run once only
		}
	});
	}, {
	threshold: 0.6
});

// OBSERVE EACH COUNTER
counters.forEach(counter => observer.observe(counter));
