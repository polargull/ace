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
    jqueryMap = {},
    updatePagerIcons, initGrid, setJqueryMap, initModule,
    grid_data =
  			[
  				{id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
  				{id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
  				{id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
  				{id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
  				{id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
  				{id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
  				{id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
  				{id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
  				{id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
  				{id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
  				{id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
  				{id:"12",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
  				{id:"13",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
  				{id:"14",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
  				{id:"15",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
  				{id:"16",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
  				{id:"17",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
  				{id:"18",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
  				{id:"19",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
  				{id:"20",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
  				{id:"21",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
  				{id:"22",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
  				{id:"23",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"}
  			];
  // 2.创建通用方法

  // 3.创建操作DOM相关方法
  setJqueryMap = function () {
    jqueryMap = {
        $window         : $(window),
        $document       : $(document),
        $grid_selector  : $('#grid-table'),
        $pager_selector : $('#grid-pager'),
        $parent_column  : $('#grid-table').closest('[class*="col-"]')
    };
  };
  initGrid = function () {
      jqueryMap.$window.on('resize.jqGrid', function () {
          jqueryMap.$grid_selector.jqGrid( 'setGridWidth', jqueryMap.$parent_column.width() );
      });

      //resize on sidebar collapse/expand
      jqueryMap.$document.on('settings.ace.jqGrid' , function( event_name ) {
          if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
              //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
              setTimeout(function() {
                  jqueryMap.$grid_selector.jqGrid( 'setGridWidth', jqueryMap.$parent_column.width() );
              }, 20);
          }
      });

      jqueryMap.$grid_selector.jqGrid({
          subGridRowExpanded: function (subgridDivId) {
              var subgridTableId = subgridDivId + "_t";
              $("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table>");
              $("#" + subgridTableId).jqGrid({
                  datatype: 'local',
                  colNames: ['No','Item Name','Qty'],
                  colModel: [
                      { name: 'id', width: 50 },
                      { name: 'name', width: 150 },
                      { name: 'qty', width: 50 }
                  ]
              });
          },
          data:grid_data,
          datatype: "local",
          height: 250,
          colNames:[' ', 'ID','Last Sales','Name', 'Stock', 'Ship via','Notes'],
          colModel:[
              {name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,
                  formatter:'actions',
                  formatoptions:{
                      keys:true,
                  }
              },
              {name:'id',index:'id', width:60, sorttype:"int", editable: true},
              {name:'sdate',index:'sdate',width:90, editable:true, sorttype:"date"},
              {name:'name',index:'name', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
              {name:'stock',index:'stock', width:70, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"}},
              {name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},
              {name:'note',index:'note', width:150, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}}
          ],
          viewrecords : true,
          rowNum:10,
          rowList:[10,20,30],
          pager : jqueryMap.$pager_selector,
          multiselect: true,
          loadComplete : function() {
              var table = this;
              setTimeout(function(){
                  updatePagerIcons(table);
              }, 0);
          },
          editurl: "./dummy.php",//nothing is saved
          caption: "jqGrid with inline editing",
      });
      jqueryMap.$window.triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
  };
  //replace icons with FontAwesome icons like above
  updatePagerIcons = function () {
    var replacement =
    {
        'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
        'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
        'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
        'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
        var
            icon = $(this),
            $class = $.trim(icon.attr('class').replace('ui-icon', ''));

        if(replacement.hasOwnProperty($class)) {
            icon.attr('class', 'ui-icon '+replacement[$class]);
        }
    });
  };
  // 4.创建事件处理
  // 5.创建公共方法
  initModule = function () {
    setJqueryMap();
    initGrid();
  };

  // 6.对外暴露公共方法
  return {
//    configModule  :  configModule,
    initModule    : initModule
  };
}());