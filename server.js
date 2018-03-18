/********* MANDATORY HEADER REQUIRES ************/
var express = require('express'),
	app = express(),
	request = require('request'),
	url = "http://terriblytinytales.com/test.txt";


/********* SERVING STATIC FILES ************/
app.use(express.static(__dirname+'/public'));


/********* INDEX ROUTE FOR APPLICATION ************/
app.get('/contactlist',function(req,res){
	
	console.log("GET REQUEST RECEIVED..");
	console.log("FETCH TOP " + req.query.number + "WORDS");
	var frequency = req.query.number;

	// SEND A REQUEST TO SPECIFIED URL
	request({
    	url: url,
   		json: true
	}, function (error, response, body) {
	
		if (!error && response.statusCode === 200) {
			
			
			var myString = JSON.parse(JSON.stringify(body));
			var myString1 = myString.replace("’","'");
			var bodySanitised = myString1.replace(/[^a-z’|'A-Z ]/g," ").toUpperCase();
			var bodySplit = bodySanitised.split(" ");
			var result = {};
			var resultArray = [];
			
			/**************** FIND FREQUENCY OF EACH STRING : OBJECT HASH ************/
			for(var i = 0; i < bodySplit.length ; i++)
			{	
				// WORD SHOULD NOT BE A SPACE, ".COM" OR "WWW"
				if(bodySplit[i].length > 0 && ((bodySplit[i] !== "WWW") && (bodySplit[i] !== "COM")))
				{
					// CHECK IF WORD ALREADY EXISTS
					if(result.hasOwnProperty(bodySplit[i]))
					{
						 var obj = result[bodySplit[i]];
						 obj.freq++;
					}
					else
					{
						// ADD NEW OBJECT WITH (KEY,VALUE) AS (WORD,FREQUENCY)
						result[bodySplit[i]] = {
							freq : 1
						};
					}
				}	
			}

			/************** CONVERT OBJECT COLLECTION TO ARRAY ************/
			for(var word in result)
				resultArray.push([word,(result[word]).freq]);
			/************** INBUILT ARRAY FUNCTION : CUSTOMISED **********/
			resultArray.sort(function(a, b) {
   					 return b[1] - a[1];
			});
			/*********** LOG TOP 'N' WORDS ******************************/
			console.log(resultArray.slice(0,frequency));

			result = [{error:""}];

			/********** CASE WHEN 'N' EXCEEDS TOTAL NUMBER OF WORDS *******/
			if(frequency>resultArray.length)
				result[0].error = "The total number of words stemmed are : " + resultArray.length+" ! Please enter a lesser number !";
			else{
				for(var i = 0 ; i < frequency ; i++)
				{
					console.log("Word: "+resultArray[i][0]);
					var word = resultArray[i][0];
					var freq = resultArray[i][1];
					result.push({
						name: word,
						freq : freq
					}); 
				}
			}
			/********** SEND BACK RESULT ****/
			res.json(result);
	    }
	})

});

/************** SET LISTENER PORT **************/
var port = process.env.PORT || 3000; 
app.listen(port, function() {
	console.log('SERVER RUNNING ON PORT :'+ port);
});
