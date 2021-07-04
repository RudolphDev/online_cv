$(function () {
    $('[lang]').hide(); // hide all lang attributes on start.
    $('[lang="fr"]').show(); // show just Korean text (you can change it)
    console.log('First');
});

// Handle language menu
function showww() {
    document.getElementById("lang-select").style.height = "auto";
    document.getElementById("lang-select").style.overflow = "y-scroll";
    document.getElementById("lang-select").style.border = "1px solid rgb(126, 135, 143);"
    document.getElementById("lang-flag").style.display = "none"
}

function hideee() {
    document.getElementById("lang-select").style.height = "0px";
    document.getElementById("lang-select").style.overflow = "hidden";
    document.getElementById("lang-flag").style.display = "block"
  }

function myfuunc(lang) {
    hideee();
    console.log(lang);
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
    };
}