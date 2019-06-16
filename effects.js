
document.addEventListener("DOMContentLoaded", function ( e ) {

    
    jQuery( '.break-wrap' ).html(
            CoderEffects.embedTag(
                    CoderEffects.breakString(
                            jQuery( '.break-wrap' ).html( ) , 3 )) );
    
});
/**
 * @return {null}
 */
function CoderEffects(){
    
    return null;
}
/**
 * @param {String|Array} content
 * @param {String} tag
 * @return {String}
 */
CoderEffects.embedTag = function( content , tag ){
    
    if( typeof tag === 'undefined' ){
        tag = 'span';
    }
    
    var opener = '<' + tag + '>';
    var closer = '</' + tag + '>';
    
    switch( true ){
        case ( typeof content === 'string' ):
            var blocks = content.split( ' ' );
            return opener + blocks.join( closer + opener ) + closer;
        case (typeof content === 'object' && Array.isArray( content ) ):
            return opener + content.join( closer + opener ) + closer;
    }
    
    return content;
}
/**
 * @param {String} text
 * @param {Number} lines 
 * @return {String}
 */
CoderEffects.breakString = function( text , lines ){
    
        var output = [];
        
        var blocks = text.split( ' ' );
        
        var rate = parseInt( text.length / ( ( typeof lines !== 'number' || lines === 0 ) ? 2 : lines ) );
        
        //console.log( rate );

        var tmp = '';

        for( var c = 0 ; c < blocks.length ; c++ ){
            switch( true ){
                case tmp.length >= rate && c === blocks.length -1:
                    output.push( tmp );
                    output.push( blocks[ c ] );
                    break;
                case c === blocks.length -1:
                    tmp += ' ' + blocks[ c ];
                    output.push( tmp );
                    break;
                case tmp.length >= rate:
                    output.push( tmp );
                    tmp = blocks[ c ];
                    break;
                case tmp.length === 0:
                    tmp = blocks[ c ];
                    break;
                case tmp.length < rate:
                    tmp += ' ' + blocks[ c ];
                    break;
            }
        }
        
        //console.log( output );

        return output;
}

