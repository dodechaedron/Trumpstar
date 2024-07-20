var app = app || {};
let scrollTop, scrollLeft = 0;
var ids = ["modal-viral-01", "modal-viral-02", "modal-viral-03"];
var videos = ["https://www.youtube.com/embed/8ttZDz6zcKk?si=SL614wxU3Scixk7q", "https://www.youtube.com/embed/05Za1DKe-RY?si=8BR3tVPSQqaHCcUL", "https://www.youtube.com/embed/BdKVPK2YHSw?si=Mw9KI69ytEuffPLT"]
var loaded = [];
app.init = function () {
	app.anchorLink();
	app.showMenu();
	app.modal();
};
app.modal = function () {
	$('.js-modal').on('click', function (e) {
		e.preventDefault();
		let modalID = $(this).data('modal');
		if (modalID) {
			app.stopScroll();
			$('<div class="modal-backdrop"></div>').appendTo('body');
			var index = ids.indexOf(modalID);
			// if (!loaded[index]) {

				var parent = document.getElementById(modalID).querySelector("iframe");
				parent.src = videos[index]
			// 	loaded[index] = true;
			// }
			$('#'+modalID).fadeIn(100, function () {
				$(this).addClass('show');
				// var iframe = $("#youtubeFrame"+modalID).attr("src", youtubeLinks[Number(modalID)]);
				// iframe.attr("src", youtubeLinks[Number(modalID)])
				// $("#")
			});
		}
	});

	$('body').on('click', '[close-modal], .modal-backdrop', function (e) {
		var $iframe = $('.modal').find('iframe');


			if ($iframe.length > 0) {
				var src = $iframe.attr('src');
				$iframe.each(function (index) {
					$(this).attr('src', "");

				});

			}
		$('.modal').removeClass('show').delay(200).hide(0);
		$('.modal-backdrop').fadeOut(200, function () {
			$(this).remove();
			app.resumeScroll();
		});
	});

	$('body').on('click', function (e) {
		let container = $('.modal-content, .js-modal');

		if (!container.is(e.target) && container.has(e.target).length === 0) {
			var $iframe = $('.modal').find('iframe');


			if ($iframe.length > 0) {
				var src = $iframe.attr('src');
				$iframe.each(function (index) {
					$(this).attr('src', $(this).attr('src'));

				});

			}
			$('.modal').removeClass('show').delay(200).hide(0);
			$('.modal-backdrop').fadeOut(200, function () {
				$(this).remove();
				app.resumeScroll();
			});
		}
	});
}
app.anchorLink = function () {
	$('.anchor-link').click(function () {
		var offset = $(window).width() > 768 ? 85 : 46;
		console.log(offset);
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - offset
				}, 1000);
				return false;
			}
		}

	});
}
app.showMenu = function () {
	let menuBtn = $('.js-show-menu'),
		header = $('.header-box');

	menuBtn.on('click', function () {
		const m = $(this);
		if (m.hasClass('is-active')) {
			// app.resumeScroll();
			m.removeClass('is-active');
			header.removeClass('is-active');
		} else {
			// app.stopScroll();
			m.addClass('is-active');
			header.addClass('is-active');
		}
	});
	$('.header-menu__item a').click(function () {
		// app.resumeScroll();
		$('.js-show-menu').removeClass('is-active');
		header.removeClass('is-active');
	});
}
app.stopScroll = function () {
	scrollTop = $(window).scrollTop();
	scrollLeft = $(window).scrollLeft();
	$("html")
		.addClass("noscroll")
		.css("top", -scrollTop + "px");
};

app.resumeScroll = function () {
	$("html").removeClass("noscroll");
	$(window).scrollTop(scrollTop);
	$(window).scrollLeft(scrollLeft);
};


$(document).ready(function () {
	$(window).on('load', function () {
		new WOW({
			animateClass: 'animate_animated',
			offset: 100,
		}).init();
	});
	$('.page-top a').click(function () {
		$('html, body').animate({ scrollTop: 0 });
		return false;
	});

	app.init();
});