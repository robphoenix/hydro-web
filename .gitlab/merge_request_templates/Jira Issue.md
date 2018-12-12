<!-- Before opening a Merge Request, please ensure you have read the GitLab Merge Request Workflow page in the techwiki https://techwiki/htl/index.php?title=GitLab_Merge_Request_Workflow -->

<!-- Add a link to the relevant Jira ticket in the parentheses below -->

[JIRA]()

## Brief Description

<!-- Briefly describe what this MR is about -->

## Affected code

<!-- To tick a box, replace [ ] with [x] -->

<!-- If the postgres box is selected, make sure you have selected all applications using the changed function! -->

* [ ] fpweb
* [ ] scheduler
* [ ] betproducer
* [ ] chewie-bp
* [ ] chewie-le
* [ ] chewie-me
* [ ] postgres (SQL changes)
* [ ] bet-blocking-tools

## Testing

<!-- Briefly describe what testing you have done - both manual and through tests in the code -->

<!-- Add a link to a successful fm-master build in the parentheses below. No build, no merge. -->

[Successful Jenkins Build]()

/label ~"Needs Review" ~"Needs Successful Build"
