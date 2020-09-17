
var updateTest=null
function imageUpdate(){


  var timestamp= new Date().getTime()
  if(document.querySelector('#updateImage')!=null){
  
  document.querySelector('#updateImage').src=this.updateTest + timestamp;
  }
} 

var test= "https://firebasestorage.googleapis.com/v0/b/posts-f62c9.appspot.com/o/pexels-pixabay-261662.jpg?alt=media&token=4baa6a6e-38e8-40d4-8a77-7cf8944620fa?t="


function imageLoad(){


var timestamp= new Date().getTime()
if(document.querySelector('#image')!=null){

document.querySelector('#image').src=this.test + timestamp;
}
var user=firebase.auth().currentUser;

if (user!=null){

  
   
  if(user.displayName){
    if(document.querySelector('#Nickname')!=null){
    document.querySelector('#Nickname').value=user.displayName
    }
  

  }



  

}


}







var myMonth = ["Jan", "Feb","Mar","Apr", "May","Jun", "Jul", "Aug", "Sep","Oct","Nov", "Dec" ] 

function ellipsify (str) {
  if (str.length > 30) {
      return (str.substring(0, 30) + "...");
  }
  else {
  return str;
}
}
var firstItem=null;
var lastVisible=null;
var firstVisible=null;

  

var postListener= firebase.firestore().collection("items").orderBy("createdAt","desc").limit(6)
postListener.get().then(function (documentSnapshots) {
  // Get the last visible document
this.firstItem = documentSnapshots.docs[documentSnapshots.docs.length-6];
  console.log("last", firstItem);

})






  
   function next() {
   
  
    

    
  
    postListener= firebase.firestore().collection("items").orderBy("createdAt","desc").startAfter(lastVisible).limit(6);
    
     
    subscribePost();

    if(firstVisible!=firstItem){
      
     
      if(document.querySelector("#prev")!=null){
      document.querySelector("#prev").style.display="block";
      }
  
    } 
   
     
     
   
   }

   function prev(){

    postListener= firebase.firestore().collection("items").orderBy("createdAt","desc").endBefore(firstVisible).limitToLast(6);

    subscribePost();
    console.log(firstVisible)

    
    if(document.querySelector("#next")!=null){

    document.querySelector("#next").style.display="block";
    }
  
    
     
    
    
   }
    
  
       
  






function subscribePost(){

  
 postListener.get().then(function (documentSnapshots) {
    // Get the last visible document
    if(documentSnapshots.docs.length==6){

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  firstVisible = documentSnapshots.docs[documentSnapshots.docs.length-6];
    }else
    {

      firstVisible = documentSnapshots.docs[documentSnapshots.docs.length-documentSnapshots.docs.length];




    }
  if(documentSnapshots.docs.length<6){
    if(document.querySelector("#next")!=null ){

    document.querySelector("#next").style.display="none";

  }
}
  
if(firstVisible.id.toString()==firstItem.id.toString())  {
  if(document.querySelector("#prev")!=null && document.querySelector("#prev")!="none"){

  


    document.querySelector("#prev").style.display="none";
    

}
}
  

  

    

   
  
 postListener.onSnapshot((querySnapshot) => {

    // Reset page 
    if(document.querySelector('#post')!=null){
     document.querySelector('#post').innerHTML = "";
    }
    
    // Loop through documents in database
    querySnapshot.forEach((doc) => {
      // Create an HTML entry for each document and add it to the chat
   var li =document.createElement("li");
   
   


   var entryPostDate=document.createElement("div")
   var entryName=document.createElement("span")
   var entryimage=document.createElement("img")

   var entry9=document.createElement("div")


   var entryPostTitle = document.createElement("div")
   var entryPostContent = document.createElement("div")
   var entryLike = document.createElement("div")
   var icon = document.createElement("i")
       icon.setAttribute('class','fa fa-thumbs-up')
       

   var like= document.createElement("span")    
   li.setAttribute('data-id',doc.id)
   if(doc.data().createdAt!=null){
   var dateDay= doc.data().createdAt.toDate().getDate();
   var datemonth= doc.data().createdAt.toDate().getMonth();
   var dateYear= doc.data().createdAt.toDate().getFullYear();
   var myDate= dateDay + " " + this.myMonth[datemonth] + " "    + dateYear
   }
   

   icon.addEventListener('click',(e)=>{

    e.stopPropagation();

    if(firebase.auth().currentUser){

      if(firebase.auth().currentUser.uid==doc.data().userId){

        alert("It is your Post!!!")
      }else{
        updateLikes(doc);


      }

     

    }else{


    updateLikes(doc);
    }

   })
    
   
    
   entryPostDate.textContent= myDate;
   entryPostTitle.textContent = doc.data().title;
   entryName.innerHTML=doc.data().nickName;
   like.innerHTML=doc.data().likes;
   entryimage.src=doc.data().image;
   
   entryPostContent.textContent = doc.data().content;
   entryPostContent.textContent= ellipsify(entryPostContent.textContent);
   
   entryPostDate.style.float= 'right' 
   entryPostDate.style.marginRight= '20%' 



   entryPostTitle.style.marginBottom= '10px';
   entryPostTitle.style.marginTop= '15px';

   entryPostTitle.style.fontSize= 'larger';
   like.style.fontSize= 'small'
  like.style.marginLeft= '10px'
  entryimage.style.width='80%'
   li.addEventListener('click',(e)=>{
    e.stopPropagation(); 
    localStorage.setItem("key",doc.id);

    window.location.href="/multipage/public/postdetail.html"
    subscribePostDetail();
    
    });
    entryLike.style.marginTop= '10px';
    entryLike.style.fontSize= '36px';
    entry9.appendChild(entryName);
    entry9.appendChild(entryPostDate);

    
    

    entryLike.appendChild(icon);
    entryLike.appendChild(like);
    

    li.appendChild(entryimage);

    

    li.appendChild(entry9);
   li.appendChild(entryPostTitle);
   li.appendChild(entryPostContent);
   li.appendChild(entryLike);
   

   
   if(document.querySelector('#post')!=null){
   document.querySelector('#post').appendChild(li);
   }
    });
   })
  }) 
  }
   subscribePost();

function subscribemyPost(){
  
  

  var myPostListener = firebase.firestore().collection("items").
  where("userId","==", firebase.auth().currentUser.uid ).orderBy("createdAt","desc")

  myPostListener.onSnapshot((querySnapshot) => {
 // Reset page
 if(document.querySelector('#mypost')!=null){
 document.querySelector('#mypost').innerHTML = "";
 }
 

 
 // Loop through documents in database
 querySnapshot.forEach((doc) => {
   // Create an HTML entry for each document and add it to the chat
   const li     =document.createElement("li");
   
   var entryName= document.createElement("span")
   var entry9= document.createElement("div")
   var entryimage= document.createElement("img")
   
   var entryPostDate = document.createElement("div")
   entryPostDate.setAttribute("id","date");

   var entryT = document.createElement("span")

   var entry1 = document.createElement("div")
    
   var entry2 = document.createElement("div")
   var mpbutton = document.createElement("div")
   var entry3 = document.createElement("button")
   var entry4 = document.createElement("button")
   var entryLike = document.createElement("span")
   var like= document.createElement("span")    

   var icon = document.createElement("i")
       icon.setAttribute('class','fa fa-thumbs-up')
      icon.style.fontSize='24px';
      
   
   li.setAttribute('data-id',doc.id)
   li.setAttribute('data-title',doc.data().title)
   li.setAttribute('data-content',doc.data().content)
   entryimage.src=doc.data().image;
   entryName.textContent=doc.data().nickName;
   entry1.textContent = doc.data().title;
   entry2.textContent = doc.data().content;
   like.textContent = doc.data().likes;

   

   entry3.textContent = "Edit";
   entry4.textContent = "Delete";
   if(doc.data().createdAt!=null){
   var dateDay= doc.data().createdAt.toDate().getDate();
   var datemonth= doc.data().createdAt.toDate().getMonth();
   var dateYear= doc.data().createdAt.toDate().getFullYear();
   var myDate= dateDay + " " + this.myMonth[datemonth] + " "    + dateYear
   }
   entryPostDate.textContent= myDate;
  
   entryPostDate.style.float= 'right'
   entryPostDate.style.marginBottom= '0px';
  

   entry4.addEventListener('click',(e)=>{
   e.stopPropagation();
   


   firebase.firestore().collection("items").doc(doc.id).delete()
  
  });
   entry3.addEventListener('click',(e)=>{
    e.stopPropagation(); 

    localStorage.setItem("docKey",doc.id);
    localStorage.setItem("image",doc.data().image);


    window.location.href="/multipage/public/update.html"

    

    
    
   

    
    
    
    onEdit();
    
     
    
    
  })
   
  entry1.style.fontSize= 'larger';
  entry1.style.marginBottom= '10px';
  entry1.style.marginTop= '20px';
  like.style.marginLeft= '10px'

  entry3.style.float='right';
  entry4.style.float='right';
  entry3.style.paddingBottom='1px';
  entry3.style.paddingRight='15px';
  entry3.style.paddingLeft='15px';
  entry3.style.background= 'black';
  entry4.style.background= 'black';
  
  
  
  
  

  entry3.style.color= 'white';
  entry4.style.color= 'white';


  entry3.style.marginRight='10px';
  
  
  mpbutton.style.paddingTop='10px';
  
  entryLike.appendChild(icon);
  entryLike.appendChild(like);

  mpbutton.appendChild(entryLike);

  mpbutton.appendChild(entry4);
  mpbutton.appendChild(entry3);
  entryT.appendChild(entry1);
  entry9.appendChild(entryName);

  entry9.appendChild(entryPostDate);
  li.appendChild(entryimage);

  li.appendChild(entry9);

   li.appendChild(entryT);
   li.appendChild(entry2);
   li.appendChild(mpbutton);
   

   if(document.querySelector('#mypost')!=null){
   document.querySelector('#mypost').appendChild(li);
   }

 });
});


}








 function updatePost(eTitle){
  var uTitle = document.getElementById("updtTitle");
  var uContent = document.getElementById("updtContent");
   const key = document.querySelector('#updtButton').getAttribute('data-id');
   var test = localStorage.getItem(key);
   if(uTitle.value!="" || uTitle.value!= test ){
   firebase.firestore().collection("items").doc(key).update({
    
    title: uTitle.value, 
    content: uContent.value,
    image:this.updateTest

    




   })
   console.log("s")
  
  }else
{
  console.log("ss")

  
}

setTimeout(() => {
  window.location.href="/multipage/public/mypost.html"
subscribemyPost();
  
}, 2000);




}



 function addItem(){

  

  


  var timestamp =firebase.firestore.FieldValue.serverTimestamp;
  var Title = document.getElementById("txtTitle");
  var Content = document.getElementById("txtContent");

  var Likes=0;

if(Title.value!=""){
  
  firebase.firestore().collection("items").add({
    title: Title.value,
    content: Content.value,
    userId: firebase.auth().currentUser.uid,
    createdAt:timestamp(),
    likes:Likes,
    nickName: firebase.auth().currentUser.displayName,
    image:this.test
    
  })
  this.test="https://firebasestorage.googleapis.com/v0/b/posts-f62c9.appspot.com/o/pexels-pixabay-261662.jpg?alt=media&token=4baa6a6e-38e8-40d4-8a77-7cf8944620fa?t="
  console.log("s")

  
  
  
} else
{
  console.log("ss")


  
  

}
} 


 
function  onEdit(){
  if(document.querySelector('#updateImage')!=null){

  document.querySelector('#updateImage').src=localStorage.getItem("image");

  }
  this.updateTest=localStorage.getItem("image");
  var key=localStorage.getItem("docKey");

  firebase.firestore().collection("items").doc(key).get().then(function(doc){


    
    

    if(document.querySelector('#updtTitle')!=null){

  document.querySelector('#updtTitle').value = doc.data().title;
    }

    if(document.querySelector('#updtContent')!=null){

  document.querySelector('#updtContent').value = doc.data().content;
    }
    if(document.querySelector('#updtButton')!=null){

  document.querySelector('#updtButton').setAttribute('data-id',key)
    }
    if(document.querySelector('#updtTitle')!=null){

  document.querySelector('#updtTitle').focus();
    }
  });
}

 function onReset(){
  window.location.href="/multipage/public/reset.html"

  if(    document.querySelector('#txtREmail')!=null  ){
    document.querySelector('#txtREmail').focus(); 
  
  }

 }

 if(document.getElementById("btna")!=null){
 document.getElementById("btna").addEventListener('click',(e)=>{
  if(document.getElementById("txtTitle")!=null){

  document.getElementById("txtTitle").focus();
  }
 })
}
if(document.getElementById("btnlogin")!=null){

 document.getElementById("btnlogin").addEventListener('click',(e)=>{
  e.stopPropagation();
  if(document.getElementById("txtEmail")!=null){

  document.getElementById("txtEmail").focus();
  }
 })
}
if(document.getElementById("tna")!=null){

 document.getElementById("tna").addEventListener('click',(e)=>{
  e.stopPropagation();
  if(document.getElementById("txtTitle")!=null){

  document.getElementById("txtTitle").focus();
  }
 })
}
 

 function subscribePostDetail(){

  var key=localStorage.getItem("key");
  var Div = document.createElement("li");
  var entry4 = document.createElement("button")
  var like= document.createElement("span")  

  entry4.textContent = "Back";
  entry4.style.float='right';
  entry4.style.background= 'black';
  entry4.style.color= 'white';
  entry4.style.fontSize= '20px';
  entry4.style.marginTop= '10px';

  entry4.addEventListener('click',(e)=>{
    e.stopPropagation(); 
  window.location.href="/multipage/public/index.html"

  subscribePost();
  
  
  })
  var entry6=document.createElement("div")
  var entryName=document.createElement("span")
  var entry7=document.createElement("img")


  var entryPostDate=document.createElement("div")
  entryPostDate.setAttribute("id","date");

  var entryDPostTitle =document.createElement("div");
  var entryDPostContent = document.createElement("div")
  var entryLike = document.createElement("div")
  var icon = document.createElement("i")
      icon.setAttribute('class','fa fa-thumbs-up')
     icon.style.fontSize='36px';


 

  firebase.firestore().collection("items").doc(key).get().then(function(doc){

    icon.addEventListener('click',(e)=>{

      e.stopPropagation();
  
      if(firebase.auth().currentUser){
  
        if(firebase.auth().currentUser.uid==doc.data().userId){
  
          alert("It is your Post!!!")
        }else{
          updateLikes(doc) ;
  
  
        }
  
       
  
      }else{
  
  
      updateLikes(doc);
      }
  
     })
  if(doc.data().createdAt!=null){
var dateDay= doc.data().createdAt.toDate().getDate();
 var datemonth= doc.data().createdAt.toDate().getMonth();
 var dateYear= doc.data().createdAt.toDate().getFullYear();
 var myDate= dateDay + " " + this.myMonth[datemonth] + " "    + dateYear
  }
  entryDPostTitle.textContent = doc.data().title;
  entryDPostContent.textContent = doc.data().content;
  entryName.textContent=doc.data().nickName;
  entryPostDate.textContent= myDate;
  entry7.src=doc.data().image;

  like.innerHTML=doc.data().likes;
  entryPostDate.style.marginBottom= '15px';
  


  like.style.fontSize= 'small'
  like.style.marginLeft= '10px'

 entryPostDate.style.float= 'right'
 entryPostDate.style.marginBottom= '0px'
 entryDPostTitle.style.marginTop= '20px'

 entryDPostTitle.style.fontSize= 'larger';
 entryDPostTitle.style.marginBottom= '10px';
 entryDPostTitle.style.width= '100%';
 



 entryLike.appendChild(entry4);

 entryLike.appendChild(icon);
 entryLike.appendChild(like);



 entryLike.style.marginTop= '10px';

 Div.appendChild(entry7);

 entry6.appendChild(entryName);

 entry6.appendChild(entryPostDate);
 Div.appendChild(entry6);

  Div.appendChild(entryDPostTitle);
  Div.appendChild(entryDPostContent);
  Div.appendChild(entryLike);
 
  if(document.querySelector('#detailPst')!=null){

    document.querySelector('#detailPst').innerHTML="";
  document.querySelector('#detailPst').appendChild(Div);
  }
  
}); 
}

function updateLikes(doc){


  var count=doc.data().likes;

  count++
  console.log(count)



  if(sessionStorage.getItem(doc.id)){

    count--
    console.log(count)


    



  }else{
    sessionStorage.setItem(doc.id,true)
    firebase.firestore().collection("items").doc(doc.id).update("likes",count).then(function(){
      if(window.location.pathname=='/postDetail'){
      
      subscribePostDetail();
      }
    })
    

  }
 
   
  

}



function isNumberA(){
  


  var TitleA = document.getElementById("txtTitle");

  if(TitleA.value.length==20){

    alert("Only 20 characters are allowed")
  }


  
}

function isNumberU(){

  var TitleU = document.getElementById("updtTitle");

  if(TitleU.value.length==20){

    alert("Only 20 characters are allowed")
  }


  
}
function isNumberN(){

  var DdName = document.getElementById("Nickname").value;
  var DdNamepattern=/^[A-Za-z]{3,12}$/;

  if(DdNamepattern.test(DdName)){

    document.getElementById("Nickname").style.backgroundColor="green";
  }


  
}
function updateUser(){

  var DdNamepattern=/^[A-Za-z]{3,12}$/;
  var user=firebase.auth().currentUser;

var DdName = document.getElementById("Nickname");
var dName= DdName.value
var dLname=dName.toLowerCase()
 var userRef=firebase.firestore().collection("users");
 if(DdNamepattern.test(dName)){
 

 userRef.doc(dLname).get().then(function(doc){
if(!doc.exists){
   if(user!=null){
     if(user.displayName){
       userRef.doc(user.displayName.toLowerCase()).delete().then(function(){
  userRef.doc(dLname).set({
  userid: user.uid
})


});
}else{
  userRef.doc(dLname).set({
    userid: user.uid
  })
}
}

user.updateProfile({
  displayName: dName
}).then(function(){
  addItem();
  
})


}else if(doc.data().userid==user.uid){
  user.updateProfile({
    displayName: dName
  }).then(function(){
    addItem();
    
  })
}else



{
 
alert("This username is not available")

}
 
 })
}else{ 

  alert("Username should be of 3-12 alphabetical charactors")
}

setTimeout(() => {
  window.location.href="/multipage/public/index.html"
subscribePost();
  
}, 2000);

}

function uploadImage(){

   var uploader=document.getElementById("uploader")

  var fileButton=document.getElementById("fileButton")
  if(fileButton!=null){

  fileButton.addEventListener('change', function(e){ 

    var file=e.target.files[0]; 


     var storageRef=  firebase.storage().ref('post/' + file.name)
 if(file.type.split('/')[0]!='image'){

    alert("Only image");
  }else 
   storageRef.put(file).then(function(snapshot){snapshot.ref.getDownloadURL().then(function(downloadURL){
    this.test=downloadURL;
    console.log(this.test)
    imageLoad();

})});
storageRef.put(file).on('state_changed',
  
  function preogress(snapshot){
    uploader.removeAttribute("hidden")
    var percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

    uploader.value=percentage;
  },
   
  function(error){

    console.log(error);

  },

  function(complete){
    
  }) 
  
  
  


  
    
})
}}

   
