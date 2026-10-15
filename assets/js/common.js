$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.selected-authors-toggle').click(function() {
        var button = $(this);
        var expanded = button.attr('aria-expanded') === 'true';
        var authors = button.closest('.author');
        authors.find('.authors-compact').prop('hidden', !expanded);
        authors.find('.authors-expanded').prop('hidden', expanded);
        button.attr('aria-expanded', !expanded);
        button.text(expanded ? button.attr('data-collapsed-label') : 'Show fewer authors');
    });
    $('a').removeClass('waves-effect waves-light');
});
