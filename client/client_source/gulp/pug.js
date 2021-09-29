"use strict";

import {gulp, paths} from '../gulpfile.babel.js';

export function pug () {
  return gulp.src(paths.pug.source)
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(gulp.debug({
      title: `"Pug"`
    }))
}