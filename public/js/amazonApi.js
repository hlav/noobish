var aws = require("aws-lib");
var prodAdv = aws.createProdAdvClient('AKIAJVTAUXOMIYDSV6JQ', 'YcCjk/BzE+r7/8xodhbSav7DaINQ25ltjQekeZcT', 'noobish-20');


var options = {SearchIndex: "Video", Keywords: "Harry Potter - The Complete 8-Film Collection"}

prodAdv.call("ItemSearch", options, function(err, result) {
var product = [
                result["Items"]["Item"][0]["ASIN"],
                result["Items"]["Item"][0]["ItemAttributes"]["Title"],
                result["Items"]["Item"][1]["DetailPageURL"]
              ]

var prices = {IdType: 'ASIN', ItemId: product[0], ResponseGroup: 'Offers'}
prodAdv.call("ItemLookup", prices, function(err, results) {
var lowNewPrice = results["Items"]["Item"]["OfferSummary"]["LowestNewPrice"]["FormattedPrice"]
var lowUsedPrice = results["Items"]["Item"]["OfferSummary"]["LowestUsedPrice"]["FormattedPrice"]

var pics = {IdType: 'ASIN', ItemId: product[0], ResponseGroup: 'Images'}
prodAdv.call("ItemLookup", pics, function(err, image) {
var medImage = image["Items"]["Item"]["MediumImage"]["URL"]

// var review = {IdType: 'ASIN', ItemId: product[0], ResponseGroup: 'SalesRank'}
// prodAdv.call("ItemLookup", rank, function(err, rank) {
//   console.log(JSON.stringify(rank));
console.log(product[1]);
console.log('Lowest New Price = ' + lowNewPrice);
console.log('Lowest Used Price = ' + lowUsedPrice);
console.log(medImage);
console.log(product[2]);
  })
  })
 })
})
