// ==UserScript==
// @name         ESI App Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dr Joel G Mathew, aka Droidzone
// @match        https://gateway.esic.in/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://code.jquery.com/jquery-3.3.1.min.js
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Tampermonkey user script loaded for ESI Web app");

    waitForKeyElements ("select#ddlQuantityUOM", actionFunction);
    function ddlFrequency_OnChange() {
      var ddlFrequency = document.getElementById("ddlFrequency");
      var ddlFrequencySelectedValue = ddlFrequency.options[ddlFrequency.selectedIndex].value;
      var arrFrequencySelectedValue = ddlFrequencySelectedValue.split(':');
      if (arrFrequencySelectedValue.length != 0) {
          document.getElementById("hdnFrequencyID").value = arrFrequencySelectedValue[0]
          _selectedFrequencyId = arrFrequencySelectedValue[0];
          _selectedFrequencyQty = arrFrequencySelectedValue[1];
          _selectedFrequencyUOMId = arrFrequencySelectedValue[2];
      }
      CalculateTotalStrength();
      return false;
    }

    function CalculateTotalStrength() {
          if (document.getElementById("ddlDuration").selectedIndex != '-1') {
              document.getElementById("hdnDurationID").value = document.getElementById("ddlDuration").options[document.getElementById("ddlDuration").selectedIndex].value;
          }
          else {
              alert('Select Duration')
              return false;
          }
          if (document.getElementById("ddlDuration").selectedIndex != '-1') {
              document.getElementById("hdnDurationText").value = document.getElementById("ddlDuration").options[document.getElementById("ddlDuration").selectedIndex].text;
          }
          else {
              alert('Select Duration')
              return false;
          }
          // document.getElementById("hdnDrugdoseID").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].value;
          if (document.getElementById("ddlDrugDose").selectedIndex != '-1') {
              document.getElementById("hdnDrugdoseID").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].value;
          }
          else {
              alert('Select Dose')
              return false;
          }
          if (document.getElementById("ddlDrugDose").selectedIndex != '-1') {
              document.getElementById("hdnDrugdoseText").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].text;
          }
          else {
              alert('Select Dose')
              return false;
          }

          var txtDuration = document.getElementById("txtDuration");
          var txtDose = document.getElementById("txtDrugDose");
          var ddlDose = document.getElementById("ddlDrugDose");
          var ddlQuantityUOM = document.getElementById("ddlQuantityUOM");
          var ddlDuration = document.getElementById("ddlDuration");
          var txtQuantity = document.getElementById("txtQuantity");
          var DrugDetails = document.getElementById("DrugDetails");

          var duration = 0, enteredDoseValue = 0, dayDose = 0;
          if (txtDuration.value != '') {
              duration = parseFloat(txtDuration.value);
          }
          if (txtDose.value != '') {
              enteredDoseValue = parseFloat(txtDose.value);
          }
          if (_selectedFrequencyQty != 0) {
              dayDose = _selectedFrequencyQty * enteredDoseValue * duration;
              ddlDuration.value = _selectedFrequencyUOMId;
              document.getElementById("hdnDurationID").value = _selectedFrequencyUOMId;

              for (i = 0; i < ddlDuration.length; i++) {

                  if (ddlDuration.options[i].value == _selectedFrequencyUOMId) {
                      document.getElementById("hdnDurationText").value = ddlDuration.options[i].text;
                      break;
                  }
              }
              ddlDuration.disabled = true;
          }
          else {
              ddlDuration.disabled = false;
          }
          if (isNaN(dayDose) || dayDose == undefined || dayDose == 0) {
              document.getElementById("txtQuantity").value = '';
          }
          else {
              if (DrugDetails.value != '' && DrugDetails != undefined) {

                  var arrDrugDetails = DrugDetails.value.split(':');
                  if (arrDrugDetails.length != 0) {
                      _strengthUOMID = arrDrugDetails[0];
                      _uom = arrDrugDetails[1];
                      _strength = arrDrugDetails[2];
                      _uomtype = arrDrugDetails[3];
                      _Quantity = arrDrugDetails[4];
                      _QtyUomID = arrDrugDetails[5];
                      _QtyUOM = arrDrugDetails[6];

                      if (_Quantity != 0 && _Quantity != undefined) {
                          dayDose = dayDose / _strength;
                          document.getElementById("txtQuantity").value = Math.round(dayDose);
                          document.getElementById("ddlQuantityUOM").value = _QtyUomID;
                          document.getElementById("hdnQuanID").value = _QtyUomID;

                          for (i = 0; i < ddlQuantityUOM.length; i++) {

                              if (ddlQuantityUOM.options[i].value == _QtyUomID) {
                                  document.getElementById("hdnQuanText").value = ddlQuantityUOM.options[i].text;
                                  break;
                              }
                          }

                      }
                      else {
                          document.getElementById("txtQuantity").value = Math.round(dayDose);
                          if (ddlDose.options[ddlDose.selectedIndex].value != 0) {
                              document.getElementById("ddlQuantityUOM").value = ddlDose.options[ddlDose.selectedIndex].value;
                              document.getElementById("hdnQuanID").value = ddlDose.options[ddlDose.selectedIndex].value;
                              for (i = 0; i < ddlQuantityUOM.length; i++) {

                                  if (ddlQuantityUOM.options[i].value == document.getElementById("hdnQuanID").value) {
                                      document.getElementById("hdnQuanText").value = ddlQuantityUOM.options[i].text;
                                      break;
                                  }
                              }
                          }
                          else {
                              document.getElementById("ddlQuantityUOM").innerText = '';
                          }
                      }

                  }

              }
              //                else {
              //                    document.getElementById("PrescriptionContainer_tbpnlMedications_txtQuantity").value = dayDose;
              //                    if (ddlDose.options[ddlDose.selectedIndex].value != 0) {
              //                        document.getElementById("PrescriptionContainer_tbpnlMedications_ddlQuantityUOM").value = ddlDose.options[ddlDose.selectedIndex].value;
              //                    }
              //                    else {
              //                        document.getElementById("PrescriptionContainer_tbpnlMedications_ddlQuantityUOM").innerText = '';
              //                    }
              //                }
          }

          return false;
        }



    function actionFunction (jNode) {
        //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
        var locn = window.location.href;
        console.log(locn);
        if (locn.includes("Hospital/ClinicalRecords/Prescriptions.aspx")) {
          console.log("Medicine selector has loaded fully.");
          // Add some elements
          var add_el= '<td align="left"><input name="buttnDefaults" value="Defaults" id="buttnDefaults" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_OD= '<td><input name="buttnOD" value="OD" id="buttnOD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_BD= '<td><input name="buttnBD" value="BD" id="buttnBD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_TDS= '<td><input name="buttnTDS" value="TDS" id="buttnTDS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_SOS= '<td><input name="buttnSOS" value="SOS" id="buttnSOS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Stat= '<td><input name="buttnStat" value="Stat" id="buttnStat" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_HS= '<td><input name="buttnHS" value="HS" id="buttnHS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_NO= '<td><input name="buttnNO" value="No" id="buttnNO" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_MG= '<td><input name="buttnMG" value="mg" id="buttnMG" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_PUFF= '<td><input name="buttnPUFF" value="Puff" id="buttnPUFF" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Before= '<td><input name="buttn_Before" value="Before" id="buttn_Before" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_After= '<td><input name="buttn_After" value="After" id="buttn_After" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Inhal= '<td><input name="buttn_Inhal" value="Inhal" id="buttn_Inhal" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_IM= '<td><input name="buttn_Injn" value="IM" id="buttn_Injn_IM" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_IV= '<td><input name="buttn_Injn" value="IV" id="buttn_Injn_IV" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          // add_el = add_el + add_OD + add_BD + add_TDS;
          $("td>input#btnOK").parent().parent().prepend( add_el );
          // $( add_el ).insertBefore( "td>input#btnOK" );
          $("tr>td>select#ddlDrugDose").parent().parent().append( "<tr>" + add_NO + add_MG + add_PUFF + "</tr>");
          var add_Durn = '<td><input name="buttn5D" value="5D" id="buttn5D" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>'+
                         '<td><input name="buttn2W" value="2W" id="buttn2W" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>'+
                         '<td><input name="buttn1M" value="1M" id="buttn1M" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          $("tr>td>select#ddlDuration").parent().parent().append( "<tr>" + add_Durn + "</tr>");
          $("tr>td>select#ddlFrequency").parent().append( "<tr>" + add_OD +  add_BD + add_TDS + add_HS + add_SOS + add_Stat + "</tr>");
          $("input#txtSchedule").parent().append( "<tr>" + add_Before +  add_After  + "</tr>");

          $("tr>td>select#ddlAdminRoute").parent().append( "<tr>" + add_Inhal +  add_IM  + add_IV + "</tr>");



          $('#buttnDefaults').bind('click', function() {
            $("#txtDuration").prop('disabled', false);
              $("#ddlDuration").prop('disabled', false);

            $("#txtDrugDose").val("1");
            $("#ddlDrugDose").val("200");
            $("#txtDuration").val("30");
            $("#ddlFrequency").val("28:2:3");
            $("#txtQuantity").val("60");
            $("#ddlQuantityUOM").val("200");
            $("#ddlAdminRoute").val("1");
          });
          $('#buttn5D').bind('click', function() {
            $("#txtDuration").val("5");
            $("#ddlDuration").val("3");
            $("#ddlDuration").prop('disabled', false);
            CalculateTotalStrength();
          });
          $('#buttn_Inhal').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("105");
          });
          $('#buttn_Injn_IM').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("43");
          });
          $('#buttn_Injn_IV').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("107");
          });


          $('#buttn2W').bind('click', function() {
            $("#txtDuration").val("14");
            $("#ddlDuration").val("3");
            $("#ddlDuration").prop('disabled', false);
            CalculateTotalStrength();
          });
          $('#buttn1M').bind('click', function() {
            $("#txtDuration").val("30");
            $("#ddlDuration").val("3");
            CalculateTotalStrength();
            $("#ddlDuration").prop('disabled', false);
          });

          $('#buttn_Before').bind('click', function() {
            $("#txtRemarks").val("Before food");
          });
          $('#buttn_After').bind('click', function() {
            $("#txtRemarks").val("After food");
          });


          $('#buttnOD').bind('click', function() {
            $("#ddlFrequency").val("53:1:3");
            ddlFrequency_OnChange();
          });
          $('#buttnBD').bind('click', function() {
            $("#ddlFrequency").val("43:2:3");
            ddlFrequency_OnChange();
          });
          $('#buttnTDS').bind('click', function() {
            $("#ddlFrequency").val("120:3:3");
            ddlFrequency_OnChange();
          });
          $('#buttnHS').bind('click', function() {
            $("#ddlFrequency").val("128:1:3");
            ddlFrequency_OnChange();
          });
          $('#buttnSOS').bind('click', function() {
            $("#ddlFrequency").val("118:0:0");
            CalculateTotalStrength();

          });
          $('#buttnStat').bind('click', function() {
            $("#ddlFrequency").val("119:1:3");

            // $("#txtQuantity").val("1");
            var valseld = $("#txtDrugDose").val();
            var unitseld = $("#ddlDrugDose option:selected").text();
            $("#ddlQuantityUOM option:selected").text(unitseld);
            $("#txtQuantity").val(valseld);

            // CalculateTotalStrength();
          });



          $('#buttnMG').bind('click', function() {
            $("#ddlDrugDose").val("92");
          });
          $('#buttnNO').bind('click', function() {
            $("#txtDrugDose").val("1");
            $("#ddlDrugDose").val("200");
            CalculateTotalStrength();
          });

          $('#buttnPUFF').bind('click', function() {
            // OD
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("105");
          });
        }
    }

console.log("Fix deprecated function");
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
         window.addEventListener("message", receiveMessage, false);

        targetWin.focus();
     };
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
