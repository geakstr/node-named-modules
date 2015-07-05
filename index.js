'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function() {
  var config = {
    name: 'namedModules',
    description: 'Allows you to specify aliases for your module paths'
  };

  var pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
  );

  var modules = pkg[config.name];
  if (typeof modules !== 'object') {
    throw new Error('`' + config.name + '` section not exist in package.json');
  }

  var aliasModule = function(name) {
    var dir = path.join(process.cwd(), 'node_modules', name);

    if (fs.existsSync(path.join(dir, 'package.json'))) {
      throw new Error('Cannot alias module `' + name + '` because a node module already exists with that name');
    }

    var from = path.join(process.cwd(), modules[name]);
    var isDir = fs.statSync(from).isDirectory();
    var to = isDir ? dir : path.join(dir, 'index.js');

    if (fs.existsSync(dir)) {
      fs.unlinkSync(to);
      if (!isDir) {
        fs.rmdirSync(dir);
      }
    }

    if (!isDir) {
      fs.mkdirSync(dir);
    }
    fs.symlinkSync(from, to, isDir ? 'dir' : 'file');
  };

  Object.keys(modules).forEach(aliasModule);
};