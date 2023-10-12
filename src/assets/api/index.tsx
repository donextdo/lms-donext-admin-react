import api from "./interceptor";
import axios from "axios";

export const signIn = (formData: any) => {
    // alert('login' + formData.username + " " + formData.password)
    let loginDto = {
        email: formData.username,
        password: formData.password,
    };

    return api.post("/auth/admin/login", loginDto);
};

export const signUp = (formData: { fname: string, lname: string, email: string, mobile: string, username: string, password: string }) => {
    console.log("form data",formData);
    let postData = {
        firstName: formData.fname,
        lastName: formData.lname,
        userName: formData.username,
        password: formData.password,
        contactNumber: formData.mobile,
        email: formData.email
    };

    return api.post("/api/v1/registration/owner-registration", postData);
};

export const updateUser = (formData: { fname: string, lname: string, email: string, mobile: string, username: string }) => {
    let postData = {
        firstName: formData.fname,
        lastName: formData.lname,
        userName: formData.username,
        contactNumber: formData.mobile,
        email: formData.email
    };

    return api.post("/api/v1/registration/owner-registration", postData);
};

export const deleteUser = (userId: number) => {
    return api.delete(`/api/users/${userId}`);
};


export const downloadFile = (url: string) => {
    return axios.get(url, {
        responseType: 'blob',
    });
};

export function deleteClass(classid: number) {
    throw new Error('Function not implemented.');
}
