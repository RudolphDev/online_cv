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
    case "Europe":
        flag_code = "<span class=\"iconify\" data-icon=\"twemoji:flag-for-flag-european-union\" data-inline=\"false\" data-width=\"24\" style=\"vertical-align:-0.25em\"></span>"
        break;
    default:
      flag_code = ""
  }
  
  return flag_code;   // The function returns the product of p1 and p2
}

$(function() {
    $.getJSON('https://raw.githubusercontent.com/RudolphDev/online_cv/main/data/communications.json', function(data) {

        $.each(data, function(i, f) {
          console.log(i)
          console.log(f.city)
           var publidiv = "<div class=\"publi-div\"><div class=\"publi_cont_div\">"
            publidiv = publidiv + "<table style=\"width:100%\"><tr><td>"
            
            publidiv = publidiv + "<span class=\"publi-title\">" + f.title + "</span><br> ";
            publidiv = addAuthors(publidiv, f.author, f.id);
            if (f.type == "Poster") {
              publidiv = publidiv + "</td><td class=\"comm_icon\"><img src=\"data/images/Poster.svg\" style=\"width:40px\" alt=\"Poster\">"  
            }else{
              publidiv = publidiv + "</td><td class=\"comm_icon\"><img src=\"data/images/presentation.png\" style=\"width:40px\" alt=\"Poster\">"  
            }
            publidiv = publidiv + "</td></tr></table>"
            publidiv = addAbstract(publidiv, f.abstract, f.id);
            publidiv = publidiv + "<div class=\"container\"><div class=\"publi-meta\"><b>" + f.congress + ", " + f.issued["date-parts"][0][0] + "</div>";
            publidiv = publidiv + "<div style=\"float:right;\">" +   f.city + ", " + getFlag(f.country) + "</div></b></div>";
            publidiv = publidiv + "</div>"
            publidiv = addMoreBtn(publidiv, f.id);
            publidiv = publidiv + "</div>"
            $(publidiv).appendTo("#communication-entries");
            document.getElementById(f.id + "_abstract").style.display='none';
          });
      });
  });