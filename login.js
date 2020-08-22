const login = 
 `
 
 <div id="stl">
 
 <div id="box">
   <input type="email"  placeholder="Email address" size="35" id="txtEmail" ><br/><br/>
   <input type="password" placeholder="Password" size="35" id="txtPassword" ><br/><br/>
   
 
 <button   id="btnLogin" onclick = "signIn()" ;>Log in</button> 
 <button   id="btnSignUp" onclick="signUp()";>Sign up</button><br/><br/>
 
 <button id="rstt" onclick="onNavigate('/reset');">Reset Password</a></button>

 </div>
 
 
 
 <br /> <br />
 </div>
 <span id="errorMessage"></span>
  <span id="successMessage"></span>
 `