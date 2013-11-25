require("casper").create({pageSettings: { loadImages: false, loadPlugins: false }})
  .start("https://github.com/n1k0", function() {this.clickLabel("casperjs")})
  .waitForSelector(".commits a").thenClick(".commits a")
  .waitForSelector(".commit-group-heading").run(function() {
    this.echo("Latest commits from CasperJS:\n\n" + this.evaluate(function() {
      return [].map.call(document.querySelectorAll('.commit-title'), function(node) {
        return node.textContent.replace("…", "").trim();
      });
    }).map(function(c) {
      return "- " + c;
    }).join("\n")).exit();
  });
