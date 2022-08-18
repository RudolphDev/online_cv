$(function() {
    $.getJSON('https://raw.githubusercontent.com/RudolphDev/online_cv/main/data/communications.json', function(data) {
        $.each(data, function(i, f) {
           var publidiv = "<div class=\"publi-div\">" + 
           "<span class=\"publi-title\">" + f.title + "</span><br> " + 
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
            publidiv = publidiv + "</p><span class=\"publi-meta\"><b>" + f.congress + ", " + f.issued["date-parts"][0][0] + "</span>"
            publidiv = publidiv + "<span style=\"float:right;\">" +   f.city + "</span></b>" +
            "</div>";
            $(publidiv).appendTo("#communication-entries");
          });
      });
  });