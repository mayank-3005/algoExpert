

 // table
 $('#edit').click(function () {
    var headers = $('#table th').map(function () {
        var th = $(this);
        return {
            text: th.text(),
            shown: th.css('display') != 'none'
        };
    });

    var h = ['<div id=tableEditor><table><thead>'];
    $.each(headers, function () {
        h.push('<th><input type=checkbox', (this.shown ? ' checked ' : ' '),
            '/> ',
        this.text,
            '</th>');
    });
    h.push('</thead></table><a href id=done class="btn">Done</a></div>');
    $('body').append(h.join(''));

    $('#done').click(function () {
        var showHeaders = $('#tableEditor input').map(function () {
            return this.checked;
        });
        $.each(showHeaders, function (i, show) {
            var cssIndex = i + 1;
            var tags = $('#table th:nth-child(' + cssIndex + '), #table td:nth-child(' + cssIndex + ')');
            if (show) tags.show();
            else tags.hide();
        });

        $('#tableEditor').remove();
        return false;
    });

    return false;
});
            

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-toggle');

    tabs.forEach(tab => {
        tab.addEventListener('mouseover', function() {
            const itemClass = tab.classList[2];
            const contentElement = tab.closest('.tab').nextElementSibling;
            const ulElement = contentElement.querySelector('ul.residential');

            let color;

            switch (itemClass) {
                case 'item-9':
                    color = '#f1c40f'; // Yellow
                    break;
                case 'item-10':
                    color = '#e67e22'; // Orange
                    break;
                case 'item-11':
                    color = '#e74c3c'; // Red
                    break;
                case 'item-12':
                    color = '#9b59b6'; // Purple
                    break;
                default:
                    color = '#ffffff'; // Default color if no match
            }

            ulElement.style.backgroundColor = color;
        });

        tab.addEventListener('mouseout', function() {
            const contentElement = tab.closest('.tab').nextElementSibling;
            const ulElement = contentElement.querySelector('ul.residential');
            ulElement.style.backgroundColor = ''; // Reset to default background color
        });
    });
});

