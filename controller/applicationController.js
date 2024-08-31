
const Application=require('../model/applicationSchema')
const Job=require('../model/jobSchema')
exports.postApplication=async(req,res)=>{
    try{
        const { name, email, coverLetter, phone, address, jobId,resume } = req.body;
        console.log(name,email,coverLetter,phone,address,jobId,resume)
        if(!resume){
           return res.status(400).json({
                success: false,
                message:"resume not found",
              });
        }
        const applicantID = {
            user: req.user.id,
            role: "Job Seeker",
          };
          if (!jobId) {
          return  res.status(200).json({
                success: false,
                message:"Job not found",
              });
          }
          const jobDetails = await Job.findById(jobId);
          if (!jobDetails) {
          return  res.status(200).json({
                success: false,
                message:"Job not found",
              });
          }
          const employerID = {
            user: jobDetails.postedBy,
            role: "Employer",
          };
          if (
            !name ||
            !email ||
            !coverLetter ||
            !phone ||
            !address ||
            !applicantID ||
            !employerID ||
            !resume
          ) {
            return  res.status(200).json({
                success: false,
                message:"Please fill all field",
              });
          }
          const application = await Application.create({
            name,
            email,
            coverLetter,
            phone,
            address,
            applicantID,
            employerID,
            resume: {
              public_id: "er435",
              url: resume,
            },
          });

        return  res.status(200).json({
            success: true,
            message: "Application Submitted!",
            application,
          });
    }
    catch(err){
        console.log(err)
      return  res.status(400).json({
            success: false,
            message: "Error while Application Submitting!",
            // application,
          });
    }
}

exports.employerGetAllApplications=async(req,res)=>{
    try{
        const { id } = req.user;
        const applications = await Application.find({ "employerID.user": id });
        res.status(200).json({
          success: true,
          applications,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
           message:"Error while getting employee application"
          });
    }

}

exports.jobseekerGetAllApplications=async(req,res)=>{
    try{
        const { id } = req.user;
    const applications = await Application.find({ "applicantID.user": id });
    res.status(200).json({
      success: true,
      applications,
    });

    }
    catch(err){
        res.status(400).json({
            success: false,
           message:"error while getting jobseeker all application"
          });
    }
}

exports.jobseekerDeleteApplication=async(req,res)=>{
     try{
        const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        res.status(400).json({
            success: false,
           message:"application not found"
          }); 
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });

     }
     catch(err){
        console.log(err)
        res.status(200).json({
            success: true,
            message: " error while Application deleting!",
          });

     }
}