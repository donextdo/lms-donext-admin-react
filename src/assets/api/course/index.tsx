import api from "../interceptor";
import axios from "axios";

export const createCourse = (formData:{cname: string, description: string, enrollmentStatus: string}) => {
    console.log("form data",formData);
    let postData = {
        cname:formData.cname,
        description:formData.cname,
        enrollmentStatus:formData.cname,
    };
    console.log("post data", postData);
    

    return api.post("/api/v1/course/course-creation", postData);
};

export const updateCourse = (formData:{cname: string, description: string, enrollmentStatus: string}) => {
    console.log("update form data",formData);
    let postData = {
        cname:formData.cname,
        description:formData.cname,
        enrollmentStatus:formData.cname,
    };
    console.log("post data", postData);
    
    return api.post("/api/v1/course/course-creation", postData);
};

export const deleteCourse = (courseId: number) =>{
    console.log("course id", courseId);
    
    return api.delete(`api/course/${courseId}`);
}