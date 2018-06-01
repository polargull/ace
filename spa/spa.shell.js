/*
 * spa.shell.js
 * Shell module for SPA
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, spa */

spa.shell = (function () {
  var initModule = function ( $container ) {
    alert('shell_' + $container.attr('class'));
    spa.user.initModule();
  };

  return { initModule: initModule };
}());