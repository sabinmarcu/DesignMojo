ICS = {
	init: function()	{
		s = document.createElement("script")
		s.src = "/js/cltk/CLFramework.js"
		s.onload = function(){	
			CL.Framework.modulesDir = "/js/cltk/";		
			CL.Framework.init(function(){
				CL.DynamicFileLoader.addLib({"name": 'WebSite Theme', "media": "all", "location": '/css/screen.css'})
				CL.DynamicFileLoader.addLib({"name": 'md5', "location": '/js/md5.js'})
				CL.DynamicFileLoader.addLib({"name": 'IO Sockets', "location": '/socket.io/socket.io.js'})
				CL.DynamicFileLoader.processQueue(function(){
					ICS.sock = io.connect("http://localhost")
					ICS.login()
				})
			})
			s.parentNode.removeChild(s)
		}
		document.head.appendChild(s)

		toggleList = document.getElementsByClassName("toggle")
		function toggle()	{		
			if (this.parentNode.className.indexOf("hidden") == -1) {
				this.parentNode.className += " hidden";
				this.innerHTML = "SHOW"
			}
			else {
				this.parentNode.className = this.parentNode.className.substr(0, this.parentNode.className.indexOf(" hidden") - 1);
				this.innerHTML = "HIDE"
			}
		}
		for ( element in toggleList )	{
			element = toggleList[element]
			element.onclick = toggle
			element.innerHTML = "HIDE"
		}
	},
	login: function()	{
		CL.LightBox.reuse("loginForm", "Login", function() {
			ICS.sock.emit("attemptLogin", { 
				"username" : document.getElementById("loginUsername").value, 
				"password" : document.getElementById("loginPassword").value
			})
		}).addController("Input", {"value": " Username", 'id': "loginUsername"}).addController("Password", {"value" : "Password", 'id': "loginPassword"}).addController("Submit", {"value": "Attempt Login"}).show(25)

		CL.LightBox.reuse("infoForm", "Login Information").addController("Description", {"id": "loginResultDescription"})


		ICS.sock.on("loginSuccessful", function(data){	
			hash=MD5(data.email)
			document.getElementById("avatarPlaceholder").src = "http://gravatar.com/avatar/" + hash + "?s=100&r=pg&d=identicon"
			CL.LightBox.reuse("loginForm").hide(25)
			CL.LightBox.reuse("infoForm").setProperty("loginResultDescription", 'value', '<span style="color: green">Success!</span>').show(5, function() {
				setTimeout(function(){ CL.LightBox.reuse("infoForm").hide(25) }.bind(this), 1000)
			})
		})

		ICS.sock.on("loginFailed", function(data){
			console.log(data)	
			CL.LightBox.reuse("infoForm").setProperty("loginResultDescription", 'value', '<span style="color: red">Problem!</span><br>' + data).show(10, function() {
				setTimeout(function(){ CL.LightBox.reuse("infoForm").hide(10) }.bind(this), 1500)
			})
		})
	},
	attemptLogin: function()	{
		
	}
}


