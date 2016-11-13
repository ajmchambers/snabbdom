var assert = require('assert');
var snabbdom = require('../snabbdom');

var patch = snabbdom.init([]);
var h = require('../h');

var api = require('../htmldomapi');

describe('document-fragment', function() {
  it('parentNode works on child of DocumentFragment', function() {
    // DocumentFragment children do not have .parentElement, use .parentNode instead
    var elm = document.createElement('div');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(elm);
    assert.throws(elm.parentElement);
    assert(elm.parentNode);
    assert.equal(api.parentNode(elm), fragment);
  });
  it('patching a dom-fragment (empty)', function() {
    // when patching an empty dom-fragment, an empty div will be created inside the fragment and used for patching.
    var fragment = document.createDocumentFragment();
    var vnode1 = h('div#root', 'Testing');
    var elm = patch(fragment, vnode1).elm;
    assert.equal(fragment.firstChild, elm);
    assert.equal(elm.id, 'root');
    assert.equal(elm.innerText, 'Testing');
  });
  it('patching a dom-fragment (single child)', function() {
    // when patching a dom-fragment with a single child, that element will be used for patching.
    var elm = document.createElement('div');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(elm);
    var vnode1 = h('div#root', 'Testing');
    var elm = patch(fragment, vnode1).elm;
    assert.equal(fragment.firstChild, elm);
    assert.equal(elm.id, 'root');
    assert.equal(elm.innerText, 'Testing');
  });
  it('patching a dom-fragment (multiple children)', function() {
    // when patching a dom-fragment with multiple children, all children except for the first will be removed, then that element will be used for patching.
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('div'));
    fragment.appendChild(document.createElement('div'));
    var vnode1 = h('div#root', 'Testing');
    var elm = patch(fragment, vnode1).elm;
    assert.equal(fragment.firstChild, elm);
    assert.equal(elm.id, 'root');
    assert.equal(elm.innerText, 'Testing');
  });
});