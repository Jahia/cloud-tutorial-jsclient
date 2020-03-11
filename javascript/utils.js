
/**
 * This function execute a vanilla ajax call
 * @param options The object containing the options for the ajax call :
 *                  - type : The request type (POST, GET, DELETE, PUT)
 *                  - url : The ajax call URL
 *                  - contentType : The ajax request contentType (xml,json etc)
 *                  - dataType : The ajax request dataType (xml,json etc)
 *                  - responseType : The ajax request responseType (xml,json etc)
 *                  - success : The ajax request callback function in case of success
 *                  - error : The ajax request callback function in case of error
 *                  - jsonData : The ajax request data json Object for json contentType
 *                  - data : The ajax request data for other content types
 */
function ajax(options) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    if ('withCredentials' in xhr) {
        xhr.open(options.type, options.url, options.async);
        //  xhr.withCredentials = true;
    } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(options.type, options.url);
    }

    if (options.contentType) {
        xhr.setRequestHeader('Content-Type', options.contentType);
    }

    if (options.dataType) {
        xhr.setRequestHeader('Accept', options.dataType);
    }

    if (options.responseType) {
        xhr.responseType = options.responseType;
    }

    var wemExecuted = false;
    xhr.onreadystatechange = function () {
        if (!wemExecuted) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 204 || xhr.status === 304) {
                    if (xhr.responseText != null) {
                        wemExecuted = true;
                        options.success(xhr);
                    }
                } else {
                    options.error(xhr);
                    console.error('googleVariants.js - XML request error: ' + xhr.statusText + ' (' + xhr.status + ')');
                }
            }
        }
    };

    if (options.jsonData && !jQuery.isEmptyObject(options.jsonData)) {
        xhr.send(JSON.stringify(options.jsonData));
    } else if (options.data && !jQuery.isEmptyObject(options.jsonData)) {
        xhr.send(options.data);
    } else {
        xhr.send();
    }
}



/**
 * This function builds an HTML Fragment based on the parameters provided
 */
function buildHtmlSection(title,desc,imagePath){

    return $([
        "<div class='tutoItem card mb-3' style=\"width: 24rem;\">",
        "<img class=\"card-img-top\"  src=\""+imageServerURL+imagePath+"\" alt=\"Image Description\">",
        " <div class=\"card-body\">",
        "  <h2 class='title'>"+title+"</h2>",
        "  <p class='paragraph'>"+desc+"</p>",
        "<div>",

        "</div>",
        "</div>",
        "</br>"
    ].join("\n"));
}

