$(function () {
    $('[lang]').hide(); // hide all lang attributes on start.
    $('[lang="fr"]').show(); // show just Korean text (you can change it)
    console.log('First');
});

// Handle language menu
function showww() {
    document.getElementById("lang-select").style.height = "auto";
    document.getElementById("lang-select").style.overflow = "y-scroll";
}

function hideee() {
    document.getElementById("lang-select").style.height = "30px";
    document.getElementById("lang-select").style.overflow = "hidden";
  }


function myfuunc(imgParent, lang) {
  hideee();
  var mainDIVV = document.getElementById("lang-select");
  imgParent.parentNode.removeChild(imgParent);
  mainDIVV.insertBefore(imgParent, mainDIVV.childNodes[0]);
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