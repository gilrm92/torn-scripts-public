// ==UserScript==
// @name         Torn Poker Mugger
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Helps you to keep eye on your poker target
// @author       CrowleyJr[2827691]
// @match        https://www.torn.com/page.php?sid=holdem
// @icon         https://img.icons8.com/?size=100&id=571&format=png&color=000000
// @grant        GM_xmlhttpRequest
// @connect      data.mongodb-api.com
// @connect      api.torn.com
// ==/UserScript==

(function() {
    'use strict';

    const _0x54b33c=_0x4831;(function(_0x41398f,_0x347f87){const _0x51626d=_0x4831,_0xc476c2=_0x41398f();while(!![]){try{const _0x35ce50=-parseInt(_0x51626d(0x141))/0x1+-parseInt(_0x51626d(0xee))/0x2*(-parseInt(_0x51626d(0x103))/0x3)+-parseInt(_0x51626d(0x100))/0x4*(parseInt(_0x51626d(0x126))/0x5)+-parseInt(_0x51626d(0x10c))/0x6+parseInt(_0x51626d(0x115))/0x7+-parseInt(_0x51626d(0x10e))/0x8+parseInt(_0x51626d(0x109))/0x9;if(_0x35ce50===_0x347f87)break;else _0xc476c2['push'](_0xc476c2['shift']());}catch(_0xbe4cfa){_0xc476c2['push'](_0xc476c2['shift']());}}}(_0x3bbe,0x980e5));const mongoDbApiKey=_0x54b33c(0xec);function _0x4831(_0xa11a20,_0x4bd93f){const _0x3bbe70=_0x3bbe();return _0x4831=function(_0x483194,_0x58892d){_0x483194=_0x483194-0xe1;let _0x502e58=_0x3bbe70[_0x483194];return _0x502e58;},_0x4831(_0xa11a20,_0x4bd93f);}function getCookie(_0x9134f2){const _0x360bbc=_0x54b33c,_0x54713b=';\x20'+document[_0x360bbc(0xf1)],_0x9b115d=_0x54713b[_0x360bbc(0x13b)](';\x20'+_0x9134f2+'=');if(_0x9b115d[_0x360bbc(0xe8)]===0x2)return _0x9b115d[_0x360bbc(0x113)]()[_0x360bbc(0x13b)](';')[_0x360bbc(0xe9)]();}function _0x3bbe(){const _0x6d0853=['td:eq(2)','val','tr.empty','<button\x20class=\x22prepare-attack\x22>','pop','attr','1809780uiClaF','entries','POST','money','responseText','type','td:eq(4)','catch','document','application/json','GET','closest','toggle','<tr\x20class=\x22empty\x22><td\x20colspan=\x225\x22>Nothing\x20here\x20yet</td></tr>','?selections=basic&key=','forEach','toISOString','5lOkdWd','#menu-icon','append','td:eq(3)','<td>','Start\x20Watching','div[class*=\x22playerPositioner\x22]','open','<tr\x20class=\x22','torn-targets','00:00','stringify','innerHTML','data','p[class*=\x22name\x22]','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','green-row','style','orange-row','body','setItem','split','TargetId','html','https://data.mongodb-api.com/app/data-bktfwww/endpoint/data/v1/action/findOne','toString','targetinfo','990470vlqESf','description','https://api.torn.com/user/','replace','_blank','trim','#api-key','#on-table\x20tbody','click','#floating-panel','torn_api_key','keys','<td\x20class=\x22money-cell\x22>','uid','Prepare\x20attack','<tr>','data-name','length','shift','https://www.torn.com/loader.php?sid=attack&user2ID=','.money-cell','ANzidlaMeGOZGM2jXPMuPKq4XXO362BO22bo8AUiAvdzZkfyZt0Xa59dKfgKijSH','find','71626AEoBVA','createElement','red-row','cookie','level','getItem','remove','map','#leavers\x20tbody','#start-watching','<button\x20class=\x22attack-button\x22>Attack</button>','https://data.mongodb-api.com/app/data-bktfwww/endpoint/data/v1/action/insertOne','parse','name','then','<button\x20class=\x22attack-button\x22>','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22menu-icon\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22floating-panel\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20for=\x22api-key\x22>API\x20Key:</label>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22api-key\x22/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>How\x20to\x20use:\x20You\x20should\x20put\x20your\x20API\x20key\x20and\x20it\x20will\x20save\x20for\x20future\x20uses.\x20After\x20that,\x20you\x20choose\x20a\x20poker\x20table\x20and\x20when\x20ready,\x20click\x20on\x20\x22Start\x20watching\x22.\x20This\x20will\x20enable\x20the\x20table\x20where\x20you\x20should\x20be\x20able\x20to\x20see\x20the\x20players\x20currently\x20in\x20the\x20table,\x20ordered\x20by\x20their\x20money\x20in\x20hand.\x20If\x20the\x20player\x20is\x20not\x20registered\x20yet\x20in\x20our\x20database,\x20we\x20politely\x20ask\x20you\x20to\x20get\x20his\x20ID\x20and\x20save\x20in\x20the\x20text\x20field\x20in\x20the\x20column\x20ID.\x20This\x20will\x20make\x20the\x20future\x20uses\x20automatically.\x20Once\x20a\x20player\x20leaves\x20the\x20table,\x20we\x20will\x20pop\x20his\x20name\x20to\x20the\x20\x22Leavers\x22\x20table,\x20where\x20you\x20can\x20see\x20how\x20long\x20since\x20they\x20left.\x20We\x20advise\x20to\x20attack\x20right\x20after\x20the\x20player\x20leaves,\x20so\x20you\x20have\x20high\x20chances\x20of\x20getting\x20a\x20good\x20mug.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22start-watching\x22>Start\x20Watching</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22tables\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3>Leavers</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20id=\x22leavers\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Name</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Time\x20Since\x20Left</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Action</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22empty\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20colspan=\x223\x22>Nothing\x20here\x20yet</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3>On\x20the\x20Table</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22on-table-container\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20id=\x22on-table\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Name</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Money</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Level</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Action</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22empty\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20colspan=\x225\x22>Nothing\x20here\x20yet</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','input','448124Jnlxaz','join','Save','54RhwWOc','tr[data-name=\x22','toLocaleString','<tr\x20class=\x22empty\x22><td\x20colspan=\x223\x22>Nothing\x20here\x20yet</td></tr>','padStart','tornscript','14562711cRlfLS','text','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>','3652176tejDBh','appendChild','1497880awWbCo'];_0x3bbe=function(){return _0x6d0853;};return _0x3bbe();}const userId=getCookie(_0x54b33c(0xe4));function isUserAllowed(_0x59c95a){return new Promise((_0x3bc897,_0x14497f)=>{const _0xbf90cc=_0x4831;GM_xmlhttpRequest({'method':_0xbf90cc(0x117),'url':_0xbf90cc(0x13e),'headers':{'Content-Type':_0xbf90cc(0x11e),'api-key':
	DbApiKey},'data':JSON[_0xbf90cc(0x131)]({'dataSource':_0xbf90cc(0x108),'database':'torn-targets','collection':'allowedplayers','filter':{'playerId':_0x59c95a}}),'onload':function(_0x36e2a3){const _0x4c30bf=_0xbf90cc,_0x6ad86e=JSON[_0x4c30bf(0xfa)](_0x36e2a3[_0x4c30bf(0x119)]);_0x6ad86e[_0x4c30bf(0x11d)]?_0x3bc897(!![]):_0x3bc897(![]);},'onerror':function(){_0x14497f();}});});}isUserAllowed(userId)[_0x54b33c(0xfc)](_0x30304f=>{const _0x11a705=_0x54b33c;if(!_0x30304f)return;function _0x53c1d8(_0x56fbf8){const _0x177e4f=_0x4831,_0x284f59=document['getElementsByTagName']('head')[0x0];if(!_0x284f59)return;const _0x2198ac=document[_0x177e4f(0xef)](_0x177e4f(0x137));_0x2198ac[_0x177e4f(0x11a)]='text/css',_0x2198ac[_0x177e4f(0x132)]=_0x56fbf8,_0x284f59[_0x177e4f(0x10d)](_0x2198ac);}_0x53c1d8('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#menu-icon\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2050px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2050px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20white\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20url(\x27https://img.icons8.com/?size=100&id=571&format=png&color=000000\x27)\x20no-repeat\x20center\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-size:\x2030px\x2030px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x201000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x204px\x208px\x20rgba(0,\x200,\x200,\x200.1);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20background\x200.3s;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#floating-panel\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x2070px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20400px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#ccc;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x204px\x2012px\x20rgba(0,\x200,\x200,\x200.15);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x201000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#floating-panel\x20label\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20block;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#floating-panel\x20input[type=\x22text\x22]\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#ccc;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#floating-panel\x20p\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#555;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20line-height:\x201.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#start-watching\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#28a745;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20background\x200.3s;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#start-watching:hover\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#218838;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#tables\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#tables\x20h3\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2016px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#333;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#leavers,\x20#on-table\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20black;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20table,\x20th,\x20td\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#ccc;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20th,\x20td\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x205px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20th\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#f2f2f2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20td\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20#ccc\x20solid\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.empty\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#777;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-style:\x20italic;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.button-table\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x206px\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#28a745;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20background\x200.3s;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.button-table:hover\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#00a500;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.prepare-attack\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x206px\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#dc3545;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20background\x200.3s;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.prepare-attack:hover\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#c82333;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#on-table-container\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-height:\x20400px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow-y:\x20auto;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.green-row\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#d4edda\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.orange-row\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#fff3cd\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.red-row\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#f8d7da\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.attack-button\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x206px\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#dc3545;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20background\x200.3s;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.attack-button:hover\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#c82333;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'),$(_0x11a705(0x139))[_0x11a705(0x128)](_0x11a705(0xfe)),$(_0x11a705(0x127))[_0x11a705(0x149)](function(){const _0x5178d7=_0x11a705;$(_0x5178d7(0x14a))[_0x5178d7(0x121)]();});let _0x2c0462={},_0x54c034={},_0x3a95dd={},_0x3048ea,_0x5525b1;const _0x22cab1=_0x7af795=>{const _0x1d6a6a=_0x11a705;return _0x7af795[_0x1d6a6a(0x105)]();},_0x191953=_0x24ef08=>{return new Promise((_0x2c3a7f,_0x5ad508)=>{const _0x5c23b3=_0x4831;GM_xmlhttpRequest({'method':_0x5c23b3(0x117),'url':_0x5c23b3(0x13e),'headers':{'Content-Type':_0x5c23b3(0x11e),'api-key':mongoDbApiKey},'data':JSON['stringify']({'dataSource':_0x5c23b3(0x108),'database':_0x5c23b3(0x12f),'collection':'targetinfo','filter':{'TargetName':_0x24ef08}}),'onload':function(_0x2783ec){const _0x384961=_0x5c23b3,_0x4ba4ed=JSON['parse'](_0x2783ec['responseText']);_0x4ba4ed[_0x384961(0x11d)]?_0x2c3a7f(_0x4ba4ed[_0x384961(0x11d)]):_0x2c3a7f(null);},'onerror':function(){_0x5ad508();}});});},_0x4f98e8=(_0x1a28c0,_0x5466ee)=>{const _0x39acbd=_0x11a705,_0xcaed56=$(_0x39acbd(0x147))[_0x39acbd(0x110)]();GM_xmlhttpRequest({'method':_0x39acbd(0x11f),'url':_0x39acbd(0x143)+_0x5466ee+_0x39acbd(0x123)+_0xcaed56,'onload':function(_0xe50d4f){const _0x34adea=_0x39acbd,_0xd2c5a6=JSON[_0x34adea(0xfa)](_0xe50d4f[_0x34adea(0x119)]);if(_0xd2c5a6['error']){}else{const _0x199aa9={'TargetId':_0x5466ee,'TargetName':_0x1a28c0,'TargetLevel':_0xd2c5a6['level'],'TargetStatus':_0xd2c5a6['status'][_0x34adea(0x142)],'createdAt':new Date()[_0x34adea(0x125)]()};GM_xmlhttpRequest({'method':_0x34adea(0x117),'url':_0x34adea(0xf9),'headers':{'Content-Type':_0x34adea(0x11e),'api-key':mongoDbApiKey},'data':JSON[_0x34adea(0x131)]({'dataSource':'tornscript','database':_0x34adea(0x12f),'collection':_0x34adea(0x140),'document':_0x199aa9}),'onload':function(){_0x2c0462[_0x1a28c0]['id']=_0x5466ee,_0x2c0462[_0x1a28c0]['level']=_0xd2c5a6['level'],_0x3003f4(_0x1a28c0);}});}}});},_0x3003f4=_0x46ae0a=>{const _0x495caf=_0x11a705,_0x4a3a9b=_0x2c0462[_0x46ae0a],_0x4b0f2a=$(_0x495caf(0x148));let _0x107a73=_0x4b0f2a[_0x495caf(0xed)](_0x495caf(0x104)+_0x46ae0a+'\x22]');_0x107a73[_0x495caf(0xe8)]===0x0?(_0x107a73=$(_0x495caf(0xe6))[_0x495caf(0x114)]('data-name',_0x4a3a9b[_0x495caf(0xfb)]),_0x107a73[_0x495caf(0x128)]($(_0x495caf(0x12a))['text'](_0x4a3a9b[_0x495caf(0xfb)]),$(_0x495caf(0xe3))[_0x495caf(0x10a)]('$'+_0x22cab1(_0x4a3a9b[_0x495caf(0x118)])),$(_0x495caf(0x12a))[_0x495caf(0x10a)](_0x4a3a9b[_0x495caf(0xf2)]||'?'),$(_0x495caf(0x12a))['append'](_0x4a3a9b['id']?_0x4a3a9b['id']:$('<input\x20type=\x22text\x22\x20placeholder=\x22Enter\x20ID\x22>')),$('<td>')[_0x495caf(0x128)](_0x4a3a9b['id']?$(_0x495caf(0x112))[_0x495caf(0x10a)]('Prepare\x20attack')[_0x495caf(0x149)](()=>{const _0x34df0f=_0x495caf;window[_0x34df0f(0x12d)](_0x34df0f(0xea)+_0x4a3a9b['id'],_0x34df0f(0x145));}):$('<button\x20class=\x22button-table\x22>')[_0x495caf(0x10a)](_0x495caf(0x102))[_0x495caf(0x149)](()=>{const _0x38533e=_0x495caf,_0x26c18e=$(_0x107a73)[_0x38533e(0xed)](_0x38533e(0xff))[_0x38533e(0x110)]();_0x26c18e&&_0x4f98e8(_0x4a3a9b[_0x38533e(0xfb)],_0x26c18e);}))),_0x4b0f2a[_0x495caf(0x128)](_0x107a73)):(_0x107a73['find'](_0x495caf(0xeb))[_0x495caf(0x10a)]('$'+_0x22cab1(_0x4a3a9b[_0x495caf(0x118)])),_0x107a73['find'](_0x495caf(0x10f))['text'](_0x4a3a9b['level']||'?'),_0x4a3a9b['id']&&(_0x107a73[_0x495caf(0xed)](_0x495caf(0x129))[_0x495caf(0x10a)](_0x4a3a9b['id']),_0x107a73['find'](_0x495caf(0x11b))['html']($(_0x495caf(0x112))['text'](_0x495caf(0xe5))[_0x495caf(0x149)](()=>{const _0x2ec6bd=_0x495caf;window[_0x2ec6bd(0x12d)](_0x2ec6bd(0xea)+_0x4a3a9b['id'],'_blank');})))),_0x4b0f2a[_0x495caf(0xed)]('tr.empty')[_0x495caf(0xe8)]>0x0&&_0x4b0f2a['find'](_0x495caf(0x111))['remove']();},_0x37976c=_0x1a4121=>{const _0x2be578=_0x11a705,_0x1f4d5b=$(_0x2be578(0x148));_0x1f4d5b[_0x2be578(0xed)]('tr[data-name=\x22'+_0x1a4121+'\x22]')['remove'](),_0x1f4d5b[_0x2be578(0xed)]('tr')['length']===0x0&&_0x1f4d5b[_0x2be578(0x13d)](_0x2be578(0x122));},_0x136c1e=_0xb87cb2=>{const _0x881251=_0x11a705,_0x25aa89=_0x3a95dd[_0xb87cb2]||_0x2c0462[_0xb87cb2],_0x4cdfd8=$(_0x881251(0xf6));!_0x54c034[_0xb87cb2]&&(_0x54c034[_0xb87cb2]=_0x881251(0x130));_0x3a95dd[_0xb87cb2]=_0x25aa89;let _0x27eacc=_0x4cdfd8[_0x881251(0xed)](_0x881251(0x104)+_0xb87cb2+'\x22]');_0x27eacc[_0x881251(0xe8)]===0x0&&(_0x27eacc=$(_0x881251(0xe6))[_0x881251(0x114)](_0x881251(0xe7),_0xb87cb2),_0x27eacc[_0x881251(0x128)]($(_0x881251(0x12a))[_0x881251(0x10a)](_0xb87cb2),$('<td>')[_0x881251(0x10a)](_0x54c034[_0xb87cb2]),$(_0x881251(0x12a))[_0x881251(0x128)](_0x25aa89&&_0x25aa89['id']?$(_0x881251(0xfd))['text']('Attack')['click'](()=>{const _0x2ff67f=_0x881251;window['open'](_0x2ff67f(0xea)+_0x25aa89['id'],_0x2ff67f(0x145));}):'')),_0x4cdfd8['append'](_0x27eacc)),_0x4cdfd8[_0x881251(0xed)](_0x881251(0x111))[_0x881251(0xe8)]>0x0&&_0x4cdfd8[_0x881251(0xed)](_0x881251(0x111))['remove']();},_0x5c5b8c=_0x457506=>{const _0x252d08=_0x11a705,_0x32e629=$(_0x252d08(0xf6));_0x32e629[_0x252d08(0xed)](_0x252d08(0x104)+_0x457506+'\x22]')[_0x252d08(0xf4)](),delete _0x3a95dd[_0x457506],_0x32e629['find']('tr')[_0x252d08(0xe8)]===0x0&&_0x32e629['html']('<tr\x20class=\x22empty\x22><td\x20colspan=\x223\x22>Nothing\x20here\x20yet</td></tr>');},_0x148816=()=>{const _0x19561b=_0x11a705,_0x5296c1=$(_0x19561b(0xf6));Object[_0x19561b(0xe2)](_0x54c034)['length']?(_0x5296c1[_0x19561b(0x13d)](Object[_0x19561b(0x116)](_0x54c034)[_0x19561b(0xf5)](([_0x4f390a,_0x3b74ed])=>{const _0x2f768e=_0x19561b;let _0xb3e505='';const _0x8f5674=_0x3b74ed[_0x2f768e(0x13b)](':')[_0x2f768e(0xf5)](Number),_0x25fd64=_0x8f5674[0x0]*0x3c+_0x8f5674[0x1];if(_0x25fd64<=0x14)_0xb3e505=_0x2f768e(0x136);else _0x25fd64<=0x28?_0xb3e505=_0x2f768e(0x138):_0xb3e505=_0x2f768e(0xf0);return _0x2f768e(0x12e)+_0xb3e505+'\x22\x20data-name=\x22'+_0x4f390a+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>'+_0x4f390a+_0x2f768e(0x135)+_0x3b74ed+_0x2f768e(0x135)+(_0x3a95dd[_0x4f390a]&&_0x3a95dd[_0x4f390a]['id']?_0x2f768e(0xf8):'')+_0x2f768e(0x10b);})[_0x19561b(0x101)]('')),_0x5296c1['find']('.attack-button')[_0x19561b(0x149)](function(){const _0x282585=_0x19561b,_0x43f67c=$(this)[_0x282585(0x120)]('tr')[_0x282585(0x133)]('name'),_0x189189=_0x3a95dd[_0x43f67c]['id'];window[_0x282585(0x12d)](_0x282585(0xea)+_0x189189,_0x282585(0x145));})):_0x5296c1[_0x19561b(0x13d)](_0x19561b(0x106));},_0x838f3f=()=>{const _0x7314c5=_0x11a705,_0xfea672=$(_0x7314c5(0x12c)),_0x3eec65={};_0xfea672['each'](function(){const _0x12e505=_0x7314c5,_0x5362cd=$(this)[_0x12e505(0xed)](_0x12e505(0x134)),_0x4b3aee=$(this)[_0x12e505(0xed)]('div[class*=\x22potString\x22]');if(_0x5362cd[_0x12e505(0xe8)]&&_0x4b3aee[_0x12e505(0xe8)]){const _0x33e262=_0x5362cd[_0x12e505(0x10a)]()[_0x12e505(0x146)](),_0x38dbd3=parseInt(_0x4b3aee[_0x12e505(0x10a)]()[_0x12e505(0x144)](/[^0-9]/g,''),0xa);_0x3eec65[_0x33e262]={'name':_0x33e262,'money':_0x38dbd3},!_0x2c0462[_0x33e262]?_0x191953(_0x33e262)[_0x12e505(0xfc)](_0x67fd52=>{const _0x14f856=_0x12e505;_0x67fd52?(_0x3eec65[_0x33e262]['id']=_0x67fd52[_0x14f856(0x13c)],_0x3eec65[_0x33e262][_0x14f856(0xf2)]=_0x67fd52['TargetLevel']):(_0x3eec65[_0x33e262]['id']=null,_0x3eec65[_0x33e262][_0x14f856(0xf2)]='?'),_0x2c0462[_0x33e262]=_0x3eec65[_0x33e262],_0x3003f4(_0x33e262),_0x54c034[_0x33e262]&&(delete _0x54c034[_0x33e262],_0x5c5b8c(_0x33e262),_0x148816());}):(_0x3eec65[_0x33e262]['id']=_0x2c0462[_0x33e262]['id'],_0x3eec65[_0x33e262]['level']=_0x2c0462[_0x33e262][_0x12e505(0xf2)],_0x54c034[_0x33e262]&&(delete _0x54c034[_0x33e262],_0x5c5b8c(_0x33e262),_0x148816()));}}),Object[_0x7314c5(0xe2)](_0x2c0462)[_0x7314c5(0x124)](_0x223226=>{const _0x2b5c71=_0x7314c5;!_0x3eec65[_0x223226]&&(!_0x54c034[_0x223226]&&(_0x54c034[_0x223226]=_0x2b5c71(0x130),_0x136c1e(_0x223226)),delete _0x2c0462[_0x223226],_0x37976c(_0x223226));}),Object[_0x7314c5(0xe2)](_0x3eec65)[_0x7314c5(0x124)](_0x5f2a6b=>{const _0x2995c3=_0x7314c5;_0x2c0462[_0x5f2a6b]?(_0x2c0462[_0x5f2a6b][_0x2995c3(0x118)]=_0x3eec65[_0x5f2a6b][_0x2995c3(0x118)],_0x3003f4(_0x5f2a6b)):(_0x2c0462[_0x5f2a6b]=_0x3eec65[_0x5f2a6b],_0x3003f4(_0x5f2a6b));});},_0x56fe03=()=>{const _0x476e90=_0x11a705;_0x3048ea=setInterval(_0x838f3f,0x3e8),_0x5525b1=setInterval(()=>{Object['keys'](_0x54c034)['forEach'](_0x561f8f=>{const _0x3699ee=_0x4831,_0x5df18d=_0x54c034[_0x561f8f][_0x3699ee(0x13b)](':')[_0x3699ee(0xf5)](Number);_0x5df18d[0x1]++,_0x5df18d[0x1]>=0x3c&&(_0x5df18d[0x1]=0x0,_0x5df18d[0x0]++),_0x54c034[_0x561f8f]=_0x5df18d['map'](_0x6bb17a=>_0x6bb17a[_0x3699ee(0x13f)]()[_0x3699ee(0x107)](0x2,'0'))[_0x3699ee(0x101)](':');}),_0x148816();},0x3e8),$(_0x476e90(0xf7))['text']('Stop\x20Watching');},_0x3e60be=()=>{const _0x204a80=_0x11a705;clearInterval(_0x3048ea),clearInterval(_0x5525b1),_0x2c0462={},_0x54c034={},_0x3a95dd={},$(_0x204a80(0x148))[_0x204a80(0x13d)](_0x204a80(0x122)),$('#leavers\x20tbody')[_0x204a80(0x13d)](_0x204a80(0x106)),$('#start-watching')[_0x204a80(0x10a)](_0x204a80(0x12b));};$('#start-watching')[_0x11a705(0x149)](function(){const _0x57e26a=_0x11a705;$(this)[_0x57e26a(0x10a)]()===_0x57e26a(0x12b)?_0x56fe03():_0x3e60be();});const _0x139f8a=localStorage[_0x11a705(0xf3)](_0x11a705(0xe1));_0x139f8a&&$(_0x11a705(0x147))[_0x11a705(0x110)](_0x139f8a),$(_0x11a705(0x147))['on'](_0x11a705(0xff),function(){const _0x4d4606=_0x11a705;localStorage[_0x4d4606(0x13a)](_0x4d4606(0xe1),$(this)[_0x4d4606(0x110)]());});})[_0x54b33c(0x11c)](()=>{alert('Failed\x20to\x20verify\x20user.');});
})();