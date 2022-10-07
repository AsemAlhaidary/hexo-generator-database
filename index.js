const merge = require('utils-merge');
const circularJSON = require('circular-json');
const path = require('path');

let config = hexo.config.database = merge({
  path: 'db.json',
  fields: ['post']
}, hexo.config.database);

if (path.extname(config.path) == false) {
  config.path += '.json';
}

if (path.extname(config.path) == '.json') {
  hexo.extend.generator.register('json', (locals) => {
    let dbFields = config.fields;

    let posts;

    dbFields.forEach(field => {
      field = field.trim();

      if (field == 'post') {
        posts = locals.posts.sort('-data');
      }
    });

    let db = new Array();

    if (posts) {
      posts.forEach(post => {
        db.push(post);
      });
    }

    db = circularJSON.stringify(db);

    return {
      path: config.path,
      data: db
    }
  });
}