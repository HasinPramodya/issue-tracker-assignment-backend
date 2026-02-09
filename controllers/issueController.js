import Issue from "../models/issue.js";
import User from "../models/user.js";
import issue from "../models/issue.js";

export async function createIssue(req, res) {
    console.log(req.user);
  if(req.user.role !== "admin") {
      res.status(403).json({
          message: "Not authorized to create issue",
      })
      return;
  }
  try{
      const assigneeuser = await User.findOne({
          name: req.body.assignee,
      })
      if(assigneeuser === null){
          res.status(403).json({
              message: "Assignee not found",
          })
      }else{
          const issue = new Issue({
              title: req.body.title,
              description: req.body.description,
              status: req.body.status,
              priority: req.body.priority,
              assignee: assigneeuser._id
          })
          await issue.save()
          res.status(201).json({
              message: "Successfully created issue",
          })
      }
  }catch(err){
      res.status(404).json({
          message: "issue can not be created",
      })
  }


}

export async function getAllIssues(req,res) {
    try {
        const issues = await Issue.find()
        return res.status(200).json({
            message:"All Issues",
            issues : issues
        })
    }catch (err){
        res.status(500).json({
            message: "can not get issues",
        })
    }

}

export async function getIssueByTitle(req, res) {
    if(req.user===null){
        res.status(403).json({
            message: "please login first"
        })
        return;
    }
    try{
        const issue = await Issue.findOne({
            title: req.params.title
        })
        if (issue === null){
            res.status(403).json({
                message: "issue not found"
            })
        }else{
            res.status(200).json({
                issue : issue
            })
        }
    }catch (err){
        res.status(500).json({
            message: "can not get issue",
        })
    }



}

export async function updateIssue(req, res) {
    console.log(req.user)
    if (req.user === null) {
        res.status(403).json({
            message: "please login first"
        })
        return;
    }
    try{
        await Issue.findOneAndUpdate({
            title: req.params.title,
        },req.body)
        res.status(200).json({
            message: "Updated Issue",
            issue : issue
        })
    }catch (err){
        res.status(500).json({
            message: err.message
        })
    }


}

export async function deleteIssue(req, res) {
    if(req.user.role !== "admin") {
        res.status(403).json({
            message: "Not authorized to create issue",
        })
        return;
    }
    try{
        await Issue.findOneAndDelete({
            title: req.params.title
        })
        res.status(200).json({
            message: "Deleted Issue",
        })
    }catch (err){
        res.status(500).json({
            message: "can not delete issue",
        })
    }

}