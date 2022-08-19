function getFlag(country_name) {
  switch(country_name) {
    case "USA":
      flag_code = "<span class=\"iconify\" data-icon=\"twemoji:flag-for-flag-united-states\" data-inline=\"false\" data-width=\"24\" style=\"vertical-align:-0.25em\"></span>"
      break;
    case "France":
      flag_code = "<span class=\"iconify\" data-icon=\"twemoji:flag-for-flag-france\" data-inline=\"false\" data-width=\"24\" style=\"vertical-align:-0.25em\"></span>"
      break;
    case "Canada":
      flag_code = "<span class=\"iconify\" data-icon=\"twemoji:flag-for-flag-canada\" data-inline=\"false\" data-width=\"24\" style=\"vertical-align:-0.25em\"></span>"
      break;
    default:
      flag_code = ""
  }
  
  return flag_code;   // The function returns the product of p1 and p2
}

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
            publidiv = publidiv + "<p>" + f.abstract + "</p>" 
            publidiv = publidiv + "</p><span class=\"publi-meta\"><b>" + f.congress + ", " + f.issued["date-parts"][0][0] + "</span>"
            publidiv = publidiv + "<span style=\"float:right;\">" +   f.city + " " + getFlag(f.country) + "</span></b>" +
            "</div>";
            $(publidiv).appendTo("#communication-entries");
          });
      });
  });