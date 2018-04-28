(function ($) {
    var isOk;
    var uniqId;
    var settings;

    var bindEvents = function (element) {
        bindClick(element)
    };

    var bindClick = function (element) {
        element.click(function (e) {
            createModal(element);
            // loadPage($(this).data('page-to-load'));
        });
    };

    var readElement = function (element) {
        isOk = testDataUrl(element);
        if (isOk) {
            bindEvents(element);
            element.addClass('fancy-popup-clickable');
        }
    };

    var testDataUrl = function (element) {
        return (element.data('page-to-load') !== undefined && element.data('page-to-load') !== "");
    };

    var loadPage = function (url) {
        var modalBody = getModalBody();
        modalBody.load(url);
        modalBody.niceScroll({
            cursorwidth: "10px",
            cursorborderradius: "0px",
            cursorborder: "1px solid" + settings.scrollbarcolor,
            cursorcolor: settings.scrollbarcolor,
            autohidemode: false
        });
    };

    var createModal = function (element) {
        uniqId = guid();

        var overlay = $('<div>').addClass('fancy-popup-overlay').attr('id', uniqId);
        var modal = $('<div>').addClass('fancy-popup-modal');

        var closeBtn = $('<div>').addClass('fancy-popup-close').html('<span><i class="fa fa-times"></i> </span>');
        var modalContent = $('<div>').addClass('fancy-popup-modal-content').html('<div class="fancy-popup-loading"><i class="fas fa-spinner fa-pulse"></i></div>');

        closeBtn.click(function () {
            closeModal();
        });

        modal.append(closeBtn);
        modal.append(modalContent);
        overlay.append(modal);
        $('body').append(overlay);
        showModal(element);
    };

    var showModal = function (element) {
        $('#' + uniqId).fadeIn('fast', function () {
            $('#' + uniqId).find('.fancy-popup-modal').first().fadeIn('fast', function () {
                loadPage(element.data('page-to-load'));
            });
        });
    };

    var closeModal = function () {
        var overlay = $('#' + uniqId);
        var closebtn = overlay.find('.fancy-popup-close').first();
        closebtn.unbind('click');
        overlay.fadeOut(function() {
            overlay.remove();
        });
    };

    var getModalBody = function () {
        return $('#' + uniqId).find('.fancy-popup-modal-content').first();
    };

    var guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    $.fn.fancyPopup = function (options) {
        settings = $.extend({
            scrollbarcolor: '#424242'
        }, options);

        return this.each(function () {
            isOk = false;
            readElement($(this));
        });
    }
}(jQuery));