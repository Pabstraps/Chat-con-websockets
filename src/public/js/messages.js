const socket = io();
let user;
const chatBox = document.getElementById('chatBox')



Swal.fire({
    icon: "info",
    title: "Alto ahi, quien eres?",
    input: 'text',
    text: "Ingrese el UserName para identificarse en el chat",
    color: "#00913f ",
    inputValidator: (value)=>{
        if(!value){
            return "Necesitas identificarte bribon"
        }else{
            socket.emit('userConnected', {user: value})
        }
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value 

    const myName = document.getElementById('myName')
    myName.innerHTML = user
})



chatBox.addEventListener('keyup', evt =>{
    
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message',{user: user, message: chatBox.value})
            chatBox.value = '';
        }else{
            swal.fire({
                icon:"warning",
                title: "Oye loco, no escribiste nada",
                text: ":("
            })
        }
    }
})


socket.on ('messageLogs', data=>{
    const messageLogs = document.getElementById('messageLogs')
    let logs = ''
    data.forEach(log =>{
        logs += `<b>${log.user}</b> dice ${log.message}<br/>`
    });
    messageLogs.innerHTML = logs
})



socket.on('userConnected', data =>{
    let message = `Nuevo usuario entra al chat: ${data}`

    Swal.fire({
        icon: 'info',
        title: 'Here Comes a New Challenger',
        text: message,
        toast: true,
        
    })
})



const closeChatBox = document.getElementById('closeChatBox');
closeChatBox.addEventListener('click', evt =>{
    alert("Gracias por usar el chat de los Pabureales...\nAhora juega RED DEAD REDEMPTION 2")
    socket.emit(closeChat, {close:"close"})
    messageLogs.innerHTML = ''
})