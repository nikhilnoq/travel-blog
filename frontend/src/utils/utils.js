import {toast} from 'react-toastify'

export const BASE_URL='http://localhost:4000/tasks'

export const notify=(message,type)=>{
    toast[type](message)
}

export const validateemail=(email)=>{
const regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
return regex.test(email);
}

export const getinitials=(name)=>{
if(!name) return "";

const words=name.split("")
let initials=""

// for(let i=0;i<Math.min(words.length,2);i++){
//     initials+=words[i][0];
// }
for(let i=0;i<2;i++){
    initials+=words[i];
}
return initials.toUpperCase();
}