

function sendMail(){
    var params= {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }

    const serviceId= 'service_ig4423k';
    const templateId= 'template_9md8i26';

    emailjs.send(serviceId, templateId, params)
    .then(
        res=>{
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('message').value='';
            console.log(res);
            alert("Your message sent successfully")
        }
    )
    .catch((err)=> console.log(err))
    
}










// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     emailjs.sendForm('service_ig4423k', 'template_9md8i26', this).then(() => {
//     btn.value = 'Send Email';
//     alert('Sent!');
//   }, (err) => {
//     btn.value = 'Send Email';
//     alert(JSON.stringify(err));
//   }); 
//   });