/*global define*/
define(['brease/core/Utils'], function (Utils) {

    /*jshint white:false*/
    'use strict';

    return {

        createNode: function (html, id, options, classPath, HTMLAttributes, content) {
            var objAttr = {
                'id': (id !== undefined) ? id : '',
                'data-brease-widget': classPath
            };
            if (HTMLAttributes) {
                for (var attrName in HTMLAttributes) {
                    objAttr[attrName] = HTMLAttributes[attrName];
                }
            }

            var tmpl = $(html).attr(objAttr),
                addStyleClass = tmpl.attr('data-instruction-addStyleClass'),
                useDOM = tmpl.attr('data-instruction-useDOM');

            if (addStyleClass === 'true' && options.style !== undefined) {
                tmpl.addClass(classPath.replace(/\//g, '_') + '_style_' + options.style);
                options.styleClassAdded = true;
            }
            if (useDOM !== 'true') {
                tmpl.empty();
            }
            tmpl.removeAttr('data-instruction-useDOM data-instruction-addStyleClass');
            if (html.indexOf('CONTENT') !== -1) {
                this.setInitialContent(tmpl, content);
            }
            return tmpl[0];
        },

        setInitialContent: function (tmpl, content, isEmpty) {
            if (content !== undefined) {
                if (content.text !== undefined) {
                    tmpl.text(content.text + '');
                } else if (content.html !== undefined) {
                    tmpl.html(Utils.parseTemplate(content.html + ''));
                } else if (isEmpty !== true) {
                    tmpl.empty();
                }
            } else if (isEmpty !== true) {
                tmpl.empty();
            }
        },

        getElem: function (target) {
            if (target !== undefined && target !== null) {
                if (target.jquery !== undefined) {
                    target = (target.length > 0) ? target[0] : null;
                } else if (typeof target.querySelectorAll !== 'function') {
                    target = null;
                }
            } else {
                target = null;
            }
            return target;
        }

    };
});