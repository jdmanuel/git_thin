'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodegit = require('nodegit');

var _nodegit2 = _interopRequireDefault(_nodegit);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _promisifyNode = require('promisify-node');

var _promisifyNode2 = _interopRequireDefault(_promisifyNode);

var fse = (0, _promisifyNode2['default'])(require('fs-extra')),
    authorCommitter = {},
    date = new Date(),
    fileName = 'commit_count.gt',
    counterFile = '',
    repo = undefined,
    index = undefined,
    oid = undefined,
    globalConfig = undefined;

fse.ensureDir = (0, _promisifyNode2['default'])(fse.ensureDir);

_nodegit2['default'].Repository.open(_path2['default'].resolve('../.git')).then(function (repoResult) {
  repo = repoResult;
  return repo.refreshIndex();
}).then(function (indexResult) {
  index = indexResult;
}).then(function () {
  return _nodegit2['default'].Config.openDefault();
}).then(function (config) {
  globalConfig = config;
  return globalConfig.getString("user.name");
}).then(function (name) {
  authorCommitter.name = name;
  return globalConfig.getString("user.email");
}).then(function (email) {
  authorCommitter.email = email;
}).then(function () {
  return index.addAll();
}).then(function () {
  return index.write();
}).then(function () {
  return index.writeTree();
}).then(function (oidResult) {
  oid = oidResult;
  return repo.getHeadCommit();
}).then(function (parent) {
  // debugger
  var signature = _nodegit2['default'].Signature.create(authorCommitter.name, authorCommitter.email, date.getTime(), 0);
  return repo.createCommit("HEAD", signature, signature, date.toString(), oid, [parent]);
}).then(function (commitId) {
  console.log("New Commit: ", commitId);
}).then(function () {
  counterFile = _path2['default'].join(repo.workdir(), '.git_thin/' + fileName);
  return fse.ensureFile(counterFile);
}).then(function () {
  return fse.readFile(counterFile, 'utf8');
}).then(function (data) {
  var commitCount = undefined;
  if ((commitCount = parseInt(data, 10)) > 0) {} else {
    commitCount = 0;
    console.log("Counter value invalid");
  }
  commitCount++;
}).then(function (commitCount) {
  debugger;
  fse.writeFile(counterFile, commitCount, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
});