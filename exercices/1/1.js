var casper = require('casper').create();
casper.start('http://fr.wikipedia.org/wiki/Scraping', function() {
    this.debugHTML();
});
casper.run();
