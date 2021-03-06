// Generated by CoffeeScript 1.10.0
(function() {
  var Submodule;

  module.exports = Submodule = (function() {
    function Submodule(repo1, options) {
      this.repo = repo1;
      this.id = options.id, this.name = options.name, this.mode = options.mode;
    }

    Submodule.prototype.url = function(treeish, callback) {
      var ref;
      if (!callback) {
        ref = [callback, treeish], treeish = ref[0], callback = ref[1];
      }
      if (treeish == null) {
        treeish = "master";
      }
      return Submodule.config(this.repo, treeish, (function(_this) {
        return function(err, config) {
          return callback(err, config != null ? config[_this.name].url : void 0);
        };
      })(this));
    };

    Submodule.config = function(repo, treeish, callback) {
      return repo.tree(treeish).find(".gitmodules", function(err, blob) {
        if (err) {
          return callback(err);
        }
        return blob.data(function(err, data) {
          var conf, current, line, lines, match;
          if (err) {
            return callback(err);
          }
          conf = {};
          lines = data.split("\n");
          current = null;
          while (lines.length) {
            line = lines.shift();
            if (match = /^\[submodule "(.+)"\]$/.exec(line)) {
              current = match[1];
              conf[current] = {};
            } else if (match = /^\s+([^\s]+)\s+[=]\s+(.+)$/.exec(line)) {
              conf[current][match[1]] = match[2];
            }
          }
          return callback(null, conf);
        });
      });
    };

    return Submodule;

  })();

}).call(this);
