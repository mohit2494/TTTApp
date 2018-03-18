# TTTApp
This application fetches the top 'N' most frequently occuring words from a given text file ( hosted on clients server )

# Appliction Summary
* Front End Development : AngularJS, Bootstrap, HTML5 and CSS3
* Back  End Development : NodeJS, Express
* NPM Package Used : Request

# Application usage
* As the application is built using angularJS, the request to fetch the top 'N' words 
  can be submitted to the backend by just pressing an enter key, rather than pressing 
  a submit button explicitly.

* For submitting a request, the input field takes arguments starting from 1 to 'N' at
  a step difference of 1(integral). The maximum number technically that can be entered 
  for a successful fetching of the result is equal to the total number of words present 
  in the text file provided. Some corner cases that were tested are :
  * Leaving the input empty
  * Giving an input greater than the number of words present in the text file

* The front end sends an 'XHR' request to the backend. The request module in the backend 
  helps get the text file data through a http request. The requested data is then 'Stringified'
  using the JSON.stringify function and then the data is sanitized by replacing the special
  characters with a space using a simple regex.

* The above request is sent only when the input is valid(not empty or greater than number of words)
  and then the frequency of each word is calculated in the sanitized text by building a collection
  of objects similar to simple hash where (key,value) pair represents (word fetched,frequency). This
  is then converted to an array of arrays for utilizing the compare function of arrays. The compare
  function is over-ridden to sort the array in descending order of frequencies. The array is then sent off
  to the front end which is then sliced based on the top 'N' word requirement.

* The front end results are represented using AngularJS's two way binding. An additional table for previous 
  searches is created to keep track of searches. The user interface is made as simple as possible but yet elegant
  for ease of usage.

