# TokuCinema
Monster Movie Review Website

## Initial Setup (Archival Purposes Only)

### Install Angular CLI
Reference: [Angular CLI](https://cli.angular.io/)
- run cmd: ```npm install -g @angular/cli```

### Generate Angular 2 CLI App
- run cmd: ```ng new TokuCinema```  

### Install Gulp
Reference: [Gulp](http://gulpjs.com/) 
- run cmd: ```npm install gulp-cli -g```

### Initialize Gulp File
- cd to the directory generated by the Angular CLI (TokuCinema)
- run cmd: ```touch gulpfile.js```

### Populate Gulp File
- Add the below code to the gulpfile (```gulpfile.js```)
```javascript
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    gulp.src('src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('compile-theme', function() {
    gulp.run(['styles']);
});

//Watch task
gulp.task('default', function() {
    gulp.watch('src/**/*.scss', ['styles']);
});
```

### Add Gulp Dependencies to package.json
- Ensure these are listed in the ```devDependencies``` section of the ```package.json``` file located at the root of the angular project:
    ```json
    "gulp": "^3.9.1",
    "gulp-sass": "^3.1.0",
    "gulp-sourcemaps": "^2.3.1",
    ```
