

//get the form by its id
const form = document.getElementById("contact-form"); 
const div = document.getElementById("results");


//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
  
 
});



const sendMail = (mail) => {
      fetch("/", {
      method: "post", //2.
      body: mail, //3.
   //1.
 
    }
    ).then((response) => {
      console.log(response);
      return response.json();
      
    });
  };


