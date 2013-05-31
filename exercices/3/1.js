casper.test.begin('Google search tests', 3, function suite(test) {
    casper.start("http://www.google.fr/", function() {
        test.assertTitle("Google", "google homepage title is the one expected");
        test.assertExists('form[action="/search"]', "main form is found");
        this.fill('form[action="/search"]', {
            q: "casperjs"
        }, true);
    });

    casper.waitFor(function() {
        return this.getTitle() === "casperjs - Recherche Google";
    }, function() {
        test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
        test.assertEval(function() {
            return document.querySelectorAll("h3.r").length >= 10;
        }, "google search for \"casperjs\" retrieves 10 or more results");
    });

    casper.run(function() {
        test.done();
    });
});
