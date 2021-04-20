  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";
  var scoredApp = {}; //object with existing applicants info (name + score)
  var score = []; //individual score
  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var currentAppName = []; //array to store applicants
          var currentTeamName = []; //array to store member in team

          //attributes for all applicants
          var it = [];
          var en = [];
          var strength = [];
          var spicy = [];

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeamName.push(mydata.team[i].name);
          }

          for (var i = 0; i < mydata.applicants.length; i++) {
              currentAppName.push(mydata.applicants[i].name);
              it.push(mydata.applicants[i].attributes[0].intelligence); //scale to 20% 
              en.push(mydata.applicants[i].attributes[0].endurance); //scale to 40%
              strength.push(mydata.applicants[i].attributes[0].strength); //scale to 30%
              spicy.push(mydata.applicants[i].attributes[0].spicyFoodTolerance); //scale to 10%

              //calculate score
              score.push(calculate(it[i], strength[i], en[i], spicy[i]));
              //scoredApp.push({name: currentAppName[i], score: score[i]});
          }

          //add scored applicants to mydata(JSON)
          for (var i = 0; i < mydata.scoredApplicants.length; i++) {
              mydata.scoredApplicants.push({
                  name: currentAppName[i],
                  score: score[i]
              });
          }
          // mydata.applicants.push({name: "yolo", attributes: {strength:strength[0]}});
          //display data from JSON
          //document.getElementById('demo').innerHTML = JSON.stringify(mydata);
          //document.getElementById('demo2').innerHTML = score;

          // document.getElementById('demo').innerHTML = it[0] + " " + en[0] + " " + strength[0] + " " + spicy[0];
          //display team members

          console.log("Lists of team members");
          console.log(JSON.stringify(mydata.team, null, 10));
          console.log("Lists of applicants");
          console.log(JSON.stringify(mydata.applicants, null, 10));


      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  //score values in json arrays
  function confirm() {
      var ele = document.getElementsByName('score4');

      for (i = 0; i < ele.length; i++) {
          if (ele[i].checked)
              document.getElementById("demo").innerHTML = "Selected: " + ele[i].value;
      }

      document.getElementById('confirmMsg').innerHTML = "Added " + applicantName.value + " as new applicant";

  }


  //calculate score
  function calculate(it, str, en, spicy) {
      var score, finalScore;

      //apply scales
      score = (it * 0.2) + (str * 0.3) + (en * 0.4) + (spicy * 0.1);
      //convert to 0-1 scale
      finalScore = score * (0.2);

      return finalScore.toFixed(2); //fix to 2 decimal places
  }
  //read iuput from html + exisiting input, show in console


  /*//click to display info from JSON
  function displayTeam() {
      document.getElementById('team'), innerHTML = JSON.stringify(appObj.scoredApp, null, 10);
  }

  function displayApp() {
      document.getElementById('app'), innerHTML = JSON.stringify(appObj.team, null, 10);

  }*/