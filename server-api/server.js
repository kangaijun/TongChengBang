const express=require('express');//框架
const fs=require('fs');                     //操作文件

const app=express();                    //

//解决缓存，提高多人访问的效率
var arr=[];   //格式为{1：""} ,是个对象



app.get('/at/shop/:num',(req,res)=>{
	res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header({"content-type":"application/json"});//设置响应头请求值及返回文件类型text/html
//	console.log(req.params.num);                                      获得请求第几个文件
	var num=req.params.num;                                         //获得访问的是第几个文件
	var filename="./json/"+num+".json";                       //获得文件名
	var result=null;                                                            //用户信息对象
	//查看缓存中是否存在
	for (var i=0; i<arr.length; i++) {
		var obj=arr[i];//获得当前的对象
		if (num in obj) {
			result=obj[num];
			break;
		}
	}
	
	//不存在
	if (result==null) {
		fs.readFile(filename,(err,data)=>{   //读取文件，并将对象存入数组
			if(err){
				console.log(err);
				return;
			}
			var o={};
			o[num]=data;
			arr.push(o);
			result=data;
//			console.log("文件"+result);    获得文件数据
			res.send(result);
		})
	}else{
		res.send(result);
	}
//	console.log(result)
});

app.listen(3000,()=>{
	console.log("已启动")
})
