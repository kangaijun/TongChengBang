var ul=document.querySelector(".add-shop");
var page=document.querySelectorAll("#page li");
var xhr=new XMLHttpRequest();
activeStyle(1);
for (var i=0; i<page.length; i++) {
	page[i].index=i;
	page[i].onclick=function(){
//			window.sessionStorage[index]=this.index;
//			window.location.href=
		for (var j=0; j<page.length; j++) {
			page[j].style.border="1px solid #d6d6d6";
			page[j].style.background="none";
			page[j].style.color="#999999";
		}
		move(this.index);
		activeStyle(this.index);
	}
}
function activeStyle(n){
	page[n].style.border="none";
	page[n].style.background="#fc6621";
	page[n].style.color="white";
}
function move(num){
	ul.innerHTML="";
	xhr.open("get","http://localhost:3000/at/shop/"+page[num].innerHTML);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4) {
			if (xhr.status>=200&&xhr.status<300||xhr.status==304) {
				var res=JSON.parse(xhr.responseText);
				for (var i=0; i<5; i++) {
					var li=document.createElement("li");
					li.setAttribute("class","li");
					ul.appendChild(li);
					var img=document.createElement("img");
					img.src=res.shop_data[i].shop_ico;
					li.appendChild(img);
					var myul=document.createElement("ul");
					li.appendChild(myul);
					var myli=document.createElement("li");
					myul.appendChild(myli);
					var a=document.createElement("a");
					a.innerHTML=res.shop_data[i].shop_name;
					myli.appendChild(a);
					myli=document.createElement("li");
					myli.innerHTML="主营："+res.shop_data[i].main;
					myul.appendChild(myli);
					myli=document.createElement("li");
					myli.innerHTML="地址："+res.shop_data[i].addr_detail;
					myul.appendChild(myli);
					var span=document.createElement("span");
					span.innerHTML="人气："+res.shop_data[i].shop_visit+"次浏览";
					myli.appendChild(span);
					var div=document.createElement("div");
					li.appendChild(div);
					var p=document.createElement("p");
					p.innerHTML="进入店铺";
					div.appendChild(p);
					p.onclick=function(){
						alert(1);
					}
				}
			}
		}
	}
}
move(1);