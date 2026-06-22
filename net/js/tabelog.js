(function() {
    AndroidLog.log('tabelog.js loaded');
    var lastFoundState = null;
    var bridgeCheck = function() {
        try {
            var found = false;
            var foundText = '';
            var candidates = document.querySelectorAll(
                'button, a, div, span'
            );
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                var text = (el.textContent || '').trim();
                if (text.indexOf('Web版を使う') >= 0 ||
                    text.indexOf('引き続きWeb版') >= 0) {
                    var rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        var style = window.getComputedStyle(el);
                        if (style.display !== 'none' &&
                            style.visibility !== 'hidden') {
                            found = true;
                            foundText = text.substring(0, 30);
                            break;
                        }
                    }
                }
            }
            if (found !== lastFoundState) {
                lastFoundState = found;
                if (found) {
                    AndroidLog.log('tabelog: found "' + foundText + '"');
                    if (window.AndroidBridge &&
                        window.AndroidBridge.onGuideNeeded) {
                        window.AndroidBridge.onGuideNeeded(
                            'tabelog',
                            '下の「Web版を使う」の箇所を押してください'
                        );
                    }
                } else {
                    AndroidLog.log('tabelog: button gone');
                    if (window.AndroidBridge &&
                        window.AndroidBridge.onGuideFinished) {
                        window.AndroidBridge.onGuideFinished();
                    }
                }
            }
        } catch(e) {
            AndroidLog.log('tabelog check error: ' + e.message);
        }
    };
    bridgeCheck();
    setInterval(bridgeCheck, 1000);
})();
