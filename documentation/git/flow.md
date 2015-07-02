# Git

## Best Practices

1. Do not work directly on branch dev. If you do and then need to work in more than once task at the same time, both tasks will get mixed up.
2. Create a branch for each JIRA, task, refactor, and so on.

## Branches naming conventions

Branches are to be named `task-type/task-name`. Using this structure, it will be easier to organize branches, and some git clients will show them in a folder strcuture.

| Task type | Branch name prefix | Description |
| ----------| -------------------| ----------- |
| Bug | bug | Any bug with or without a JIRA assigned |
| Feature | feature | Any new development |
| Refactor | refactor | Changing a current implementation without fixing an specific bug |
| Hotfix | hotfix | Any bug with or without a JIRA assigned that needs to be made directly into FT or PROD branches |

## Workflow with a branch per task

In plain english, this is the process

1. Update dev with lastest changes
2. Create a new branch off dev
3. Do the work
4. Commit regularly
5. If the branch is to be open for more than a couple of hours, it's recommened to get the lastest changes from dev, so we catch any merge conflict early.
6. When the work is complete, we push this branch and make a pull request to StealthMobile:dev
7. If the pull request is merged, you can remove the work branch from both your local and remote repo
8. If the pull request needs more work, you can continue commiting and pushing in the same branch and the pull request will automatically update

###### In git logic

***Assuptions***

1. Our main remote repo (StealthMobile) is `upstream`
2. Our fork repo is `fork`

```
# make sure we're on dev branch
$ git checkout dev

# get lastest from upstream dev
$ git pull upstream dev

# create new, specific branch
$ git checkout -b feature/routines

# commit regurlaly, as needed
$ git add .
$ git commit -m "add routines API calls"

# get lastest from dev to avoid big merge conflicts
$ git pull upstream dev

# push your branch to your fork
$ git push fork feature/routines

# create pull request

# remove branch from remote repo
$ git push fork :feature/routines

# remove branch from local repo
$ git branch -D feature/routines
```

## Hotfixes

When a bug is found in FT or PROD and we need to fix it immediately without adding more fixes or features, we have to use a hotfix branch.

Hotfix branches may branch off `master` or `fieldtest`. These branches **have** to have only one fix, and after the work is complete, it has to merged back to the branch it was branched off and `dev`, so the development branch can have the fix too.

###### In git logic

***Assuptions***

1. Our main remote repo (StealthMobile) is `upstream`
2. Our fork repo is `fork`

```
$ git checkout master
$ git pull upstream master
$ git checkout -b hotfix/my-fix
$ git add .
$ git commit -m "fixing title"
$ git push fork hotfix/my-fix
# create pull request and then it's merged
$ git checkout dev
$ git merge hotfix/my-fix
$ git push fork :feature/routines
$ git branch -D feature/routines
```

## Tagging