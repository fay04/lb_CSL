/**
 * Created by Lingban on 2016/8/3.
 */
var pkg = require('./package.json');
var gulp = require('gulp');
var copy = require('copy');
var copyDir = require('copy-dir');
var concat = require('gulp-concat');//�ϲ�JS
var uglify = require('gulp-uglify');//ͨ��UglifyJS��ѹ��JS�ļ�
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');//�������ļ�
var compass = require('gulp-compass');
var minifyCss = require('gulp-clean-css');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyHtml = require('gulp-minify-html');

var projectJS = [
    'scripts/app.js',
    'scripts/services/**/*.js',
    'scripts/directives/**/*.js',
    'scripts/filters/**/*.js',
    'scripts/controllers/**/*.js'
];

var dest = 'dist/';
var jsDest = 'dist/js';
var cssDest = 'dist/css';
var imgDest = 'dist/images';
var tmpJsDest = 'dist/tmpjs';
var tmpCssDest = 'dist/tmpcss';
var tmpImgDest = 'dist/tmpimg';
var revMF = 'dist/rev';

// ����scss�ļ�
gulp.task('compass', function() {
    gulp.src('styles/**/*.scss')
        .pipe(compass({
            css: cssDest,
            sass: 'styles',
            generated_images_path: imgDest
        }))
        .pipe(gulp.dest(cssDest));
});
// ���Ʋ�������ѩ��ͼ��ͼƬ�������ļ���dist
gulp.task('copy', function() {
    copy(['images/*.jpg', 'images/welcome/*.png'], imgDest, function(err, file) {
        //
    });
});

// ���distĿ¼
gulp.task('clean', function() {
    gulp.src(dest)
        .pipe(clean());
});

// У���﷨
gulp.task('jshint', function() {
    gulp.src(projectJS)
        .pipe(jshint());
});

// ʵʱ����
gulp.task('watch', function() {
    gulp.watch(projectJS, function() {
        gulp.run('jshint');
    });
});

// ����ģ��js
gulp.task('compileTpl', function() {
    gulp.src('views/**/*.html')
        .pipe(templateCache({module: 'lbApp', transformUrl: function(url) {return 'views/' + url;}}))
        .pipe(rename('templates.js'))
        .pipe(gulp.dest(tmpJsDest));
});

// �ϲ�ѹ���ļ�
gulp.task('usemin', function() {
    gulp.src('./index.html')
        .pipe(usemin({
            css: [minifyCss],
            js: [function() { return uglify({compress: true, mangle: false})}],
            html: [minifyHtml],
            inlinejs: [uglify],
            inlinecss: [minifyCss]
        }))
        .pipe(gulp.dest(dest));
});

// ����̬��Դ���ָ��
gulp.task('rev', function() {
    gulp.src(tmpCssDest + '/*.css')
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revMF + '/css'));
    gulp.src(tmpJsDest + '/*min.js')
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revMF + '/js'));
    gulp.src([imgDest + '/**/*.png', imgDest + '/**/*.jpg'])
        .pipe(rev())
        .pipe(gulp.dest(tmpImgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revMF + '/img'));
});

// �滻��̬��Դ·��
gulp.task('staRep', function() {
    var staticUrl = 'http://static.aiaas.ai/aiaas';
    gulp.src([revMF + '/**/*.json', jsDest + '**/*.js', cssDest + '**/*.css', dest + 'index.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'tmpcss': staticUrl + '/css',
                'tmpjs': staticUrl + '/js',
                '../images': staticUrl + '/images'
            }
        }))
        .pipe(gulp.dest(dest));
    // ɾ��imgDest�е�����
    gulp.src(imgDest + '/**/*', {read: false}).pipe(clean());
    // ��tmpImgDest�е����ݸ��Ƶ�imgDest��
    gulp.src(tmpImgDest + '/**/*').pipe(gulp.dest(imgDest));
});

// ������õľ�̬�ļ��ŵ�һ��dist/aiaas�У����ڽ�������cdn��
gulp.task('copyStaticFile', function() {
    copyDir('dist/js', 'dist/aiaas/js', function(err) {});
    copyDir('dist/css', 'dist/aiaas/css', function(err) {});
    copyDir('dist/images', 'dist/aiaas/images', function(err) {});
});

// ��������ļ�
gulp.task('end', function() {
    gulp.src([tmpJsDest, tmpCssDest, tmpImgDest, revMF, cssDest + '/project.css'], {read: false}).pipe(clean());
});

// ����build������ʱ����SCSS�ļ���ͼƬ�ļ������仯ʱ����Ҫ����ص���Դ����build���ڲ鿴Ч����
gulp.task('dev', function() {
    gulp.run('clean', 'compass', 'copy');
});

// �ύ���Ի�������buildʱ��gulp clean; gulp compass; gulp compileTpl; gulp copy; gulp jshint; gulp usemin; gulp rev; gulp staRep; gulp copyStaticFile; gulp end