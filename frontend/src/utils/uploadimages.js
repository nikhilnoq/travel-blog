import axiosinstance from "./axiosinstance"


const uploadimg=async(imagefile)=>{
    const formdata=new FormData()

    formdata.append('image',imagefile)

    try{
        const response=await axiosinstance.post("/imageupload",formdata,{
            headers:{
                "Content-Type":"multipart/form-data", //set header for file
            },
        });
        return response.data
    }catch(err){
        console.log("error in uploading img",err);
        throw err;
    }
}
export default uploadimg