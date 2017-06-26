requirejs.config({
	baseUrl:'js/lib',
	paths:{
		app:'../app',
		jquery:'jquery-3.2.1.min',
		swiper:'swiper.min'
	}
});

define(['jquery','swiper',"app/swp",'app/shop-data'],function(a,b,c,d){
	$(".li div").each(function(index){
		$(".li").eq(index).mouseover(function(){
			$(this).css("background","rgba(11,157,28,0.1)").siblings().css("background","white");
			$("li div").eq(index).show();
		})
		$(".li").eq(index).mouseleave(function(){
				$(".li div").eq(index).hide();
			})
	})
});