/**
 * Main JavaScript File
 *
 * Mobilmeny utan jQuery. Fokus flyttas in i menyn när den öppnas,
 * Tab hålls inom menyn tills den stängs, och fokus går tillbaka till knappen.
 *
 * @package RawazPortfolio
 * @since 2.0.0
 */

(function() {
	'use strict';

	function initMobileMenu() {
		var menuToggle = document.querySelector('.menu-toggle');
		var menu = document.getElementById('primary-menu');
		var body = document.body;

		if (!menuToggle || !menu) {
			return;
		}

		function isOpen() {
			return menu.classList.contains('active');
		}

		function focusables() {
			var links = Array.prototype.slice.call(menu.querySelectorAll('a[href]'));
			return [menuToggle].concat(links);
		}

		function openMenu() {
			menuToggle.classList.add('active');
			menu.classList.add('active');
			body.classList.add('menu-open');
			menuToggle.setAttribute('aria-expanded', 'true');
			var first = menu.querySelector('a[href]');
			if (first) {
				first.focus();
			}
		}

		function closeMenu(returnFocus) {
			menuToggle.classList.remove('active');
			menu.classList.remove('active');
			body.classList.remove('menu-open');
			menuToggle.setAttribute('aria-expanded', 'false');
			if (returnFocus) {
				menuToggle.focus();
			}
		}

		menuToggle.addEventListener('click', function(e) {
			e.preventDefault();
			if (isOpen()) {
				closeMenu(true);
			} else {
				openMenu();
			}
		});

		// Stäng när en länk klickas
		menu.querySelectorAll('a').forEach(function(link) {
			link.addEventListener('click', function() {
				closeMenu(false);
			});
		});

		// Stäng vid klick utanför
		document.addEventListener('click', function(e) {
			if (isOpen() && !e.target.closest('.main-navigation')) {
				closeMenu(false);
			}
		});

		// Escape stänger, Tab stannar inom knappen och menyns länkar
		document.addEventListener('keydown', function(e) {
			if (!isOpen()) {
				return;
			}
			if (e.key === 'Escape') {
				closeMenu(true);
				return;
			}
			if (e.key !== 'Tab') {
				return;
			}
			var items = focusables();
			var first = items[0];
			var last = items[items.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			} else if (items.indexOf(document.activeElement) === -1) {
				e.preventDefault();
				first.focus();
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMobileMenu);
	} else {
		initMobileMenu();
	}
})();
