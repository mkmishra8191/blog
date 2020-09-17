
  function signUp(){
        
        var email = document.getElementById("txtEmail");
        var password = document.getElementById("txtPassword");
        
        return new Promise((resolve, reject) => {
 firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then(res => {
    resolve(res);
  }, err => reject(err));


}).then(res => {
  
  
  
    successMessage.innerHTML="";
    errorMessage.innerHTML="";

    window.location.href="/multipage/public/index.html"
    subscribePost();

  
},
err => {
  console.log(err);
  errorMessage.innerHTML = err.message;
  successMessage.innerHTML="";

})

    }
    
    
    
    function signIn(){
        
        var email = document.getElementById("txtEmail");
        var password = document.getElementById("txtPassword");
        
        return new Promise((resolve, reject) => {
 firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(res => {
    resolve(res);
  }, err => reject(err));


}).then(res => {
  
  
  
    successMessage.innerHTML="";
    errorMessage.innerHTML="";
    window.location.href="/multipage/public/index.html"
    subscribePost();

  
},
err => {
  console.log(err);
  errorMessage.innerHTML = err.message;
  successMessage.innerHTML="";

})

        
        
        
        
    }
    

    function resetPassword(resolve,reject){
        var email = document.getElementById("txtREmail");
        
        return new Promise((resolve, reject) => {
 firebase.auth().sendPasswordResetEmail(email.value)
  .then(res => {
    resolve(res);
  }, err => reject(err));


}).then(res => {
  
  
  
    successMessageR.innerHTML="Link has been sent to your email address.";
    errorMessageR.innerHTML="";


  
},
err => {
  console.log(err);
  errorMessageR.innerHTML = err.message;
  successMessageR.innerHTML="";

})

        
}
          
    
    
    
    function signOut(){
        
        auth.signOut();
        window.location.href="/multipage/public/index.html"
        subscribePost();
        
        
    }
    
    
    
    auth.onAuthStateChanged(function(user){
        
        if(user){
         
          if(user.displayName){
            if(document.querySelector('#Nickname')!=null)
            document.querySelector('#Nickname').value=user.displayName
        
          }
          if(document.getElementById("btnLogout")!=null){

            document.getElementById("btnLogout").removeAttribute("hidden")
        }

        if(document.querySelector('#tna')!=null){

            document.querySelector("#tna").removeAttribute("hidden")
        }
        if(document.querySelector('#tnp')!=null){

            document.querySelector("#tnp").removeAttribute("hidden")

        }

        if(document.getElementById("btna")!=null){

            document.getElementById("btna").removeAttribute("hidden")
        }
        if(document.getElementById("btnp")!=null){

            document.getElementById("btnp").removeAttribute("hidden")
           
        }

            //Take user to a different or home page
            var x = document.getElementById("btnlogin")

            var y =document.createAttribute("hidden");

            y.value= false;


             x.setAttributeNode(y);
             
            
             
             subscribemyPost();
              
             subscribePostDetail();
           // is signed in
           onEdit();
           imageLoad()
            
            
        }else{
          if(document.querySelector('#tna')!=null){

          document.querySelector("#tna").setAttribute("hidden",true)
          }
          if(document.getElementById("btna")!=null){

            document.getElementById("btna").setAttribute("hidden",true)
          }

            document.getElementById("btnlogin").removeAttribute("hidden")
            if(document.querySelector('#tnp')!=null){

            document.querySelector("#tnp").setAttribute("hidden",true)
            }
            if(document.getElementById("btnp")!=null){

            document.getElementById("btnp").setAttribute("hidden",true)
            }
            document.getElementById("btnLogout").setAttribute("hidden",true)

            
            subscribePostDetail();

            
            
            
            //no user is signed in
          
        }
        
        
        
    });



    