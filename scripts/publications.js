import {bibtex} from "../node_modules";


$(function () {
    // 
    const bibfile =bibtex.parseBibFile("../data/publis.bibtex");
    console.log(bibfile);
});