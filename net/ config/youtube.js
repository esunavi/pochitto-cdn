(function() {
    /* YouTubeのShorts・コメント・グッズを非表示 */
    var hideTargets = [
        'ytd-reel-shelf-renderer',
        'ytd-rich-section-renderer',
        '#comments',
        'ytd-merch-shelf-renderer',
        'ytd-engagement-panel-section-list-renderer'
    ];
    var hideElements = function() {
        hideTargets.forEach(function(sel) {
            try {
                document.querySelectorAll(sel)
                    .forEach(function(el) {
                        el.style.display = 'none';
                    });
            } catch(e) {}
        });
    };
    hideElements();
    setInterval(hideElements, 2000);
})();
