// main.js
let user_mail_input = document.getElementById("user_mail");
let submit_button = document.getElementById("submit_button");

submit_button.addEventListener("click", () => {
    // Agora ele irá pegar o texto digitado (o valor)
    console.log(user_mail_input.value); 
});