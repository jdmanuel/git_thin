import Git from 'nodegit'
import path from 'path'
import promisify from 'promisify-node'

let fse = promisify(require('fs-extra')),
    fileName = 'commit_count.gt',
    counterFile = '',
    fileContent = 'hello world',
    directoryName = 'test',
    authorCommitter = {},
    date = new Date(),
    repo, index, oid, globalConfig

fse.ensureDir = promisify(fse.ensureDir)

Git.Repository.open(path.resolve('../.git'))
.then(function(repoResult) {
  repo = repoResult
  counterFile = path.join(repo.workdir(), '.git_thin/' + fileName)
  return fse.ensureFile(counterFile)
})
.then(function() {
  fse.readFile(counterFile, 'utf8', function (err, data) {
    console.log('got here') // => hello!
  })
})
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