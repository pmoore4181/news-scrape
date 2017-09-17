// include controller files
var headlinesController = require('../controllers/headlines');
var notesController = require('../controllers/notes');

module.exports = function(router) {
    // homepage
    router.get("/", function(req, res) {
        res.render('home');
    });

    // saved articles page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    // This route handles scraping more articles to add to our db
    router.get("/api/fetch", function(req, res) {
        // This method inside the headlinesController will try and scrap new articles
        // and save unique ones to our database
        headlinesController.fetch(function(err, docs) {
            // If we don't get any articles back, likely because there are no new
            // unique articles, send this message back to the user
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            } else {
                // Otherwise send back a count of how many new articles we got
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

    // save headlines
    router.get('/api/headlines', function(req, res) {
        console.log('/api/headlines');

        headlinesController.get(req.query, function(data, err) {
            res.json(data);
        });
    });

    // delete saved headlines
    router.delete('/api/headlines/:id', function(req, res) {
        var query = {_id: req.params.id};

        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    // update headlines when needed
    router.put('/api/headlines', function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        })
    });

    // get all notes for specific article
    router.get('/api/notes/:headline_id', function(req, res) {
        var query = { _id: req.params.headline_id };

        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    // delete notes
    router.delete('/api/notes/:id', function(req, res) {
        var query = { _id: req.params.id };
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    // post notes to articles
    router.post('/api/notes', function(req, res) {
        notesController.save(req.body, function(data, err) {
            res.json(data);
        });
    });

}