  //create form to get input from users
  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var currentAppName = []; //array to store applicants
          var currentTeamName = []; //array to store member in team

          //attributes for all applicants
          var IQ=[]; 
          var en=[];
          var strength=[];
          var spicy=[];

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeamName.push(mydata.team[i].name);
          } 
          for (var i = 0; i < mydata.applicants.length; i++) {
            currentAppName.push(mydata.applicants[i].name);
            IQ.push(mydata.applicants[i].attributes[i].intelligence);
            en.push(mydata.applicants[i].attributes[i].endurance);
            strength.push(mydata.applicants[i].attributes[i].strength);
            spicy.push(mydata.applicants[i].attributes[i].spicyFoodTolerance);
        } 
         

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
    document.getElementById('confirmMsg').innerHTML = "Added " + applicantName.value + " as new applicant";
}

 //display data from JSON
           document.getElementById('demo').innerHTML = IQ[0] + en[0] + strength[0] + spicy[0];
           document.getElementById('demo2').innerHTML = IQ[1] + en[1] + strength[1] + spicy[1];