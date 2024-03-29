// ==UserScript==
// @name         ESI App Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @grant          GM_addStyle
// @author       Dr Joel G Mathew, aka Droidzone
// @match        https://gateway.esic.in/*
// @match        http://his.esic.in:6002/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://code.jquery.com/jquery-3.5.1.min.js
// @grant    none
// ==/UserScript==
// function GM_addStyle(css) {
  // const style = document.getElementById("GM_addStyleBy8626") || (function() {
    // const style = document.createElement('style');
    // style.type = 'text/css';
    // style.id = "GM_addStyleBy8626";
    // document.head.appendChild(style);
    // return style;
  // })();
  // const sheet = style.sheet;
  // sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
// }


(function() {
    'use strict';
	if(!window.jQuery) {
		console.log(`jQuery could not be loaded!`);
	} else {
		console.log(`jQuery loaded successfully..`);
	}
	
	function addCss(cssString) {
		var head = document.getElementsByTagName('head')[0];
		var newCss = document.createElement('style');
		newCss.type = "text/css";
		newCss.innerHTML = cssString;
		head.appendChild(newCss);
	}


    // Your codhere...
    console.log("Tampermonkey user script loaded for ESI Web app");
	//Inserting code in Medicine module
    console.log("Inserting code in Medicine module");
    waitForKeyElements ("select#ddlQuantityUOM", actionFunction);
    waitForKeyElements ("#ctl00_cphpage_tblforOP", ModifyOPCaseSheet);
	
	addCss(".btnspljoel { background-color: #5653ac !important; } /* CSS etc, etc */");
	$(".menu").css('background-image', 'none');
	$(".menu").css('background-color', 'rgb(10, 134, 117)');
	// tr.menu > td:nth-child(1) > img:nth-child(1)
	$("tr.menu td:nth-child(1) img:nth-child(1)").removeAttr('src')
	$("tr.menu td:nth-child(1) img:nth-child(1)").show();
	
	$("tr.menu td:nth-child(4) img:nth-child(1)").removeAttr('src')
	$("tr.menu td:nth-child(4) img:nth-child(1)").show();

	$('.gridrowstyle').removeAttr("style");
	$('.gridalterstyle').removeAttr("style");
	$('.gridalterstyle').css('background-color', '#baddc9;');
	$('.gridrowstyle').css('background-color', '#baddc9;');
	$('.gridrowstyle').show();
	
	addCss(".gridrowstyle { background-color: #baddc9 !important; } /* CSS etc, etc */");
	addCss(".gridalterstyle { background-color: #88c3df !important; } /* CSS etc, etc */");
	
	$("#ctl00_ImageButton1").removeAttr('src')
	
	// $(".maincontent h1").css('background', '');
	// $(".maincontent").css('background', 'none');
	// $(".maincontent").css('background-color', 'rgb(10, 134, 117)');
	$(".maincontent h1").css('background', 'none');
	
	addCss(".gridheader { background-color: #cdc2f2 !important; } /* CSS etc, etc */");
	$('tr.gridheader').show();
	
	$(".maincontent h1:nth-child(2)").css('background', '');
	addCss(".maincontent h1{ background: ''; }");
	
	$("#header .logo").css('background', 'none');
	$("#header .logo").css('background-image', 'url("https://m.media-amazon.com/images/I/7187xwhSDcL._SX679_.jpg")');
	
    function ModifyOPCaseSheet() {
        console.log("Modifying case sheet");
        var elementtoinsert = `

            <button id="btnDiag" class="btnNormal link-to-btn btnspljoel">Diag</button>
              <button id="btnP1" class="btnNormal link-to-btn btnspljoel">P1</button>
              <button id="btnInv" class="btnNormal link-to-btn btnspljoel">Tests</button>
			  <button id="btnWorkList" class="btnNormal link-to-btn btnspljoel">Worklist</button>


        `

        // $("table.formlevel:nth-child(10)").before(elementtoinsert)
		
		$("#ctl00_cphpage_Panel13").before(elementtoinsert)
		console.log("Element inserted now")
		
		
	


        $('body').on('click', '#btnP1', function() {
			
			var p1link = $('a:contains("DIAGNOSIS")').attr('href');
			console.log(`p1link for P1 element is `, p1link)
			var win = window.open(p1link, '_blank');
			win.focus();

			// OpenDesignatedLink("ctl00_cphpage_trvSectionst16")
		  return
        });

        $('body').on('click', '#btnDiag', function() {
          OpenDesignatedLink("ctl00_cphpage_trvSectionst8")
		  return
        });




        $('body').on('click', '#btnInv', function() {
          OpenDesignatedLink("ctl00_cphpage_trvSectionst12")
		  return
        });

		$('body').on('click', '#btnWorkList', function() {
          var worklist_link = $("html body div#wrapper form#aspnetForm div#ctl00_updatepanelmain div.menu table tbody tr.menu td div#ctl00_menupanel div#ctl00_Menu1n3Items.ctl00_Menu1_0.IE8Fix.ctl00_Menu1_7 table tbody tr#ctl00_Menu1n9 td table.ctl00_Menu1_6 tbody tr td div.dmenu ul.d1menubar li a")[2];

			console.log(`worklist link is ${worklist_link}`);

			var win = window.open(worklist_link, '_self');
			win.focus();

        });


    }

    function OpenDesignatedLink(tag) {
      var p1link = $("#" + tag).attr('href')

      var matches = p1link.match(/\((.*?)\)/);

      if (matches) {
          p1link = matches[1];
          p1link = p1link.split(",");
          p1link = p1link[0]
          p1link = p1link.substring(1);
          p1link = p1link.slice(0,-1)
      }
      console.log(`Link is ${p1link}`)
      var win = window.open(p1link, '_blank');
      win.focus();
    }

    function ddlFrequency_OnChange() {
      var ddlFrequency = document.getElementById("ddlFrequency");
      var ddlFrequencySelectedValue = ddlFrequency.options[ddlFrequency.selectedIndex].value;
      var arrFrequencySelectedValue = ddlFrequencySelectedValue.split(':');
      if (arrFrequencySelectedValue.length != 0) {
          document.getElementById("hdnFrequencyID").value = arrFrequencySelectedValue[0];
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
              // alert('Select Duration');
              return false;
          }
          if (document.getElementById("ddlDuration").selectedIndex != '-1') {
              document.getElementById("hdnDurationText").value = document.getElementById("ddlDuration").options[document.getElementById("ddlDuration").selectedIndex].text;
          }
          else {
              // alert('Select Duration');
              return false;
          }
          // document.getElementById("hdnDrugdoseID").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].value;
          if (document.getElementById("ddlDrugDose").selectedIndex != '-1') {
              document.getElementById("hdnDrugdoseID").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].value;
          }
          else {
              alert('Select Dose');
              return false;
          }
          if (document.getElementById("ddlDrugDose").selectedIndex != '-1') {
              document.getElementById("hdnDrugdoseText").value = document.getElementById("ddlDrugDose").options[document.getElementById("ddlDrugDose").selectedIndex].text;
          }
          else {
              alert('Select Dose');
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
          }

          return false;
        }

	function UnlockAll() {
		$("#txtDuration").prop('disabled', false);
		$("#ddlDrugDose").prop('disabled', false);
		$("#txtDrugDose").prop('disabled', false);
		$("#ddlDuration").prop('disabled', false);
		$("#txtQuantity").prop('disabled', false);
		$("#ddlQuantityUOM").prop('disabled', false);
		$("#txtDuration").prop('disabled', false);
        $("#txtDuration").removeAttr("disabled");
        $("#ddlDrugDose").removeAttr("disabled");
        $("#txtDrugDose").removeAttr("disabled");
        $("#ddlDuration").removeAttr("disabled");
        $("#txtQuantity").removeAttr("disabled");
        $("#ddlQuantityUOM").removeAttr("disabled");
        RemoveOnChange();
	}

  function RemoveOnChange() {
    $("#txtDuration").off('change');
		$("#ddlDrugDose").off('change');
		$("#txtDrugDose").off('change');
		$("#ddlDuration").off('change');
		$("#txtQuantity").off('change');
		$("#ddlQuantityUOM").off('change');
		$("#txtDuration").off('change');
    $("#ddlDuration").replaceWith('<select name="ddlDuration" id="ddlDuration" class="dropdown" style="width: 105px;"><option value="3">Days</option><option value="4">Hours</option><option value="5">Minutes</option><option value="2">Months</option><option value="6">Seconds</option><option value="7">Weeks</option><option value="1">Years</option></select>');
    $("#txtDrugDose").replaceWith('<input name="txtDrugDose" maxlength="5" id="txtDrugDose" class="textboxname" style="width:35px;" type="text">');

    $("#ddlDrugDose").replaceWith(`<select name="ddlDrugDose" id="ddlDrugDose" style="width: 110px;">
       <option value="0">--Select--</option>
       <option value="200">No(s)</option>
       <option value="92">mg</option>
       <option value="120">ml</option>
       <option value="403">mcg (microgram)</option>
       <option value="484">Ampoule(s)</option>
       <option value="540">Vial(s)</option>
       <option value="488">Bottle(s)</option>
       <option value="183">Capsule(s)</option>
       <option value="491">Cartridge(s)</option>
       <option value="494">Dose(s)</option>
       <option value="496">Drop(s)</option>
       <option value="390">gm</option>
       <option value="404">IU</option>
       <option value="512">mg %</option>
       <option value="523">Penfill(s)</option>
       <option value="591">Spray</option>
       <option value="213">Tablet(s)</option>
       <option value="594">Teaspoon</option>
    </select>`);

    $("#ddlFrequency").replaceWith(`<select name="ddlFrequency" id="ddlFrequency" class="dropdown">
        <option value="0">Select</option>
        <option value="43:2:3">BD - 2 times a day</option>
        <option value="53:1:3">OD - Once a Day</option>
        <option value="107:4:3">QID - 4 times a day</option>
        <option value="118:0:0">SOS - As and when necessary</option>
        <option value="119:1:3">Stat - Now</option>
        <option value="120:3:3">TDS - 3 times a day</option>
        <option value="128:1:3">HS - Once at night</option>
    </select>`);
  }


    function actionFunction (jNode) {
        //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
        console.log("actionFunction loading");
        var locn = window.location.href;
        console.log(locn);
        if (locn.includes("Hospital/ClinicalRecords/Prescriptions.aspx")) {
          console.log("Medicine selector has loaded fully.");
          // Add some elements
          var add_el= '<td align="left"><input name="buttnDefaults" value="Defaults" id="buttnDefaults" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_unlock= '<td align="left"><input name="btnUnlockAll" value="Unlock All" id="btnUnlockAll" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_OD= '<td><input name="buttnOD" value="OD" id="buttnOD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_BD= '<td><input name="buttnBD" value="BD" id="buttnBD" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_TDS= '<td><input name="buttnTDS" value="TDS" id="buttnTDS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_SOS= '<td><input name="buttnSOS" value="SOS" id="buttnSOS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Stat= '<td><input name="buttnStat" value="Stat" id="buttnStat" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_HS= '<td><input name="buttnHS" value="HS" id="buttnHS" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_NO= '<td><input name="buttnNO" value="No" id="buttnNO" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_ml= '<td><input name="buttnML" value="mL" id="buttnML" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_NO1= '<td><input name="buttnNO1" value="No" id="buttnNO1" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_TAB= '<td><input name="buttnTab" value="Tab" id="buttnTab" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_MG= '<td><input name="buttnMG" value="mg" id="buttnMG" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_PUFF= '<td><input name="buttnPUFF" value="Puff" id="buttnPUFF" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Before= '<td><input name="buttn_Before" value="Before" id="buttn_Before" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_After= '<td><input name="buttn_After" value="After" id="buttn_After" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Oral= '<td><input name="buttn_add_Oral" value="Oral" id="buttn_Oral" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Inhal= '<td><input name="buttn_Inhal" value="Inhal" id="buttn_Inhal" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_Subcut= '<td><input name="buttn_Subcut" value="Subcut" id="buttn_Subcut" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_IM= '<td><input name="buttn_Injn" value="IM" id="buttn_Injn_IM" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_IV= '<td><input name="buttn_Injn" value="IV" id="buttn_Injn_IV" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_q10= '<td><input name="btn10" value="10" id="btn10" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_q15= '<td><input name="btn15" value="15" id="btn15" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_q30= '<td><input name="btn30" value="30" id="btn30" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_q45= '<td><input name="btn45" value="45" id="btn45" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          var add_q60= '<td><input name="btn60" value="60" id="btn60" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          // add_el = add_el + add_OD + add_BD + add_TDS;
          $("#lblSchedule").parent().parent().hide();
          $("#PrescriptionContainer_tbpnlMedications_Label66").parent().parent().hide();
          $("td>input#btnOK").parent().parent().prepend( add_el + add_unlock);
          $("tr>td>select#ddlQuantityUOM").parent().parent().append( "<tr>" + add_q10 + add_q15 + add_q30 + add_q45 + add_q60 + add_NO1 +  add_TAB + "</tr>");
          $("input#txtRemarks").parent().parent().append( "<tr>" + add_Before +  add_After  + "</tr>");

          // $( add_el ).insertBefore( "td>input#btnOK" );
          $("tr>td>select#ddlDrugDose").parent().parent().append( "<tr>" + add_NO + add_MG + add_ml + add_PUFF + "</tr>");
          var add_Durn = '<td><input name="buttn5D" value="5D" id="buttn5D" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>'+
                         '<td><input name="buttn2W" value="2W" id="buttn2W" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>'+
                         '<td><input name="buttn1M" value="1M" id="buttn1M" style="background-repeat: repeat-x; background-color: #9c2821; height: 25px; width: 47px; padding: 3px; border: 0px; color: #fff; font-size: 11px;cursor: pointer;" type="button"></td>';
          $("tr>td>select#ddlDuration").parent().parent().append( "<tr>" + add_Durn + "</tr>");
          $("tr>td>select#ddlFrequency").parent().append( "<tr>" + add_OD +  add_BD + add_TDS + add_HS + add_SOS + add_Stat + "</tr>");


          $("tr>td>select#ddlAdminRoute").parent().append( "<tr>" + add_Oral + add_Inhal +  add_Subcut + add_IM  + add_IV + "</tr>");


		UnlockAll();
            $('#btnUnlockAll').bind('click', function() {
              UnlockAll();
              // RemoveOnChange();
            });

            $('#btn10').bind('click', function() {
              UnlockAll();
              $("#txtQuantity").val(10);
            });
            $('#btn15').bind('click', function() {
              UnlockAll();
              $("#txtQuantity").val(15);
            });
            $('#btn30').bind('click', function() {
              UnlockAll();
              $("#txtQuantity").val(30);
            });
            $('#btn45').bind('click', function() {
              UnlockAll();
              $("#txtQuantity").val(45);
            });
            $('#btn60').bind('click', function() {
              UnlockAll();
              $("#txtQuantity").val(60);
            });

          $('#buttnDefaults').bind('click', function() {
            UnlockAll();

            $("#txtDrugDose").val("1");
            $("#ddlDrugDose").val("200");
            $("#txtDuration").val("30");
            $("#ddlFrequency").val("43:2:3");
            $("#txtQuantity").val("60");
            $("#ddlQuantityUOM").val("200");
            $("#ddlAdminRoute").val("1");
          });
          $('#buttn5D').bind('click', function() {
            $("#txtDuration").val("5");
            $("#ddlDuration").val("3");
            UnlockAll();
            CalculateTotalStrength();
          });
		  $('#buttnTab').bind('click', function() {
            $("#ddlQuantityUOM").val("213");
            UnlockAll();
            CalculateTotalStrength();
          });


          $('#buttn_Inhal').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("105");
			         UnlockAll();
          });
          $('#buttn_Subcut').bind('click', function() {
            $("#ddlAdminRoute").val("41");
            UnlockAll();
          });

          $('#buttn_Oral').bind('click', function() {
            $("#ddlAdminRoute").val("26");
               UnlockAll();
          });

          $('#buttn_Injn_IM').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("43");
			UnlockAll();
          });
          $('#buttn_Injn_IV').bind('click', function() {
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("107");
			UnlockAll();
          });


          $('#buttn2W').bind('click', function() {
            $("#txtDuration").val("14");
            $("#ddlDuration").val("3");
            $("#ddlDuration").prop('disabled', false);
			UnlockAll();
            CalculateTotalStrength();
          });
          $('#buttn1M').bind('click', function() {
            $("#txtDuration").val("30");
            $("#ddlDuration").val("3");
            CalculateTotalStrength();
            UnlockAll();
          });

          $('#buttn_Before').bind('click', function() {
            $("#txtRemarks").val("Before food");
			UnlockAll();
          });
          $('#buttn_After').bind('click', function() {
            $("#txtRemarks").val("After food");
			UnlockAll();
          });


          $('#buttnOD').bind('click', function() {
            $("#ddlFrequency").val("53:1:3");
			UnlockAll();
            ddlFrequency_OnChange();
          });
          $('#buttnBD').bind('click', function() {
            $("#ddlFrequency").val("43:2:3");
			UnlockAll();
            ddlFrequency_OnChange();
          });
          $('#buttnTDS').bind('click', function() {
            $("#ddlFrequency").val("120:3:3");
			UnlockAll();
            ddlFrequency_OnChange();
          });
          $('#buttnHS').bind('click', function() {
            $("#ddlFrequency").val("128:1:3");
			UnlockAll();
            ddlFrequency_OnChange();
          });
          $('#buttnSOS').bind('click', function() {
            $("#ddlFrequency").val("118:0:0");
			UnlockAll();
            CalculateTotalStrength();

          });
          $('#buttnStat').bind('click', function() {
            $("#ddlFrequency").val("119:1:3");

            // $("#txtQuantity").val("1");
            var valseld = $("#txtDrugDose").val();
            var unitseld = $("#ddlDrugDose option:selected").text();
            $("#ddlQuantityUOM option:selected").text(unitseld);
            $("#txtQuantity").val(valseld);
			UnlockAll();

            // CalculateTotalStrength();
          });



          $('#buttnMG').bind('click', function() {
            $("#ddlDrugDose").val("92");
			UnlockAll();
          });
          $('#buttnNO').bind('click', function() {
            $("#txtDrugDose").val("1");
            $("#ddlDrugDose").val("200");
			         UnlockAll();
            CalculateTotalStrength();
          });
          $('#buttnML').bind('click', function() {
            $("#txtDrugDose").val("5");
            $("#ddlDrugDose").val("120");
               UnlockAll();
            CalculateTotalStrength();
          });


          $('#buttnNO1').bind('click', function() {
            $("#ddlQuantityUOM").val("200");
               UnlockAll();
            CalculateTotalStrength();
          });
          $('#buttnPUFF').bind('click', function() {
            // OD
            $("#ddlDrugDose").val("494");
            $("#ddlAdminRoute").val("105");
			UnlockAll();
          });
        }
    }

console.log("Fix deprecated function");
    // fix for deprecated method in Chrome 37
  if (!window.showModalDialog) {
     window.showModalDialog = function (arg1, arg2, arg3) {
        var w;
        var h;
        var resizable = "yes";
        var scroll = "yes";
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
        var window_options ='toolbar=yes, location=yes, directories=no, status=' + status + ', menubar=no, scrollbars=' + scroll + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;
        console.log("Window options:"+window_options);
        //var targetWin = window.open(arg1, arg1, window_options);
        var targetWin = window.open(arg1, '_blank', window_options);
        targetWin.focus();
        console.log('Window is opened if value is obj. Value:');
        console.log(targetWin);


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
