const login = 
 `
 
 <div class="container">
 
 <div id="box">
   <input type="email"  placeholder="Email address"  id="txtEmail"  autofocus><br/><br/>
   <input type="password" placeholder="Password"  id="txtPassword" ><br/><br/>
   
 <div>
 <button   id="btnLogin" onclick = "signIn()" ;>Log in</button> 
 <button   id="btnSignUp" onclick="signUp()";>Sign up</button><br/><br/>
 </div>

 <div id="btnReset">
 <button  onclick="onNavigate('/reset');">Reset Password</a></button>
 </div>
 </div>
 
 
 
 <br /> <br />
 </div>
 <span id="errorMessage"></span>
  <span id="successMessage"></span>
 `