$(function() {
    $.getJSON('https://raw.githubusercontent.com/RudolphDev/online_cv/main/data/publis.json', function(data) {
        $.each(data, function(i, f) {
           var publidiv = "<div class=\"publi-div\">" + 
           "<span class=\"publi-title\">" + f.title + "</span><br> " + 
           "<span>";
           $.each(f.author, function(i, author) {
              if (author.family == "Renne" && author.given == "Thomas") {
                publidiv = publidiv + "<b>" + author.given + " " + author.family + "</b>,";
              }
              else {
                if (i == Object.keys(f.author).length-1) {
                  console.log("Test")
                  publidiv = publidiv + "<span lang=\"en\"> and </span><span lang=\"fr\"> et </span>" + author.given + " " + author.family;
                }
                else {
                  publidiv = publidiv + author.given + " " + author.family + ",";
                }
              }
            });
            publidiv = publidiv + "</span><br><span>" + f["container-title"] + ", " + f.issued["date-parts"][0][0] + "</span>"
            "</div>";
            $(publidiv).appendTo("#publication-entries");
          });
      });
  });