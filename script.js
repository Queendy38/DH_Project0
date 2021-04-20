  //create form to get input from users
  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";
  var scoredApp = [];
  var score = [];
  var appObj=[];
  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var currentAppName = []; //array to store applicants
          var currentTeamName = []; //array to store member in team

          //attributes for all applicants
          var it=[]; 
          var en=[];
          var strength=[];
          var spicy=[];

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeamName.push(mydata.team[i].name);
          } 

          for (var i = 0; i < mydata.applicants.length; i++) {
              //mydata.team[0].attributes[0].endurance
            currentAppName.push(mydata.applicants[i].name);
            it.push(mydata.applicants[i].attributes[0].intelligence); //scale to 20% 
            en.push(mydata.applicants[i].attributes[0].endurance); //scale to 40%
            strength.push(mydata.applicants[i].attributes[0].strength); //scale to 30%
            spicy.push(mydata.applicants[i].attributes[0].spicyFoodTolerance); //scale to 10%

            //calculate score
            score.push(calculate(it[i],str[i],en[i],spicy[i]));
        } 
        // mydata.applicants.push({name: "yolo", attributes: {strength:strength[0]}});
        //display data from JSON
        //document.getElementById('demo').innerHTML = JSON.stringify(mydata);
        document.getElementById('demo2').innerHTML = score;
        console.log("current team members");
        console.log(JSON.stringify(mydata, null, 10));
        
       // document.getElementById('demo').innerHTML = it[0] + " " + en[0] + " " + strength[0] + " " + spicy[0];


      }
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


/*function displayValue() {
            var ele = document.getElementsByName('score4');
              
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                document.getElementById("demo").innerHTML
                        = "Selected: " +ele[i].value;
            }
        }
*/

//display a confirm message after adding new applicant
function confirm(){
    //document.getElementById('confirmMsg').innerHTML = "Added " + applicantName.value + " as new applicant";
    var ele = document.getElementsByName('score4');
              
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        document.getElementById("demo").innerHTML
                = "Selected: " +ele[i].value;
    }
    document.getElementById('confirmMsg').innerHTML = "Added " + applicantName.value + " as new applicant";
   
}

function calculate(it, str, en, spicy){
  var score, finalScore;

  //apply scales
  score = (it * 0.2) + (str * 0.3) + (en * 0.4) + (spicy * 0.1);
  //convert to 0-1 scale
  finalScore = score * (0.2);

  return finalScore;
}
//read iuput from html + exisiting input, show in console
//output json in console
