

function subscribePost(){

  
  
   
  var postListener= firebase.firestore().collection("items").orderBy("createdAt","desc")
  
  postListener.onSnapshot((querySnapshot) => {
    // Reset page
    document.querySelector('#mypost').innerHTML = "";
  
    
    // Loop through documents in database
    querySnapshot.forEach((doc) => {
      // Create an HTML entry for each document and add it to the chat
   var li =document.createElement("li");
   var entryPostTitle = document.createElement("div")
   var entryPostContent = document.createElement("div")
   
   

   entryPostTitle.textContent = doc.data().title;
   entryPostContent.textContent = doc.data().content;

   entryPostTitle.style.fontSize= 'larger';
   entryPostTitle.style.marginBottom= '10px';

   
   

   li.appendChild(entryPostTitle);
   li.appendChild(entryPostContent);
   
   

   document.querySelector('#mypost').appendChild(li);
    });
   });
    
  }
   window.onload=subscribePost;

function subscribemyPost(){
  
  

  var myPostListener = firebase.firestore().collection("items").
  where("userId","==", firebase.auth().currentUser.uid ).orderBy("createdAt","desc")

  myPostListener.onSnapshot((querySnapshot) => {
 // Reset page
 document.querySelector('#mypost').innerHTML = "";
 
 

 
 // Loop through documents in database
 querySnapshot.forEach((doc) => {
   // Create an HTML entry for each document and add it to the chat
   const li     =document.createElement("li");
   var entry1 = document.createElement("div")
    
   var entry2 = document.createElement("div")
   var mpbutton = document.createElement("div")
   var entry3 = document.createElement("button")
   var entry4 = document.createElement("button")
   

   
   li.setAttribute('data-id',doc.id)
   li.setAttribute('data-title',doc.data().title)
   li.setAttribute('data-content',doc.data().content)
   entry1.textContent = doc.data().title;
   entry2.textContent = doc.data().content;
   entry3.textContent = "Edit";
   entry4.textContent = "Delete";
   entry4.addEventListener('click',(e)=>{
   e.stopPropagation();
   


   firebase.firestore().collection("items").doc(doc.id).delete()
  
  });
   entry3.addEventListener('click',(e)=>{
    e.stopPropagation(); 

    localStorage.setItem(doc.data().title,doc.data().title);
    localStorage.setItem(doc.data().content,doc.data().content);

    var id = li.getAttribute('data-id');

    var eTitle = localStorage.getItem(doc.data().title)
    var eContent = localStorage.getItem(doc.data().content)

    console.log(id);
    
    
    onEdit(eTitle,eContent,id);
    
     
    
    
  })
   
  entry1.style.fontSize= 'larger';
  entry1.style.marginBottom= '10px';
  entry3.style.float='right';
  entry4.style.float='right';
  entry3.style.paddingBottom='1px';
  entry3.style.paddingRight='15px';
  entry3.style.paddingLeft='15px';
  entry3.style.background= 'green';
  entry4.style.background= 'red';
  entry3.style.color= 'white';
  entry4.style.color= 'white';


  entry3.style.marginRight='10px';
  
  mpbutton.style.marginBottom='10px';
  mpbutton.style.paddingTop='5px';
  


  mpbutton.appendChild(entry4);
  mpbutton.appendChild(entry3);
   li.appendChild(entry1);
   li.appendChild(entry2);
   li.appendChild(mpbutton);
   
   document.querySelector('#mypost').appendChild(li);
 });
});


}







 function updatePost(){
  var uTitle = document.getElementById("updtTitle");
  var uContent = document.getElementById("updtContent");
   var key = document.querySelector('#updtButton').getAttribute('data-id');

   if(uTitle.value!=""){
   firebase.firestore().collection("items").doc(key).update({
    
    title: uTitle.value,
    content: uContent.value,

    




   })
   onNavigate('/');

  }else
{
  onNavigate('/');
}



   console.log(uTitle)


}



 function addItem(){

  var timestamp =firebase.firestore.FieldValue.serverTimestamp;
  var Title = document.getElementById("txtTitle");
  var Content = document.getElementById("txtContent");
  
console.log(Title); 

if(Title.value!=""){
  
  firebase.firestore().collection("items").add({
    title: Title.value,
    content: Content.value,
    userId: firebase.auth().currentUser.uid,
    createdAt:timestamp()
    
  })

  onNavigate('/');
} else
{
  onNavigate('/');
}
}


 
function  onEdit(eTitle,eContent,id){
  onNavigate('/update');

  document.querySelector('#updtTitle').value = eTitle;
  document.querySelector('#updtContent').value = eContent;
  document.querySelector('#updtButton').setAttribute('data-id',id)

  console.log(document.querySelector('#updtButton').getAttribute('data-id'));
}

 function onPost(){
  onNavigate('/');

  window.onload=subscribePost;

 }

 

 
    