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
					username=prompt("username")
					password=prompt("password")
					var sock = io.connect("http://localhost")
					sock.emit("sentLoginData", { "username" : username, "password" : password})
					sock.on("getGravatar", function(data){	
						console.log(data)		
						hash=MD5(data.email)
						document.getElementById("avatarPlaceholder").src = "http://gravatar.com/avatar/" + hash + "?s=100&r=pg&d=identicon"
					})
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
	login: function{
		promt	
	}
}


