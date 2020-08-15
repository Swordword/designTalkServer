const cherrio = require('cheerio')
const node =`
<div>
<div class="shot-title">Catilo Task Management Landing Page</div>
</div>
`
const $= cherrio.load(node)

console.log($('.shot-title').text())
