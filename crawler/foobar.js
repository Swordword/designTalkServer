const cheerio = require("cheerio");
const node = `
<ul id="fruits">
  <li class="apple">Apple🇮🇩</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
`;

const options = {
  normalizeWhitespace: false,
  xmlMode: true,
  decodeEntities: false,
};
const $ = cheerio.load(node, options);

console.log($(".apple").text());
