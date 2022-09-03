function hideShowMore(toggle, id) {
  console.log(id);
  if (toggle == "Show") {
    document.getElementById(id + "_abstract").style.display='block';
    document.getElementById(id + "_all_author").style.display='block';
    document.getElementById(id + "_first_author").style.display='none';
    document.getElementById(id + "_more_btn").style.display='none';
    document.getElementById(id + "_less_btn").style.display='inline';
  }else if (toggle == "Hide"){
    document.getElementById(id + "_abstract").style.display='none';
    document.getElementById(id + "_all_author").style.display='none';
    document.getElementById(id + "_first_author").style.display='block';
    document.getElementById(id + "_more_btn").style.display='inline';
    document.getElementById(id + "_less_btn").style.display='none';
  }
}

function addAuthors(div, authors, id) {
  div = div + "<p class=\"publi-author\" style=\"display:none;\" id=\"" + id + "_all_author\">";
  $.each(authors, function(i, author) {
    if (author.family == "Renne" && author.given == "Thomas") {
      div = div + "<b>" + author.given + " " + author.family + "</b>, ";
    }
    else {
      if (i == Object.keys(authors).length-1) {
        div = div + "<span lang=\"en\"> and </span><span lang=\"fr\"> et </span>" + author.given + " " + author.family;
      }
      else {
        div = div + author.given + " " + author.family + ", ";
      }
    }
  });
  div = div + "</p>";
  div = div + "<p id=\"" + id + "_first_author\">" + authors[0].family + " " + authors[0].given[0] + " et. al</p>";
  return div
}

function addMoreBtn(div, id) {
  div = div + "<div class=\"more_div\">";
  div = div + "<button class=\"more_btn\" id=\"" + id + "_more_btn\" onclick=\"hideShowMore('Show', '" + id + "')\"><iconify-icon icon=\"fa:plus-square\"width=\"18\"></iconify-icon></button>";
  div = div + "<button class=\"less_btn\" style=\"display:none;\" id=\"" + id + "_less_btn\" onclick=\"hideShowMore('Hide', '" + id + "')\"><iconify-icon icon=\"fa:minus-square\"width=\"18\"></iconify-icon></button></div>";
  div = div + "</div>";
  return div
}

function addAbstract(div, abstract, id) {
  div = div + "<p class=\"abstract_publi\" id=\"" + id + "_abstract\">" + abstract + "</p>";
  return div
}

$(function() {
    $.getJSON('https://raw.githubusercontent.com/RudolphDev/online_cv/main/data/publis.json', function(data) {
        $.each(data, function(i, f) {
           var publidiv = "<div class=\"publi-div\"><div class=\"publi_cont_div\">" + 
           "<a href=\"https://www.doi.org/" + f.DOI + "\" style=\"text-decoration:none;\"><span class=\"publi-title\">" + f.title + "<iconify-icon inline icon=\"ci:external-link\"></iconify-icon></span></a><br> "; 
            publidiv = addAuthors(publidiv, f.author, f.id)
            publidiv = addAbstract(publidiv, f.abstract, f.id)
            publidiv = publidiv + "<div class=\"container\"><div class=\"publi-meta\"><b>" + f["container-title"] + ", " + f.issued["date-parts"][0][0] + "</div>";
            publidiv = publidiv + "<div>" +   f["note"] + "</div></b></div></div>";
            publidiv = addMoreBtn(publidiv, f.id)
            $(publidiv).appendTo("#publication-entries");
            document.getElementById(f.id + "_abstract").style.display='none';
          });
      });
  });