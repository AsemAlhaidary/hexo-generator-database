const merge = require('utils-merge');
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
        // Delete 'next' & 'prev' properties that causes this error:
        // "TypeError: Converting circular structure to JSON"
        delete post['next'];
        delete post['prev'];

        // Delete all the posts in tags that causes this error:
        // "TypeError: Converting circular structure to JSON"
        if (post.hasOwnProperty('tags')) {
          let tagsArr = post['tags']['data'];
          tagsArr.forEach(tagObj => {
            if (tagObj.hasOwnProperty('posts')) {
              tagObj['posts']['data'] = [];
            }
          });
        }

        // Delete all the posts in categories that causes this error:
        // "TypeError: Converting circular structure to JSON"
        if (post.hasOwnProperty('categories')) {
          let categoriesArr = post['categories']['data'];
          categoriesArr.forEach(categoryObj => {
            if (categoryObj.hasOwnProperty('posts')) {
              categoryObj['posts']['data'] = [];
            }
          });
        }

        db.push(post);
      });
    }

    db = JSON.stringify(db);

    return {
      path: config.path,
      data: db
    }
  });
}