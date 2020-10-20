/*global define,brease*/
define(['brease/core/Class', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (SuperClass, BreaseEvent, Enum) {
    /*jshint white:false */
    'use strict';

    var ButtonManager = function (widget, btnCallback) {
        this.init(widget, btnCallback);
    },
    p = ButtonManager.prototype;

    p.init = function (widget, btnCallback) {
        this.widget = widget;
        this.btnCallback = btnCallback;
        widget.el.find('.messageBoxFooter').delegate('.messageBoxButton', BreaseEvent.CLICK, btnClickHandler.bind(this));
        widget.el.find('.messageBoxFooter').delegate('.messageBoxButton', BreaseEvent.MOUSE_DOWN, btnDownHandler.bind(this));

        for (var key in buttons) {
            buttons[key].el = $('#' + widget.elem.id + '_messageBox_' + key);
            buttons[key].textEl = buttons[key].el.find('span');
        }
        this.setTexts();
    };

    p.setTexts = function () {
        for (var key in buttons) {
            buttons[key].textEl.text(brease.language.getTextByKey(buttons[key].textkey));
        }
    };

    p.setButtons = function (messageBoxType) {
        var buttonFlags;

        switch (messageBoxType) {
            case Enum.MessageBoxType.AbortRetryIgnore:
                buttonFlags = Enum.MessageBoxState.ABORT | Enum.MessageBoxState.RETRY | Enum.MessageBoxState.IGNORE;
                break;
            case Enum.MessageBoxType.OK:
                buttonFlags = Enum.MessageBoxState.OK;
                break;
            case Enum.MessageBoxType.OKCancel:
                buttonFlags = Enum.MessageBoxState.OK | Enum.MessageBoxState.CANCEL;
                break;
            case Enum.MessageBoxType.RetryCancel:
                buttonFlags = Enum.MessageBoxState.RETRY | Enum.MessageBoxState.CANCEL;
                break;
            case Enum.MessageBoxType.YesNo:
                buttonFlags = Enum.MessageBoxState.YES | Enum.MessageBoxState.NO;
                break;
            case Enum.MessageBoxType.YesNoCancel:
                buttonFlags = Enum.MessageBoxState.YES | Enum.MessageBoxState.NO | Enum.MessageBoxState.CANCEL;
                break;
        }

        for (var key in buttons) {
            buttons[key].el.showByFlag(buttonFlags & Enum.MessageBoxState[buttons[key].state]);
        }

    };

    var buttons = {
        btnOk: {
            state: 'OK',
            textkey: 'BR/IAT/brease.common.ok'
        },
        btnYes: {
            state: 'YES',
            textkey: 'BR/IAT/brease.common.yes'
        },
        btnNo: {
            state: 'NO',
            textkey: 'BR/IAT/brease.common.no'
        },
        btnAbort: {
            state: 'ABORT',
            textkey: 'BR/IAT/brease.common.abort'
        },
        btnRetry: {
            state: 'RETRY',
            textkey: 'BR/IAT/brease.common.retry'
        },
        btnIgnore: {
            state: 'IGNORE',
            textkey: 'BR/IAT/brease.common.ignore'
        },
        btnCancel: {
            state: 'CANCEL',
            textkey: 'BR/IAT/brease.common.cancel'
        }
    },
    activeButton,
    $document = $(document);

    function btnDownHandler(e) {
        var key = e.currentTarget.getAttribute('data-key');
        if (key) {
            buttons[key].el.addClass('active');
            activeButton = key;
        }
        $document.on(BreaseEvent.MOUSE_UP, btnUpHandler);
    }

    function btnUpHandler(e) {
        _stopEvent(e);
        $document.off(BreaseEvent.MOUSE_UP, btnUpHandler);
        buttons[activeButton].el.removeClass('active');
        activeButton = '';
    }

    function btnClickHandler(e) {

        var key = e.currentTarget.getAttribute('data-key');

        if (key) {
            this.btnCallback.call(this.widget, Enum.MessageBoxState[buttons[key].state]);
        }

    }

    function _stopEvent(e) {
        e.originalEvent.preventDefault();
        e.stopImmediatePropagation();
    }

    return ButtonManager;

});