import Git from 'nodegit'
import path from 'path'
import promisify from 'promisify-node'

let fse = promisify(require('fs-extra')),
    fileName = 'commit_count.gt',
    counterFile = '',
    commitCount = 0,
    authorCommitter = {},
    date = new Date(),
    repo, index, oid, globalConfig

fse.ensureDir = promisify(fse.ensureDir)

Git.Repository.open(path.resolve('../.git'))
.then(function(repoResult) {
  repo = repoResult
  counterFile = path.join(repo.workdir(), '.git_thin/' + fileName)
  // debugger
  return fse.ensureFile(counterFile)
})
.then(function() {
  // debugger
  return fse.readFile(counterFile, 'utf8')
})
.then (function(data) {
  commitCount = parseInt(data, 10)
  if (commitCount > 0) {
    return repo.getHeadCommit()
  } else {
    console.log("Commit value invalid (must be greater than 0)")
    process.exit()
  }
}).then(function(commit) {
  let eventEmitter = commit.history()

    eventEmitter.on('commit', function(commit) {
      // Use commit
      debugger
    });

    eventEmitter.on('end', function(commits) {
      // Use commits
      debugger
    });

    eventEmitter.on('error', function(error) {
      // Use error
      debugger
    });

    eventEmitter.start()

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
