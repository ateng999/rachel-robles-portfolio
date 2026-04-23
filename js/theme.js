(function($) {
	'use strict';

	var nav_offset_top = $('header').height() + 50;

	/*-------------------------------------------------------------------------------
	Navbar Fixed
	-------------------------------------------------------------------------------*/
	
	function navbarFixed() {
	if ($('.header_area').length) {
		$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();

		if (scroll >= nav_offset_top) {
			$('.header_area').addClass('navbar_fixed');
		} else {
			$('.header_area').removeClass('navbar_fixed');
		}
		});
	}
	}
	navbarFixed();


	/*-------------------------------------------------------------------------------
	Active Nav Link on Scroll (ScrollSpy)
	-------------------------------------------------------------------------------*/
	function navActiveOnScroll() {
	var sections = $('section');
	var navLinks = $('.menu_nav .nav-link');

	$(window).on('scroll', function () {
		var currentPos = $(this).scrollTop() + nav_offset_top + 50;

		sections.each(function () {
		var top = $(this).offset().top;
		var bottom = top + $(this).outerHeight();
		var id = $(this).attr('id');

		if (currentPos >= top && currentPos <= bottom) {
			navLinks.removeClass('active');

			$('.menu_nav .nav-link[href="#' + id + '"]').addClass('active');
		}
		});
	});
	}
	navActiveOnScroll();


	/*-------------------------------------------------------------------------------
	Smooth Scroll
	-------------------------------------------------------------------------------*/
	$('.menu_nav .nav-link').on('click', function (e) {
	var target = $(this.getAttribute('href'));

	if (target.length) {
		e.preventDefault();

		$('html, body').stop().animate({
		scrollTop: target.offset().top - nav_offset_top
		}, 700);

		$('.menu_nav .nav-link').removeClass('active');
		$(this).addClass('active');
	}
	});

	/*----------------------------------------------------*/
	/*  MailChimp Slider
    /*----------------------------------------------------*/
	function mailChimp() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	}
	mailChimp();

	$('select').niceSelect();
	/* ---------------------------------------------
            Isotope js Starts
         --------------------------------------------- */
	$(window).on('load', function() {

		var $grid = $('.portfolio_grid').isotope({
			itemSelector: '.portfolio_item',
			percentPosition: true,
			masonry: {
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer'
			}
		});

		// FILTER
		$('.portfolio_filter button').on('click', function () {
			$('.portfolio_filter button').removeClass('active');
			$(this).addClass('active');

			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

		// ANIMATION AFTER FILTER
		$grid.on('arrangeComplete', function () {
			gsap.from(".portfolio_item", {
			opacity: 0,
			y: 20,
			stagger: 0.05,
			duration: 0.5
			});
		});

	});

	const modal = document.getElementById("portfolioModal");
	const modalBody = modal.querySelector(".modal_body");
	const closeBtn = modal.querySelector(".close");

	// OPEN MODAL
	document.querySelectorAll(".view-btn").forEach(btn => {
		btn.addEventListener("click", () => {
			const type = btn.dataset.type;
			const src = btn.dataset.src;

			modalBody.innerHTML = "";

			if (type === "image") {
				modalBody.innerHTML = `<img src="${src}" />`;
			}

			if (type === "iframe") {
				modalBody.innerHTML = `<iframe src="${src}" frameborder="0"></iframe>`;
			}

			modal.classList.add("active");
			document.body.style.overflow = "hidden";
		});
	});

	// CLOSE MODAL
	function closeModal() {
		modal.classList.remove("active");
		document.body.style.overflow = "";
		setTimeout(() => (modalBody.innerHTML = ""), 300);
	}

	closeBtn.addEventListener("click", closeModal);

	// CLOSE OUTSIDE CLICK
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeModal();
	});

	// ESC KEY
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeModal();
	});

	/*----------------------------------------------------*/
	/* Start typing
	/*----------------------------------------------------*/
	const selectTyped = document.querySelector('.typed');
	if (selectTyped) {
		let typed_strings = selectTyped.getAttribute('data-typed-items');
		typed_strings = typed_strings.split(',');
		new Typed('.typed', {
		strings: typed_strings,
		loop: true,
		typeSpeed: 100,
		backSpeed: 50,
		backDelay: 2000
		});
	}
	/*----------------------------------------------------*/
	/*  End  typing
	/*----------------------------------------------------*/

	/*----------------------------------------------------*/
	/* Glow-btn
	/*----------------------------------------------------*/
	document.querySelectorAll('.glass-btn').forEach(btn => {
		btn.addEventListener('mousemove', e => {
			const rect = btn.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
		});
		btn.addEventListener('mouseleave', () => {
			btn.style.transform = '';
		});
	});
	/*----------------------------------------------------*/
	/*  End  glow
	/*----------------------------------------------------*/

	/*----------------------------------------------------*/
	/* skills
	/*----------------------------------------------------*/
	const skillsSection = document.querySelector(".skills");
	const progressBars = document.querySelectorAll(".progress-bar");

	const showSkills = () => {
		const sectionTop = skillsSection.getBoundingClientRect().top;
		const triggerPoint = window.innerHeight - 100;

		if (sectionTop < triggerPoint) {
			progressBars.forEach(bar => {
			const value = bar.getAttribute("data-progress");
			bar.style.width = value + "%";
			});
			window.removeEventListener("scroll", showSkills);
		}
	};

	window.addEventListener("scroll", showSkills);
	/*----------------------------------------------------*/
	/*  End  skilss
	/*----------------------------------------------------*/

	/*----------------------------------------------------*/
	/* services
	/*----------------------------------------------------*/
	function revealServices() {
		const cards = document.querySelectorAll('.service_card');

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
				entry.target.style.transform = 'translateY(0)';
			}
			});
		}, { threshold: 0.2 });

		cards.forEach(card => {
			card.style.opacity = 0;
			card.style.transform = 'translateY(40px)';
			card.style.transition = 'all 0.6s ease';
			observer.observe(card);
		});
		}

		revealServices();

	function initGlassReflection() {
		const cards = document.querySelectorAll('.service_card');

		cards.forEach(card => {
			const inner = card.querySelector('.card_inner');

			card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();

			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;

			inner.style.setProperty('--x', `${x}%`);
			inner.style.setProperty('--y', `${y}%`);

			inner.style.setProperty(
				'background',
				`
				radial-gradient(circle at var(--x) var(--y),
				rgba(0, 247, 255, 0.07),
				rgba(10,10,10,0.9) 60%)
				`
			);
			});

			card.addEventListener('mouseleave', () => {
			inner.style.background = 'rgba(10,10,10,0.85)';
			});
		});
	}

	initGlassReflection();
	/*----------------------------------------------------*/
	/* Start Magnific Pop Up
	/*----------------------------------------------------*/
	if ($('.img-gal').length > 0) {
		$('.img-gal').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}
	/*----------------------------------------------------*/
	/*  End  Magnific Pop Up
	/*----------------------------------------------------*/

	/*----------------------------------------------------*/
	/*  Google map js
    /*----------------------------------------------------*/

	if ($('#mapBox').length) {
		var $lat = $('#mapBox').data('lat');
		var $lon = $('#mapBox').data('lon');
		var $zoom = $('#mapBox').data('zoom');
		var $marker = $('#mapBox').data('marker');
		var $info = $('#mapBox').data('info');
		var $markerLat = $('#mapBox').data('mlat');
		var $markerLon = $('#mapBox').data('mlon');
		var map = new GMaps({
			el: '#mapBox',
			lat: $lat,
			lng: $lon,
			scrollwheel: false,
			scaleControl: true,
			streetViewControl: false,
			panControl: true,
			disableDoubleClickZoom: true,
			mapTypeControl: false,
			zoom: $zoom,
			styles: [
				{
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#dcdfe6'
						}
					]
				},
				{
					featureType: 'transit',
					stylers: [
						{
							color: '#808080'
						},
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#dcdfe6'
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#ffffff'
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry.fill',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#ffffff'
						},
						{
							weight: 1.8
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#d7d7d7'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'geometry.fill',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#ebebeb'
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry',
					stylers: [
						{
							color: '#a7a7a7'
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#ffffff'
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#ffffff'
						}
					]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry.fill',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#efefef'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#696969'
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'labels.text.fill',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#737373'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#d6d6d6'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{},
				{
					featureType: 'poi',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#dadada'
						}
					]
				}
			]
		});
	}
})(jQuery);
