const login = 
 `
 
 <div class="container">
 <div class="row"><div class="col-6">
 
 <div id="box">
 <div class="xyz">
   <input type="email"  placeholder="Email address"  id="txtEmail"  autofocus>
   </div><br/><br/>
   <div class="xyz">
   <input type="password" placeholder="Password"  id="txtPassword" >
   </div><br/><br/>
   
 
 <button   id="btnLogin" onclick = "signIn()" ;>Log in</button> 
 
 
 <button   id="btnSignUp" onclick="signUp()";>Sign up</button><br/><br/>
 

 <div id="btnReset">
 <button id="abc" onclick="onRNavigate(); ">Reset Password</a></button>
 </div></div>
 </div>
 </div>
 
 
 
 <br /> <br />
 </div>
 <span id="errorMessage"></span>
  <span id="successMessage"></span>
 `