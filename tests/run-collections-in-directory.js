var fs = require('fs'),
    async = require('async'), // https://npmjs.org/package/async
    newman = require('newman');

fs.readdir('./', function (err, files) {
    if (err) { throw err; }

    // we filter all files with JSON file extension
    files = files.filter(function (file) {
        return (file.substr(-5) === '.json');
    });

    // now wer iterate on each file name and call newman.run using each file name
    async.eachSeries(files, function (file, next) {
        newman.run({
            collection: require(`${__dirname}/${file}`),
	    reporters: 'cli',
	    environment: 'env.json',
	    iterationData: 'testdata.csv'
        }, function (err, summary) {
            // finally, when the collection executes, print the status
            console.info(`${file}: ${err ? err.name : 'ok'}!`);
            next(err, summary);
        });
    }, function (err, results) {
       // process the errors/results here
    });
});