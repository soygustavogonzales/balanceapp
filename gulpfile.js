var gulp = require('gulp'),
	less = require('gulp-less'), 
	path = require('path'),
	//uncss = require('gulp-uncss'),
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	coffee = require('gulp-coffee'),
	rename = require('gulp-rename'),
	csso = require('gulp-csso'),
	gutil = require('gulp-util'),
	liveReload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var paths = {
	jade:'views/**/*.jade',
	less:{
		origin:'public/stylesheets/less/**/*.less',
		dest:'public/stylesheets/css/development'
	}
}

gulp.task('less',function(){
	return gulp.src(paths.less.origin)
	.pipe(less({
			paths:[path.join(__dirname,'less','includes')]
		}))
	.pipe(gulp.dest(paths.less.dest))
	.pipe(liveReload())
})
gulp.task('jade',function(){
		return gulp.src(paths.jade)
		.pipe(liveReload())
})
gulp.task('watch',function(){
	liveReload.listen()
	gulp.watch(paths.jade,['jade'])
	gulp.watch(paths.less.origin,['less'])
})

/*Tarea por default, siempre se ejecutara*/
gulp.task('default',['watch','less'])