/*
 ! Copyright (c) 2021, Samsung Electronics Co., Ltd


* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
 

* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
 

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/


var checkTime;
//var tvKey = new LIB.TizenKeyValue();
var log;
//Initialize function
var init = function () {
    console.log('init() called');
    log = document.getElementById('log');
    registerkeys();
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 412://rewind
    	setPcConnection('RJ45');
    	getPcConnection();
    		break;
    	case 413: //stop
    	setMessageDisplay('ON');
    	getMessageDisplay();
    		break;
    	case 415: //play
    	setSafetyLock('OFF');
    	getMessageDisplay();
    		break;
    	case 19: //pause
    	clearResult();
    		break;
    	case 417: //fastforward
    		setPcConnection('RS232');
        	getPcConnection();
    		break;
    	case 49: //1
    		getControlVersion();
    		break;
    	case 50: //2
    		powerReboot();
    		break;
    	case 51: //3
    		getScreenCapture();
    		break;
    	case 52: //4
    		getDeviceSWVersion();
    		break;
    	case 53: //5
    		getSerialNumber();
    		break;
    	case 54: //6
    		setLampSchedule();
    		getLampSchedule();
    		break;
    	case 55: //7
    	setPanelMute('ON');
    	getPanelMute();
    	setTimeout(setPanelMute('OFF'), 1000);
    	getPanelMute();
    		break;
    	case 56: //8
    	setSafetyLock("ON")
    	getSafetyLockStatus();
    		break;
    	case 57: //9
    		setSafetyLock("OFF")
        	getSafetyLockStatus();
    		break;
    	case 48: //0
    		setFirmwareUpdateListener();
    		break;
    	case 37: //LEFT arrow
    		updateFirmware();
    		break;
    	case 38: //UP arrow
    		unsetFirmwareUpdateListener();
    		break;
    	case 39: //RIGHT arrow
    	getOnScreenMenuOrientation();
    		break;
    	case 40: //DOWN arrow
    		getSourceOrientation();  
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
};

//===========  logging function   ===========

function clearResult() {
	log.innerHTML = '';
}

function addResult(data) {
	log.innerHTML += data + '<br/>';
}

//===========  get systemcontrol module version function   ===========

function getControlVersion(){
	var Version = null;	 
	  try {
	      Version = webapis.systemcontrol.getVersion();
	  } catch (e) {
	      console.log("[getVersion] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getVersion] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	  }
	  if (null !== Version) {
	      console.log("[getVersion] call syncFunction type: " + Version);
	      addResult("[getVersion] call syncFunction type: " + Version);
	  }		
}

//===========  Reboot function   ===========

function powerReboot() {
	 console.log("[powerReboot] function call");
	 try{
		  webapis.systemcontrol.rebootDevice();
		  console.log("[powerReboot] success ");
		  addResult("[powerReboot] success ");
		 }
	 catch(e){
		  console.log("[rebootDevice] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		  addResult("[rebootDevice] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		 }
}

//===========  monitor CPU usage function   ===========

function getCPUUsage() {	 
	 console.log("[getCPUUsage] function call");
	 function onSuccess(cpu) 
	 {
		 console.log("The Load on device is " + cpu.load);
		 addResult("The Load on device is " + cpu.load);
	 }	 
	 function onError(error) 
	 {		 
		 console.log("Not supported: " + error.message);
		 addResult("Not supported: " + error.message);		 
	 }
	 tizen.systeminfo.getPropertyValue("CPU", onSuccess, onError);
}

//===========  monitor RAM usage function   ===========

function getRamUsage() {
	console.log("[getRAMUsage] function call");
	var TotalMemory = tizen.systeminfo.getTotalMemory();
	var AvailableRamUsage = tizen.systeminfo.getAvailableMemory() ;
	
	console.log("The available memory size is " + AvailableRamUsage + " bytes.");
	addResult(" available memory " + AvailableRamUsage+ " bytes.");
	
	console.log("The TotalMemory size is " + TotalMemory + " bytes.");
	addResult("TotalMemory " + TotalMemory+ " bytes.");	
}

//===========  get Screen Capture function (Saved path: /opt/share/magicinfo/ScreenCapture.jpg) /opt/usr/home/owner/share/magicinfo/PepperAPIScreenCapture.jpg===========

function getScreenCapture() {
	console.log("[getScreenCapture] function call");
	try {
		 webapis.systemcontrol.captureScreen(); 
		 console.log("[getScreenCapture]success to call asyncFunction");
	     addResult("[getScreenCapture]success to call asyncFunction");
	}catch(e){
		 console.log("[captureScreen] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		 addResult("[captureScreen] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.messag);
	}
}

//=========== get firmware version  ================

function getDeviceSWVersion() {
	console.log("[getDeviceSWVersion] function call");
	var firmwareVersion = null;

	  try {
	     firmwareVersion = webapis.systemcontrol.getFirmwareVersion();
	  } catch (e) {
	      console.log("[getFirmwareVersion] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getFirmwareVersion] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	  }
	  
	  if (null !== firmwareVersion) {
	      console.log("[getFirmwareVersion] call syncFunction type: " + firmwareVersion);
	  }
}

//===========  get Model name function   ===========

function getModel() {
	var getModel = null;
	try {
		getModel = webapis.productinfo.getModel();
	} catch (e) {
	    console.log("[getModel] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	    addResult("[getModel] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
	if(null !== getModel){
	    console.log("[getModel] call syncFunction type: " + getModel);
	    addResult("[getModel] call syncFunction type: " + getModel);
	}  
}

//===========  get DUID function  ===========

function getDuid() { 
	var getDuid = null;
	try {
		getDuid = webapis.productinfo.getDuid();
	} catch (e) {
	    console.log("[getDuid] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	    addResult("[getDuid] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
	if(null !== getDuid){
	    console.log("[getDuid] call syncFunction type: " + getDuid);
	    addResult("[getDuid] call syncFunction type: " + getDuid);
	}  
}

//===========  get serial number function  ===========

function getSerialNumber(){
	var SerialNumber = null;
	try {
	   SerialNumber = webapis.systemcontrol.getSerialNumber();
	} catch (e) {
	   console.log("[getSerialNumber] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	   addResult("[getSerialNumber] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}	  
	if (null !== SerialNumber) {
	   console.log("[getSerialNumber] call syncFunction type: " + SerialNumber);
	   addResult("[getSerialNumber] call syncFunction type: " + SerialNumber);
	}
}

//===========  set brightness Schedule function  ===========

function setLampSchedule(){
	var info = {
			 		"use"         : "ON",
			 		"firstTime"   : "08:55",
			 		"level1"      : 30,
			 		"secondTime"  : "16:50",
			 		"level2"      : 80
				};			  
	try {
		webapis.systemcontrol.setScreenLampSchedule(info);	
		console.log("[setScreenLampSchedule] success");
		addResult("[setScreenLampSchedule] success");
	} catch (e) {
		console.log("[setScreenLampSchedule] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		addResult("[setScreenLampSchedule] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
}

//===========  get brightness Schedule function  ===========

function getLampSchedule(){
	var ScreenLampSchedule = null;	  
	try {
	    ScreenLampSchedule = webapis.systemcontrol.getScreenLampSchedule();
	} catch (e) {
	    console.log("[getScreenLampSchedule] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	    addResult("[getScreenLampSchedule] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 
	if (null !== ScreenLampSchedule) {
	    console.log("[getScreenLampSchedule] call syncFunction type: " + ScreenLampSchedule);
	    addResult("[getScreenLampSchedule] call syncFunction type: " + ScreenLampSchedule);
	}
}

//===========  set Panel mute function state = "ON" || "OFF"  ===========

function setPanelMute(state){ 
	try {
		 webapis.systemcontrol.setPanelMute(state);
	} catch (e) {
		 console.log("[setPanelMute] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
}

//===========  get Panel mute info function  ===========

function getPanelMute(){
	var PanelMuteOnOff = null;	  
	try {
	    PanelMuteOnOff = webapis.systemcontrol.getPanelMute();
	} catch (e) {
	    console.log("[getPanelMute] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	    addResult("[getPanelMute] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 
	if (null !== PanelMuteOnOff) {
	    console.log("[getPanelMute] call syncFunction type: " + PanelMuteOnOff);
	    addResult("[getPanelMute] call syncFunction type: " + PanelMuteOnOff);
	}
}

//===========  set Safety Lock function lockstate = "ON" || "OFF"  ===========

function setSafetyLock(lockState){
	try {
		webapis.systemcontrol.setSafetyLock(lockState);
		console.log("[setSafetyLock] call success");
		addResult("[setSafetyLock] call success");
	} catch (e) {
		console.log("[setSafetyLock] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		addResult("[setSafetyLock] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 
}

//===========  get Safety Lock function  ===========

function getSafetyLockStatus(){
	 var SafetyLock = null;
	 try {
	      SafetyLock = webapis.systemcontrol.getSafetyLock();
	 } catch (e) {
	      console.log("[getSafetyLock] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getSafetyLock] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	 }  
	 if (null !== SafetyLock) {
	      console.log("[getSafetyLock] call syncFunction type: " + SafetyLock);
	      addResult("[getSafetyLock] call syncFunction type: " + SafetyLock);
	 }
}


//===========  get onScreen menu orientation function  ===========

function getOnScreenMenuOrientation(){
	var onScreenMenuOrientation = null;
	try {
	      onScreenMenuOrientation = webapis.systemcontrol.getOnScreenMenuOrientation();
	} catch (e) {
	      console.log("[getOnScreenMenuOrientation] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getOnScreenMenuOrientation] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 
	if (null !== onScreenMenuOrientation) {
	      console.log("[getOnScreenMenuOrientation] call syncFunction type: " + onScreenMenuOrientation);
	      addResult("[getOnScreenMenuOrientation] call syncFunction type: " + onScreenMenuOrientation);
	}	
}


//===========  get content orientation function  ===========

function getSourceOrientation(){
	var Result = null; 
	try {
		Result = webapis.systemcontrol.getSourceOrientation();
	} catch (e) {
		console.log("[getSourceOrientation] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
	if(null !== Result){
		console.log("[getSourceOrientation] call syncFunction type: " + Result);
	}
}

//===========  set PC connection function RJ45 or RS232 ===========

function setPcConnection(PCConnection){

	try {
	     webapis.systemcontrol.setPCConnection(PCConnection);
		 console.log("[setPCConnection] call syncFunction: Success");
		 addResult("[setPCConnection] call syncFunction: Success");
	} catch (e) {
	     console.log("[setPCConnection] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	     addResult("[setPCConnection] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
}

//===========  get PC connection function  ===========

function getPcConnection(){
	var PCConnection = null;  
	try {
	      PCConnection = webapis.systemcontrol.getPCConnection();
	} catch (e) {
	      console.log("[getPCConnection] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getPCConnection] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 
	if (null !== PCConnection) {
	      console.log("[getPCConnection] call syncFunction type: " + PCConnection);
	      addResult("[getPCConnection] call syncFunction type: " + PCConnection);
	}
}

//===========  set message display functionstate = 'ON' || 'OFF'  ===========

function setMessageDisplay(state){
	try {
		 webapis.systemcontrol.setMessageDisplay(state);
		 console.log("[setMessageDisplay] call syncFunction: Success");
		 addResult("[setMessageDisplay] call syncFunction: Success");
	} catch (e) {
		 console.log("[setMessageDisplay] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		 addResult("[setMessageDisplay] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	} 	
}

//===========  get message display function  ===========

function getMessageDisplay(){
	var MessageDisplay = null;
	try {
	      MessageDisplay = webapis.systemcontrol.getMessageDisplay();
	} catch (e) {
	      console.log("[getMessageDisplay] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	      addResult("[getMessageDisplay] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
	if (null !== MessageDisplay) {
	      console.log("[getMessageDisplay] call syncFunction type: " + MessageDisplay);
	      addResult("[getMessageDisplay] call syncFunction type: " + MessageDisplay);
	}		
}

//===========  set firmware Update listener function  ===========

function setFirmwareUpdateListener(){
	var onchange = function(data) {
		console.log("[UpdateCallback] progress :" + data + " changed");
		addResult("[UpdateCallback] progress :" + data + " changed");
		}; 
	try {
		 webapis.systemcontrol.setUpdateFirmwareListener(onchange);
	} catch (e) {
		 console.log("setUpdateFirmwareListener exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		 addResult("setUpdateFirmwareListener exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}
}

//===========  unset firmware Update listener function  ===========
function unsetFirmwareUpdateListener(){
    try {
		 console.log("begin unsetUpdateFirmwareListener");
		 webapis.systemcontrol.unsetUpdateFirmwareListener();
    } catch (e) {
		 console.log("unsetUpdateFirmwareListener exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		 return;
    }
}


//===========  Update Firmware function  ===========

function updateFirmware(){
	var SoftwareID 		= "0";
	var SWUFileName 	= "upgrade.bem";
	var SWVersion		= "T-HKMLAKUC 0227.20";
	var SWURL 			= "http://10.88.43.36:8080/New2016/Saurabh/swupdate/T-HKMLAKUC_0227_20/image/upgrade.bem";
	var SWTotalBytes 	= 1007396825;
	 
	webapis.systemcontrol.updateFirmware(SoftwareID, SWUFileName, SWVersion, SWURL, SWTotalBytes);	
	setFirmwareUpdateListener();
}

// window.onload can work without <body onload="">

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
    setTimeout(startTime, 10);
}

function checkTime(i) {
    if (i < 10) {
        i='0' + i;
    }
    return i;
}
function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    img.style.position = 'absolute';
    img.style.right = 0;
    img.style.top = 0;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}
function registerkeys(){
	
	console.log('register keys function called');
	var usedKeys=['1','2', '3', '4', '5', '6', '7', '8', '9','0',"MediaPlay","MediaPause","MediaStop", "MediaRewind", "MediaFastForward"];
	
	usedKeys.forEach (
			
	function (keyName){
		
		tizen.tvinputdevice.registerKey(keyName);
	}); 
}
window.onload = init;