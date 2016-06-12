$( "#ask-btn" ).click(function() {
    var question = encodeURI($('#ask-text').val());
    $.get( "/cbot/question?q=" + question, function( data ) {
        $("#ask-awns").html(findUrls(data.message));
    });
});

$('#ask-text').keyup(function(e){
    if(e.keyCode == 13)
    {
        $('#ask-btn').click();
    }
});

function findUrls( text )
{
    var searchText = text,

    // urls will be an array of URL matches
    
    urls = searchText.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g);

    // you can then iterate through urls
    for (var i = 0, il = urls ? urls.length : 0; i < il; i++) {
        text = text.replace('Google Maps: ' + urls[i], 'Google Maps'.link(urls[i]));
    }

    return text;
}