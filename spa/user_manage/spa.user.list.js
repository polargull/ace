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

spa.user.list = (function () {
  // 1.声明初始化作用域变量 configMap用于模块配置, stateMap保存运行时状态值, jqueryMap缓存JQuery集合
  var
    configMap = {
        html : String()
        + '<div class="row">'
        + '    <div class="col-xs-12">'
        + '        <form class="form-inline">'
        + '            <button class="btn btn-success btn-sm">'
        + '                <i class="glyphicon glyphicon-plus"></i>'
        + '            </button>'
        + '            <input type="text" class="input-medium" placeholder="用户名" />'
        + '            <button type="button" class="btn btn-info btn-sm">'
        + '                <i class="bigger-110"></i>查询'
        + '            </button>'
        + '        </form>'
        + '        <div class="space-6"></div>'
        + '        <table id="grid-table"></table>'
        + '        <div id="grid-pager"></div>'
        + '    </div>'
        + '</div>'
    },
    stateMap = { $page_content : null },
    jqueryMap = {},
    updatePagerIcons, initGrid, setJqueryMap, initModule;
  // 2.创建通用方法

  // 3.创建操作DOM相关方法
  setJqueryMap = function () {
    var $page_content = stateMap.$page_content;
    jqueryMap = {
        $window         : $(window),
        $document       : $(document),
        $page_content   : $page_content,
        $grid_selector  : $('#grid-table'),
        $parent_column  : $('#grid-table').closest('[class*="col-"]'),
        $pager_selector : $('#grid-pager')
    };
  };
  initGrid = function () {
      jqueryMap.$window.on('resize.jqGrid', function () {
          jqueryMap.$grid_selector.jqGrid( 'setGridWidth', jqueryMap.$parent_column.width() );
      });

      //resize on sidebar collapse/expand
      jqueryMap.$document.on('settings.ace.jqGrid' , function( ev, event_name, collapsed ) {
          console.debug(ev, collapsed);
          if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
              setTimeout(function() {
                  jqueryMap.$grid_selector.jqGrid( 'setGridWidth', jqueryMap.$parent_column.width() );
              }, 20);
          }
      });

      jqueryMap.$grid_selector.jqGrid({
          url          : 'spa/user_manage/data.json',
          datatype     : "json",
          height       : 350,
          colNames     : [ ' ', 'ID', '用户名', '实名', '状态', '创建时间', '更新时间' ],
          viewrecords  : true,
          rowNum       : 10,
          rowList      : [ 10, 20, 30 ],
          pager        : jqueryMap.$pager_selector,
          multiselect  : true,
          editurl      : "./dummy.php",
          loadComplete : function() {
              setTimeout(function() {
                  updatePagerIcons();
              }, 0);
          },
          colModel     : [
            {name:'myac',index:'', width:80, fixed:true, resize:false,
                formatter:'actions',
                formatoptions:{
                    keys:true,
                }
            },
            { name:'id',   index:'id',    width:60 },
            { name:'sdate',index:'sdate', width:90 },
            { name:'name', index:'name',  width:150},
            { name:'stock',index:'stock', width:70 },
            { name:'ship', index:'ship',  width:90 },
            { name:'note', index:'note',  width:150}
          ]
      });
      jqueryMap.$window.triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
  };
  //replace icons with FontAwesome icons like above
  updatePagerIcons = function () {
    var
        replacement = {
        'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
        'ui-icon-seek-prev'  : 'ace-icon fa fa-angle-left bigger-140',
        'ui-icon-seek-next'  : 'ace-icon fa fa-angle-right bigger-140',
        'ui-icon-seek-end'   : 'ace-icon fa fa-angle-double-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
        var
            icon = $(this),
            $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        if (replacement.hasOwnProperty($class)) {
            icon.attr('class', 'ui-icon '+replacement[$class]);
        }
    });
  };
  // 4.创建事件处理
  // 5.创建公共方法
  initModule = function ( $container ) {
    stateMap.$page_content = $container;
    $container.html( configMap.html );
    setJqueryMap();
    initGrid();
  };

  // 6.对外暴露公共方法
  return {
//    configModule  :  configModule,
    initModule    : initModule
  };
}());