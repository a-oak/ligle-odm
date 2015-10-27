'use strict';

require('ligle-util')({
  loggerLevel:'INFO',
});

var requireHelper = require('../require-helper');
var odm = requireHelper('index')({
  server:'localhost/ligle-test',
  loggerLevel:'INFO',
});


require('chai').should();
require('mocha-generators').install();


class Post extends odm.Model {

}


describe('Mongorito', function () {
  before(function * () {
    odm.connect();
  });
  beforeEach(function * () {
    yield* Post.remove();
  });
  it('test something', function * () {
    let post = new Post({
      title: 'Node.js with --harmony rocks!',
      body: 'Long post body',
      author: {
        name: 'John Doe',
      },
    });

    yield post.save();
    let posts = yield Post.find();
    posts.length.should.equal(1);
    posts[0].get('title').should.equal('Node.js with --harmony rocks!');

    post.set('title', 'Post got a new title!');

    yield post.save();
    posts = yield Post.find();
    posts.length.should.equal(1);
    posts[0].get('title').should.equal('Post got a new title!');
  });
  after(function () {
    odm.disconnect();
  });
});
