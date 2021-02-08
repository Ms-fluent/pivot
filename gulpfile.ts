
const fs = require('fs');
const gulp = require('gulp');
const shell = require('gulp-shell');

function defaultTask(cb: any) {
  console.log('My first task');
  cb();
}

function incrementVersion(cb) {
  const file = fs.readFileSync('package.json');
  const content = JSON.parse(file);

  const version = content.version.split('.');
  version[2] = +version[2] + 1;
  content.version = version.join('.');

  fs.writeFileSync('package.json', JSON.stringify(content, null, 2));
  cb();
}

const publish = async (cb) => {
  await shell.task('npm run publish')();
  cb();
};


const pack = async (cb) => {
  const result = await shell.task('npm run package')();
  cb();
};

function getPackage(): string {
  const file = fs.readFileSync('package.json');
  const content = JSON.parse(file);

  return content.name + '@' + content.version;
}

gulp.task('version', (cb) => {
  console.log(getPackage());
  cb();
});

gulp.task('publishNext', gulp.series(incrementVersion, pack, publish));

gulp.task('republish', () => {

});

exports.defaultTask = defaultTask;
