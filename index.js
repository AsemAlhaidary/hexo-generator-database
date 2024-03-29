const merge = require('utils-merge');
const path = require('path');

const generateJson = require('./lib/generate_json');
const generateXml = require('./lib/generate_xml');

const variables = {
  title: true,
  path: true,
  date: true,
  updated: true,
  img: true,
  excerpt: true,
  content: true,
  categories: {
    name: true,
    path: true,
  },
  tags: {
    name: true,
    path: true,
  },
};

let config = hexo.config.database = merge({
  path: 'db.json',
  fields: ['post'],
  root: '/',
  variables: variables
}, hexo.config.database);

if (path.extname(config.path) == false) {
  config.path += '.json';
}

if (path.extname(config.path) == '.json') {
  hexo.extend.generator.register('jsonDB', locals => generateJson(locals, config));
}

if (path.extname(config.path) == '.xml') {
	hexo.extend.generator.register('xmlDB', locals => generateXml(locals, config));
}