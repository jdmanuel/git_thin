'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodegit = require('nodegit');

var _nodegit2 = _interopRequireDefault(_nodegit);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _promisifyNode = require('promisify-node');

var _promisifyNode2 = _interopRequireDefault(_promisifyNode);

var fse = (0, _promisifyNode2['default'])(require('fs-extra')),
    fileName = 'commit_count.gt',
    counterFile = '',
    commitCount = 0,
    authorCommitter = {},
    date = new Date(),
    repo = undefined,
    index = undefined,
    oid = undefined,
    globalConfig = undefined;

fse.ensureDir = (0, _promisifyNode2['default'])(fse.ensureDir);

_nodegit2['default'].Repository.open(_path2['default'].resolve('../.git')).then(function (repoResult) {
  repo = repoResult;
  counterFile = _path2['default'].join(repo.workdir(), '.git_thin/' + fileName);
  return fse.ensureFile(counterFile);
}).then(function () {
  // debugger
  return fse.readFile(counterFile, 'utf8');
}).then(function (data) {
  if ((commitCount = parseInt(data, 10)) > 0) {
    debugger;
  } else {
    commitCount = 0;
    console.log("Counter value invalid");
  }
  commitCount++;
});
// .then(function(oidResult) {
//   oid = oidResult
//   return repo.getHeadCommit()
// })
// .then(function(commit) {
//   let eventEmitter = commit.history()

//   eventEmitter.on('commit', function(commit) {
//     // Use commit
//     debugger
//   });

//   eventEmitter.on('end', function(commits) {
//     // Use commits
//     debugger
//   });

//   eventEmitter.on('error', function(error) {
//     // Use error
//     debugger
//   });

//   eventEmitter.start()
// })

// return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
//   return repo.refreshIndex()