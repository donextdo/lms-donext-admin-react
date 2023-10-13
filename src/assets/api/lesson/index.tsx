import api from "../interceptor";
import axios from "axios";

export const createLesson = (formData:{lname:String, description:String, course:String, class:String, teacher:String, videoContent:String, videoUpload:any, lessonMaterial:File[]}) => {
    console.log("form data lessons",formData);
    let postData = {
        lname: formData.lname,
        description: formData.description,
        course: formData.course,
        class: formData.class,
        teacher: formData.teacher,
        videoContent: formData.videoContent,
        videoUpload: formData.videoUpload,
        lessonMaterial: formData.lessonMaterial
    }
    console.log("post data", postData);
    return api.post("/api/v1/lesson/lesson-creation", postData);
};

export const UpdateLesson = (formData:{lname:String, description:String, course:String, class:String, teacher:String, videoContent:String, videoUpload:File, lessonMaterial:File[]}) => {
    console.log("update form data lessons",formData);
    let postData = {
        lname: formData.lname,
        description: formData.description,
        course: formData.course,
        class: formData.class,
        teacher: formData.teacher,
        videoContent: formData.videoContent,
        videoUpload: formData.videoUpload,
        lessonMaterial: formData.lessonMaterial
    }
    console.log("post data", postData);
    return api.post("/api/v1/lesson/lesson-creation", postData);
};

export const deleteLesson = (lessonId: number) =>{
    console.log("lesson id", lessonId);
    
    return api.delete(`api/lesson/${lessonId}`);
};