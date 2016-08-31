
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('http://substack.net/images/', function (error, response, body) {

 if (!error && response.statusCode == 200) {
 
   $ = cheerio.load(body);
   var buffer = "";
   var tableRows = $('table').children('tr');
 

   $(tableRows).each((i, elem) => {

     var filePermission = $(elem).children('td').eq(0).find('code').text();
     var fileName = $(elem).children('td').eq(2).find('a').text();
     var href = $(elem).children('td').eq(2).find('a').attr('href');

     buffer += filePermission + "," + href + ",";

     if (fileName.substr(-1) === '/') {
       buffer += "directory";
     } else {
       buffer += fileName.split(".")[1];
     }

     buffer += "\n";

    });

   var writeStream = fs.createWriteStream("images.csv");
   writeStream.write(buffer);
   writeStream.end();
 }


});