/*
Example of extraction of URIs for a object place
*/

$(document).ready(function(){

   $('#city').focus(function(){
  
      var notEmpty = $("#uri");
      console.log("notEmpty");
      if(notEmpty == false){
         $('#uri').empty();
          
      }
   });

   var getUri = function(){
   		
   		var classtype = "place";
		var label = $('#city').val();

         //Has the user entered anything?

         if(label == ''){

            //If the input field was empty

            $('#uri').html("<h2 class='loading'>Please enter the city!</h2>");
            } else {
            	
					$.ajax({
						url: "http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryClass="+classtype+"&MaxHits=1&QueryString="+label,
						dataType:    'xml',
						timeout : 3000000,
						success:     function(data) {
								
						var xml=data;
						var $jQuerymyUris =$(xml).find("Result");
									
						var eid = $jQuerymyUris.find("URI:first").text();

						var uri='<tr><td>'+classtype+'</td><td>'+label+'</td><td>'+eid+'</td></tr>';
						$('#uri').html(uri);
						$('#city').empty();

						}//success
				    	,
						error: function(err) {
						$('#uri').html("<h2 class='loading'>error loading "+label+"</h2>");
						    	}
						    });//Ajax xml
					}
				}	
	$('#search').click(getUri);

   $('#city').keyup(function(event){

       if(event.keyCode == 13){

           getUri();
      }
   })
})