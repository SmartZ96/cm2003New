// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 50,
    type: 'video',
    videoEmbeddable:     true,
    videoSyndicated: true,
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    var player;
    $('.video_player').remove();
    $.each(response.result.items, function(i, val) {
        playlist.push(val.id.videoId);
        $('#search-container').append('<div id="player' + i + '" class="video_player" data-position="' + i + '" data-src="' + val.id.videoId + '"><img src="https://img.youtube.com/vi/' + val.id.videoId + '/0.jpg"/></div>');
    });
  });
}

$(function() {
    $(document).on('click', '.video_player', function() {
        var videoId = $(this).data('src');
        position = $(this).data('position');
        // onYouTubeIframeAPIReady(videoId);
        // $('iframe').attr('src', 'http://www.youtube.com/embed/' + videoId + '?autoplay=1');
        $('iframe#player').remove();
        $('body').append('<div id="player"></div>');
        player = new YT.Player('player', {
            height: '280',
            width: '280',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
});
