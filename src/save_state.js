import Git from 'nodegit'
import path from 'path'
import promisify from 'promisify-node'

let fse = promisify(require('fs-extra')),
    fileName = 'newfile.txt',
    fileContent = 'hello world',
    directoryName = 'test',
    authorCommitter = {},
    date = new Date(),
    repo, index, oid, globalConfig

fse.ensureDir = promisify(fse.ensureDir)

Git.Repository.open(path.resolve('../.git'))
.then(function(repoResult) {
  repo = repoResult
  return repo.refreshIndex()
})
.then(function(indexResult){
  index = indexResult
})
.then(function() {
  return Git.Config.openDefault()
})
.then(function(config) {
  globalConfig = config
  return globalConfig.getString("user.name")
})
.then(function(name) {
  authorCommitter.name = name
  return globalConfig.getString("user.email")
})
.then(function(email) {
  authorCommitter.email = email
})
.then(function() {
  return index.addAll()
})
.then(function() {
  return index.write()
})
.then(function() {
  return index.writeTree()
})
.then(function(oidResult) {
  oid = oidResult
  return repo.getHeadCommit()
})
.then(function(parent) {
  debugger
  let signature =
    Git.Signature.create(authorCommitter.name, authorCommitter.email, date.getTime(), 0);
  return repo.createCommit("HEAD", signature, signature, date.toString(), oid, [parent]);
})
.done(function(commitId) {
  debugger
  console.log("New Commit: ", commitId);
});
