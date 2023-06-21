let message = document.getElementById("message");
let button = document.getElementById("button");

//check the how many users have logged in
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


//adding the message
button.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
        obj={
            message: message.value
        }

    }catch(err){
        console.log(err);
    }
});