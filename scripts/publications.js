$(function (){
    var xhr= new XMLHttpRequest();
    xhr.open('GET', './data/publis.html', true);
    console.log("Test");
    xhr.onreadystatechange= function() {
        console.log("Test");
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
       
        document.getElementById('includedContent').innerHTML= this.responseText;
    };
    xhr.send();
    // document.getElementById("includedContent").innerHTML = "";
    // var test = 
});
