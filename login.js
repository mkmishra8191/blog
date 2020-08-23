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
   
 <div>
 <button   id="btnLogin" onclick = "signIn()" ;>Log in</button> 
 </div>
 
 <button   id="btnSignUp" onclick="signUp()";>Sign up</button><br/><br/>
 

 <div id="btnReset">
 <button  onclick="onNavigate('/reset');">Reset Password</a></button>
 </div></div>
 </div>
 </div>
 
 
 
 <br /> <br />
 </div>
 <span id="errorMessage"></span>
  <span id="successMessage"></span>
 `