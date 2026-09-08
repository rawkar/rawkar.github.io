/**
 * Main JavaScript File
 *
 * Mobilmeny utan jQuery.
 *
 * @package RawazPortfolio
 * @since 2.0.0
 */

(function() {
	'use strict';

	/**
	 * Mobile Menu Toggle
	 */
	function initMobileMenu() {
		var menuToggle = document.querySelector('.menu-toggle');
		var menu = document.getElementById('primary-menu');
		var body = document.body;

		if (!menuToggle || !menu) {
			return;
		}

		function openMenu() {
			menuToggle.classList.add('active');
			menu.classList.add('active');
			body.classList.add('menu-open');
			menuToggle.setAttribute('aria-expanded', 'true');
		}

		function closeMenu() {
			menuToggle.classList.remove('active');
			menu.classList.remove('active');
			body.classList.remove('menu-open');
			menuToggle.setAttribute('aria-expanded', 'false');
		}

		menuToggle.addEventListener('click', function(e) {
			e.preventDefault();
			if (menuToggle.classList.contains('active')) {
				closeMenu();
			} else {
				openMenu();
			}
		});

		// Close menu when clicking on a link
		menu.querySelectorAll('a').forEach(function(link) {
			link.addEventListener('click', closeMenu);
		});

		// Close menu when clicking outside
		document.addEventListener('click', function(e) {
			if (menu.classList.contains('active') && !e.target.closest('.main-navigation')) {
				closeMenu();
			}
		});

		// Close menu on ESC key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && menu.classList.contains('active')) {
				closeMenu();
				menuToggle.focus();
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMobileMenu);
	} else {
		initMobileMenu();
	}
})();
