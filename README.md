# Ask for feedback on PRs
Adds a comment on PRs after X amount of days.

## Recommended permissions

For the execution of this action, it must be able to fetch all issues and pull requests from your repository.  
In addition, based on the provided configuration, the action could require more permission(s) (e.g.: add label, comment).  
This can be achieved with the following [configuration in the action](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#permissions) if the permissions are restricted:

```yaml
permissions:
  pull-requests: write
```

You can find more information about the required permissions under the corresponding options that you wish to use.

## All options

### List of input options

Every argument is optional.

| Input                                                      | Description                                                                 | Default               |
|------------------------------------------------------------| --------------------------------------------------------------------------- | --------------------- |
| [repo-token](#repo-token)                                  | PAT for GitHub API authentication                                           | `${{ github.token }}` |
| [days-before-feedback](#days-before-feedback)              | Idle number of days before marking issues/PRs stale                         | `60`                  |
| [max-days-overdue](#max-days-overdue)                      | Skip PRs more than this many days past `days-before-feedback`               | `7`                   |
| [feedback-message](#feedback-message)                      | Comment on the staled issues                                                |                       |
| [exempt-labels](#exempt-labels)                            | Labels on issues exempted from stale                                        |                       |
| [exempt-authors](#exempt-authors)                          | Milestones on issues/PRs exempted from stale                                |                       |
| [exempt-draft-pr](#exempt-draft-pr)                        | Skip the stale action for draft PRs                                         | `false`               |

### Detailed options

#### repo-token

Personal Access Token (PAT) that allows the stale workflow to authenticate and perform API calls to GitHub.  
Under the hood, it uses the [@actions/github](https://www.npmjs.com/package/@actions/github) package.

Default value: `${{ github.token }}`

#### days-before-stale

The idle number of days before marking the issues or the pull requests as stale (by adding a label).  
The issues or the pull requests will be marked as stale if the last update (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`) is older than the idle number of days.  
It means that any updates made, or any comments added to the issues or to the pull requests will restart the counter of days before marking as stale.  
However, if you wish to ignore this behaviour so that the creation date (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `created_at`) only matters, you can disable the [ignore-updates](#ignore-updates) option.

If set to a negative number like `-1`, no issues or pull requests will be marked as stale automatically.  
In that case, you can still add the stale label manually to mark as stale.

The label used to stale is defined by these two options:

- [stale-issue-label](#stale-issue-label)
- [stale-pr-label](#stale-pr-label)

A comment can also be added to notify about the stale and is defined by these two options:

- [stale-issue-message](#stale-issue-message)
- [stale-pr-message](#stale-pr-message)

You can fine tune which issues or pull requests should be marked as stale based on the milestones, the assignees, the creation date and the missing/present labels from these options:

- [exempt-issue-labels](#exempt-issue-labels)
- [exempt-pr-labels](#exempt-pr-labels)
- [only-labels](#only-labels)
- [any-of-labels](#any-of-labels)
- [exempt-milestones](#exempt-milestones)
- [exempt-all-milestones](#exempt-all-milestones)
- [exempt-assignees](#exempt-assignees)
- [exempt-all-assignees](#exempt-all-assignees)
- [ignore-updates](#ignore-updates)

Default value: `60`

#### days-before-issue-stale

Useful to override [days-before-stale](#days-before-stale) but only for the idle number of days before marking the issues as stale.

Default value: unset

#### days-before-pr-stale

Useful to override [days-before-stale](#days-before-stale) but only for the idle number of days before marking the pull requests as stale.

Default value: unset

#### days-before-close

The idle number of days before closing the stale issues or the stale pull requests (due to the stale label).  
The issues or the pull requests will be closed if the last update (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`) is older than the idle number of days.  
Since adding the stale label will alter the last update date, we can calculate the number of days from this date.

If set to a negative number like `-1`, the issues or the pull requests will never be closed automatically.

The label used to stale is defined by these two options:

- [stale-issue-label](#stale-issue-label)
- [stale-pr-label](#stale-pr-label)

Default value: `7`

#### days-before-issue-close

Override [days-before-close](#days-before-close) but only for the idle number of days before closing the stale issues.

Default value: unset

#### days-before-pr-close

Override [days-before-close](#days-before-close) but only for the idle number of days before closing the stale pull requests.

Default value: unset

#### stale-issue-message

The message that will be added as a comment to the issues when the stale workflow marks it automatically as stale with a label.

You can skip the comment sending by passing an empty string.

Default value: unset  
Required Permission: `issues: write`

#### stale-pr-message

The message that will be added as a comment to the pull requests when the stale workflow marks it automatically as stale with a label.

You can skip the comment sending by passing an empty string.

Default value: unset  
Required Permission: `pull-requests: write`

#### close-issue-message

The message that will be added as a comment to the issues when the stale workflow closes it automatically after being stale for too long.

Default value: unset  
Required Permission: `issues: write`

#### close-pr-message

The message that will be added as a comment to the pull requests when the stale workflow closes it automatically after being stale for too long.

Default value: unset  
Required Permission: `pull-requests: write`

#### stale-issue-label

The label that will be added to the issues when automatically marked as stale.  
If you wish to speedup the stale workflow for the issues, you can add this label manually to mark as stale.

Default value: `Stale`  
Required Permission: `issues: write`

#### close-issue-label

The label that will be added to the issues when closed automatically.  
It will be automatically removed if the issues are no longer closed nor locked.

Default value: unset  
Required Permission: `issues: write`

#### close-issue-reason

Specify the [reason](https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/) used when closing issues. Valid values are `completed` and `not_planned`.

Default value: `not_planned`

#### stale-pr-label

The label that will be added to the pull requests when automatically marked as stale.  
If you wish to speedup the stale workflow for the pull requests, you can add this label manually to mark as stale.

Default value: `Stale`  
Required Permission: `pull-requests: write`

#### close-pr-label

The label that will be added to the pull requests when closed automatically.  
It will be automatically removed if the pull requests are no longer closed nor locked.

Default value: unset  
Required Permission: `pull-requests: write`

#### exempt-issue-labels

Comma separated list of labels that can be assigned to issues to exclude them from being marked as stale
(e.g: `question,bug`)

If unset (or an empty string), this option will not alter the stale workflow.

Default value: unset

#### exempt-pr-labels

Comma separated list of labels that can be assigned to pull requests to exclude them from being marked as stale
(e.g: `need-help,WIP`)

If unset (or an empty string), this option will not alter the stale workflow.

Default value: unset

#### only-labels

An allow-list of label(s) to only process the issues or the pull requests that contain all these label(s).  
It can be a comma separated list of labels (e.g: `answered,needs-rebase`).

If unset (or an empty string), this option will not alter the stale workflow.

If you wish to only check that the issues or the pull requests contain one of these label(s), use instead [any-of-labels](#any-of-labels).

Default value: unset

#### only-issue-labels

Override [only-labels](#only-labels) but only to process the issues that contain all these label(s).

Default value: unset

#### only-pr-labels

Override [only-labels](#only-labels) but only to process the pull requests that contain all these label(s).

Default value: unset

#### any-of-labels

An allow-list of label(s) to only process the issues or the pull requests that contain one of these label(s).  
It can be a comma separated list of labels (e.g: `answered,needs-rebase`).

If unset (or an empty string), this option will not alter the stale workflow.

If you wish to only check that the issues or the pull requests contain all these label(s), use instead [only-labels](#only-labels).

Default value: unset

#### any-of-issue-labels

Override [any-of-labels](#any-of-labels) but only to process the issues that contain one of these label(s).

Default value: unset

#### any-of-pr-labels

Override [any-of-labels](#any-of-labels) but only to process the pull requests that contain one of these label(s).

Default value: unset

#### remove-stale-when-updated

Automatically remove the stale label when the issues or the pull requests are updated (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`) or commented.

Default value: `true`  
Required Permission: `issues: write` and `pull-requests: write`

#### remove-issue-stale-when-updated

Override [remove-stale-when-updated](#remove-stale-when-updated) but only to automatically remove the stale label when the issues are updated (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`) or commented.

Default value: unset  
Required Permission: `issues: write`

#### remove-pr-stale-when-updated

Override [remove-stale-when-updated](#remove-stale-when-updated) but only to automatically remove the stale label when the pull requests are updated (based on [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`) or commented.

Default value: unset

#### labels-to-add-when-unstale

A comma delimited list of labels to add when a stale issue or pull request receives activity and has the [stale-issue-label](#stale-issue-label) or [stale-pr-label](#stale-pr-label) removed from it.

Default value: unset

#### labels-to-remove-when-stale

A comma delimited list of labels to remove when an issue or pull request becomes stale and has the [stale-issue-label](#stale-issue-label) or [stale-pr-label](#stale-pr-label) added to it.

Warning: each label results in a unique API call which can drastically consume the operations-per-run limit (30).

Default value: unset  
Required Permission: `pull-requests: write`

#### labels-to-remove-when-unstale

A comma delimited list of labels to remove when a stale issue or pull request receives activity and has the [stale-issue-label](#stale-issue-label) or [stale-pr-label](#stale-pr-label) removed from it.

Warning: each label results in a unique API call which can drastically consume the operations-per-run limit (30).

Default value: unset  
Required Permission: `pull-requests: write`

#### ascending

Change the order used to fetch the issues and pull requests from GitHub:

- `true` is for ascending.
- `false` is for descending.

It can be useful if your repository is processing so many issues and pull requests that you reach the operations-per-run limit (30).  
Based on the order, you could prefer to focus on the new content or on the old content of your repository.

Default value: `false`

#### max-days-overdue

Pull requests created more than `days-before-feedback` + `max-days-overdue` days ago are skipped.
This prevents old pull requests from being asked for feedback when they suddenly become eligible, e.g. because their author was removed from [exempt-authors](#exempt-authors).

Set to `-1` to disable.

Default value: `7`

#### delete-branch

If set to `true`, the stale workflow will automatically delete the GitHub branches related to the pull requests automatically closed by the stale workflow.

Default value: `false`  
Required Permission: `pull-requests: write` and `contents: write`

#### exempt-milestones

A white-list of milestone(s) to only process the issues or the pull requests that does not contain one of these milestone(s).  
It can be a comma separated list of milestones (e.g: `V1,next`).

If unset (or an empty string), this option will not alter the stale workflow.

Default value: unset

#### exempt-issue-milestones

Override [exempt-milestones](#exempt-milestones) but only to process the issues that does not contain one of these milestone(s).

Default value: unset

#### exempt-pr-milestones

Override [exempt-milestones](#exempt-milestones) but only to process the pull requests that does not contain one of these milestone(s).

Default value: unset

#### exempt-all-milestones

If set to `true`, the issues or the pull requests with a milestone will not be marked as stale automatically.

Priority over [exempt-milestones](#exempt-milestones).

Default value: `false`

#### exempt-all-issue-milestones

Override [exempt-all-milestones](#exempt-all-milestones) but only to exempt the issues with a milestone to be marked as stale automatically.

Default value: unset

#### exempt-all-pr-milestones

Override [exempt-all-milestones](#exempt-all-milestones) but only to exempt the pull requests with a milestone to be marked as stale automatically.

Default value: unset

#### exempt-assignees

An allow-list of assignee(s) to only process the issues or the pull requests that does not contain one of these assignee(s).  
It can be a comma separated list of assignees (e.g: `marco,polo`).

If unset (or an empty string), this option will not alter the stale workflow.

Default value: unset

#### exempt-issue-assignees

Override [exempt-assignees](#exempt-assignees) but only to process the issues that does not contain one of these assignee(s).

Default value: unset

#### exempt-pr-assignees

Override [exempt-assignees](#exempt-assignees) but only to process the pull requests that does not contain one of these assignee(s).

Default value: unset

#### exempt-all-assignees

If set to `true`, the issues or the pull requests with an assignee will not be marked as stale automatically.

Priority over [exempt-assignees](#exempt-assignees).

Default value: `false`

#### exempt-all-issue-assignees

Override [exempt-all-assignees](#exempt-all-assignees) but only to exempt the issues with an assignee to be marked as stale automatically.

Default value: unset

#### exempt-all-pr-assignees

Override [exempt-all-assignees](#exempt-all-assignees) but only to exempt the pull requests with an assignee to be marked as stale automatically.

Default value: unset

#### exempt-draft-pr

If set to `true`, the pull requests currently in draft will not be marked as stale automatically.  
⚠️ This option consume one operation per pull request to process because we need to fetch the pull request with the GitHub API to know if it's a draft one or not.

Default value: `false`  
Required Permission: `pull-requests: read`

#### ignore-updates

The option [days-before-stale](#days-before-stale) will define the number of days before considering the issues or the pull requests as stale.  
In most cases, the purpose of this action is to only stale when necessary so if any update occurs or if a comment is added to them, the counter will restart.  
Nonetheless, if you don't care about this, and you prefer to stick to this number of days no matter the update, you can enable this option.  
Instead of comparing the number of days based on the [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `updated_at`, it will be based on the [GitHub issue](https://docs.github.com/en/rest/reference/issues) field `created_at`.

Default value: `false`

#### ignore-issue-updates

Useful to override [ignore-updates](#ignore-updates) but only to ignore the updates for the issues.

Default value: unset

#### ignore-pr-updates

Useful to override [ignore-updates](#ignore-updates) but only to ignore the updates for the pull requests.

Default value: unset

#### include-only-assigned

If set to `true`, only the issues or the pull requests with an assignee will be marked as stale automatically.

Default value: `false`

### Usage

See also [action.yml](./action.yml) for a comprehensive list of all the options.

Basic:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          stale-issue-message: 'Message to comment on stale issues. If none provided, will not mark issues stale'
          stale-pr-message: 'Message to comment on stale PRs. If none provided, will not mark PRs stale'
```

Configure stale timeouts:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          stale-issue-message: 'This issue is stale because it has been open 30 days with no activity. Remove stale label or comment or this will be closed in 5 days.'
          days-before-stale: 30
          days-before-close: 5
```

Configure different stale timeouts but never close a PR:

```yaml
name: 'Close stale issues and PR'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          stale-issue-message: 'This issue is stale because it has been open 30 days with no activity. Remove stale label or comment or this will be closed in 5 days.'
          stale-pr-message: 'This PR is stale because it has been open 45 days with no activity. Remove stale label or comment or this will be closed in 10 days.'
          close-issue-message: 'This issue was closed because it has been stalled for 5 days with no activity.'
          days-before-stale: 30
          days-before-close: 5
          days-before-pr-close: -1
```

Configure different stale timeouts:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          stale-issue-message: 'This issue is stale because it has been open 30 days with no activity. Remove stale label or comment or this will be closed in 5 days.'
          stale-pr-message: 'This PR is stale because it has been open 45 days with no activity. Remove stale label or comment or this will be closed in 10 days.'
          close-issue-message: 'This issue was closed because it has been stalled for 5 days with no activity.'
          close-pr-message: 'This PR was closed because it has been stalled for 10 days with no activity.'
          days-before-issue-stale: 30
          days-before-pr-stale: 45
          days-before-issue-close: 5
          days-before-pr-close: 10
```

Configure labels:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          stale-issue-message: 'Stale issue message'
          stale-pr-message: 'Stale pull request message'
          stale-issue-label: 'no-issue-activity'
          exempt-issue-labels: 'awaiting-approval,work-in-progress'
          stale-pr-label: 'no-pr-activity'
          exempt-pr-labels: 'awaiting-approval,work-in-progress'
          only-labels: 'awaiting-feedback,awaiting-answers'
```

Avoid stale for specific milestones:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          exempt-issue-milestones: 'future,alpha,beta'
          exempt-pr-milestones: 'bugfix,improvement'
```

Avoid stale for all PR with milestones:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          exempt-all-pr-milestones: true
```

Check stale for specific labels:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          any-of-labels: 'needs-more-info,needs-demo'
          # You can opt for 'only-labels' instead if your use-case requires all labels
          # to be present in the issue/PR
```

Avoid stale for specific assignees:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          exempt-issue-assignees: 'marco,polo'
          exempt-pr-assignees: 'marco'
```

Avoid stale for all PR with assignees:

```yaml
name: 'Close stale issues and PRs'
on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          exempt-all-pr-assignees: true
```

### Debugging

**Logs:**  
To see the debug output from this action, you must set the secret `ACTIONS_STEP_DEBUG` to `true` in your repository.  
There are many logs, so this can be very helpful!

**Job frequency:**  
You could change the cron job frequency in the stale workflow to run the stale workflow more often.  
Usually, this is not very helpful though.

### Contributing

We welcome contributions!
Please read the [contributing](CONTRIBUTING.md) file before starting your work.
