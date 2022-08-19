$(function() {
    $.getJSON('https://raw.githubusercontent.com/RudolphDev/online_cv/main/data/publis.json', function(data) {
        $.each(data, function(i, f) {
           var publidiv = "<div class=\"publi-div\">" + 
           "<a href=\"https://www.doi.org/" + f.DOI + "\" style=\"text-decoration:none;\"><span class=\"publi-title\">" + f.title + "</span></a><br> " + 
           "<p class=\"publi-author\">";
           $.each(f.author, function(i, author) {
              if (author.family == "Renne" && author.given == "Thomas") {
                publidiv = publidiv + "<b>" + author.given + " " + author.family + "</b>, ";
              }
              else {
                if (i == Object.keys(f.author).length-1) {
                  publidiv = publidiv + "<span lang=\"en\"> and </span><span lang=\"fr\"> et </span>" + author.given + " " + author.family;
                }
                else {
                  publidiv = publidiv + author.given + " " + author.family + ", ";
                }
              }
            });
            publidiv = publidiv + "<p style=\"text-align: justify\">" + f.abstract + "</p>" 
            publidiv = publidiv + "</p><span class=\"publi-meta\"><b>" + f["container-title"] + ", " + f.issued["date-parts"][0][0] + "</span>"
            publidiv = publidiv + "<span style=\"float:right;\">" +   f["note"] + "</span></b>" +
            "</div>";
            $(publidiv).appendTo("#publication-entries");
          });
      });
  });