import {parseBibFile} from "bibtex";
 
const bibFile = parseBibFile(`
 
@InProceedings{mut2011,
  author    = {Pradeep Muthukrishnan and Dragomir Radev and Qiaozhu Mei},
  title     = {Simultaneous Similarity Learning and Feature-Weight Learning for Document Clustering},
  booktitle = {Proceedings of TextGraphs-6: Graph-based Methods for Natural Language Processing},
  month     = {June},
  year      = {2011},
  address   = {Portland, Oregon},
  publisher = {Association for Computational Linguistics},
  url       = {http://www.aclweb.org/anthology/W11-1107},
  pages = {42--50}
}
`);
 
console.log(
    // Keys are case-insensitive
    bibFile.getEntry("MUT2011").getField("TITLE")
); 

console.log("Test")
// import {parseBibFile} from "../node_modules/bibtex/index.js"
// // var bibtex = require('../node_modules/bibtex/index.js');
// const bibfile =parseBibFile("../data/publis.bibtex");
// console.log(bibfile);

// $(function () {
//     // 
    
// });