var path = require("path");
var fs = require("fs");

var jsCompiler = module.exports = {};

jsCompiler.getOrderedFileList = function (folder, file, shouldBuild, callback) {
  fs.stat(folder + file, function (err, stats) {
    if (err) return callback(err);
    var cacheToken = stats.mtime.getTime();
    return callback(null, [{ filename: file, route: file, version: cacheToken }]);
  });
};

jsCompiler.compile = function (file, shouldBuild, callback) {
  var uglify = require("uglify-js");

  fs.readFile(file, "utf-8", function (err, data) {
    if (err) return callback(err);
    if (!shouldBuild) return callback(null, data);

    var result = uglify.minify(data, { fromString: true });
    return callback(null, result.code);
  });
};