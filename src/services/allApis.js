import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

export const registerApi = async(data)=>{
    return await commonApi(`${baseUrl}/reg`,'POST',"",data)
}

export const loginApi = async(data)=>{
    return await commonApi(`${baseUrl}/log`,'POST',"",data)
}

export const addProjectApi = async(data,header)=>{
    return await commonApi(`${baseUrl}/addProject`,'POST',header,data)
}

export const projectListApi = async (header)=>{
    return await commonApi(`${baseUrl}/pList`,'GET',header,"")
}

export const dltProjectApi = async(id,header) =>{
    return await commonApi(`${baseUrl}/dltProject/${id}`,'DELETE',header,{})
}

export const editProjectApi = async(data,id,header) =>{
    return await commonApi(`${baseUrl}/editp/${id}`,'PUT',header,data)
}

export const profileUpdateApi = async(data,header) =>{
    return await commonApi(`${baseUrl}/profileupdate`,'PUT',header,data)
}

export const allProjectsApi = async()=>{
    return await commonApi(`${baseUrl}/allp`,"GET","","")
}