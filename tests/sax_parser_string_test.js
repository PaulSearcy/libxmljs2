include('helpers.js');

var callbacks = callbackTest;
var parser = new libxml.createSAXParser(function(cb) {
  function argsToArray(args) {
    var ary = [];
    for (i = 0; i < args.length; i++)
      ary.push(args[i]);
    return ary;
  };

  cb.onStartDocument(function() {
    callbacks.startDocument.push(argsToArray(arguments));
  });

  cb.onEndDocument(function() {
    callbacks.endDocument.push(argsToArray(arguments));
  });

  cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
    callbacks.startElementNS.push(argsToArray(arguments));    
  });

  cb.onEndElementNS(function(elem, prefix, uri) {
    callbacks.endElementNS.push(argsToArray(arguments));
  });

  cb.onCharacters(function(chars) {
    callbacks.characters.push(argsToArray(arguments));
  });

  cb.onCdata(function(cdata) {
    callbacks.cdata.push(argsToArray(arguments));
  });

  cb.onComment(function(msg) {
    callbacks.comment.push(argsToArray(arguments));
  });

  cb.onWarning(function(msg) {
    callbacks.warning.push(argsToArray(arguments));
  });

  cb.onError(function(msg) {
    callbacks.error.push(argsToArray(arguments));
  });
});

parser.parseString(
  '<?xml-warning?>'+
  '<error>'+
  '<stream:stream xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams" to="example.com" version="1.0">'+
    '<!-- comment -->'+
    '<message type="chat" to="n@d" from="n@d/r" id="id1">'+
      '<![CDATA[ some cdata ]]>'+
      '<body>exit</body>'+
      '<html xmlns="http://jabber.org/protocol/xhtml-im">'+
        '<body xmlns="http://www.w3.org/1999/xhtml">exit</body>'+
      '</html>'+
    '</message>'+
    '<stream:prefixed />'+
  '</stream:stream>'
);
assertEquals(JSON.stringify(callbackControl), JSON.stringify(callbacks));
// 
// var callbacks = callbackTest;
// parser.parseFile('fixtures/sax_parser_test.xml');
// assertEquals(callbackControl, callbacks);