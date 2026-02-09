import express from 'express';
import {createIssue, deleteIssue, getAllIssues, getIssueByTitle, updateIssue} from "../controllers/issueController.js";

const issueRouter = express.Router();

issueRouter.post("/", createIssue);
issueRouter.get("/",getAllIssues);
issueRouter.get("/:title",getIssueByTitle);
issueRouter.put("/:title",updateIssue);
issueRouter.delete("/:title",deleteIssue);

export default issueRouter;