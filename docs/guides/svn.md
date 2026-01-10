# Subversion

Subversion is a centralized version control system. Often abbreviated as SVN

## Basic commands

### Clone a repo

`svn checkout https://svn.code.sf.net/p/svnbook/source`

`svn co https://svn.code.sf.net/p/svnbook/source`

### Pull changes

`svn update`

> Commits ~> Revisions

### Add file to repo

`svn add file.txt`

> Files yet to be added show a `?` next to them in output of `svn status`

`svn delete file.txt` -> Gives warning if file not committed yet, needs `--force` flag for that

### Add new empty directory to repo

`svn mkdir testdir`

### Move file to another directory

`svn move file.txt ..`

### Repo information along with last change info

`svn info`

### More info with verbose flag

`svn status -v`

### Committing changes (also pushes as centralized VCS)

`svn commit -m 'Commit message'` -> COMMITS TO CENTRAL REPO
