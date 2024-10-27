
var encrypter;
var debug = false;
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
	console.log("case '" + item + "': break;//" + encrypted.toString());
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
		case 27:window.open('../IMAGES/miroir.jpg', '_blank');
		case 28:window.open('https://www.youtube.com/watch?v=c8V5lNVXNgw', '_blank');
		case 29:window.open('https://www.youtube.com/watch?v=MuPEZ9fyijc', '_blank');
		case 30:window.open('https://www.youtube.com/watch?v=6OenzW3ODsI', '_blank');
		case 31:window.open('https://www.youtube.com/watch?v=wCa58dgpdaQ', '_blank');
		case 32:window.open('../IMAGES/cochon.png', '_blank');
		case 33:window.open('https://theflatearthsociety.org/home/index.php', '_blank');
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
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replaceAll("[^A-Za-z0-9]", "");//.replace(/\s+/g, '')
}

function getFileNameFromText(text){
	var split = text.trim().split(" ");
	for(var i = 0; i < split.length; i++) {
		split[i] = normalize(split[i]);
	}
	split.sort();
	return split.join('');
}
function startGame() {
	 document.getElementById("Bnext").style.display="inline-block";
    document.getElementById("Bpred").style.display="inline-block";
    document.getElementById("Bnumero").style.display="inline-block";
    document.getElementById("Bselect").style.display="inline-block";
}

function addSelected() {
   console.log(document.getSelection());
   document.getElementById("textB").value += document.getSelection() + " ";
};

function requete(){
	var recherche = document.getElementById("textB").value;
	console.info("<<< " + recherche + " "+ recherche.substring(0,1));
	if (recherche.substring(0,1) === "!"){
		GetDecode(recherche.substring(1));
		nextClue();
		startGame() ;
		console.log(found);
		return;
	}
	var recherche = getFileNameFromText(recherche);
	console.info(">>> " + recherche);
	if (recherche === "") {
		if (window.getSelection) {
        	var text = getFileNameFromText(window.getSelection().toString());
        	if (text !== "") {
        		includeScript(text);
        		return;
        	}
        }
       	startGame();
		shortcut(0);
		return;
	}
	
	console.info(doEncCheat(recherche));
	if (recherche === doDecCheat("U2FsdGVkX19wKQnGwvRJYeY712DsrV8p767JWJsqe2MvNe56f/9UBoVAcBm/WdjT")) 
	{ window.location = doDecCheat("U2FsdGVkX1/NlOv0aJbNsHJFUTPCEtHhkZWl9ewxHnpMh3FXsB0Gw5SLJJzBaDCv"); }
	else if (recherche === doDecCheat("")) 
	{ window.location = doDecCheat("U2FsdGVkX19wH480savj7PZWBnPfJvj58B0e3l9+G6c="); }
	else includeScript(recherche);
	document.getElementById("textB").value = "";
}

var lastscript = null;
function includeEncScript(path){
	includeScript(doDecCheat(path));
}
function includeScript(path){
	var script = document.createElement('script');
	script.src = '../JS/INCLUDES/' + path + '.js';
	console.info(script.src);
	if (lastscript !== null) document.body.removeChild(lastscript);
	lastscript = script;
	document.body.appendChild(script);
}

function includeCodedScript(code) {
	var s = "";
	var beacon = doDecCheat("U2FsdGVkX1+y0/9aFfuJF7WMok6/CWk8QFck+VviHEJd99Sa0FqR0eDeHtJr88TLZ61+eJVemcOc6R5Mh1HUYA/SB4U44GzwhGByGYBDPO0=");
	//console.info(beacon + "=>" + code);
	for(var i =0;i<code.length; i++) {
		var c = code.charAt(i);
		//console.info("c>>" + c);
		if (c < 10){
			c -= beacon.charAt(i);
			//console.info("c1>>" + c);
		} else {
			//console.info("c2>>" + c);
			c = c.charCodeAt(0) - beacon.charAt(i) - 87;
			//console.info("c2>>" + c);
		}
		s += String.fromCharCode(97 + c);
		//console.info(">>" + s);
	}
	//console.info(">>>>>>" + s);
	includeScript(s);
}

function includeText (text){
	document.getElementById("divA").innerHTML = setAccents(text);
}
function includePicture(pic){
	document.getElementById("divA").innerHTML = "<img src='../IMAGES/"+pic+"'style='max-width:500px; max-height:300px; '/>";
}

function saison(num, j){
	var jour = j + "&egrave;me jour";
	switch(num) {
	case '3': return "1180, " + jour + " de l'hiver";
	case '4': return "1180, " + jour + " du printemps";
	case '1': return "1179, " + jour + " de l'été";
	case '2': return "1179, " + jour + " de l'automne";
	}
}

var found = Array(shortcutsCount).fill(false);
found[0] = true;

function readJS(type, date, image, texte, medium, numero){
	document.getElementById("divA").innerHTML = "";
	console.info("numero" + numero);
	if (type === "C") 
	{
		found[numero] = true;
		document.getElementById("Bnumero").value = numero;
	} else {
		document.getElementById("Bnumero").value = "X";
	}

	if (medium !== "")
		document.getElementById("divA").innerHTML += "<i>" + setAccents(medium) + "</i><br/>";

	if (date !== "" && date !== "1 1") {
		document.getElementById("divA").innerHTML += saison(date.charAt(0), date.substring(1)) + "<br/>";
	}
	if (image !== "") {
		document.getElementById("divA").innerHTML += "<img src='../IMAGES/"+image+"'style='max-width:500px; max-height:300px; '/><br/><br/><br/>";
	}
	if (texte !== "")
		document.getElementById("divA").innerHTML += setAccents(texte);
}

var currentClue = 0;
function predClue() {
	do {
		currentClue--;
		if (currentClue == -1) currentClue = found.length - 1;
	} while (!found[currentClue]);
	shortcut(currentClue);
}
function nextClue() {
	do {
		currentClue++;
		if (currentClue == found.length) currentClue = 0;
	} while (!found[currentClue]);
	shortcut(currentClue);
}

function hints(){
	var code = GetCode();
	document.getElementById("divA").innerHTML = setAccents("Faites des recherches. L'ordre des mots ne compte pas, ni les accents. Il vaut mieux éviter les petits mots de liaison ('aller lac' plutôt que 'aller jusqu'au lac')<br/>"
	+ "Vous pouvez utiliser des prénoms ou des lieux pour spécifier la recherche.<br/>"
	+ "Une recherche à vide cherche les mots sélectionnés dans le texte.<br/>"
	+ ">>> ajoute les mots sélectionnés à la recherche<br/>"
	+ "Code de sauvegarde à chercher : !" + code + " (copié dans le presse papier)");
	navigator.clipboard.writeText("!"+code);
}

function GetCode() {
	/*for(var i=0; i < 20; i++) {
		found[i] = i%3 === 0;
	}*/
	var crypt = doDecCheat("U2FsdGVkX1832E01WY03YbwkFY/4tZVwDrbJH39VhwFrTUzNVdmcxJQiUphSj/LNYSPb/wBwrM3V7K4fkEhafw==");
	var temp = "";
	var nbTrue = 0;
	var code = "";
	var bitCnt = 0;
	var lastCnt = "";
	for(var i=0; i < found.length; i++) {
		var v = found[i] ? 1 : 0;
		v ^= (crypt.charAt((i*i)%crypt.length) === '1');
		temp += ""+v;

		if (found[i]) nbTrue++;
		if ((i+1)%5 === 0) {
			//console.info("Bits " + temp);
			var b = parseInt(temp, 2 );
			//console.info("b " + b);
			code += GetLetter(b);
			//console.info("Code " + code);
			temp = "";
		}
	}
	nbTrue = nbTrue % 30;
	//console.info(">>>Code " + code);
	code += GetLetter(nbTrue);
	//console.info(">>>>>>Code " + code);
	return code;
}

function GetDecode(code){
	//console.log(found);
	var crypt = doDecCheat("U2FsdGVkX1832E01WY03YbwkFY/4tZVwDrbJH39VhwFrTUzNVdmcxJQiUphSj/LNYSPb/wBwrM3V7K4fkEhafw==");
	var nbTrue = 0;
	for(var i=0; i < code.length - 1; i++) {
		var l = GetDeLetter(code.charAt(i));
		l = l.toString(2);
		while (l.length < 5) l = "0" + l;
		//console.info("l " + l);
		for(var j=0; j<5; j++)
		{
			var pos = i*5 + j;
			found[pos] = (l.charAt(j) === '1');
			found[pos] ^= (crypt.charAt((pos*pos)%crypt.length) === '1');
			found[pos] = found[pos] === 1 ? true : false;
			if (found[pos]) nbTrue += 1;
		}
	}
	var beacon = GetDeLetter(code.charAt(code.length - 1));
	if (beacon != nbTrue%30) {
		alert("Code invalide");
		found = [];
	}
	//console.log(found);
}

function GetLetter(b) {
	if (b < 10) return "" + b;
	return String.fromCharCode(87 + b); 
}
function GetDeLetter(b) {
	if (b < 10) return b;
	return b.charCodeAt(0) - 87;
}
