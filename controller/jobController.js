
const Job=require('../model/jobSchema')

exports.getAlljobs=async(req,res)=>{
    try{
        const jobs = await Job.find({ expired: false });
        if(jobs){
            return  res.status(200).json({
                success: true,
                jobs,
              });

        }else{
            
            return  res.status(400).json({
                success: false,
                message:"No job found"
              });
        }

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching job",

        })  
    }
}

exports.postJob=async(req,res)=>{
    try{
        const {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo,
          } = req.body;
          if (!title || !description || !category || !country || !city || !location) {
            return  res.status(400).json({
                success: false,
                message:"all fields are required"
              });
          }

          if ((!salaryFrom || !salaryTo) && !fixedSalary) {
            return  res.status(400).json({
                success: false,
                message:"Please either provide fixed salary or ranged salary."
              });

          }
          if (salaryFrom && salaryTo && fixedSalary) {
            // return next(
            //   new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
            // );
            return  res.status(400).json({
                success: false,
                message:"Cannot Enter Fixed and Ranged Salary together."
              });
          }
          const postedBy = req.user.id;
          console.log(postedBy,"g")
          const job = await Job.create({
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo,
            postedBy,
          });

        return  res.status(200).json({
            success: true,
            message: "Job Posted Successfully!",
            job,
          });

    }
    catch(err){
      console.log(err)
        return  res.status(400).json({
            success: false,
            message:"error while posting job"
          });
    }
}

exports.getMyjobs=async(req,res)=>{
    try{
        const myJobs = await Job.find({ postedBy: req.user.id });
        res.status(200).json({
          success: true,
          myJobs,
        });
    }
    catch(err){
        return  res.status(400).json({
            success: false,
            message:"error while findig my job"
          });
    }
}

exports.updateJobs=async(req,res)=>{
    try{
        const { id } = req.params;
        
        let job = await Job.findById(id);
        if (!job) {
            return  res.status(400).json({
                success: false,
                message:"job not found"
              });
          
        }
        job = await Job.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        // getAlljobs()
    }
    catch(err){
        return  res.status(400).json({
            success: false,
            message:"error while updating job"
          });
    }
}

exports.deleteJob=async(req,res)=>{
    try{
        const { id } = req.params;
        const job = await Job.findById(id);
      if (!job) {
        return  res.status(400).json({
            success: false,
            message:"error while updating job"
          });
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });

    }
    catch(err){
 return res.status(400).json({
            success: false,
            message:"error while deleting job"
          });
    }
}

exports.getSinglejob=async(req,res)=>{
    try{
        const {id}=req.params;
        const job = await Job.findById(id);
        if (!job) {
          return next(new ErrorHandler("Job not found.", 404));
        }
        res.status(200).json({
          success: true,
          job,
        });
    }
    catch(err){
      console.log(err)
        return res.status(400).json({
            success: false,
            message:"error while getting single job"
          });
    }
}