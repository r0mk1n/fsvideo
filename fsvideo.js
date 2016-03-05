/**
 * Class for proportionally fit video iframes to parent element width
 * @author r0mk1n
 */
var FSVideo = function() {
    var templates = [ 'youtu', 'vimeo' ];
    var watched = {};

    this.watch = function() {
        $(window).on( 'resize', function() {
            process();
        });
        process();
    };

    /**
     * Searching for video frames and process
     */
    var process = function() {
        var elements = $('iframe');
        if ( elements.length ) {
            for ( var i=0; i < elements.length; i++ ) {
                var src = $( elements[i] ).attr('src');
                if ( src ) {
                    if ( isVideoFrame( src ) ) {
                        resize( elements[i] );
                    }
                }
            }
        }
    };

    /**
     * Checking is this video iframe
     * @param src
     * @returns {boolean}
     */
    var isVideoFrame = function( src ) {
        var result = false;
        for ( var i=0; i < templates.length; i++ ) {
            if ( -1 != String( src ).indexOf( templates[i] ) ) {
                result = true;
                break;
            }
        }
        return result;
    };

    /**
     * Resize element
     * @param $element
     */
    var resize = function( elm ) {
        var $element = $(elm),
            eW = $element.width(),
            eH = $element.height();
        var key = $element.attr('src');

        if ( watched.hasOwnProperty( key ) ) {
            eW = watched[key].eW;
            eH = watched[key].eH;
        } else {
            watched[key] = {
                eW: eW,
                eH: eH
            }
        }
        var $parent = $element.parent(),
            pW = $parent.width(),
            ratio = eW / eH,
            newWidth = pW,
            newHeight = newWidth / ratio;
        $element.css( {width: pW + 'px', height: ( pW / ratio ) + 'px' } );
    };
};

