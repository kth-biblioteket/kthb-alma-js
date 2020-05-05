/*********************************

Funktion som hämtar 
låneregler(policies) från Alma

*********************************/
function callAjax(url){
	setloaders();
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var Data = JSON.parse(xmlhttp.responseText);
			//skriv ut eventuell holdingsinfo
			//console.log(Data.holding_info.length);
			if(Data.holding_info.length > 0) {
				var s = document.createElement('div');
				if (window.location.href.search(/language=swe/i)>=0) {
					document.querySelector("body").appendChild(s).textContent = "Vi har: ";
					document.querySelector("body").appendChild(s).style.display="block";
				} else {
					document.querySelector("body").appendChild(s).textContent = "We have: ";
					document.querySelector("body").appendChild(s).style.display="block";
				}
				for(j=0;j<Data.holding_info.length;j++) {
					var s = document.createElement('div');
					s.id = "";
					document.querySelector("body").appendChild(s).textContent=Data.holding_info[j].text;
					document.querySelector("body").appendChild(s).style.color="green";
					document.querySelector("body").appendChild(s).style.display="block";
				}

			}
			document.querySelector("#loadingholding").parentNode.removeChild(document.querySelector("#loadingholding"));
			//loopa igenom alla records
			var matchedrecord;
			if(Data.records) {
				for(j=0;j<Data.records.length;j++) {
					//console.log("description: " + Data.records[j].description + ", Barcode: " + Data.records[j].barcode );
					//loopa igenom alla tr om det finns tabelldata
					matchedrecord = false
					if (document.querySelector("#TABLE_DATA_item_list th:nth-of-type(3)")) {
						var trspolicy = document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(3)");
						var trsbarcode = document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(1)");
						//var trsdescription = document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(4) span:nth-of-type(1)");
						var trsdescription = document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(4)");
						//if (document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(4) span:nth-of-type(2)")) {
							//trsdescription += document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(4) span:nth-of-type(2)")
						//}
						var i;
						
						//matcha på barcode eller description och sätt rätt policy
						
						//om barcode inte är blank, kolla mot barcode
						if (Data.records[j].barcode != "") {
							for (i = 0; i < trspolicy.length; ++i) {
								if(trsbarcode[i].innerHTML.indexOf(Data.records[j].barcode)>=0) {
									
									trspolicy[i].innerHTML = '<div style="white-space: nowrap;">' + 
																Data.records[j].policy + 
																 '<div onmouseout="togglepolicy(this)" onmouseover="togglepolicy(this)" style="vertical-align: middle; position: relative;display: inline-block;overflow: visible;white-space: initial;">' +
																	'<div class="tooltiptext" style="white-space: initial;visibility: hidden;width: 330px;background-color: #8e8e8e;color: #fff;text-align: left;border-radius: 6px;padding: 10px 10px;position: absolute;z-index: 1;bottom: 125%;left: -25px;opacity: 0;transition: opacity 0.4s;">' +
																		//'<h3>These are our loan policies</h3>' + 
																		//Var ska denna info hämtas? Primo-labels? Array här? Array i php?
																		//För tillfället en array i den PHP som hämtar data nedan (almagetpolicy.php)
																		'<div>' + Data.records[j].policyinformation + '</div>' +
																	'</div>' +
																	'<svg style="color: #888888;fill: CURRENTCOLOR;" width="20px" height="20px" viewBox="0 0 24 24" id="ic_info_24px" y="1368" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>' +
																'</div>' +
															'</div>';
									
									//console.log("MATCH: " + trsbarcode[i].innerHTML + "==" + Data.records[j].barcode + "&nbsp;");
									matchedrecord == true;
									break;
								}
							}
						} else {
						//om barcode är blank kolla mot description och public note
							for (i = 0; i < trspolicy.length; ++i) 	{
								//console.log(trsdescription[i].innerHTML);
								//console.log(trsdescription[i].innerHTML.indexOf(" " + Data.records[j].description + " "));
								//if (trsdescription[i].innerHTML.indexOf(" " + Data.records[j].description + " ")!=-1) {
								console.log(trsdescription[i].innerHTML);
								console.log(Data.records[j].description);
								console.log(Data.records[j].publicnote);
								if (trsdescription[i].innerHTML.indexOf(Data.records[j].description)!=-1 && trsdescription[i].innerHTML.indexOf(Data.records[j].publicnote)!=-1 ) {
								//if (trsdescription[i].innerHTML == Data.records[j].description + "&nbsp;") {
									trspolicy[i].innerHTML = '<div style="white-space: nowrap;">' + 
																Data.records[j].policy + 
																 '<div onmouseout="togglepolicy(this)" onmouseover="togglepolicy(this)" style="vertical-align: middle; position: relative;display: inline-block;overflow: visible;white-space: initial;">' +
																	'<div class="tooltiptext" style="white-space: initial;visibility: hidden;width: 330px;background-color: #8e8e8e;color: #fff;text-align: left;border-radius: 6px;padding: 10px 10px;position: absolute;z-index: 1;bottom: 125%;left: -25px;opacity: 0;transition: opacity 0.4s;">' +
																		//'<h3>These are our loan policies</h3>' + 
																		//Var ska denna info hämtas? Primo-labels? Array här? Array i php?
																		//För tillfället en array i den PHP som hämtar data nedan (almagetpolicy.php)
																		'<div>' + Data.records[j].policyinformation + '</div>' +
																	'</div>' +
																	'<svg style="color: #888888;fill: CURRENTCOLOR;" width="20px" height="20px" viewBox="0 0 24 24" id="ic_info_24px" y="1368" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>' +
																'</div>' +
															'</div>';
									//console.log("MATCH policy: " + Data.records[j].policy);
									//bryt iteration när matching hittats
									matchedrecord == true;
									break;
								}
							}
						}
					}
				}
				//kolla om det finns nån kvar utan matchning(loader-1 existerar)
				for (i = 0; i < trspolicy.length; ++i) { 
					if(trspolicy[i].innerHTML.indexOf("loader-1") != -1) {
						trspolicy[i].innerHTML = '<div style="white-space: nowrap;">' + 
													'-' + 
														'<div onmouseout="togglepolicy(this)" onmouseover="togglepolicy(this)" style="vertical-align: middle; position: relative;display: inline-block;overflow: visible;white-space: initial;">' +
														'<div class="tooltiptext" style="white-space: initial;visibility: hidden;width: 330px;background-color: #8e8e8e;color: #fff;text-align: left;border-radius: 6px;padding: 10px 10px;position: absolute;z-index: 1;bottom: 125%;left: -25px;opacity: 0;transition: opacity 0.4s;">' +
															'<div>Not enough data to get loanpolicy for this item(missing barcode/description)</div>' +
														'</div>' +
														'<svg style="color: #888888;fill: CURRENTCOLOR;" width="20px" height="20px" viewBox="0 0 24 24" id="ic_info_24px" y="1368" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>' +
													'</div>' +
												'</div>';
					}
				}
			}
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/********************************

Funktion som sätter laddningsikkonen 
att visa medan data laddas

********************************/

function setloaders() {
	var loadersvg = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(120 20 20)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg>'
	var t = document.createElement('div');
	t.id = "loadingholding";
	document.querySelector("body").appendChild(t);
	document.querySelector("body").appendChild(t).style.display="block";
	document.querySelector("#loadingholding").innerHTML = loadersvg;
	//Policy är tredje kolumnen
	if (document.querySelector("#TABLE_DATA_item_list th:nth-of-type(3)")) {
		if (document.querySelector("#TABLE_DATA_item_list th:nth-of-type(3)").innerHTML == "Policy" || document.querySelector("#TABLE_DATA_item_list th:nth-of-type(3)").innerHTML == "policy") {
			var trspolicy = document.querySelectorAll("#TABLE_DATA_item_list tr td:nth-of-type(3)");
			for (i = 0; i < trspolicy.length; ++i) { 
				trspolicy[i].innerHTML = trspolicy[i].innerHTML + loadersvg;
			}
		}
	}

}

/*******************************

Funktion för att visa 
liten inforuta från kioskdatorer

*******************************/

function noaccess() {
	if (language == "sv") {
		var noaccessheader = "Ingen tillgång!";
		var noaccesstext = "Ingen tillgång till online material från denna publika dator";
	} else {
		var noaccessheader = "No access!";
		var noaccesstext = "No access to online material from this public computer";
	}
	var html = 	'<div id="myModal" class="modal" style="position: fixed;z-index: 1;left: 0;top: 0; width: 100%;height: 100%;1overflow: auto; background-color: rgba(74, 102, 124, .25);">' + 
					'<div class="modal-content" style="top: 5px;position: relative;background-color: #fefefe;margin: 0% auto;padding: 0px;1border: 1px solid #888;width: 80%;box-shadow: 0 7px 15px -8px rgba(0,0,0,.1), 0 6px 10px -2px rgba(0,0,0,.1), 0 5px 24px 4px rgba(0,0,0,.1);">' + 
						'<div style="display: flex;-ms-flex-direction: column;flex-direction: column;background-color: #e9e9e9;border-color: #e1e1e1;color: rgba(0,0,0,.87);">' +
							'<div style="padding: 0 32px; height: 60px;max-height: 60px;display:flex;flex-direction: row;align-items: center;">' +
								'<span style="font-size: 20px;letter-spacing: .005em;font-weight: 400;">' + noaccesstext + '</span>' +
								'<span style="flex:1"></span>' +
								'<span id="closenoaccess" style="width: 40px;height: 40px;border-radius: 50%;color: #aaa;font-size: 28px;font-weight: bold;align-items: center;display: flex;justify-content: center;">' +
									'<svg style="width: 24px;height: 24px" id="close_cache139" width="100%" height="100%" viewBox="0 0 24 24" y="240" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>' +
								'</span>' +
							'</div>' + 
						'</div>' +
						//'<div style="padding: 12px 48px"><p>' + noaccesstext + '</p></div>' + 
					'</div>' + 
				'</div>'; 
	var div = document.createElement("div");
	div.innerHTML = html;
	document.body.appendChild(div);
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	var span = document.getElementById("closenoaccess");
	span.onclick = function() {
		modal.style.display = "none";
		modal.parentNode.removeChild(modal);
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			modal.parentNode.removeChild(modal);
		}
	}
}

/*************************

Kör när sidan laddats

*************************/
var language = "en";
//ta bort src för den analyticsbecacon som Ex Libris lagt in och som tar EVIGHETER att ladda i vissa fall och gör att sidan hänger helt eller tar mkt lång tid
//Ex Libris verkar äntligen ha tagit bort denna!! :) 181009
var apachegifbeacon = document.querySelector("img[alt*='Invisible image']");
if (apachegifbeacon) {
	apachegifbeacon.setAttribute("src", "");
}

window.onload = function() {
	document.querySelector("body").style.display="block";
	//språk utifrån almas discovery labels där detta script finns inlagt med språkparameter på svenska(lang=sv)
	if (document.querySelectorAll("script[src*='alma.js?lang\\=sv']").length>0) {
		language = "sv";
	} else {
		language = "en";
	}
	
	//Svenska labels
	if (window.location.href.search(/swe/i)>=0){
		if (window.location.href.search(/svc_dat=getit/i)>=0) {
			var box = document.querySelector("input[value*='Request or suggest for purchase']");
			if(box) {
				box.value = "Beställ/föreslå material";
			}
			box = document.querySelector("input[value*='Search Libris for this book']");
			if(box) {
				box.value = "Sök denna bok i Libris";
			}
			box = document.querySelector("input[value*='Search Libris for this journal']");
			if(box) {
				box.value = "Sök denna tidsskrift i Libris";
			}
		}
		if (window.location.href.search(/svc_dat=viewit/i)>=0) {
			var box = document.querySelector('a[href*="https://www.kth.se/en/biblioteket/anvanda-biblioteket/bestall-material"]');
			if(box) {
				box.innerHTML = "Beställ/föreslå material";
			}
			var box = document.querySelector('a[href*="https://www.kth.se/en/biblioteket/anvanda-biblioteket/oppettider-kontakt"]');
			if(box) {
				box.innerHTML = "Problem? Fråga oss!";
			}
		}
	} else {
		
	}

	/***********************
	 * 
	 * 
	 * för alla views utom defaultvyn "46KTH_VU1"
	 * 
	 * 
	 ***********************/
	if (window.location.href.search(/46KTH_VU1_New/i)>=0 
	|| window.location.href.search(/46KTH_VU1_B/i)>=0 
	|| window.location.href.search(/46KTH_VU1_L/i)>=0 
	|| window.location.href.search(/46KTH_Kiosk/i)>=0 
	|| window.location.href.search(/uresolverRequest.do/i)>=0) {
		
		// Vit bakgrund(inte transparent)
		document.querySelector("body").style.backgroundColor = "#fff";
		
		//Visa licensvillkor
		if(document.querySelector("form")){
			var license = document.querySelector("form").innerHTML;
			var i = 0;
			var portfoliopid = [];
			var pos = license.indexOf("portfolio_PID");
			if (pos > -1) {
				portfoliopid[i] = license.substr(pos+15,17);
				i++;
				while(pos > -1) {
					pos = license.indexOf("portfolio_PID", pos+1);
					if (pos > -1) {
						portfoliopid[i] = license.substr(pos+15,17);
						i++;
					}
				}
				
				var i = 0;
				var collectionpid = [];
				var pos = license.indexOf("package_pid");
				collectionpid[i] = license.substr(pos+13,17);
				i++;
				while(pos > -1) {
					pos = license.indexOf("package_pid", pos+1);
					if (pos > -1) {
						collectionpid[i] = license.substr(pos+13,17);
						i++;
					}
				}
				for(i=0;i<portfoliopid.length;i++) {
					//Hämta licensinfo för collection från Alma
					getlicense(collectionpid[i], portfoliopid[i]);
				}
			}
		}

		//displayItems
		if ((window.location.href.search(/is_new_ui=true/i)>=0 
		|| window.location.href.search(/newUI=true/i)>=0 
		|| window.location.href.search(/primo-explore/i)>=0 
		|| document.querySelector("#newUI").getAttribute("value") == "true" ) 
		&& window.location.href.search(/displayItems/i)>=0) {
			
			//hämta via holdingsid om det finns
			if (document.querySelector("#holdingKey")) {
				var holdingKey = document.querySelector("#holdingKey").getAttribute("value")
				var holdingsid = holdingKey.substring(holdingKey.indexOf("mid=") + 4, holdingKey.indexOf("mid=") + 4 + 17);
				if (holdingsid != "" && holdingsid != "null" && holdingsid.match(/^\d+$/) != null) {
					var url = 'https://apps.lib.kth.se/alma/primo/almagetpolicy.php?mmsid=' + '&holdingsid=' + holdingsid + '&lang=' + language;
					callAjax(url);
				}
			} else {
				
			}

			if (document.querySelector("#totalRecordsCount")) {
				if(document.querySelector("#totalRecordsCount").getAttribute("value") == 0) {
					document.querySelector(".empty").style.display = "none";
					document.querySelector("#displayHolding").style.display = "none";
					document.querySelector("#toggleHolding").style.display = "block";
				}
			}
		}
		//view it
		if ((window.location.href.search(/is_new_ui=true/i)>=0 || window.location.href.search(/newUI=true/i)>=0 || document.querySelector("#newUI").getAttribute("value") == "true" ) && window.location.href.search(/svc_dat=viewit/i)>=0){

		}
		
		//Get it
		if ((window.location.href.search(/is_new_ui=true/i)>=0 || window.location.href.search(/newUI=true/i)>=0 || document.querySelector("#newUI").getAttribute("value") == "true" ) && (window.location.href.search(/svc_dat=getit/i)>=0 || window.location.href.search(/uresolverGetit/i)>=0)){

			var url = ""
			//hämta via holdingsid om det finns
			if (document.querySelector("#holdingKey")) {
				var holdingKey = document.querySelector("#holdingKey").getAttribute("value")
				var holdingsid = holdingKey.substring(holdingKey.indexOf("mid=") + 4, holdingKey.indexOf("mid=") + 4 + 17);
				if (holdingsid != "" && holdingsid != "null" && holdingsid.match(/^\d+$/) != null) {
					url = 'https://apps.lib.kth.se/alma/primo/almagetpolicy.php?mmsid=' + '&holdingsid=' + holdingsid + '&lang=' + language;
					console.log('url: '+ url);
					callAjax(url);
				}
			} else {
			}
			
			//Vad göra om det är "getitNoHoldings" dvs uresolver rapporterar "This does not match any printed or electronic resource from the library" men det finns ändå nånting (Available in print. Check holdings)
			if (document.querySelector("#totalRecordsCount")) {
				if(document.querySelector("#totalRecordsCount").getAttribute("value") == 0) {
					
					document.querySelector(".empty").style.display = "none";
					document.querySelector("#displayHolding").style.display = "none";
					document.querySelector("#toggleHolding").style.display = "block";
				}
			}
		}
		
		//request item
		if ((window.location.href.search(/is_new_ui=true/i)>=0 || window.location.href.search(/newUI=true/i)>=0 || document.querySelector("#newUI").getAttribute("value") == "true" ) && window.location.href.search(/openRequest?/i)>=0){
			if (document.querySelector("#mainRequestForm .resetContainer") !== null) {
				var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
				var eventer = window[eventMethod];
				var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
				// Lyssna på message från parent
				eventer(messageEvent,function(e) {
					if(e.data == "iframeaction")
					{
						//document.body.style.backgroundColor = "red";
					}
				},false);
				//funktion till "cancel-knappen"
				document.querySelector("#mainRequestForm .resetContainer").onclick = function() {window.parent.postMessage("iframeaction","*");};
			}		
		}
		
		document.querySelector("body").style.display="block";
		document.querySelector("html").style.backgroundImage="none";

		if (language == "sv") {
			shelf = "Hylla";
		} else {
			shelf = "Shelf";
		}

		if (document.querySelector(".itemLibraryName")) {
			document.querySelector(".itemLibraryName").innerHTML = document.querySelector(".itemLibraryName").innerHTML + '>&nbsp;'
		
		}
		if (document.querySelector(".itemLocationName")) {
			document.querySelector(".itemLocationName").innerHTML = document.querySelector(".itemLocationName").innerHTML + '>&nbsp;' + shelf + ':&nbsp;'
		}
		
		var style = document.createElement('style');
		style.innerHTML = `
			body {
				background-color: #f8f8f8 !important;
				border: 1px solid #e1e1e1;
				padding: 10px;
			}

			.serialSelection, 
			.itemsList, 
			.holdingsList, 
			.paginationContainer, 
			.systemFeedback,
			.holdingInfo {
				background-color: #f8f8f8;
			}

			.itemsList {
				background-color: #f8f8f8;
				padding-top: 10px;
			}

			.iframeHeaderContent {
				min-height: 0px;
			}

			form[action*="displayItems"] .serialSelection {
				border: none;
			}

			#toggleHolding .showMore {
				border-radius: 0;
				background-color: #f8f8f8;
			}

			.serialSelection .holdingInfo li {
				display:flex;
			}

			.holdingInfo .locate {
				position: relative;
				top: 0;
				right: 0;
				background-color: #ffffff;
				color: #547fa1;
			}

			.holdingInfo li {
				font-weight: bold;
			}

			.holdingInfo .locate {

			}
		`;
		document.head.appendChild(style);
		
	}
	
	/**********************
	 * 
	 * 
	 * För Kioskdatorer 
	 * 
	 * 
	 **********************/
	if (window.location.href.search(/46KTH_Kiosk/i)>=0) {
		if (document.querySelectorAll(".submaitAsLink")){
			var x = document.querySelectorAll(".subsmitAsLink");
			var i;
			for (i = 0; i < x.length; i++) {
				x[i].setAttribute("onclick", "javascript:noaccess()");
				x[i].setAttribute("style", "color:#000000;");
			}
		}
		
		var x = document.querySelectorAll('body>div>div');
			for(var i=0; i<x.length; i++){
				if(x[i].innerHTML.search(/You may request this/i)>=0){
					 x[i].parentNode.removeChild(x[i]);
				}
			}
		
		if (document.querySelectorAll(".iframeHeaderContent em")){
			var x = document.querySelectorAll(".iframeHeaderContent em");
			for(var i=0; i<x.length; i++){
				if((x[i].innerHTML.search(/Request Options/i)>=0 || x[i].innerHTML.search(/Reservationsalternativ/i)>=0) && document.querySelectorAll(".iframeHeaderContent .back").length==0){
					document.querySelector(".iframeHeaderContent").setAttribute("style", "display:none");
				}
			}
		}
		
		if (document.querySelectorAll("a[href*='besok-och-kontakt']")){
			var x = document.querySelectorAll("a[href*='besok-och-kontakt']");
			var i;
			for (i = 0; i < x.length; i++) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
		
		if (document.querySelectorAll("h1")){
			var x = document.querySelectorAll("h1");
			for(var i=0; i<x.length; i++){
				if(x[i].innerHTML.search(/Contact/i)>=0 || x[i].innerHTML.search(/Kontakt/i)>=0){
					x[i].setAttribute("style", "display:none");
				}
			}
		}
		
		//Byt ut länkar som är kvar till spantaggar istället
		//Men INTE de som har "displayItems" eller "uresolverGetit" (det är länkar för att visa detaljer om tryckt material)
		//och INTE de som är wagnerguide
		
		if (document.querySelectorAll("a").length > 0){
			var x = document.querySelectorAll("a:not([href*='displayItems']):not([href*='uresolverGetit']):not([href*='wagnerguide'])");
			var i;
			for (i = 0; i < x.length; i++) {
				var span = document.createElement("span");
				span.innerHTML = x[i].innerHTML;
				span.id = x[i].id;
				span.setAttribute("style",x[i].getAttribute("style"));
				
				hreftemp = x[i].getAttribute("href");
				if (hreftemp.search(/www.kth.se/i)>=0) {
				
				} else {
					span.setAttribute("onclick","javascript:noaccess()");
				}
				
				x[i].parentNode.replaceChild(span,x[i]);
			}

		}
	}
	
	/***********************
	 * 
	 * 
	 * för BETA 
	 * 
	 ***********************/
	if (window.location.href.search(/46KTH_VU1_B/i)>=0) {
		
	}	
}


/********************************************************
 * 
 * 
 * Funktion som visar/döljer policy(mouserover "i")
 * 
 * 
 ********************************************************/
function togglepolicy(element) {
	if (element.querySelector(".tooltiptext").style.visibility == "hidden") {
		element.querySelector(".tooltiptext").style.visibility = "visible";
		element.querySelector(".tooltiptext").style.opacity = "1";
	} else {
		element.querySelector(".tooltiptext").style.visibility = "hidden";
		element.querySelector(".tooltiptext").style.opacity = "0";
	}
}

/**************************************************************
 * 
 * 
 * Funktion som visar/döljer licensvillkor(mouserover "i")
 * 
 * 
 **************************************************************/
function togglelicense(event, element, html, show) {
	if (show == 1) {
		//skicka ett "message" till en lyssnare som skapats på Primosidan
		//så att villkoren visas där istället för i Alma-framen!
		window.parent.postMessage({
			"type": "licensinfo",
			"action": "show",
			"html": html,
			"screenX": event.screenX,
			"screenY": event.screenY
	  	},"*");
	} else {
		window.parent.postMessage({
			"type": "licensinfo",
			"action": "remove",
			"html": html,
			"screenX": event.screenX,
			"screenY": event.screenY
	  	},"*");
	}
}

/**************************************************************************
 * 
 * 
 * Funktion som hämtar licensvillkor som lagts in på en collection i Alma
 * 
 * 
 **************************************************************************/
function getlicense(packageid, portfoliopid) {
	//setloaders();
	var url = "https://apps.lib.kth.se/alma/primo/almagetlicenseinfo.php?packageid=" + packageid
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var licensetext;
			if(typeof(data.code) != "undefined") {
				for (i = 0; i < data.term.length; i++) {
					if(data.term[i].code.value == 'Licensvillkor') {
						licensetext = data.term[i].value.desc;
					};
				}
				if(typeof(licensetext) != "undefined") {
					licensetext_HTML = licensetext.replace(/[\r]/g, '<br />');
					licensetext_HTML = licensetext_HTML.replace(/[\n]/g, '');
					if (language == "sv") {
						licensetermtext = "Licensvillkor ";
					} else {
						licensetermtext = "License terms ";
					}
					html = '<span>' + licensetermtext + '</span><span style"display:block !important" onmouseout="togglelicense(event,this,\'\',0)" onmouseover="togglelicense(event,this,\'' + licensetext_HTML + '\',1)">';
					html += '<svg style="vertical-align:middle;color: #888888;fill: CURRENTCOLOR;" width="20px" height="20px" viewBox="0 0 24 24" id="ic_info_24px" y="1368" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>';
					html += '<span class="tooltiptext" style="white-space: pre-wrap;display: none;width: 370px;background-color: #8e8e8e;color: #fff;text-align: left;border-radius: 6px;padding: 10px 10px;1position: absolute;z-index: 1;top: 5%;left: 30px;opacity: 1;transition: opacity 0.4s;">';
					html += licensetext;
					html += '</span>';
					html += '</span>';
					
					document.querySelector("#div_long_" + portfoliopid).innerHTML = html;
					document.querySelector("#div_long_" + portfoliopid).style.display = "block";
					document.querySelector("#div_long_" + portfoliopid).style.border = "none";
					document.querySelector("#div_long_" + portfoliopid).style.margin = "0";
					document.querySelector("#div_long_" + portfoliopid).style.padding = "0";
					document.querySelector("#div_long_" + portfoliopid).style.paddingTop = "0px";
					document.querySelector("#div_long_" + portfoliopid).style.paddingBottom = "0px";
					
				}
			}
        } else {
			//error
		}
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*********************************

För BETA

*********************************/

/**
 * Om vi ska använda doiuppslag från Alma-sidan....
 * @param {*} doi 
 */
function getoadoi(doi) {
	//setloaders();
	var url = 'https://api.oadoi.org/v2/' + doi + '?email=ask-kthb@kth.se';
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			console.log(data);	
        } else {
			//error
		}
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
/************************

Slut BETA

************************/