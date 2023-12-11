import mongoose from "mongoose"

const jobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    recruiterName:{
        type:String,
        required:true

    },
    logoUrl:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    monthlySalary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:['Full-Time','Part-Time','Internship'],
        required:true
    },
    remote:{
        type:String,
        enum:['Remote','Office'],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    skillsRequired:{
        type:[String],
        required:true,
        default:undefined
    },
    information:{
        type:String,
        required:true
    }
})

export const Job=mongoose.model('Job',jobSchema);