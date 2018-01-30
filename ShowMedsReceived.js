// ==UserScript==
// @name         ShowMedsReceived
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://his.esic.in:6002/*
// @match        https://gateway.esic.in/Hospital/ClinicalRecords/Prescriptions.aspx*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('#btnDrug').off('click');
    $('#btnDrug').on('click', function() {
        /* Do stuff */
        //alert("Hikjacked");
    });


    function ShowMedsReceived(data) {
           var itemid = 0;
           var itemName = '';
           var genericid = 0;
           var genericName = '';
           var details = '';
           var startdate = formatDate(new Date(), "dd-mmm-yyyy hh:nn:ss tt");
           var grid = document.getElementById('gdvMedications');
           if (data != undefined) {
               //var tableID = document.getElementById('tblFUP');
               ClearTableRows('tblFUP');
               for (var i = 1; i < data.Result.length; i++) {
                   var trrow = "<TR>" + data.Result[i].toString() + "</TR>";
                   $("#tblFUP").append("<TR>" + data.Result[i].toString() + "</TR>");
               }
               var temptable = document.getElementById('tblFUP');
               for (var j = 1; j < temptable.rows.length; j++) {

                   if (temptable.rows[j].children[3].innerHTML == 0) {
                       var itemid = temptable.rows[j].children[1].innerHTML;
                       var itemName = temptable.rows[j].children[2].innerHTML;
                       var genericid = 0;
                       var genericName = '';
                   }
                   else if (temptable.rows[j].children[3].innerHTML == 1) {
                       var genericid = temptable.rows[j].children[1].innerHTML;
                       var genericName = temptable.rows[j].children[2].innerHTML;
                       var itemid = 0;
                       var itemName = '';
                   }

                   //                for (var k = 0; k < temptable.rows[j].children.Count; k++) {
                   //
                   //                }

                   var CurrentrowNo = grid.rows.length;

                   var varquantity = 0;
                   if (temptable.rows[j].children[12].innerHTML != '') {
                       varquantity = temptable.rows[j].children[12].innerHTML;
                   }
                   if (itemid.toString() != '0') {
                       details = 'Item:-' + itemName.toString() + '| Dose:-' + temptable.rows[j].children[7].innerHTML + '' + temptable.rows[j].children[5].innerHTML + '|frequency:-' + temptable.rows[j].children[8].innerHTML + '|Duration:-' + temptable.rows[j].children[10].innerHTML + '' + temptable.rows[j].children[22].innerHTML + '|Start from:-' + startdate.toString() + '|Route Of Admin:-' + temptable.rows[j].children[15].innerHTML + '|Qty:-' + varquantity + '' + temptable.rows[j].children[20].innerHTML + '|Schedule:-' + temptable.rows[j].children[14].innerHTML + '|Remarks:-' + temptable.rows[j].children[13].innerHTML;
                   }
                   else {
                       details = 'Generic:-' + genericName.toString() + '|' + 'Dose:-' + temptable.rows[j].children[7].innerHTML + '' + temptable.rows[j].children[5].innerHTML + '|frequency:-' + temptable.rows[j].children[8].innerHTML + '|Duration:-' + temptable.rows[j].children[10].innerHTML + '' + temptable.rows[j].children[22].innerHTML + '|Start from:-' + startdate.toString() + '|Route Of Admin:-' + temptable.rows[j].children[15].innerHTML + '|Qty:-' + varquantity + '' + temptable.rows[j].children[20].innerHTML + '|Schedule:-' + temptable.rows[j].children[14].innerHTML + '|Remarks:-' + temptable.rows[j].children[13].innerHTML;
                   }

                   $("#gdvMedications").append('<tr class="gridrowstyle" valign=top>'
                      + '<td><a id="' + 'btnEdit' + CurrentrowNo.toString() + '" onclick="EditMedication(this)" style="color: #0000FF;cursor: pointer;"  >Edit</a>' + '&nbsp;'
                      + '<a id="' + 'btnDeLete' + CurrentrowNo.toString() + '" onclick="DeleteMedicationItem(this)" style="color: #0000FF; cursor: pointer;"  >Delete</a>' + '&nbsp;'
                      + '<a id="' + 'btnUndo' + CurrentrowNo.toString() + '" onclick="UndoMedicationItem(this,1)" style="color: #0000FF; cursor: pointer; visibility : hidden;"  >Undo</a>'
                      + '</td><td>' + CurrentrowNo + '</td>'
                      + '<td  class="invisible">' + itemName.toString() + '</td><td  class="invisible">' + genericName.toString()
                      + '</td><td class="invisible">' + itemid.toString() + '</td><td class="invisible">' + genericid.toString() +
                      '</td><td class="invisible">' + temptable.rows[j].children[7].innerHTML + '</td><td class="invisible">' + temptable.rows[j].children[6].innerHTML
                      + '</td><td class="invisible">' + temptable.rows[j].children[10].innerHTML + '</td><td class="invisible">' + temptable.rows[j].children[11].innerHTML
                      + '</td><td>' + details.toString() + '</td><td class="invisible" >' + temptable.rows[j].children[9].innerHTML
                      + '</td><td class="invisible">' + temptable.rows[j].children[16].innerHTML + '</td><td class="invisible">' + startdate.toString()
                      + '</td><td class="invisible">' + varquantity.toString() + '</td><td class="invisible">' + temptable.rows[j].children[14].innerHTML
                      + '</td><td class="invisible">' + temptable.rows[j].children[13].innerHTML + '</td><td class="invisible">' + temptable.rows[j].children[15].innerHTML
                      + '</td><td class="invisible">' + temptable.rows[j].children[20].innerHTML + '</td><td class="invisible">' + temptable.rows[j].children[21].innerHTML
                      + '</td><td class="invisible">' + '0'
                      + '</td><td class="invisible">' + '0' + '</td><td class="invisible">' + '0' + '</td></tr>'
                      );
                   //                    alert(formatDate(new Date(), "dd-mmm-yyyy"));

               }
           }

         }
})();
