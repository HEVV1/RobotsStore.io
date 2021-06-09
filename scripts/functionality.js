//Shows the current date
var year = new Date();
$(function() {
   $('.footer-span').append(year.getFullYear() + ' AWESOME ROBOTS');
});
/////////////////////////Load Data from Json//////////////////////////
var mainArray = new Array();
var isLoaded = false;
var count = 0;
var starCount = 0;
var endCount = 12;
//XML request
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
      var response = JSON.parse(xhttp.responseText);         
      getData(response);
      $('#buttonLoad').on('click',function(){
         endCount += 12;
         starCount += 12;
         count = 0;        
         console.log("Load robots: ",endCount); 
         getData(response);
      });
   }
}
xhttp.open('GET', 'data-v2.json', true)
xhttp.send();
//Loop and get some data from json
function getData(jsonObject){  
   //Loads Data
   for (let i = starCount; i < endCount; i++) {
      if (count <= 11) {
         containerRobot(jsonObject[i].id, jsonObject[i].images.medium, jsonObject[i].first_name, jsonObject[i].last_name, jsonObject[i].rating);
         rating(jsonObject[i].rating, jsonObject[i].id, 'starContainer') 

         //Adding in arrray         
         mainArray[i] = new Array();                               
         mainArray[i][0] = jsonObject[i].id;  
         mainArray[i][1] = jsonObject[i].age;
         mainArray[i][2] = jsonObject[i].rating;
         mainArray[i][3] = jsonObject[i].first_name +' '+jsonObject[i].last_name;       
         mainArray[i][4] = jsonObject[i].first_name;
         mainArray[i][5] = jsonObject[i].last_name;   
         mainArray[i][6] = jsonObject[i].phone;  
         mainArray[i][7] = jsonObject[i].email;  
         mainArray[i][8] = jsonObject[i].registered_at;  
         mainArray[i][9] = jsonObject[i].available_from;
         mainArray[i][10] = jsonObject[i].description;  
         mainArray[i][11] = jsonObject[i].images.medium;  
         mainArray[i][12] = new Array(); 
         mainArray[i][12][0] = jsonObject[i].skills[0];  
         mainArray[i][12][1] = jsonObject[i].skills[1];
         mainArray[i][12][2] = jsonObject[i].skills[2];    
          
         count++;         
      }
      if (endCount >= jsonObject.length){
         $('#buttonLoad').remove();
      }
   }
   console.log(mainArray);   
   //Search Filter
   searchFilter();
   //Sort by checkboxes
   sortBySKills();
   //Stars rating
   ratingStars();
   //Learn More
   learnMore();
} 
//Crate a container for robots
function containerRobot(id, imgSource, firstname, lastname){  
   var output = '';  
   var market_container_holder1 = document.querySelector('.market-container-holder1-holderRobots');
   output  += 
   '<div class="market-container-holder1-holderRobots-robots" id="'+id+'" >'+
      '<img class="market-container-holder1-holderRobots-robots-image rob" src="'+imgSource+'" alt="">'+
      '<div class="market-container-holder1-holderRobots-robots-stars"id="starContainer'+id+'" >'+   
      '</div>'+
      '<p class="market-container-holder1-holderRobots-robots-text">'+firstname+' '+lastname+'</p>'+
      '<button id="butLearnMore'+id+'" _data="'+id+'" type="button" class="market-container-holder1-holderRobots-robots-button learnMoreBut">Learn More</button>'+
   '</div>';
   market_container_holder1.innerHTML += output;     
}
//Stars rating
function rating(rating, idStars, container){
   switch (rating) {
      case 1:
         document.getElementById(container+idStars).innerHTML = 
         '<i class="fas fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>';
         break;
      case 2:
      document.getElementById(container+idStars).innerHTML = 
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>';
      break;
      case 3:
         document.getElementById(container+idStars).innerHTML = 
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="far fa-star"></i>'+
         '<i class="far fa-star"></i>';
         break;
      case 4:
         document.getElementById(container+idStars).innerHTML = 
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="far fa-star"></i>';
         break;
      case 5:
         document.getElementById(container+idStars).innerHTML = 
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>'+
         '<i class="fas fa-star"></i>';
         break;
      default:
         break;
   }
}
///////////////////////////////////////////////////////////////
//Search Field
var inpField_val = ''
function searchFilter(){      
   $('#inputField').on('input', function(){          
      inpField_val = $('#inputField').val();
      console.log(inpField_val);
      //$('.market-container-holder1-holderRobots-robots').hide();
      for (let i = 0; i < mainArray.length; i++) {
         
         if (mainArray[i][3].indexOf(inpField_val) == -1) {
            console.log(mainArray[i][3]);           
            $('#'+mainArray[i][0]).hide();
         }
         else{
            $('#'+mainArray[i][0]).show();
         }         
      }        
   });   
}
//Sort By skills
var skillsArray = ['', 'Carpet cleaning', 'Sweeping', 'Deep cleaning', 'Mopping', 'Window treatment cleaning', 'Infection control', 'Polishing', 'Vacuuming', 'Dusting', 'Bathroom and bedroom cleaning']
function sortBySKills(){   
   $('input[type="checkbox"]').change(function(){
      let checkboxID = $(this).attr('data');
      if ($('#checkbox'+checkboxID).is(':checked')) {
         for (let i = 0; i < mainArray.length; i++) {                  
            if (mainArray[i][12].indexOf(skillsArray[checkboxID]) == -1) { 
               $('#'+mainArray[i][0]).hide();
            }
         }
      }
      else{
         for (let i = 0; i < mainArray.length; i++) {
            $('#'+mainArray[i][0]).show();
         }
      }
   });

   var isItOpen = true;
   for (let index = 6; index < skillsArray.length; index++) {
      $('#checkHolder'+index).hide();
   }
   $('#moreSkills').click(function(){          
      if (isItOpen) {
         $('#arrow').css('transform', 'rotate(180deg)');
         for (let index = 6; index < skillsArray.length; index++) {
            $('#checkHolder'+index).show();  
         }         
         isItOpen = false;
      }else{
         $('#arrow').css('transform', 'rotate(360deg)');
         for (let index = 6; index < skillsArray.length; index++) {
            $('#checkHolder'+index).hide();
         }         
         isItOpen = true;
      }    
   })   
  
}
//Stars Rating
function ratingStars(){
   var isItRated = false;

   $('.ratStar').on('mouseenter', function(){   
      if (!isItRated) {
         var attrStars = $(this).attr('_star');
         for (let i = 1; i <= attrStars; i++) {
            $('#star'+i).css('color', 'lightgreen'); 
         }
      }         
   }) 
   $('.ratStar').on('mouseleave', function(){  
      if (!isItRated) {
         var attrStars = $(this).attr('_star');
         for (let i = attrStars; i >= 1; i--) {
            $('#star'+i).css('color', 'black'); 
         }
      }
   }) 
         
   $('.ratStar').on('click', function(){  
      $('.market-container-holder1-holderRobots-robots').show();
      isItRated = true;      
      var attrStars = $(this).attr('_star') + '';         
      console.log(attrStars);         
      for (let i = 1; i <= attrStars; i++) {            
         $('#star'+i).css('color', 'lightgreen');                                   
      }
      for (let i = 5; i > attrStars; i--) {            
         $('#star'+i).css('color', 'black');                                   
      }
      //For filtering by stars
      for (let i = 0; i < mainArray.length; i++) {            
         if (mainArray[i][2] != attrStars) {
            $('#'+mainArray[i][0]).hide();
         }
      }      
   })   
}
//Clear
$('#clear').on('click', function(){
   $('.market-container-holder1-holderRobots-robots').show();
   //Clear searach filter
   inpField_val = '';
   $('#inputField').val('');
   //Clear Checkboxes
   $( 'input[type="checkbox"]' ).prop( "checked", false );
   //Rating stars clear
   for (let i = 5; i > 0; i--) {            
      $('#star'+i).css('color', 'black');                                   
   }
})
//Learn more about robot
function learnMore(){   
   $('.learnMoreBut').click(function(){
      let butData = $(this).attr('_data');
      $('.popUpBox').show();
      $('.popUpBox').css('transform', 'translateX(-50%) translateY(-50%) scale(1)');
      $('#popUp_header').text(mainArray[butData-1][3]);
      $('#popUpRobName').text(mainArray[butData-1][3]);
      $('#description').text(mainArray[butData-1][10]);
      $('#popDate').text(mainArray[butData-1][8]);
      var skillsOutput = '';
      for (let i = 0; i < mainArray[butData-1][12].length; i++) {
         skillsOutput += '<li class="popUp-container-holder1-skills-list">'+
         '<span>'+mainArray[butData-1][12][i]+'</span></li>'              
      }      
      $('#skills').html(skillsOutput);
      $('#phone').text(mainArray[butData-1][6]);
      $('#email').text(mainArray[butData-1][7]);
      $('#image').attr('src', mainArray[butData-1][11]);
      rating(mainArray[butData-1][2], 1, 'popStars')
   })
   $('.cancel').click(function(){      
      $('.popUpBox').css('transform', 'translateX(-50%) translateY(-50%) scale(0)');
      $('.popUpBox').hide();
   })     
}
