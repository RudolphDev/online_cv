import {parseBibFile, normalizeFieldValue} from "bibtex";


$(function () {
    // 
    const bibfile =parseBibFile("../data/publis.bibtex");
    console.log(bibfile);
});