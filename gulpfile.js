//引入gulp
var gulp=require('gulp');
//console.log(gulp);                      //输出则模块加载出来
//引入插件
var livereload=require('gulp-livereload'),   //网页自动刷新
	  webserver=require('gulp-webserver'),    //静态服务器
	  sass=require('gulp-ruby-sass'),                 //sass插件
	  uglify=require('gulp-uglify'),                  //js压缩
	  imagemin=require('gulp-imagemin'),   //图片压缩
	  pngquant=require('imagemin-pngquant'),    //png图片深度压缩
	  jshint=require('gulp-jshint'),                           //js检测插件
	  rename=require('gulp-rename');                    //重命名
//注册任务
gulp.task('webserver',function(){
	gulp.src('./dist')
	.pipe(webserver({         //对象
		livereload:true,
		open:true,      //启动服务器的时候自动打开网页
		port:8643
	}))
})

//注册任务，将html传到发布目录里边
gulp.task('html',function(){
	return gulp.src('src/**/*.html')
				.pipe(gulp.dest('dist/'))
})
gulp.task('watch',function(){
    gulp.watch( 'src/*.html', ['html']) // 监听根目录下所有.html文件
    gulp.watch( 'src/sass/**/*.scss', ['sass']) // 监听根目录下所有.html文件
		gulp.watch( 'src/js/**/*.js', ['js'])
});
//注册sass任务
gulp.task('sass',function(){
	sass('src/sass/**/*.scss',{style:'compact'})
	.on('error',function(err){
		console.log('编译sass出错',error.message);
	})
	.pipe(gulp.dest('dist/css'))
})
//注册js脚本压缩任务
gulp.task('script',function(){
	return gulp.src('src/js/**/*.js')
	.pipe(uglify())
//	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/js'))
})
//注册图片压缩任务
gulp.task('imagemin',function(){
	return gulp.src('src/images/**/*.{png,jpg,gif,svg}')//源目录
	.pipe(imagemin({
		progressive:true,  //无损压缩JPG图片
		svgoPlugins:[{removeViewBox:false}],//不移除svg的viewbox属性
		use:[pngquant()]
	}))
	.pipe(gulp.dest('dist/images'));
})
//代码检测
gulp.task('js',function(){
	return gulp.src('src/js/**/*.js')
							.pipe(jshint())
							.pipe(jshint.reporter('default'));
})


gulp.task('default',['sass','js','script','imagemin','html','watch','webserver']);
