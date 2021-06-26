import {parseBibFile, normalizeFieldValue} from "../node_modules/bibtex";


$(function () {
    // 
    const bibfile =parseBibFile("../data/publis.bibtex");
    console.log(bibfile);
});