/*global define,console,Globalize,brease*/
define(['globalize'], function (globalize) {

    'use strict';

    /**
    * @class brease.helper.DateFormatter
    * @extends core.javascript.Object
    * 
    * @singleton
    */
    var Formatter = {

        /**
        * @method format
        * Format a date or time  
        * @param {Date} value
        * @param {brease.config.DateFormat} format
        * @param {Function} callback
        * @param {String} cultureKey (optional) if not specified, system selected culture is taken
        */
        format: function (value, format, callback, cultureKey) {

            cultureKey = cultureKey || brease.culture.getCurrentCulture().key;

            if (Globalize.findClosestCulture(cultureKey) === null) {
                cultureKey = Globalize.cultures.default.name;
            }
            callback(Globalize.format(value, format, cultureKey));
        },

        /**
        * @method formatSync
        * Format a date or time  (synchronous version)
        * @param {Date} value
        * @param {brease.config.DateFormat} format
        * @param {String} cultureKey (optional) if not specified, system selected culture is taken
        * @return {String}
        */
        formatSync: function (value, format, cultureKey) {

            cultureKey = cultureKey || brease.culture.getCurrentCulture().key;

            if (Globalize.findClosestCulture(cultureKey) === null) {
                cultureKey = Globalize.cultures.default.name;
            }
            return Globalize.format(value, format, cultureKey);
        }
    };

    return Formatter;

});


/**
* @class brease.config.DateFormat
* @extends String
* @embeddedClass
* @virtualNote
* Either a format string (e.g. "HH:mm") or a pattern ("F").  
*
* <section>For available formats and patterns see at **[Internationalization Guide](#!/guide/internationalization)**</section>
* <template>Read more about <a href="../../FAQ/FormatDate.html">Date Formats</a> in FAQ.</template>
*/