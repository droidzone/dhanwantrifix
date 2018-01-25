// ==UserScript==
// @name         ESI App Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dr Joel G Mathew, aka Droidzone
// @match        https://gateway.esic.in/Hospital/ClinicalRecords/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Tampermonkey user script loaded for ESI Web app");
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
	    console.log("Return value is "+FUPResult);
	    //window.opener.postMessage(true, FUPResult); //or false
	    console.log("Window is closing");
	    window.opener.postMessage(FUPResult, window.location.href);
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
