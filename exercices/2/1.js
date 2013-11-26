/*global casper:true*/
var casper = require('casper').create({
  pageSettings: {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:28.0) Gecko/20100101 Firefox/28.0"
  }
});

var word = casper.cli.get(0);

casper.start("http://google.com/", function() {
  this.sendKeys("input[name=q]", word);
});

casper.waitFor(function() {
  return this.fetchText(".gsq_a table span").length > 0
});

casper.run(function() {
  var lines = this.getElementsInfo(".gsq_a table span").map(function(s) {
    return s.text.trim();
  });
  this.echo('\n- ' + lines.join('\n- ')).exit();
});
