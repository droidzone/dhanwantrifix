// ==UserScript==
// @name         Modify Investigations
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://his.esic.in:6002/Hospital/ClinicalRecords/Prescription_Investigation.aspx*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Inv page")
    var elementtoinsert = `
    <div style="padding: 3px;" align="left">
        <button id="btnUSSthyroid" style="font-weight:bold;background-repeat: repeat-x; background-color: #9c2821; height: 25px;
        width: 100px; padding: 3px; border: 0px; color: #FFF; font-size: 11px;">USS Thyroid</button>
          <button id="btnP1" style="font-weight:bold;background-repeat: repeat-x; background-color: #9c2821; height: 25px;
              width: 100px; padding: 3px; border: 0px; color: #FFF; font-size: 11px;">USS Neck</button>

      </div>
    `
    $("table.formlevel:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1)").after(elementtoinsert);
    $('body').on('click', '#btnUSSthyroid', function() {
      USSThyroid();
      return false;
    });

    function USSThyroid() {
      // SelectTestName($("#17507,273,7"))

      var ussthyroid_code = `<td><a id="btnEdit1" onclick="EditMedication(this)" style="color: #0000FF;cursor: pointer;">Edit</a>&nbsp;<a id="btnDeLete1" onclick="DeleteMedicationItem(this)" style="color: #0000FF;cursor: pointer;">Delete</a>&nbsp;<a id="btnUndo1" onclick="UndoMedicationItem(this)" style="color: #0000FF;cursor: pointer;visibility: hidden">Undo</a>&nbsp;</td><td>1</td><td class="invisible">17507</td><td class="invisible"></td><td>ULTRASONOGRAPHY-Thyroid-Without Contrast</td><td></td><td> </td><td><a id="btnIns1" onclick="showIns(17507)" style="color: #0000FF;" href="#">Instruction</a></td><td>Routine</td><td>18-Jan-2020 15:09:49 PM</td><td></td><td class="invisible">273</td><td class="invisible">0</td><td class="invisible">0</td><td class="invisible">0</td><td class="invisible">0</td>`

      $("#gdvInvestigations" ).append(ussthyroid_code);
      return
    }

    function SelectTestName(varControlID) {
        console.log("Hijacked actual contrils.")
        ClearMedicationControls();
        var x = varControlID.id.split(',');
        document.getElementById("hdnitemID").value = x[0];
        document.getElementById("hdnSpeciaID").value = x[1];
        document.getElementById("hdnRoutID").value = x[2];
        var targetControlID = document.getElementById('hdnTargetID').value;
        document.getElementById(targetControlID).value = varControlID.innerHTML;
        var divSystemList = document.getElementById("divSystemList");

        divSystemList.className = "AutoExtender";
        divSystemList.style.overflow = "scroll";
        divSystemList.style.overflowX = "hidden";
        divSystemList.style.visibility = 'hidden';

        if (document.getElementById("hdnitemID").value != '' && document.getElementById("hdnRoutID").value != "7") {
            var x = new AjaxServiceAdvice.Advice();
            var varhospitalid = document.getElementById("hdnHospitalid").value;
            //Changes on 27-Jan-2012
            //  x.GetSamples(parseInt(document.getElementById("hdnitemID").value), 100, varhospitalid, onSuccessLoadSamples, onErrorInves);
            //Changes on 27-Jan-2012
            LoadSamples(document.getElementById("hdnitemID").value);
        }

    }
})();
