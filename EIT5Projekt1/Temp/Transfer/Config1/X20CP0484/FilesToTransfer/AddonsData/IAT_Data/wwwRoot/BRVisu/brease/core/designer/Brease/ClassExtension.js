/*global define,require,console,brease*/
define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.designer.Brease.ClassExtension
    * @embeddedClass
    * @virtualNote 
    * Functionality of brease, available in editMode only. Available through the designer object of brease.
    *
    *       $.when(
    *           brease.designer.isWidgetAllowedIn('widgets.brease.Button','widgets.brease.GroupBox')
    *       ).then(function (result) {
    *           console.log(result);
    *       });
    *       
    * or
    *
    *       brease.designer.isWidgetAllowedIn('widgets.brease.Button','widgets.brease.GroupBox', function(result) {
    *           console.log(result);
    *       });
    *       
    */

    /**
    * @method isWidgetAllowedIn
    * @async
    * Async function to check if a widget allows another widget as child. Can be used with deferred object or callback.  
    * @param {WidgetType} childType
    * @param {WidgetType} parentType
    * @param {Function} [callback]
    * @return {Promise}
    */

    /**
    * @method getInitialProperties
    * @async
    * Async function to get initial properties for widget instantiation on a position. Can be used with deferred object or callback.  
    * @param {Integer} x
    * @param {Integer} y
    * @param {WidgetType} widgetType
    * @param {Function} [callback]
    * @return {Promise}
    */
    var _designer = {

        isWidgetAllowedIn: function (childType, parentType, callback) {

            var deferred = $.Deferred();

            var childClassInfoPath = _className2Path(childType, false, true) + '/designer/ClassInfo.js',
                parentClassInfoPath = _className2Path(parentType, false, true) + '/designer/ClassInfo.js';

            require([childClassInfoPath, parentClassInfoPath], function (childClassInfo, parentClassInfo) {

                var result = _allowsChild(parentClassInfo.meta, childClassInfo.meta) && _isAllowedIn(childClassInfo.meta, parentClassInfo.meta);
                _resolve(deferred, callback, result);
            });

            return deferred.promise();
        },

        getInitialProperties: function (x, y, widgetType, callback) {

            var deferred = $.Deferred();

            var classPath = _className2Path(widgetType, false),
                classInfoPath = _className2Path(widgetType, false, true) + '/designer/ClassInfo.js';

            require([classPath, classInfoPath], function (widgetClass, classInfo) {
                if (classInfo.classExtension && widgetClass.extended !== true) {
                    classInfo.classExtension.extend(widgetClass);
                }
                var result = widgetClass.static.getInitialProperties(x, y);
                _resolve(deferred, callback, result);
            });

            return deferred.promise();
        },

        className2Path: function (className, includeExt, isDir) {
            return _className2Path.apply(null, arguments);
        }
    };

    function _resolve(deferred, callback, result) {
        if (Utils.isFunction(callback)) {
            callback(result);
        }
        deferred.resolve(result);
    }

    function _allowsChild(parentClass, childClass) {

        var allowedChildren = parentClass.children,
            inheritance = childClass.inheritance;

        if (allowedChildren.indexOf('*') !== -1) {
            return true;
        } else {
            var allowed = false;
            for (var i = 0; i < inheritance.length; i += 1) {
                if (allowedChildren.indexOf(inheritance[i]) !== -1) {
                    allowed = true;
                    break;
                }
            }
            return allowed;
        }
    }

    function _isAllowedIn(childClass, parentClass) {

        var allowedParents = childClass.parents,
            requestedParent = parentClass.className;

        return allowedParents.indexOf('*') !== -1 || allowedParents.indexOf(requestedParent) !== -1;
    }

    function _className2Path(className, includeExt, isDir) {
        var path = className;

        if (isDir !== true && className.indexOf('brease') !== 0) {
            path = path + path.substring(path.lastIndexOf('.'));
        }
        if (className.indexOf('BaseWidget') !== -1 || className.indexOf('ContainerWidget') !== -1) {
            path = path.substring(0, path.lastIndexOf('.'));
        }
        path = path.replace(/\./g, '/');
        if (includeExt === true && path.indexOf('.js') === -1) {
            path += '.js';
        }

        return path;
    }

    return {
        extend: function (brease) {
            brease.designer = _designer;
        }
    };

});