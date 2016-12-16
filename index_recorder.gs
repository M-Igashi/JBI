// Data import from Public APIs
var bfdata = UrlFetchApp.fetch('https://api.bitflyer.jp/v1/getticker?product_code=BTC_JPY');
var bfprice = JSON.parse(bfdata)["ltp"];
var bfvolume = Math.floor(JSON.parse(bfdata)["volume_by_product"]);
var bf = {'price' : bfprice, 'volume' : bfvolume};

var qndata = UrlFetchApp.fetch('https://api.quoine.com/products/5');
var qnprice = JSON.parse(qndata)["last_traded_price"];
var qnvolume = Math.floor(JSON.parse(qndata)["volume_24h"]);
var qn = {'price' : qnprice, 'volume' : qnvolume};

var bbdata = UrlFetchApp.fetch('https://www.btcbox.co.jp/api/v1/ticker/');
var bbprice = JSON.parse(bbdata)["last"];
var bbvolume = Math.floor(JSON.parse(bbdata)["vol"]);
var bb = {'price' : bbprice, 'volume' : bbvolume};

var zfdata = UrlFetchApp.fetch('https://api.zaif.jp/api/1/ticker/btc_jpy');
var zfprice = JSON.parse(zfdata)["last"];
var zfvolume = Math.floor(JSON.parse(zfdata)["volume"]);
var zf = {'price' : zfprice, 'volume' : zfvolume};

var ccdata = UrlFetchApp.fetch('https://coincheck.com/api/ticker');
var ccprice = JSON.parse(ccdata)["last"];
var ccvolume = Math.floor(JSON.parse(ccdata)["volume"]);
var cc = {'price' : ccprice, 'volume' : ccvolume};

var market = [bf, qn, bb, zf, cc];

//Weighted average
var sum  = function(arr) {
    var sum = 0;
    for (var i=0,len=arr.length; i<len; ++i) {
        sum += arr[i]["volume"];
    };
    return sum;
};

var weight  = function(arr) {
    var weight = 0;
    for (var i=0,len=arr.length; i<len; ++i) {
        weight += arr[i]["volume"]*arr[i]["price"];
    };
    return weight;
};

var JPbtc_index = Math.floor(weight(market)/sum(market))

var Date = Utilities.formatDate(new Date(), "JST", "dd/MM/YYYY ' ' HH:mm");

function createIndex() {
  var tableId = "xxxxxxxxxxxxxxx"  //use your tableID
  var sql = "INSERT INTO " + tableId
   + " ('JPbtc_index','Date')"
   + " VALUES ('" + JPbtc_index + "','" + Date + "')";
  FusionTables.Query.sql(sql);
};


