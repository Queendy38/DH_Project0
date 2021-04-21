  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";
  var scoredApp = []; //object with existing applicants info (name + score)
  var score = []; //individual score
  //attributes for all applicants
  var itArr = [];
  var enArr = [];
  var strengthArr = [];
  var spicyArr = [];
  var currentAppName = [];
 
  //get score for new applicants
  function confirm() {
    var nameApp = document.getElementById('applicantName');
    var it = document.getElementsByName('score1');
    var str = document.getElementsByName('score2');
    var en = document.getElementsByName('score3');
    var spicy = document.getElementsByName('score4');
      var sum, itNum, strNum, enNum, spicyNum;
      for (i = 0; i < 4; i++) { //4 attributes
          if (it[i].checked) {
              itArr.push(it[i]);
              itNum = calculate(it[i], 0, 0, 0);
          } else if (str[i].checked) {
              strArr.push(str[i]);
              strNum = calculate(0, str[i], 0, 0);
          } else if (en[i].checked) {
              enArr.push(en[i]);
              enNum = calculate(0, 0, en[i], 0);
          } else if (spicy[i].checked) {
              spicyNum.push(spicyNum[i]);
              spicyNum = calculate(0, 0, 0, spicy[i]);
          }
      }
      currentAppName.push(nameApp); //add name to applicant
      sum = it + str + en + spicy; //calculate applicant scores
      scoredApp.push({name: nameApp,
        score: sum}) //add (namae+score) to scored applicantobject
      return sum;
  }

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

          //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeamName.push(mydata.team[i].name);
          }

          for (var i = 0; i < mydata.applicants.length; i++) {
              currentAppName.push(mydata.applicants[i].name);
              itArr.push(mydata.applicants[i].attributes[0].intelligence); //scale to 20% 
              enArr.push(mydata.applicants[i].attributes[0].endurance); //scale to 40%
              strengthArr.push(mydata.applicants[i].attributes[0].strength); //scale to 30%
              spicyArr.push(mydata.applicants[i].attributes[0].spicyFoodTolerance); //scale to 10%

              //calculate score
              score.push(calculate(itArr[i], strengthArr[i], enArr[i], spicyArr[i]));
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

  //calculate score
  function calculate(it, str, en, spicy) {
      var score, finalScore;

      //apply scales
      score = (it * 0.2) + (str * 0.3) + (en * 0.4) + (spicy * 0.1);
      //convert to 0-1 scale
      finalScore = score * (0.2);

      return finalScore.toFixed(2); //fix to 2 decimal places
  }

  document.getElementById('confirmMsg').innerHTML = "Total " + sum + " points";

  