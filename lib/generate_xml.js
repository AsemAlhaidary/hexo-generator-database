const nunjucks = require('nunjucks');
const env = new nunjucks.Environment();
const path = require('path');
const fs = require('fs');

env.addFilter('uriencode', (str) => {
  return encodeURI(str);
});

env.addFilter('unwantedCarts', (str) => {
  return (typeof str == 'string') ? str.replace(/[\x00-\x08\x10-\x1f]/g, '') : str;
});

env.addFilter('isObj', (val) => {
  return (typeof val === 'object');
});

module.exports = (locals, config) => {
  let dbFields = config.fields;

  let dbSrc = path.join(__dirname, '../templates/db.xml');
  let dbTemplate = nunjucks.compile(fs.readFileSync(dbSrc, 'utf-8'), env);

  let posts;

  dbFields.forEach(field => {
    field = field.trim();

    if (field == 'post') {
      posts = locals.posts.sort('-data');
    }
  });

  let rootURL;
  if (config.root == null) {
    rootURL = "/";
  } else {
    rootURL = config.root;
  }

  let xml = dbTemplate.render({
    config: config,
    posts: posts,
    url: rootURL,
    variables: config.variables
  });

  return {
    path: config.path,
    data: xml
  }
}