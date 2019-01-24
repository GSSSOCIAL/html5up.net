document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("ul.nav").addEventListener("click",function(e){
        var target = e.target;
        var is_sub = target.classList.contains("submenu");
        while(is_sub==false){
            var target = target.parentNode;
            if(typeof target.classList == "undefined"){
                return;
            }
            is_sub = target.classList.contains("submenu");
        }
        target.classList.toggle("active");
    });
    document.querySelector("a.togglemenu").addEventListener("click",function(e){
        e.preventDefault();
        var target = e.target;
        while(target.classList.contains("page")==false){
            target = target.parentNode;
        }
        if(target.classList.contains("menu-hidden")){
            target.classList.remove("menu-hidden-hide-components");
            setTimeout(function(t){
                t.classList.remove("menu-hidden");
            },50,target);
        }else{
            target.classList.add("menu-hidden");
            setTimeout(function(t){
                t.classList.add("menu-hidden-hide-components");
            },300,target);
        }
        return false;
    });
    document.addEventListener("scroll",function(e){
        if(document.body.getElementsByClassName("page")[0].classList.contains("menu-hidden")){
            return;
        }
        var Y = window.scrollY+window.innerHeight,
        H = document.getElementById("aside_inner").getBoundingClientRect().height;
        if((H-Y)<=0){
            document.getElementById("aside_inner").style.width = document.getElementById("aside_inner").getBoundingClientRect().width+"px";
            document.getElementById("aside_inner").style.position = "fixed";
            document.getElementById("aside_inner").style.bottom = "0px";
        }else{
            document.getElementById("aside_inner").style.width = "";
            document.getElementById("aside_inner").style.position = "";
            document.getElementById("aside_inner").style.bottom = "";
        }
    });
});