                                                                                                       // ==UserScript==
// @name         ESI App Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dr Joel G Mathew, aka Droidzone
// @match        https://gateway.esic.in/Hospital/ClinicalRecords/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://code.jquery.com/jquery-3.3.1.min.js
// @grant    GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Tampermonkey user script loaded for ESI Web app");

    waitForKeyElements ("select#ddlQuantityUOM", actionFunction);


    function actionFunction (jNode) {
        //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
        // jNode.css ("background", "yellow"); // example


        var locn = window.location.href;
        console.log(locn);
        if (locn.includes("Hospital/ClinicalRecords/Prescriptions.aspx")) {
          console.log("Medicine selector has loaded fully.");
          // Add some elements
          var add_el= '<td align="left"><input name="buttnDefaults" value="Defaults" id="buttnDefaults" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';

          var add_OD= '<td><input name="buttnOD" value="OD" id="buttnOD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_BD= '<td><input name="buttnBD" value="BD" id="buttnBD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_TDS= '<td><input name="buttnTDS" value="TDS" id="buttnTDS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_MG= '<td><input name="buttnMG" value="mg" id="buttnMG" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_PUFF= '<td><input name="buttnPUFF" value="Puff" id="buttnPUFF" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';

          add_el = add_el + add_OD + add_BD + add_TDS;
          $( add_el ).insertBefore( "td>input#btnOK" );
          // $( add_MG ).insertAfter( "tr>td>select#ddlDrugDose" );
          $("tr>td>select#ddlDrugDose").parent().parent().append( "<tr>" + add_MG + add_PUFF + "</tr>");

          $('#buttnDefaults').bind('click', function() {
            console.log("Defaults..loading");
            $("#txtDrugDose").val("1");
            // Selecting No
            $("#ddlDrugDose").val("200");
            $("#txtDuration").val("30");
            // BD
            $("#ddlFrequency").val("28:2:3");
            $("#txtQuantity").val("60");
            $("#ddlQuantityUOM").val("200");
            $("#ddlAdminRoute").val("1");

          });
          $('#buttnOD').bind('click', function() {
            console.log("Defaults..loading");
            // OD
            $("#ddlFrequency").val("53:1:3");
          });
          $('#buttnBD').bind('click', function() {
            console.log("Defaults..loading");
            // OD
            $("#ddlFrequency").val("43:2:3");
          });
          $('#buttnTDS').bind('click', function() {
            console.log("Defaults..loading");
            // OD
            $("#ddlFrequency").val("120:3:3");
          });
          $('#buttnMG').bind('click', function() {
            console.log("Defaults..loading");
            // OD
            $("#ddlDrugDose").val("92");
          });

        }

        // var str = "Hello world, welcome to the universe.";
        // var n = str.includes("Hospital/ClinicalRecords/Prescriptions.aspx");


    }

    // fix for deprecated method in Chrome 37
  if (!window.showModalDialog) {

     window.showModalDialog = function (arg1, arg2, arg3) {

        var w;
        var h;
        var resizable = "no";
        var scroll = "no";
        var status = "no";

        // get the modal specs
        var mdattrs = arg3.split(";");
        for (i = 0; i < mdattrs.length; i++) {
           var mdattr = mdattrs[i].split(":");

           var n = mdattr[0];
           var v = mdattr[1];
           if (n) { n = n.trim().toLowerCase(); }
           if (v) { v = v.trim().toLowerCase(); }

           if (n == "dialogheight") {
              h = v.replace("px", "");
           } else if (n == "dialogwidth") {
              w = v.replace("px", "");
           } else if (n == "resizable") {
              resizable = v;
           } else if (n == "scroll") {
              scroll = v;
           } else if (n == "status") {
              status = v;
           }
        }

        var left = window.screenX + (window.outerWidth / 2) - (w / 2);
        var top = window.screenY + (window.outerHeight / 2) - (h / 2);
        console.log("Opening window with name:"+arg1);
        var targetWin = window.open(arg1, arg1, 'toolbar=no, location=no, directories=no, status=' + status + ', menubar=no, scrollbars=' + scroll + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

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

         function receiveMessage(event)
         {
             // Do we trust the sender of this message?  (might be
             // different from what we originally opened, for example).
             //if (event.origin !== "http://example.com")
             //    return;
             console.log("Message received from:"+event.origin);
             console.log("Received message is "+event.data);
             ShowMedsReceived(event.data);
             // event.source is popup
             // event.data is "hi there yourself!  the secret response is: rheeeeet!"
         }
         window.addEventListener("message", receiveMessage, false);

        targetWin.focus();
     };
  }
  var varhdnDoctorID = getQuerystring('DocID', '');
        var varHospitalid = getQuerystring('HospID', '');
        //  var varReloadFUP; //Date on 01-04-2014
       // var varReloadFUPS; //Date on 23-08-2014
        var varReloadFUP; //Date on 26-09-2014
        var varReloadFUP101114; //Date on 11-10-2014
        var varReloadFUP031114; //Date on 03-11-2014
        //This Key Should be renamed whenever a item name correction activity is corrected
        var browserName = "";
        function InvalidateCache() {

            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("opera") != -1) {
                browserName = "opera";
            } else if (ua.indexOf("msie") != -1) {
                browserName = "msie";
            } else if (ua.indexOf("safari") != -1) {
                browserName = "safari";
            } else if (ua.indexOf("mozilla") != -1) {
                if (ua.indexOf("firefox") != -1) {
                    browserName = "firefox";
                } else {
                    browserName = "mozilla";
                }
            }
            if (browserName != 'msie') {
                if (localStorage.getItem(varhdnDoctorID) != null) {
                    localStorage.removeItem(varhdnDoctorID);
                }
                BindMedicationFUPGrid();
            }
        }
        function getQuerystring(key, default_) {

            if (default_ == null) default_ = "";
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var qs = regex.exec(window.location.href);
            if (qs == null)
                return default_;
            else
                return qs[1];
        }

        function selectRecords() {

            getSelectedRows();
        }


        function getSelectedRows() {

            var xmlstring = "";
            var rdbCount = 0;
            var noofSelectedChecks = 0;
            var FUPResult = new Array();

            var selSize = 0;
            //Find the Table of Grid
            var tbodyElem = document.getElementById("grdFreMedicinePacks");
            var trElems = tbodyElem.getElementsByTagName("tr");

            var noofRows = trElems.length - 1;
            var rowindex = 0;
            for (chkElemindex = 1; chkElemindex < noofRows + 1; chkElemindex++) {
                //Find the check box Controls
                var chkElems1 = 'ChkSelect' + rowindex;
                var chkElems = document.getElementById(chkElems1);
                if (chkElems.checked) {
                    noofSelectedChecks = chkElemindex;
                    selSize++;
                    var rowCells;
                    //get the row no of radio buttonb clicked
                    var rowno = chkElems.value;
                    rowno++;
                    //Get the selected Row
                    rowCells = trElems[rowno].innerHTML;
                    FUPResult[selSize] = rowCells;
                }
                rowindex++;
            }

            if (noofSelectedChecks == 0) {
                alert("Please select an Item ");
                return false;
            }
            else {
                //declare object for return
                var vReturnValue = new Object();
                //Return String
                vReturnValue.Result = FUPResult;
                window.returnValue = vReturnValue;
                //Close Windows
                //window.close();
                console.log("Return value is "+vReturnValue);
                //window.opener.postMessage(true, FUPResult); //or false
                console.log("Window is closing");
                window.opener.postMessage(vReturnValue, window.location.href);
                //popup.postMessage("hello there!", "http://example.com");
                return;
            }
        }
    addJS_Node (getSelectedRows);

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}
})();
