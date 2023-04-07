# hexo-generator-database
Extract the database of HEXO blog into JSON or XML files

## Install

``` bash
$ npm install hexo-generator-database --save
```

## Options

You can configure this plugin in your root `_config.yml`.

``` yaml
database:
  path: db.json
  fields: [post]
  variables: 
    title: true
    path: true
    date: true
    updated: true
    img: true
    sourceAuthorImg: true
    sourceAuthor: true
    display_tag_onHome: true
    wordCount: true
    charCount: true
    imgCount: true
    vidCount: true
    readTime: true
    excerpt: true
    content: true
    categories:
      name: true
      path: true
    tags:
      name: true
      path: true
    source:
      author:
        img: true
        name: true
    origin:
      url: true
      author:
        name: true
        img: true
        published: true
```

- **path** - file path. By default is `db.json`.
- **fields** - the generate scope you want to generate, you can include:
  * **post** (Default) - will only covers all the posts of your blog. `(The only supported for now)`
- **variables** - the front-matter variables that you want to extract. `(NOTE: The package will look for an array of sub items inside (categories, tags) variables)`
## Exclude indexing

To exclude a certain post or page from being indexed, you can simply insert `indexing: false` setting at the top of its front-matter, *e.g.*:

```yml
title: "Code Highlight"
date: "2014-03-15 20:17:16"
tags: highlight
categories: Demo
description: "A collection of Hello World applications from helloworld.org."
toc: true
indexing: false
---
```

Then the generated result will not contain this post or page.

## Sponsor

This package is sponsored by [LoreZyra](https://blog.richiebartlett.com/), you can find him at his [Website](https://richiebartlett.com/), also [Github](https://github.com/lorezyra)

![LoreZyra](https://2022.blog.richiebartlett.com/img/logoImage.svg)

## Become a sponsor?

<a href="https://www.buymeacoffee.com/asemalhaidary" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
