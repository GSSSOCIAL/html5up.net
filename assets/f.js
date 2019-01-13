$(document).ready(function(){
    $(document).on("click","ul.nav>li",function(e){
        if($(e.target).closest("li").find(">ul").length>0){
            $(e.target).closest("li").toggleClass("active");
        }
    });
    $(document).on("click","div.page a.togglemenu",function(e){
        e.preventDefault();
        var target = $(e.target).closest("div.page");
        if(target.hasClass("menu-hidden")){
            target.removeClass("menu-hidden-hide-components");
            setTimeout(function(t){
                t.removeClass("menu-hidden");
            },50,target);
        }else{
            target.addClass("menu-hidden");
            setTimeout(function(t){
                t.addClass("menu-hidden-hide-components");
            },300,target);
        }
        return false;
    });
    $(window).on("scroll",function(e){
        if( $("body div.page").hasClass("menu-hidden")) return;
        var y  = window.scrollY+window.innerHeight,
        h = $("body div.page aside>div.inner").outerHeight(true);
        if((h-y)<=0){
            $("body div.page aside>div.inner").css({
                width:($("body div.page aside>div.inner").width())+"px",
                position:"fixed",
                bottom:"0"
            });
        }else{
            $("body div.page aside>div.inner").css({
                width:"",
                position:"",
                bottom:"0"
            });
        }
    });
});