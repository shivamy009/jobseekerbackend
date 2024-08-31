const express = require('express');
const { Signup, signIn } = require('../controller/userController');
const { requireSignin } = require('../middleware/authMiddleware');
const { postApplication, employerGetAllApplications, jobseekerGetAllApplications, jobseekerDeleteApplication } = require('../controller/applicationController');
const { getAlljobs, postJob, getMyjobs, updateJobs, deleteJob, getSinglejob } = require('../controller/jobController');
const router=express.Router();

router.post('/signup',Signup)
router.post('/signin',signIn)

router.post("/applicationpost",requireSignin,postApplication);
router.get("/employer/getall", requireSignin, employerGetAllApplications);
router.get("/jobseeker/getall", requireSignin, jobseekerGetAllApplications);
router.delete("/deleteapplication/:id", requireSignin, jobseekerDeleteApplication);

router.get("/getall", getAlljobs);
router.post("/jobpost", requireSignin, postJob);
router.get("/getmyjobs", requireSignin, getMyjobs);
router.put("/update/:id", requireSignin, updateJobs);
router.delete("/deletejob/:id", requireSignin, deleteJob);
router.get("/:id", requireSignin, getSinglejob);



module.exports=router