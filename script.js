  //create form to get input from users
  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var currentApp = []; //array to store applicants
          var currentTeam = []; //array to store member in team

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeam.push(mydata.team[i]);

          } 
          document.getElementById('demo').innerHTML = currentTeam;
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