var gulp         = require('gulp'), // Gulp
    pug         = require('gulp-pug'), // Pug
    stylus       = require('gulp-stylus'), // Stylus
    nib          = require('nib'),
    rupture      = require('rupture'),
    autoprefixer = require('autoprefixer-stylus'), // Autoprefixer
    imagemin     = require('gulp-imagemin'), // Imagemin
    concat       = require('gulp-concat'), // Concat
    changed      = require('gulp-changed'), // Changed
    browsersync  = require('browser-sync'); // Browser-Sync


// Aqui configuramos todas las rutas

// Ruta desarrollo
var dev_path =
    {
        styl: 'stylus/',
        pug: 'pug/',
        js:   'js/',
        img:  'img/'
    }

// ruta publica

var public_path =
    {
        css:  '../public_html/css/',
        html: '../public_html/',
        js:   '../public_html/js/',
        img:  '../public_html/img/'
    }



// Compilamos pug

gulp.task('pug', function(){
    gulp.src([
               
                dev_path.pug + 'index.pug',
                dev_path.pug + 'blog.pug',
                dev_path.pug + 'cursos.pug',
                dev_path.pug + 'quienes.pug',
                dev_path.pug + 'contactanos.pug'])
        .pipe(pug({pretty: true}))
        .on('error', console.log)
        .pipe(gulp.dest(public_path.html))
        .pipe(browsersync.reload({stream: true}));
});

// Compile Stylus

gulp.task('stylus', function(){
    gulp.src([
            dev_path.styl + 'style.styl',
            '!' + dev_path.styl + '_*.styl',
            '!' + dev_path.styl + '_*'
        ])
        .pipe(stylus({
            use: [nib(),autoprefixer(),rupture()],
            compress: false

        }))
        .on('error', console.log)
        .pipe(gulp.dest(public_path.css))
        .pipe(browsersync.reload({stream: true}));
});

// JavaScript
// gulp.task('concat', function(){
//     gulp.src(['js/slick.min.js', 'js/sticky-header.js', 'js/jquery.waypoints.min.js','js/jquery.filterizr.js','js/main.js'])
//         .pipe(concat('main.js'))
//         .on('error', console.log)
//         .pipe(gulp.dest(public_path.js))
//         .pipe(browsersync.reload({stream: true}));
// });

// Minification Images
gulp.task('images', function(){
    gulp.src([dev_path.img + '**/*'])
        .pipe(changed(public_path.img))
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest(public_path.img))
        .pipe(browsersync.reload({stream: true}));
});


// Start Browser-Sync server

gulp.task('browsersync-server', function(){
    browsersync.init(null, {
        server: {baseDir: '../public_html/'},
        open: true,
        notify: false
    });
});


// Api WATCH

gulp.task('watch', function(){
    gulp.watch(dev_path.pug + '**/*.pug', ['pug']);
    gulp.watch(dev_path.styl + '**/*.styl', ['stylus']);
    gulp.watch([dev_path.img + '**/*'], ['images']);
    // gulp.watch(dev_path.js + '**/*.js', ['concat']);

    // gulp.watch([dev_path.styl + 'vendor/*', dev_path.js + 'vendor/*'], ['vendor']);
});


// Tarea Default

gulp.task('default', [
    'pug', 'stylus', 'images', 'browsersync-server', 'watch',
]);
