import Issue from "../models/issue.js";

export function createIssue(req, res) {
  if(req.user.role !== "admin") {
      res.status(403).json({
          message: "Not authorized to create issue",
      })
      return;
  }

  const issue = new Issue(req.body)
  issue.save().then(
      ()=>{
          res.status(201).json({
              message: "Created Issue",
              issue : issue
          })
      }
  )

}

export function getAllIssues(req,res) {
    Issue.find().then((issues)=>{
        res.status(200).json({
            message:"All Issues",
            issues : issues
        })
    }).catch(()=>{
        res.status(403).json({
            message: "products not found"
        })
    })
}

export function getIssueByTitle(req, res) {
    Issue.findOne({
        title: req.params.title
    }).then((issue)=>{
        if(issue == null){
            res.status(404).json({
                message: "Issue Not found",
            })
        }else{
            res.status(200).json({
                issue: issue,
            })
        }
    }).catch(()=>{
        res.status(404).json({})
    })


}

export function updateIssue(req, res) {
    Issue.findOneAndUpdate({
        title: req.params.title,
    }).then(
        ()=>{
            res.status(200).json({
                message: "Updated Issue",
            })
        }
    ).catch(()=>{
        res.status(403).json({
            message: "products can not be updated",
        })
    })

}

export function deleteIssue(req, res) {
    if(req.user.role !== "admin") {
        res.status(403).json({
            message: "Not authorized to create issue",
        })
        return;
    }

    Issue.findOneAndDelete({
        title: req.params.title
    }).then(()=>{
        res.status(200).json({
            message: "Issue Deleted",
        })
    }).catch((error)=>{
        res.status(403).json({
            message: "product cannot be deleted",
        })
    })
}