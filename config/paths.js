const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['js', 'json', 'jsx'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('client/build'),
  appPublic: resolveApp('client/public'),
  appHtml: resolveApp('client/public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'client/src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('client/src'),
};
