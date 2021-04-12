$(function () {
    $('[lang]').hide(); // hide all lang attributes on start.
    $('[lang="fr"]').show(); // show just Korean text (you can change it)
    console.log('First')
    $('#lang-switch').change(function () { // put onchange event when user select option from select
        var lang = $(this).val(); // decide which language to display using switch case. The rest is obvious (i think)
        console.log('test')
        switch (lang) {
            case 'en':
                $('[lang]').hide();
                $('[lang="en"]').show();
                break;
            case 'fr':
                $('[lang]').hide();
                $('[lang="fr"]').show();
                break;
            default:
                $('[lang]').hide();
                $('[lang="fr"]').show();
        }
    });
});