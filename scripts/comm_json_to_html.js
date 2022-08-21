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
           var publidiv = "<div class=\"publi-div\"><div class=\"publi_cont_div\">" + 
           "<span class=\"publi-title\">" + f.title + "</span><br> ";
            publidiv = addAuthors(publidiv, f.author, f.id);
            publidiv = addAbstract(publidiv, f.abstract, f.id);
            publidiv = publidiv + "<div class=\"container\"><div class=\"publi-meta\"><b>" + f.congress + ", " + f.issued["date-parts"][0][0] + "</div>";
            publidiv = publidiv + "<div style=\"float:right;\">" +   f.city + " " + getFlag(f.country) + "</div></b></div>";
            publidiv = publidiv + "</div>"
            publidiv = addMoreBtn(publidiv, f.id);
            publidiv = publidiv + "</div>"
            $(publidiv).appendTo("#communication-entries");
            document.getElementById(f.id + "_abstract").style.display='none';
          });
      });
  });