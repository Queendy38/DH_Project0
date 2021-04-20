  //create form to get input from users
  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var nameApp = []; //array to store applicants
          var nameTeam = []; //array to store member in team

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              nameApp.push(mydata.team[i].name);

          }

          document.getElementById('demo').innerHTML = mydata.team[0].attributes[0].endurance;

      
      }
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
