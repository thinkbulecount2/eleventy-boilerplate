require('dotenv').config();

const environment = isEnv(process.env.ELEVENTY_ENV);

function isEnv (env) {
  if (env === "production") {
    return process.env.BASE_URL = '/';
  } else if (env === "development") {
    return process.env.BASE_URL = '/';
  } else {
    return process.env.BASE_URL;
  }
}

module.exports = function() {
  return {
    environment
  }
};
