  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";
  var scoredApp = []; //object with existing applicants info (name + score)
  var score = []; //individual score
  //input values
  var it = document.getElementsByName('score1');
  var str = document.getElementsByName('score2');
  var en = document.getElementsByName('score3');
  var spicy = document.getElementsByName('score4');

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          var currentAppName = []; //array to store applicants
          // var currentTeamName = []; //array to store member in team

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
          for (var i = 0; i < it.length; i++) {
              scoredApp.push({
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

          console.log("Scored applicants");
          console.log(JSON.stringify(scoredApp, null, 4));
          console.log("Lists of applicants");
          console.log(JSON.stringify(mydata.applicants, null, 4));


      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  //score values in json arrays
  function confirm() {
    var sum;
      for (i = 0; i < 4; i++) { //4 attributes
          if (it[i].checked) {
              it = calculate(it[i], 0, 0, 0);
          } else if (str[i].checked) {
              str = calculate(0, str[i], 0, 0);
          } else if (en[i].checked) {
              en = calculate(0, 0, en[i], 0);
          } else if (spicy[i].checked) {
              spicy = calculate(0, 0, 0, spicy[i]);
          }
      }
      sum = it + str + en + spicy;
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
      
      document.getElementById('confirmMsg').innerHTML = "Total " + sum + " points";

      /*//click to display info from JSON
      function displayTeam() {
          document.getElementById('team'), innerHTML = JSON.stringify(appObj.scoredApp, null, 10);
      }

      function displayApp() {
          document.getElementById('app'), innerHTML = JSON.stringify(appObj.team, null, 10);

      }*/