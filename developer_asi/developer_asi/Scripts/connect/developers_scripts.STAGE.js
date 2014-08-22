(function ($) {
    var ns = '__jquery_xdomain__',
        sc = 'SESSION_COOKIE_NAME';

    if ($.browser.msie && 'XDomainRequest' in window && !(ns in $)) {

        $[ns] = $.support.cors = true;

        function parseUrl(url) {
            if ($.type(url) === "object") {
                return url;
            }
            var matches = /^(((([^:\/#\?]+:)?(?:\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/.exec(url);
            return matches ? {
                href:matches[0] || "",
                hrefNoHash:matches[1] || "",
                hrefNoSearch:matches[2] || "",
                domain:matches[3] || "",
                protocol:matches[4] || "",
                authority:matches[5] || "",
                username:matches[7] || "",
                password:matches[8] || "",
                host:matches[9] || "",
                hostname:matches[10] || "",
                port:matches[11] || "",
                pathname:matches[12] || "",
                directory:matches[13] || "",
                filename:matches[14] || "",
                search:matches[15] || "",
                hash:matches[16] || ""
            } : {};
        }

        var oldxhr = $.ajaxSettings.xhr,
            sessionCookie = sc in window ? window[sc] : "jsessionid",
            domain = parseUrl(document.location.href).domain;

        $.ajaxSettings.xhr = function () {
            var target = parseUrl(this.url).domain;
            if (target === "" || target === domain) {
                return oldxhr.call($.ajaxSettings)
            } else {
                try {
                    var xdr = new XDomainRequest();
                    if (!xdr.setRequestHeader) {
                        xdr.setRequestHeader = $.noop;
                    }
                    if (!xdr.getAllResponseHeaders) {
                        xdr.getAllResponseHeaders = $.noop;
                    }
                    if (sessionCookie) {
                        var open = xdr.open;
                        xdr.open = function () {
                            var cookie = new RegExp('(?:^|; )' + sessionCookie + '=([^;]*)', 'i').exec(document.cookie);
                            cookie = cookie && cookie[1];
                            if (cookie) {
                                var q = arguments[1].indexOf('?');
                                if (q == -1) {
                                    arguments[1] += ';' + sessionCookie + '=' + cookie;
                                } else {
                                    arguments[1] = arguments[1].substring(0, q) + ';' + sessionCookie + '=' + cookie + arguments[1].substring(q);
                                }
                            }
                            return open.apply(this, arguments);
                        };
                    }
                    xdr.onload = function () {
                        if (typeof xdr.onreadystatechange === 'function') {
                            xdr.readyState = 4;
                            xdr.status = 200;
                            xdr.onreadystatechange.call(xdr, null, false);
                        }
                    };
                    xdr.onerror = xdr.ontimeout = function () {
                        if (typeof xdr.onreadystatechange === 'function') {
                            xdr.readyState = 4;
                            xdr.status = 500;
                            xdr.onreadystatechange.call(xdr, null, false);
                        }
                    };
                    return xdr;
                } catch (e) {
                }
            }
        };

    }
})(jQuery);

$(function () {
    var droplist = '<div id="dropdown">';
    droplist += '<ul><li><span class="title" href="#">Jump to</span>';
    droplist += '<ul class="menu">';
//    droplist += '<li><a href="/docs/api#authentication">Authentication <span>(1)</span></a></li>';
//    droplist += '<li><a href="/docs/api#ads">Ads <span>(3)</span></a></li>';
    droplist += '<li><a href="/connect/api#summary">Credit Summary <span>(1)</span></a></li>';
//    droplist += '<li><a href="/docs/api#accounts">Accounts <span>(3)</span></a></li>';
//    droplist += '<li><a href="/docs/api#categories">Categories <span>(2)</span></a></li>';
//    droplist += '<li><a href="/docs/api#clipboard">Clipboard <span>(3)</span></a></li>';
    droplist += '<li><a href="/connect/api#report">Credit Report <span>(1)</span></a></li>';
    
//    droplist += '<li><a href="/docs/api#legal">Legal <span>(2)</span></a></li>';
    droplist += '</ul>';
    droplist += '</li></ul></div>';
    $('#quickjump_api').html(droplist);

    var menulist = '<div>';
    menulist += '<ul id="ctl04_ctl00_simpleMenu" class="nav">';
    menulist += '<li id="ctl04_ctl00_42436" title="" data-toggle="dropdown" class="dropdown"><a href="/smartlink/api" target="" class="dropdown-toggle" data-toggle="dropdown"">SmartLink</a></li>';
    menulist += '<li id="Li1" title="" data-toggle="dropdown" class="dropdown"><a href="/espupdates/api" target="" class="dropdown-toggle" data-toggle="dropdown"">ESP Updates</a></li>';
    menulist += '<li id="Li2" title="" data-toggle="dropdown" class="dropdown"><a href="/connect/api" target="" class="dropdown-toggle" data-toggle="dropdown"">Connect</a></li>';
    menulist += '</ul>';
    menulist += '</div>';
    $('#menulist').html(menulist);

    $('#dropdown .title').parent().bind({
        mouseover: function () {
            $('#dropdown ul').addClass('active');
            $('#dropdown ul.menu').slideDown();
        },
        mouseleave: function () {
            $('#dropdown ul').removeClass('active');
            $('#dropdown ul.menu').hide();
        }
    });


	if ($('#disqus_thread').length > 0) {
		var disqus_shortname = 'asidevelopers';

		(function() {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
	}
});


var _guid;
var _asiID;
var _applicationSecret;
var _lastMethod;
//var apiURL = 'http://api.asicentral.com';
var apiURL = 'https://stage-asiservice.asicentral.com/credit';
//var apiURL = 'http://developers.asicentral.local/api/Values/GetCompanyString?CompanyId=10252';

function fixActionConnect(form) {
    _asiID = $('#asi').val();
    _asiUname = $('#username').val();
    _asiPass = $('#password').val();
    var $form = $(form);
    var $formMethod = $form.attr('method');
    var $formatVal = $form.find('.format').val();
    var newAction = $form.attr('action');
    console.log(newAction);
    var btnval = $form.find('.btn-primary').val();
    $('[type=text], [type=password], select', $form.get(0)).each(function () {
        if ($(this).val() !== '') {
            console.log($(this).val());
            if ($(this).attr('name') === 'format') {
                if (newAction.indexOf('?') > 0) {
                    console.log(newAction);
                } else {
                    //newAction = newAction + $(this).val();
                }
            } else {
                newAction = newAction.replace('{' + $(this).attr('name') + '}', encodeURIComponent($(this).val()));
                
            }
        } else {
            newAction = newAction.replace('&' + $(this).attr('name') + '={' + $(this).attr('name') + '}', '');
            newAction = newAction.replace($(this).attr('name') + '={' + $(this).attr('name') + '}', '');
        }
    });

    newAction = newAction.replace('?&', '?');
    newAction = apiURL + newAction;
    console.log(newAction);
    $isSecure = $form.parent().attr('class').indexOf('secure');
    if ($formatVal === '.json') {
        var dtype = 'json';
    } else if ($formatVal === '.xml') {
        var dtype = 'xml';
    }

    //if ($isSecure > -1 && (_asiID.length == 0 || _asiUname.length == 0 || _asiPass.length == 0)) {
    if ($isSecure > -1 && getCookie("token").length == 0) {
        alert('Please fill in the Asi ID, Username and Password.');
        window.location = '#';
        return false;
    }

    $("#invoke" + btnval).attr("disabled", true);
    $.ajaxSetup({
        async: false
    });
         $.ajax({
             url: newAction,
            type: $formMethod,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            dataType: dtype,
            //beforeSend: function (xhr) { xhr.setRequestHeader('AuthToken', 'c996040d737ac3958a1f88036549f7161936645a4f7c5f7eb0ea5b1a31dd63b5'); },
            data: ($formMethod.toLowerCase() === 'post') ? $form.find('input').serialize() : '',
            success: function (data) {
                $("#invoke" + btnval).attr("disabled", false);
                if (newAction == apiURL + '/v1/Login') {
                    document.cookie = setCookie("token",data,10);
                 }

                if (newAction.indexOf('login') > -1 && _guid) {
                    $('.endpointList').addClass('authed');
                }
                if (_lastMethod) {
                    _lastMethod.find('.hidden').slideDown();
                    _lastMethod.focus();
                    _lastMethod = '';
                    $('.hidden').first().slideUp();
                }
                $form.find('.tryIt').remove();
                if ($formatVal === '.json') {
                    var prettydata = prettyPrintOne(JSON.stringify(data, null, "    "), '', true)
                } else if ($formatVal === '.xml') {
                    //var prettydata = prettyPrintOne(formatXml(XMLToString(data)), 'xml');
                    var prettydata = prettyPrintOne(formatXml(vkbeautify.xml(XMLToString(data))));
                }

                $form.find('.hidden').append('<div class="tryIt"><pre class="prettyprint lang-js linenums pre-scrollable">' + prettydata + '</pre></div>');
                $('.selectAll').bind('click', function () {
                    $form.find('.json_input').focus().select();
                });
            },
            error: function (data) {
                $("#invoke" + btnval).attr("disabled", false);
                if ($formatVal == '.json') {
                    data = formatJson(JSON.stringify(data, null, "    "));
                } else if ($formatVal == '.xml') {
                    data = formatXml(XMLToString(data));
                }
                $('.endpointList').removeClass('authed');
                $form.find('.tryIt').remove();
                var prettydata = prettyPrintOne(data, '', true);
                /* <div class="textareaOptions"><a class="selectAll" href="javascript:void(0);">Select All</a> | <a href="' + newAction + '" target="_blank">View</a></div> */
                $form.find('.hidden').append('<div class="tryIt"><pre class="prettyprint lang-js linenums pre-scrollable">' + prettydata + '</pre></div>');
                return false;
            },
            beforeSend: function (xhr) {
               // if ($isSecure > -1 && _asiID && _asiUname && _asiPass) {
                if ($isSecure > -1 && getCookie("token").length != 0) {
                    { xhr.setRequestHeader('AuthToken', getCookie("token")); };
                    //xhr.setRequestHeader('Authorization', 'AsiMemberAuth client_id=' + _asiID + '&client_secret=' + _applicationSecret);
                }
            }
        });
    
    //console.log(data);
    return false;
    /*		 $form.attr('action', newAction);		 return true;		 */
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function resetButton() {
    $("#invoke").attr("disabled", false);
    $("#invoke1").attr("disabled", false);
    $("#invoke2").attr("disabled", false);
}

//function disableButton() {
//    if (newAction == apiURL + '/v1/Login') {
//        $("#invoke").attr("disabled", false);
//    } else if {newAction == apiURL + '/v1/Login'
//    } else if {
//    }
//    $("#invoke1").attr("disabled", false);
//    $("#invoke2").attr("disabled", false);
//}

function enableButton() {
    $("#invoke").attr("disabled", false);
    $("#invoke1").attr("disabled", false);
    $("#invoke2").attr("disabled", false);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function XMLToString(oXML) {
    if (window.ActiveXObject) {
        return oXML.xml;
    } else {
        return (new XMLSerializer()).serializeToString(oXML);
    }
}

function json2xml(o, tab) {
    var toXml = function (v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
            for (var i = 0, n = v.length; i < n; i++)
                xml += ind + toXml(v[i], name, ind + "\t") + "\n";
        }
        else if (typeof (v) == "object") {
            var hasChild = false;
            xml += ind + "<" + name;
            for (var m in v) {
                if (m.charAt(0) == "@")
                    xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                else
                    hasChild = true;
            }
            xml += hasChild ? ">" : "/>";
            if (hasChild) {
                for (var m in v) {
                    if (m == "#text")
                        xml += v[m];
                    else if (m == "#cdata")
                        xml += "<![CDATA[" + v[m] + "]]>";
                    else if (m.charAt(0) != "@")
                        xml += toXml(v[m], m, ind + "\t");
                }
                xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
            }
        }
        else {
            xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
        }
        return xml;
    }, xml = "";
    for (var m in o)
        xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

function formatJson(val) {
    var retval = '';
    var str = val;
    var pos = 0;
    var strLen = str.length;
    var indentStr = '&nbsp;&nbsp;&nbsp;&nbsp;';
    newLine = '<br />';
    var char = '';

    for (var i = 0; i < strLen; i++) {
        char = str.substring(i, i + 1);
        if (char == '}' || char == ']') {
            retval = retval + newLine;
            pos = pos - 1;
            for (var j = 0; j < pos; j++) {
                retval = retval + indentStr;
            }
        }
        retval = retval + char;
        if (char == '{' || char == '[' || char == ',') {
            retval = retval + newLine;
            if (char == '{' || char == '[') {
                pos = pos + 1;
            }
            for (var k = 0; k < pos; k++) {
                retval = retval + indentStr;
            }
        }
    }
    return retval;
}
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    //xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }
        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    formatted = formatted.replace(/\</g, "&lt;")   //for <
    formatted = formatted.replace(/\>/g, "&gt;")   //for >
    return formatted;
}

function bannerScroll(el) {
    if (el) {
        $(el).find('li').hide();

    }
}

function bannerScroll() {
    setInterval("slideSwitch('.banner_rotation')", 4000);
}
function slideSwitch(el) {
    console.log(el);
    var $active = $(el).find('li.active');
    console.log($active);
    if ($active.length == 0) $active = $(el + ' li:first');

    var $next = $active.next().length ? $active.next()
        : $(el + ' li:first');

    $active.addClass('last-active');

    $next.css({ opacity: 0.0 })
        .addClass('active')
        .animate({ opacity: 1.0 }, 1000, function () {
            $active.removeClass('active last-active');
        });
}