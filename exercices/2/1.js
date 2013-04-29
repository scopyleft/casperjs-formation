/*global casper:true*/
var casper = require('casper').create();
var suggestions = [];
var word = casper.cli.get(0);

if (!word) {
    casper.echo('please provide a word').exit(1);
}

casper.start('http://www.google.com/', function() {
    this.sendKeys('input[name=q]', word);
});

casper.waitFor(function() {
  return this.fetchText('.gsq_a table span').indexOf(word) === 0
}, function() {
  suggestions = this.evaluate(function() {
      var nodes = document.querySelectorAll('.gsq_a table span');
      return [].map.call(nodes, function(node){
          return node.textContent;
      });
  });
});

casper.run(function() {
  this.echo(suggestions.join('\n')).exit();
});
