NH = {}
NH = {
	init: function()	{
		s = document.createElement("script")
		s.src = '/js/cltk/CLFramework.js'
		s.onload = function()	{
			CL.Framework.modulesDir = "/js/cltk/"
			CL.Framework.init(function()
            {
                CL.DynamicFileLoader.addLib({name: "script", location: '/js/script.js'})
                CL.DynamicFileLoader.addLib({name: "screen", location: '/css/screen.css', media: 'all'})
                CL.DynamicFileLoader.processQueue(function()    {
                    document.body.innerHTML = ""
                    NH.menu = document.createElement("aside")
                    NH.menu.appendChild(NH.createMenu(NH._menu, "Main Menu"))
                    document.body.appendChild(NH.menu)
                    NH.screenContainer = document.createElement("section")
                    NH.articles[0] = NH.createArticle()
                    document.appendChild(NH.screenContainer)
                })

            })
			this.parentNode.removeChild(this)	
		}
		document.body.appendChild(s)
	},
    createMenu: function(json, title) {
        var a = document.createElement("article"),
            e = document.createElement("h2"),
            u = document.createElement("ul")

        e.innerHTML = title
        a.appendChild(e)
        for ( o in json )   {
            if (typeof(json[o]) == 'object')  e = NH.createMenu(json[o], o)
            else {
                e = document.createElement("li")
                e.innerHTML = o
                e.onclick = json[o]
            }
            u.appendChild(e)
        }
        a.appendChild(u)
        return a
    },
    _menu: {
        "Options": {
            "Account": NH.null,
            "Logout": NH.null,
        },
        "Search": {
            "Tags": NH.null,
        },
        "My Snippets": {
            "One": NH.null,
            "Two": NH.null,
            "Three": NH.null
        }
    },
    null: function() { return null },
    screenContainer: null,
    createArticle: function()   {
        var a = document.createElement("article"),
            c = document.createElement("section"),
            b1 = document.createElement("button"),
            b2 = document.createElement("button"),
            b3 = document.createElement("button"),
            o = document.createElement("button"),
            h = document.createElement("header"),
            f = document.createElement("footer")


    }
}
window.onload = NH.init


DragHandler = {


    // private property.
    _oElem : null,


    // public method. Attach drag handler to an element.
    attach : function(oElem) {
        oElem.onmousedown = DragHandler._dragBegin;

        // callbacks
        oElem.dragBegin = new Function();
        oElem.drag = new Function();
        oElem.dragEnd = new Function();

        return oElem;
    },


    // private method. Begin drag process.
    _dragBegin : function(e) {
        var oElem = DragHandler._oElem = this;

        if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
        if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }

        var x = parseInt(oElem.style.left);
        var y = parseInt(oElem.style.top);

        e = e ? e : window.event;
        oElem.mouseX = e.clientX;
        oElem.mouseY = e.clientY;

        oElem.dragBegin(oElem, x, y);

        document.onmousemove = DragHandler._drag;
        document.onmouseup = DragHandler._dragEnd;
        return false;
    },


    // private method. Drag (move) element.
    _drag : function(e) {
        var oElem = DragHandler._oElem;

        var x = parseInt(oElem.style.left);
        var y = parseInt(oElem.style.top);

        e = e ? e : window.event;
        oElem.style.left = x + (e.clientX - oElem.mouseX) + 'px';
        oElem.style.top = y + (e.clientY - oElem.mouseY) + 'px';

        oElem.mouseX = e.clientX;
        oElem.mouseY = e.clientY;

        oElem.drag(oElem, x, y);

        return false;
    },


    // private method. Stop drag process.
    _dragEnd : function() {
        var oElem = DragHandler._oElem;

        var x = parseInt(oElem.style.left);
        var y = parseInt(oElem.style.top);

        oElem.dragEnd(oElem, x, y);

        document.onmousemove = null;
        document.onmouseup = null;
        DragHandler._oElem = null;
    }

}