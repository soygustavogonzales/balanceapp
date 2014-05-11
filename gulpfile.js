var gulp = require('gulp'),
	lessCss = require('gulp-less'), 
	path = require('path'),
	uncss = require('gulp-uncss'),
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	coffee = require('gulp-coffee'),
	rename = require('gulp-rename'),
	csso = require('gulp-csso'),
	gutil = require('gulp-util'),
	liveReload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

/*Tarea para precompilar un archivo .less en .css*/
gulp.task('less', function () {
  gulp.src('public/stylesheets/less/*.less')//ruta de los archivos .less que se quieren precompilar
    .pipe(lessCss({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('public/stylesheets/css/development'));//ruta destino del .css resultante
});
/*Tarea para minimizar un archivo de estilos .css*/
gulp.task('css-minify', function() {
    return gulp.src('public/stylesheets/css/development/*.css')
        .pipe(csso())
        .pipe(gulp.dest('public/stylesheets/css/production'))
        .pipe(connect.reload());
});
/*Tarea para minimizar un archivo javascript .js*/
gulp.task('js-minify', function () {
    gulp.src('public/javascripts/development/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/javascripts/production'))
        .pipe(connect.reload());

});

/*Tarea para concatenar distintos archivos css en 1*/
gulp.task('concat-css',function(){
	return gulp.src('css/dev/*.css')
	.pipe(concat('styles.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('css'))
})

/*Tarea limpiar las reglas css no utilizadas en los estilos*/
gulp.task('uncss',function(){
	return gulp.src('/public/stylesheets/css/development/styles.css')
	.pipe(uncss({
		html:['/views/index.html']
	}))
	.pipe(gulp.dest('/public/stylesheets/css/semiproduction'));
})


/*Precompilar archivos coffeescript en .js*/
gulp.task('coffee', function() {
  gulp.src('public/javascripts/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('public/javascripts/development'))
});

gulp.task('connect',function(){
	connect.server({
		//root:'public/stylesheets/css/development/*.css',
		host:'localhost',
		livereload:true
	});
})

/*
*/
gulp.task('jade',function(){
		gulp.src('views/*.jade')
		.pipe(connect.reload())
})
/*Tarea por default, siempre se ejecutara*/
gulp.task('default',function(){
	gulp.run('less')//corre esta tarea
	gulp.run('css-minify')
	//gulp.run('coffee')
	gulp.run('js-minify')
	gulp.run('connect')
	gulp.run('jade')
	gulp.run('uncss')

//Vigilancia de archivos, cuando ocurra un cambio en cualquiero de estos archivos se ejecutara la accion o tarea especificada
	gulp.watch('public/stylesheets/less/*.less',function(){
		gulp.run('less')
		gulp.run('uncss')
	})
	gulp.watch('public/stylesheets/css/development/*.css',function(){
		gulp.run('css-minify')
	})
	/*
	gulp.watch('public/javascripts/coffee/*.coffee',function(){
		gulp.run('coffee')
	})
*/
	gulp.watch('public/javascripts/development/*.js',function(){
		gulp.run('js-minify')
	})
	gulp.watch('views/*.jade',function(){
		gulp.run('jade')
	})
})