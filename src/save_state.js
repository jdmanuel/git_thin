import Git from 'nodegit'
import path from 'path'
import promisify from 'promisify-node'

let fse = promisify(require('fs-extra')),
    authorCommitter = {},
    date = new Date(),
    fileName = 'commit_count.gt',
    counterFile = '',
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
  // debugger
  let signature =
    Git.Signature.create(authorCommitter.name, authorCommitter.email, date.getTime(), 0);
  return repo.createCommit("HEAD", signature, signature, date.toString(), oid, [parent]);
})
.then(function(commitId) {
  console.log("New Commit: ", commitId);
})
.then(function() {
  counterFile = path.join(repo.workdir(), '.git_thin/' + fileName)
  return fse.ensureFile(counterFile)
})
.then(function() {
  return fse.readFile(counterFile, 'utf8')
})
.then (function(data) {
  if ((commitCount = parseInt(data, 10)) > 0 ) {
  } else {
    commitCount = 0
    console.log("Counter value invalid")
  }
  // commitCount++
  // debugger
  return commitCount++
})
.then(function(commitCount) {
  debugger
  fse.writeFile(counterFile, commitCount, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
})
