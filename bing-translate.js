// Copyright S. Ferit Arslan and other Contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var token = 'D094CA75D6BFC6B50D47C2B4EF7347CBD9965AF7';

var langs = ['tr', 'es', 'de', 'fr', 'ro'];
var langName = [];
var results = [];

var languageFrom = "en";
var options = "{\"State\":\"0\"}";
var langIndex = 0;

/** Get all translated language name */
function getLanguageNames() {
    window.getLanguageName = function(response) {
        var array = response;
        var languageNames = "";
        for (var i = 0; i < array.length; i++) {
            langName.push(array[i]);
        }
    }
    var languageCodes = "[\"" + langs.toString().replace(/\,/gi, "\",\"") + "\"]";
    var s = document.createElement("script");
    s.src = "/web/20120109061758/http://api.microsofttranslator.com/V2/Ajax.svc/GetLanguageNames?oncomplete=getLanguageName&appId=" + token +
        "&locale=en&languageCodes=" + languageCodes;
    document.getElementsByTagName("head")[0].appendChild(s);
}

/** 
			Get your word translate to all language 
			You must run after getLanguageNames();
		*/
function getTranslations() {
    var text = document.getElementById('txtValue').value;
    var getTranslate = function(languageTo) {
        var s = document.createElement("script");
        s.src = "/web/20120109061758/http://api.microsofttranslator.com/V2/Ajax.svc/GetTranslations?oncomplete=translationCallback&appId=" + token +
            "&text=" + text + "&from=" + languageFrom + "&to=" + languageTo + "&maxTranslations=5&options=" + options;

        document.getElementsByTagName("head")[0].appendChild(s);
    };

    window.translationCallback = function(response) {
        var array = response.Translations;
        console.dir(response);
        results.push("<h4>" + langName[langIndex] + "</h4>" + array[0].TranslatedText + "\n");
        langIndex++;
        if (langIndex >= langs.length) {
            var el = document.getElementById('result');
            el.innerHTML = '';
            for (var i = 0; i < results.length; i++) {
                el.innerHTML = el.innerHTML + results[i];
            }
            langIndex = 0;
            results = [];
        } else {
            getTranslate(langs[langIndex]);
        }

        /*var translations = "";
				for (var i = 0; i < array.length; i++) {
                    translations = translations + array[i].TranslatedText + "\n";
                }*/
    };
    //start first 
    getTranslate(langs[0]);
}

   getLanguageNames();
