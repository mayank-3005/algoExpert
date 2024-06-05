(function($) {
    $.fn.gdocsViewer = function(options) {
        var settings = {
            width: '100%',
            height: '675'
        };
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function() {
            var file = $(this).attr('href');
            var ext = file.substring(file.lastIndexOf('.') + 1);
            if (/^(tiff|pdf|ppt|pps|doc|docx)$/.test(ext)) {
                $(this).after(function() {
                    var id = $(this).attr('id');
                    var gdvId = (typeof id !== 'undefined' && id !== false) ? id + '-gdocsviewer' : '';
                    return '<div id="' + gdvId + '" class="gdocsviewer"><iframe src="https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(file) + '" width="' + settings.width + '" height="' + settings.height + '" style="border: none;"></iframe></div>';
                })
            }
        });
    };
})(jQuery);
$(document).ready(function() {
    $('a.embed').gdocsViewer({});
    $('#embedURL').gdocsViewer();
});