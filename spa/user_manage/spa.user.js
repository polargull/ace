/*
 * spa.user.list.js
 * user.list module for SPA
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, spa */

spa.user = (function () {
  var initModule = function ( $container ) {
    spa.user.list.initModule( $container );
  };

  return { initModule: initModule };
}());