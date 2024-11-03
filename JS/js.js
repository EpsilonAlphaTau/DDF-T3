
var encrypter;
var debug = false;

function enterPassword(recherche){
	GetDecode(recherche.substring(1));
	predClue();
	startGame() ;
	document.getElementById("textB").value = "";
}

var recherchesEffectuees = [];
function requete(){
	var recherche = document.getElementById("textB").value;
	//console.info("<<< " + recherche);

	if (recherche.substring(0,1) === "!"){
		enterPassword(recherche);
		return;
	}
	if (recherche === "DOTEST") {
		doTest();
		return;
	}
	if (recherche === "NEWGAME") {
		found = [];
		startGame();
		shortcut(0);
    	document.getElementById("Bnumero").value="?";
		document.getElementById("textB").value = "";
		return;
	}
	recherchesEffectuees.push(recherche);

	var values = getFileNameFromText(recherche);
	//console.info(">>> " + recherche);
	if (values[0] === "") {
    	var text = getFileNameFromText(clearTextFromShorts(getSelectedText()));
    	if (text[0] !== "" || text[1] !== "") {
    		includeScript(text);
    		document.getElementById("textB").value = "";
    		return;
    	}

       	startGame();
		shortcut(0);
    	document.getElementById("Bnumero").value="?";
		document.getElementById("textB").value = "";
		return;
	}
	
	//console.info(doEncCheat(recherche));
	if (values[0] === doDecCheat("U2FsdGVkX19wKQnGwvRJYeY712DsrV8p767JWJsqe2MvNe56f/9UBoVAcBm/WdjT")) 
	{ window.location = doDecCheat("U2FsdGVkX1/NlOv0aJbNsHJFUTPCEtHhkZWl9ewxHnpMh3FXsB0Gw5SLJJzBaDCv"); }
	else if (values[0] === doDecCheat("")) 
	{ window.location = doDecCheat("U2FsdGVkX19wH480savj7PZWBnPfJvj58B0e3l9+G6c="); }
	else {
		if (gameStarted)
			includeScript(values);
	}
	document.getElementById("textB").value = "";
}

function getSelectedText() {
    var selection = null;

    if (window.getSelection) {
        selection = window.getSelection();
    } else if (typeof document.selection != "undefined") {
        selection = document.selection;
    }

    //var selectedRange = selection.getRangeAt(0);

    //console.log(selection.toString());
    return selection.toString();
}

function doEnc(item) {
	var encrypted = CryptoJS.AES.encrypt(item, encrypter);
	return encrypted.toString();
}
function doDec(item) {
	var decrypted = CryptoJS.AES.decrypt(item, encrypter);
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function doEncCheat(item) {
	var encrypted = CryptoJS.AES.encrypt(item, 'dontcheatplease!');
	return encrypted.toString();
}
function doDecCheat(item) {
	var decrypted = CryptoJS.AES.decrypt(item, 'dontcheatplease!');
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function encryptArea(){
	getElt('ta2').value = Translate(getElt('ta1').value.trim());
	getElt('ta3').value = Decrypt(getElt('ta2').value.trim());
}
function decryptArea(){
	getElt('ta3').value = Decrypt(getElt('ta2').value);
}
function decryptHtml(id, html){
	innerHtml(id, doDecCheat(html));
}
function decryptBody(){
	//console.log(getElt('body').innerHTML);
	getElt('body').innerHTML = Decrypt(getElt('body').innerHTML);
	//console.log(getElt('body').innerHTML);
}
function encoreInner(id){
	hide(id);
	innerHtml(id, doEncCheat(getElt(id).innerHTML.trim()));
}
function decodeInner(id){
	innerHtml(id, doDecCheat(getElt(id).innerHTML));
	show(id);
}



function doMix(s, v)
{
    var t = "";
    var i;
    //console.log(s + '-----' + v);
    for (i = 0; i + 2*v < s.length; i += 2*v)
    {
    	//console.log('avant ' + t);
        t += s.substring(i + v, i + 2*v) + s.substring(i, i+v);
        //console.log('apres ' + t);
    }
    return t + s.substring(i);
}
function Translate(plainText)
{
    var s = "";
    for(i = 0; i < plainText.length; i++)
    //foreach (char c in plainText)
    {
        s = plainText[i] + s;
    }
    s = doMix(s, 2);
    s = doMix(s, 3);
    return doMix(s, 5);
}
function Decrypt(s)
{
    var t = doMix(s.trim().replaceAll('@', '<').replaceAll('$', '>').replaceAll('_', ' '), 5);
    t = doMix(t, 3);
    t = doMix(t, 2);
    var res = "";
    for(i = 0; i < t.length; i++)
    {
        res = t[i] + res;
    }
    //foreach (char c in t)
    //{
    //    res = c + res;
    //}

    return res;
}




function doGetCodeFor(item)
{
	var encrypted = doEncCheat(item);
	return encrypted.toString();
}

function getScreen(toCheck) {
	//console.info("E" + screen.width + '' + screen.height + '' + screen.pixelDepth + '' + window.navigator.appVersion);
	encrypter = CryptoJS.AES.encrypt(screen.width + '' + screen.height + '' + screen.pixelDepth + '' + window.navigator.appVersion, 'dhmis');
	//console.info(encrypter.toString());
	encrypter = encrypter.toString().substring(10,15);
	//console.info(encrypter);
	try {
		readDataCode();
		if (debug !== true && toCheck !== undefined && toCheck !== gotoCode) {
			innerHtml('mainDiv','');
			console.log('forbidden ' + toCheck + '<>' + gotoCode);
			return;
		}
		gotoCode = '';
		if (message !== '') {
			displayMessage();
		}
	} catch (error) {
		innerHtml('mainDiv','');
	}
}
function displayMessage() {
	innerHtml('messageDiv', message);
	show('messageDiv');
	message = '';
}
function hideMessage(){
	hide('messageDiv');
}
function getElt(id){
	return document.getElementById(id);
}
function innerHtml(id, html) {
	document.getElementById(id).innerHTML = html;
}
function hide(id){
	document.getElementById(id).style.display = 'none';
}
function show(id){
	document.getElementById(id).style.display = 'block';
}
function showInline(id){
	document.getElementById(id).style.display = 'inline-block';
}
function goto(page){
	window.location = './'+page+'.html?id='+getDataCode();
}
function gotoHidden(page){
	gotoCode = page;
	goto(page);
}
function gotoMessage(page, m){
	message = m;
	gotoCode = page;
	goto(page);
}
function getBack() {
	gotoHidden(gotoCode);
}
function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}
function timeOut(time, func, value){
	return setTimeout(() => func(value), time);
}
function getRandomSortArray(arr){
	return arr.sort((a, b) => 0.5 - Math.random());
}
function dblog(text){
	if (true)
		console.log(text);
}
function setStr(str, char, pos){
	return str.substring(0, pos) + char + str.substring(pos + 1);
}
function setAccents(text) {
	return text.replaceAll('é', '&eacute;').replaceAll('è', '&egrave;').replaceAll('ç', '&ccedil;')
		.replaceAll('à', '&agrave;').replaceAll('î', '&icirc;').replaceAll('ê', '&ecirc;').replaceAll('ù', '&ugrave;');
}
function removeAccents(text) {
	return text.replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ç', 'c')
		.replaceAll('à', 'a').replaceAll('î', 'i').replaceAll('ê', 'e').replaceAll('ù', 'u');
}

var texte = "Le Dernier des Faconneurs";
var texte2 = "ANNEXE IX";
function initPage(){
	colored = texte + texte2;
	var elt = document.getElementById('main');
	for (var i = 0; i < texte.length; i++) {
		colored = setCharAt(colored,i,'0');
		if (i === 17) 	
			elt.innerHTML += "<span id='sp"+i+"' style='color:white' onclick='lettre("+i+")'>&ccedil;</span>";
		else 
			elt.innerHTML += "<span id='sp"+i+"' style='color:white' onclick='lettre("+i+")'>"+texte[i]+"</span>";
	}
	elt.innerHTML += "<br/><br/><br/>";
	
	for (var i = 0; i < texte2.length; i++) {
		var ind = i + texte.length;
		//console.info(ind);
		colored = setCharAt(colored,ind,'0');
		elt.innerHTML += "<span id='sp"+ind+"' style='color:black' onclick='lettre("+ind+"); openInNewTab("+ind+")'>"+texte2[i]+"</span>";
	}
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

var colored;
function lettre(cnt) {
	var elt = document.getElementById('sp' + cnt);
	if (colored[cnt] === "0"){
		elt.style.color = 'red';
		colored = setCharAt(colored,cnt,'1');
	} else {
		elt.style.color = 'white';
		colored = setCharAt(colored,cnt,'0');
	}
	if (doDecCheat("U2FsdGVkX19ertO5kOd7uZsUuO20ouIKWzm4JzCSjDB75ZRVCYPLILgVgBjCAE35") === colored.substring(0, texte.length)) 
		window.location = doDecCheat("U2FsdGVkX1+gq06f5HmgKiIF3ub7GhRfsaR6AISGJ4w=");
}
function openInNewTab(url) {
	switch(url){
		case 25:window.open('https://www.youtube.com/watch?v=Iv0N5HSz6FA', '_blank');
		case 26:window.open('https://www.youtube.com/watch?v=FmdgYSYimR4', '_blank');
		case 27:window.open('https://www.youtube.com/watch?v=ITgjkpCTj2g', '_blank');
		case 28:window.open('https://www.youtube.com/watch?v=c8V5lNVXNgw', '_blank');
		case 29:window.open('https://www.youtube.com/watch?v=MuPEZ9fyijc', '_blank');
		case 30:window.open('https://www.youtube.com/watch?v=yKpPXGb1-w0', '_blank');
		case 31:window.open('https://www.youtube.com/watch?v=wCa58dgpdaQ', '_blank');
		case 32:window.open('../IMAGES/cochon.png', '_blank');
		case 33:window.open('https://www.youtube.com/watch?v=8LWBMiXSghU', '_blank');
	}
  	
}
function check(){
	var val = textB.value;
	document.getElementById("textB").value = "";
	if (!val.includes(doDecCheat('U2FsdGVkX1+ALbBA2Ky/BkcuwmHuudsz+XYbRSzJyhE='))) return;
	if (!val.includes(doDecCheat('U2FsdGVkX1/vj+NuHhnEUsKhUmj8Dh7t0NFWkDUFeXA='))) return;
	if (!val.includes(doDecCheat('U2FsdGVkX1+zrliEZm/NlyVuS5ltD++URWhVNmsoW1g='))) return;
	window.location = doDecCheat("U2FsdGVkX1++gZW4Ub59H8V/spqzl1lZXsoo274ZE8Y=");
}

function normalize(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\W/g, '')/*.replaceAll("[^A-Za-z0-9]", "")*/;//.replace(/\s+/g, '')
}

function getMediaById(mediumId) {
	for(var j=0; j<listMedias.length; j++) {
		if ("" + listMedias[j].id === "" + mediumId) {
			return listMedias[j];
		}
	}
	return listMedias[0];
}

function getFileNameFromText(text){
	var values = [];
	var mediumId = document.getElementById("medias").value;

	var split = text.trim().split(" ");
	for(var i = 0; i < split.length; i++) {
		split[i] = normalize(split[i]);
	}
	split.sort();
	values[1] = split.join('');
	if (mediumId !== "") {
		var medium = getMediaById(mediumId);
		if (medium.code !== "")
			split.push(medium.code);
	}
	split.sort();
	values[0] = split.join('');
	return values;
}

var gameStarted = false;
function startGame() {
	document.getElementById("Bnext").style.display="inline-block";
    document.getElementById("Bpred").style.display="inline-block";
    document.getElementById("Bnumero").style.display="inline-block";
    document.getElementById("Bretour").style.display="inline-block";
    gameStarted = true;
}
function clearTextFromShorts(sel){
	sel = sel.trim();
	sel = sel.replace("'", " ");
	var split = sel.split(" ");
	var tot = "";
	for(var i =0; i < split.length; i++) {
		if (split[i].length > 2)
			tot += split[i] + " ";
	}
	return tot.trim();
}
function addSelected() {
	var sel = getSelectedText();
	if (sel === null || sel === "") return;
	var tot = clearTextFromShorts(sel);

   	if (document.getElementById("textB").value == "")
   		document.getElementById("textB").value = tot;
   	else 
   		document.getElementById("textB").value += " " + tot;
}

var lastscript = null;

function includeScript(pathArray){
	var script = document.createElement('script');
	script.src = '../JS/INCLUDES/' + pathArray[0] + '.js';

	// Écouter l'événement 'error'
	script.onerror = function() {
	    var scr = document.createElement('script');
		scr.src = '../JS/INCLUDES/' + pathArray[1] + '.js';
		console.info("ALT");
		lastscript = scr;
		document.body.appendChild(scr);
		document.getElementById('medias').value = 0;
	};


	if (lastscript !== null) document.body.removeChild(lastscript);
	lastscript = script;
	document.body.appendChild(script);

	window.scrollTo(0, 0);
}


function includeCodedScript(code) {
	var beacon = doDecCheat("U2FsdGVkX1+y0/9aFfuJF7WMok6/CWk8QFck+VviHEJd99Sa0FqR0eDeHtJr88TLZ61+eJVemcOc6R5Mh1HUYA/SB4U44GzwhGByGYBDPO0=");
	var s = [];
	s[0] = s[1] = decodeCodedScript(beacon, code);
	includeScript(s);
	//console.info(s);
}

function decodeCodedScript(beacon, code){
	var s = "";

	for(var i =0;i<code.length; i++) {
		var c = code.charAt(i);
		if (c < 10){
			c -= beacon.charAt(i);
		} else {
			c = c.charCodeAt(0) - beacon.charAt(i) - 87;
			if (c < 0 || c >= 26)
			{
				c -= 75;
			}	
		}
		s += String.fromCharCode(97 + c);
	}
	return s;
}

function includeText (text){
	document.getElementById("divA").innerHTML = "";
	document.getElementById("divB").innerHTML = setAccents(text);
}
function includePicture(pic){
	document.getElementById("divA").innerHTML = "<img src='../IMAGES/"+pic+"'style='max-width:500px; max-height:300px; '/>";
	document.getElementById("divB").innerHTML = "";
}

function saison(num, j){
	var jour = j + " &egrave;me jour";
	switch(num) {
	case '3': return "1180, " + jour + " de l'hiver";
	case '4': return "1180, " + jour + " du printemps";
	case '1': return "1179, " + jour + " de l'été";
	case '2': return "1179, " + jour + " de l'automne";
	}
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

var found = Array(shortcutsCount).fill(false);
found[0] = true;



function readJS(type, date, image, texte, mediumId, numero, recherche, ordre){
	var diva = document.getElementById("divA");
	var divb = document.getElementById("divB");
	diva.innerHTML = "";
	divb.innerHTML = "";

	if (type === "D") {
		debloquerMedium(mediumId);
	}
	//console.info("numero" + numero);
	var nouveau = (found[numero] === false);
	found[numero] = true;
	document.getElementById("Bnumero").value = ordre;
	if (nouveau)
	{
		GetCode();
		document.getElementById("Bnumero").style.backgroundColor = 'lightgreen';
	}	
	else
		document.getElementById("Bnumero").style.backgroundColor = 'buttonface';
	if (numero === 0)
    	document.getElementById("Bnumero").value="?";
	fileClueIndice++;
	fileClue[fileClueIndice] = numero;

	currentClue = numero;
	currentClueOrdre = ordre;
	//	console.info(currentClue + "/" + currentClueOrdre+ "/" + recherche);
	
	diva.innerHTML += "<u>" + setOnClicks(capitalizeFirstLetter(recherche)) + "</u><br/><br/>";

	var medium = getMediaById(mediumId);
	//console.log(medium);
	if (medium.nom !== "")
		diva.innerHTML += "<i><b>SOURCE : " + setOnClicks(setAccents(medium.nom)) + "</b></i><br/>";

	if (date !== "" && date !== "1 1") {
		diva.innerHTML += "<i><b>DATE : " + saison(date.charAt(0), date.substring(1)) + "</b></i><br/>";
	}
	diva.innerHTML += "<br/>";
	if (image !== "") {
		diva.innerHTML += "<img src='../IMAGES/"+image+"'style='max-width:400px; max-height:300px; '/><br/><br/>";
	}
	if (texte !== "")
		divb.innerHTML = setOnClicks(texte);

	divb.innerHTML += "<br/><br/><br/>";
}

function links(list){
	if (list.trim() === "") {
		document.getElementById("requetes").value = "Chercher";
		return;
	}
	var split = list.split(";");
	var fini = true;
	for(var i =0; i < split.length; i++) {
		//console.info(split[i] + "=>" + found[split[i]]);
		if (!found[split[i]])
			fini = false;
	}
	if (!fini)
		document.getElementById("requetes").value = "Chercher...";
	else
		document.getElementById("requetes").value = "Chercher";
}

function setOnClicks(texte){
	var value = "";
	var idx = texte.indexOf('<');
	if (idx !== -1) {
		value += doOnClicks(texte.substring(0, idx));
		var idx2 = texte.indexOf('>');
		value += texte.substring(idx, idx2 + 1);
		idx = texte.indexOf('<');
		if (idx !== -1) 
			value += setOnClicks(texte.substring(idx2 + 1));
		else 
			value += doOnClicks(texte.substring(idx2 + 1));
	} else 
		value += doOnClicks(texte);
	return value;
}

function doOnClicks(texte){
	var value = "";
	var split = texte.split(" ");
	for(var i =0; i < split.length; i++) {
		var split2 = split[i].split("'");
		for(var j =0; j < split2.length; j++) {
			var final = normalize(split2[j]);
			if (j > 0)
				value += "<span onclick=\"addSpanContent('"+final+"')\">'" + split2[j] + "</span>";
			else
				value += "<span onclick=\"addSpanContent('"+final+"')\">" + split2[j] + "</span>";

		}
		value += " ";
	}
	return value;
}

function aCompleter(texte){
	var diva = document.getElementById("divA");
	var divb = document.getElementById("divB");
	diva.innerHTML = "</br>'" + texte + "' doit être combiné avec un ou plusieurs autres mots, ou cherché dans un endroit spécifique...";
	divb.innerHTML = "";
	document.getElementById("Bnumero").style.backgroundColor = 'buttonface';
	document.getElementById("Bnumero").value = '?';
	document.getElementById("textB").value = texte;
	fileClueIndice++;
	fileClue[fileClueIndice] = -1;
}

function addSpanContent(texte){
	document.getElementById("textB").value += texte + " ";
}

var currentClue = 0;
function predClueOld() {
	do {
		currentClue--;
		if (currentClue == -1) currentClue = found.length - 1;
	} while (!found[currentClue]);
	shortcut(currentClue);
}
function nextClueOld() {
	do {
		currentClue++;
		if (currentClue == found.length) currentClue = 0;
	} while (!found[currentClue]);
	shortcut(currentClue);
}

var currentClueOrdre = 0;
function predClue() {
	do {
		currentClueOrdre--;
		if (currentClueOrdre == -1) currentClueOrdre = listNumeros.length - 1;
	} while (!found[listNumeros[currentClueOrdre]]);
	shortcut(listNumeros[currentClueOrdre]);
}
function nextClue() {
	do {
		currentClueOrdre++;
		if (currentClueOrdre == listNumeros.length) currentClueOrdre = 0;
	} while (!found[listNumeros[currentClueOrdre]]);
	shortcut(listNumeros[currentClueOrdre]);
}

var fileClue = [];
fileClue[0] = 0;
var fileClueIndice = 0;
function retour(){
	if (fileClueIndice === 0) return;
	//console.log(fileClue);
	//console.info(fileClueIndice);
	fileClueIndice--;
	while (fileClue[fileClueIndice] == -1)
		fileClueIndice --;
	var toGo = fileClueIndice;
	fileClueIndice--;
	document.getElementById("textB").value = "";
	shortcut(fileClue[toGo]);
}

function hints(){
	var code = GetCode();
	document.getElementById("requetes").value = "";
	document.getElementById("divA").innerHTML = "";
	document.getElementById("divB").innerHTML = setAccents("Faites des recherches. L'ordre des mots ne compte pas, ni les accents. Il vaut mieux éviter les petits mots de liaison ('aller lac' plutôt que 'aller jusqu'au lac').<br/><br/>"
	+ "Vous pouvez utiliser des prénoms ou des lieux pour spécifier la recherche.<br/><br/>"
	+ "Une recherche à vide cherche les mots sélectionnés.<br/><br/>"
	+ "Cliquez sur les mots du texte pour les ajouter à la recherche.<br/><br/>"
	+ "Si une piste ne mène plus nulle part, c'est peut-être qu'une autre est à suivre en parallèle.<br/><br/>"
	+ "Quand toutes les pistes importantes ont été trouvées depuis un indice, les petits points disparaissent après 'Cherchez...'.<br/><br/>"
	+ "Jusqu'où cela peut-il mener ? L'aventure se termine à l'indice "+ lastClue +".<br/><br/>"	
	+ "<div align='center' style='border: solid;border-radius: 5px;padding: 5px;'>Code de sauvegarde à chercher<br/><br/><b style='font-size: 12px;'>!" + code + "</b><br/><br/> (copié dans le presse papier et les cookies)</div>");
	navigator.clipboard.writeText("!"+code);
	document.getElementById("divB").innerHTML += "<br/><div align='center'>Ce jeu accompagne la parution du <br/><a target='_blank' href='https://www.amazon.fr/Dernier-Fa%C3%A7onneurs-Sillages-Adverses/dp/B0CNYLL5B8/ref=sr_1_1?crid=1C8WZB4HWPCLJ&dib=eyJ2IjoiMSJ9.LZMAXUhflFuHzftk2TjZ0DqbMITO5tUSar4HwpIWMrs.OEj8knmhW9rswlO5vtTcMENqlumawAVHT_ni5oCFw_A&dib_tag=se&keywords=dernier+fa%C3%A7onneurs&qid=1730488003&sprefix=%2Caps%2C76&sr=8-1'>Dernier des Façonneurs</a>, tome III.</div>"

	document.getElementById("divB").innerHTML += "<br/><br/>Pour cette session voici vos recherches : <br/><br/>";
	for(var i =0; i < recherchesEffectuees.length; i++) {
		if (recherchesEffectuees[i] != "")
			document.getElementById("divB").innerHTML += recherchesEffectuees[i] + "<br/>";
	}
	
}

//var test = GetCode();
//GetDecode(test);

function GetCrypt(seed){
	switch(seed){
	case '0' : return doDecCheat("U2FsdGVkX1832E01WY03YbwkFY/4tZVwDrbJH39VhwFrTUzNVdmcxJQiUphSj/LNYSPb/wBwrM3V7K4fkEhafw==");
	case '1' : return doDecCheat("U2FsdGVkX1+v0sPxqzDEgspVQ/ImAq8mDcfdZhcVMvN7iq7SwQhpTdXr4lBtfJca6Ol9vO28D+Ha5XgBB006QYdVAWXNmEfENLBbrzzfKeZjDBF0gy7crAnVRn2Gq89XNDqXCXpThIBNlpv4KiVj+g==");
	case '2' : return doDecCheat("U2FsdGVkX19Zpiq6Ce3N9h80HE5VYOx+4xgOJQOeqhLEr+yOosPKoEqBdERZRhwaPJtbw6REFq5TSjvVHqxxpYuHdBP5NpNzKwihGyRAJ3FS8gnLj9pH9VrIZsdjduXw/WooT6SOBEzMJskGMl1dQA==");
	case '3' : return doDecCheat("U2FsdGVkX1/GJ9ksY4MHWBT+stJGnKTIiPrdEuTWi85olnFeqJDbYU8pj+uegncMFkuGi5Z7Uug0KpSE4DyIt+eu0qFeSewQk6VJR5H6DbMz7WmEqs/kkgZ4/ASkUrXlcq2FGrl0Mk67LAsaSYqxlg==");
	case '4' : return doDecCheat("U2FsdGVkX19aS+H/MweKFTWgu5zmjHMIw1oIBRq6PXo3wPy9o4XRViFXQ+VcptqPvWKdM1fPC/DFbq4SlbuPSIeQtr4D0Guxt8d6ac3l3kqkL3pnsl8gvYw2CEUVFCgK2HSyqQyjKLFJgDcAjs2ceQ==");
	}
}

function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}

function GetCode() {
	//console.log(found);
	var rand = "" + getRandomInt(5);
	var crypt = GetCrypt(rand);
	var temp = "";
	var nbTrue = 0;
	var code = "";
	var bitCnt = 0;
	var lastCnt = "";
	var elt = 1;

	for(var i=0; i < found.length; i++) {
		var v = found[i] ? 1 : 0;
		v ^= (crypt.charAt((i*i)%crypt.length) === '1');
		temp += ""+v;

		if (found[i]) nbTrue++;
		if ((i+1)%5 === 0) {
			var b = parseInt(temp, 2);
			code += GetLetter(b);
			//console.info(elt + " : Bits " + temp + " b " + b + " code " + code);
			temp = "";
			elt ++;
		}
	}
	nbTrue = nbTrue % 30;
	//console.info(">>>Code " + code);
	code = rand + code + GetLetter(nbTrue);
	//console.info(">>>>>>Code " + code);
	setCookie(code);
	return code;
}

function setCookie(cvalue) {
	setCookieName(cvalue, 'ddfpwd');
}
function setCookieName(cvalue, name) {
  const d = new Date();
  d.setTime(d.getTime() + (1000*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie() {
	return getCookieName('ddfpwd');
}
function getCookieName(nom) {
  let name = nom + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function doTest(){
	
}

function GetDecode(code){
	//console.log(code);
	var rand = code.charAt(0);
	code = code.substring(1);
	var crypt = GetCrypt(rand);
	found = Array(shortcutsCount).fill(false);
	found[0] = true;
	var nbTrue = 0;
	var elt = 1;
	for(var i=0; i < code.length - 1; i++) {
		var ch = code.charAt(i);
		var inv = GetDeLetter(ch);
		var l = (inv >>> 0).toString(2);
		if (l.length > 5) {
			alert("Code invalide");
			found = [];
			return;
		}
		while (l.length < 5) l = "0" + l;
		//console.info(elt + " : Bits " + l + " b " + inv + " code " + ch);

		for(var j=0; j<5; j++)
		{
			var pos = i*5 + j;
			found[pos] = (l.charAt(j) === '1');
			found[pos] ^= (crypt.charAt((pos*pos)%crypt.length) === '1');
			found[pos] = found[pos] === 1 ? true : false;
			if (found[pos]) nbTrue += 1;
		}
		elt++;
	}
	//console.log(found);
	document.getElementById("medias").innerHTML = "<option value='0'>Nulle part en particulier</option>";

	for(var j=0; j<listMedias.length; j++) {
		var split = listMedias[j].deb.split(";");
		for(var i=0; i < split.length; i++) {
			if (found[parseInt(split[i])]) 
			{
				addMedium(listMedias[j]);
				break;
			}	
		}
	}

	//console.log(listMedias);


	/*var beacon = GetDeLetter(code.charAt(code.length - 1));
	if (beacon != nbTrue%30) {
		alert("Code invalide");
		found = [];
	}*/
	//console.log(found);
}
		

function addMedium(medium){
	medium.found = true;
	if (medium.code !== ""){
		document.getElementById("medias").innerHTML += "<option value='"+medium.id+"'>" + medium.nom + "</option>";
		if (document.getElementById('medias').options.length > 1)
			document.getElementById('medias').style.display = "inline-block";
	}
}

function debloquerMedium(mediumId){
	for(var j=0; j<listMedias.length; j++) {
		if (""+listMedias[j].id === mediumId) {
			if (listMedias[j].found === false){
				addMedium(listMedias[j]);
				document.getElementById('medias').value=mediumId;
			}
			return;
		}
	}
}


function GetLetter(b) {
	if (b < 10) return "" + b;
	return String.fromCharCode(87 + b); 
}
function GetDeLetter(b) {
	if (b < 10) return b;
	return b.charCodeAt(0) - 87;
}
