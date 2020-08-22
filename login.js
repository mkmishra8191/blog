const login = 
 `
 
 <div class="container">
 
 <div id="box">
   <input type="email"  placeholder="Email address" size="45" id="txtEmail" ><br/><br/>
   <input type="password" placeholder="Password" size="45" id="txtPassword" ><br/><br/>
   
 
 <button   id="btnLogin" onclick = "signIn()" ;>Log in</button> 
 <button   id="btnSignUp" onclick="signUp()";>Sign up</button><br/><br/>
 
 <button id="rstt" onclick="onNavigate('/reset');">Reset Password</a></button>

 </div>
 
 
 </div>
 <br /> <br />
 <span id="errorMessage"></span>
  <span id="successMessage"></span>
 `