/**
 * Parallax & Scroll Animations
 *
 * Respekterar prefers-reduced-motion: parallax och scrollanimationer
 * körs inte när användaren bett om minskad rörelse.
 *
 * @package RawazPortfolio
 * @since 2.0.0
 */

(function() {
	'use strict';

	var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;

	/**
	 * Smooth Parallax Effect for Hero Background
	 */
	function initHeroParallax() {
		if (isMobile || prefersReducedMotion) return;

		var heroBackground = document.querySelector('.hero__background');
		if (!heroBackground) return;

		var heroImg = heroBackground.querySelector('img');
		var hero = document.querySelector('.hero');
		if (!heroImg || !hero) return;

		var speed = parseFloat(heroBackground.dataset.parallax) || 0.3;
		var ticking = false;

		function updateParallax() {
			var scrolled = window.pageYOffset;
			var heroHeight = hero.offsetHeight;

			// Only apply parallax when hero is visible
			if (scrolled < heroHeight * 1.5) {
				var yPos = scrolled * speed;
				heroImg.style.transform = 'translate3d(0, ' + yPos + 'px, 0) scale(1.1)';
			}

			ticking = false;
		}

		window.addEventListener('scroll', function() {
			if (!ticking) {
				requestAnimationFrame(updateParallax);
				ticking = true;
			}
		}, { passive: true });

		// Initial position
		updateParallax();
	}

	/**
	 * Scroll-triggered Animations
	 */
	function initScrollAnimations() {
		var animatedElements = document.querySelectorAll('[data-animate]');
		if (!animatedElements.length) return;

		// Visa allt direkt om användaren vill ha minskad rörelse
		if (prefersReducedMotion || !('IntersectionObserver' in window)) {
			animatedElements.forEach(function(el) {
				el.classList.add('is-visible');
			});
			return;
		}

		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, {
			root: null,
			rootMargin: '0px 0px -80px 0px',
			threshold: 0.1
		});

		animatedElements.forEach(function(el) {
			observer.observe(el);
		});
	}

	/**
	 * Header Scroll Effect
	 */
	function initHeaderScroll() {
		var header = document.querySelector('.site-header');
		if (!header) return;

		var ticking = false;
		var scrollThreshold = 50;

		function updateHeader() {
			if (window.pageYOffset > scrollThreshold) {
				header.classList.add('site-header--scrolled');
			} else {
				header.classList.remove('site-header--scrolled');
			}
			ticking = false;
		}

		window.addEventListener('scroll', function() {
			if (!ticking) {
				requestAnimationFrame(updateHeader);
				ticking = true;
			}
		}, { passive: true });

		// Initial check
		updateHeader();
	}

	/**
	 * Initialize all effects on DOM ready
	 */
	function init() {
		initHeroParallax();
		initScrollAnimations();
		initHeaderScroll();
	}

	// Run when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();
