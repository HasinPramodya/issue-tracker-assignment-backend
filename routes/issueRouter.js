import express from 'express';
import {
    createIssue,
    deleteIssue,
    getAllIssues,
    getIssueByTitle,
    getIssueCounts,
    updateIssue
} from "../controllers/issueController.js";

const issueRouter = express.Router();

issueRouter.post("/", createIssue);
issueRouter.get("/",getAllIssues);
issueRouter.get("/counts",getIssueCounts);
issueRouter.get("/:title",getIssueByTitle);
issueRouter.put("/:title",updateIssue);
issueRouter.delete("/:title",deleteIssue);


export default issueRouter;