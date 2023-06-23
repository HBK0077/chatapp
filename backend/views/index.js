let sendbtn = document.getElementById("send");
let textMessage = document.getElementById("messages");


sendbtn.onclick = async(e)=>{
    try{
        e.preventDefault();
        const obj = {
            message: textMessage.value
        }
        const token = localStorage.getItem('token');
        const addMessage = await axios.post("http://localhost:2000/add-message", obj, {headers:{"Authorization": token}});
        console.log(addMessage.data.newmessage.message);
        //showmessageOnscreen(addMessage.data.message);
    }catch(err){
        console.log(err)
    }
}