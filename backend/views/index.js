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
        //console.log(show)
        var childNode=`<li id=${show.id} style="margin-bottom:10px;">${show.message}</li>`
            parentNode.innerHTML= parentNode.innerHTML+childNode;
            console.log(parentNode);
    }catch(err){
        console.log(err);
    }
}
//adding message ot DB
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