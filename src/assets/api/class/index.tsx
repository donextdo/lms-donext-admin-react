import api from "../interceptor";
import axios from "axios";

export const createClass = (formData:{subject:String, medium:String, teacher:String, day:String, time:String, description:String, Sdate:String, edate:String}) => {
    console.log("form data class",formData);
    let postData = {
        subject: formData.subject,
        medium: formData.medium,
        teacher: formData.teacher,
        day: formData.day,
        time: formData.time,
        description: formData.description,
        Sdate: formData.Sdate,
        edate: formData.edate
    }
    console.log("post data", postData);
    return api.post("/api/v1/class/class-creation", postData);
};

export const updateClass = (formData:{subject:String,grade:String, medium:String, instructor:String, date:String, time:String, description:String, startdate:String, enddate:String}) => {
    console.log("update form data class",formData);
    let postData = {
        subject: formData.subject,
        grade: formData.grade,
        medium: formData.medium,
        instructor: formData.instructor,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        startdate: formData.startdate,
        enddate: formData.enddate
    }
    console.log("post data", postData);
    return api.post("/api/v1/class/class-creation", postData);
};

export const deleteClass = (classId: number) =>{
    console.log("class id", classId);
    
    return api.delete(`api/class/${classId}`);
};