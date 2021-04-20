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
            it.push(mydata.team[i].attributes[i].intelligence);
            en.push(mydata.team[i].attributes[i].endurance);
            strength.push(mydata.team[i].attributes[i].strength);
            spicy.push(mydata.team[i].attributes[i].spicyFoodTolerance);
        } 

        //display data from JSON
        //document.getElementById('demo2').innerHTML = IQ[1] + en[1] + strength[1] + spicy[1];
        document.getElementById('demo').innerHTML = it[0] + " " + en[0] + " " + strength[0] + " " + spicy[0];


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

}
//read iuput from html + exisiting input, show in console
//output json in console
