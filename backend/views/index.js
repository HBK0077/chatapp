let sendbtn = document.getElementById("send");
let textMessage = document.getElementById("messages");
let parentNode = document.getElementById("allMessages");

//showing message from DB
window.addEventListener("DOMContentLoaded", async(e)=>{
    const token = localStorage.getItem("token");
        
        const response = await axios.get("http://localhost:2000/show-message", {headers:{"Authorization": token}});
        //console.log(response.data);
        //console.log(response.data.allMessage.length);
        for(let i=0;i<response.data.allMessage.length;i++){
            showChatOnBrowser(response.data.allMessage[i]);
        }
    
})

async function showChatOnBrowser(show){
    try{
        
        console.log(show.id)
        if(show){
            let recent = show.id - 10;
            localStorage.removeItem(recent);
            localStorage.setItem(show.id, show.message);
           // window.location.reload();
        }
        const msg = localStorage.getItem(show.id);
        var childNode=`<li>${show.userName}:${msg}</li>`
            parentNode.innerHTML= parentNode.innerHTML+childNode;
            //console.log(parentNode);
        
    }catch(err){
        console.log(err);
    }
}

//adding message ot DB
sendbtn.onclick = async(e)=>{
    try{
        //e.preventDefault();
        const obj = {
            message: textMessage.value
        }
        const token = localStorage.getItem('token');
        const addMessage = await axios.post("http://localhost:2000/add-message", obj, {headers:{"Authorization": token}});
        //console.log(addMessage.data.newmessage.message);
        //console.log(addMessage.data.newmessage)
        showChatOnBrowser(addMessage.data.newmessage);
    }catch(err){
        console.log(err)
    }
}