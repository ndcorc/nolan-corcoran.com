var refTagger = {
  settings: {
    bibleVersion: 'ESV',
  },
};

(function (d, t) {
  var n = d.querySelector('[nonce]');
  refTagger.settings.nonce = n && (n.nonce || n.getAttribute('nonce'));
  var g = d.createElement(t),
    s = d.getElementsByTagName(t)[0];
  g.src = 'https://api.reftagger.com/v2/RefTagger.js';
  g.nonce = refTagger.settings.nonce;
  s.parentNode.insertBefore(g, s);
})(document, 'script');
