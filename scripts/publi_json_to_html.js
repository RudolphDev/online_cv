$(function() {
    var people = [];
    $.getJSON('../data/publis.json', function(data) {
        $.each(data, function(i, f) {
           var tblRow = f.abstract;
            $(tblRow).appendTo("#publication-entries");
      });
 
    });
 
 });