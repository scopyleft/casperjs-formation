var casper = require('casper').create();
var links = [];

casper.start('http://fr.wikipedia.org/wiki/Scraping', function() {
    links = this.evaluate(function() {
        var nodes = document.querySelectorAll('a');
        return [].map.call(nodes, function(node) {
            return node.getAttribute('href');
        });
    });
});

casper.run(function() {
  this.echo(links).exit();
});
