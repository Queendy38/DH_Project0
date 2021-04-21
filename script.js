  //create xmlhttprequest
  var xmlhttp = new XMLHttpRequest();
  var url = "input.json";
  var scoredApp = []; //object with existing applicants info (name + score)
  var app =[]; //object with all attributes (intelligence, strength,..)
  var score = []; //individual score
  //store different attribute for applicants
  var itArr = [];
  var enArr = [];
  var strengthArr = [];
  var spicyArr = [];
  var currentAppName = [];
  var sum; //total score of new applicants
  //get score for new applicants
  function confirm() {
    var nameApp = document.getElementById('applicantName');
    var it = document.getElementsByName('score1');
    var str = document.getElementsByName('score2');
    var en = document.getElementsByName('score3');
    var spicy = document.getElementsByName('score4');
      var itNum, strNum, enNum, spicyNum;
      for (i = 0; i < 4; i++) { //4 attributes
        //store value in array
        //calculate total score
          if (it[i].checked) {
              itArr.push(it[i].value);
              itNum = calculate(it[i].value, 0, 0, 0);
          } else if (str[i].checked) {
              strengthArr.push(str[i].value);
              strNum = calculate(0, str[i].value, 0, 0);
          } else if (en[i].checked) {
              enArr.push(en[i].value);
              enNum = calculate(0, 0, en[i].value, 0);
          } else if (spicy[i].checked) {
              spicyArr.push(spicy[i].value);
              spicyNum = calculate(0, 0, 0, spicy[i].value);
          }
      }
      currentAppName.push(nameApp); //add name to applicant
      sum = itNum + strNum + enNum + spicyNum; //calculate applicant scores
      scoredApp.push({name: nameApp.value,
        score: sum}) //add (namae+score) to scored applicantobject
        document.getElementById('confirmMsg').innerHTML = "Total " + sum + " points";
  }

  //check status
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var mydata = JSON.parse(this.responseText);

         /* //load content from JSON to array
          for (var i = 0; i < mydata.team.length; i++) {
              currentTeamName.push(mydata.team[i].name);
          }*/

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
          for (var i = 0; i < currentAppName.length; i++) {
              scoredApp.push({
                  name: currentAppName[i],
                  score: score[i]
              });
              app.push({name: currentAppName[i], attributes:{intelligence: itArr[i], endurance: enArr[i], strength: strengthArr[i], spicyFoodTolerance: spicyArr[i]}});
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
          console.log(JSON.stringify(app, null, 4));


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

  