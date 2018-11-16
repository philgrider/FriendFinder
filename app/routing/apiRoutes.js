
var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var userData = req.body.scores;
        var match = {};
        if (req.body) {
            var userScore = [];
            for (var i = 0; i < friends.length; i++) {
                addScores(friends[i].name, friends[i].scores, userData, userScore)
            }
            userScore.sort(compare);
            function findMatch() {
                for (var i = 0; i < friends.length; i++) {
                    if (friends[i].name === userScore[0].name) {
                        match = {
                            'name': friends[i].name,
                            'photo': friends[i].photo
                        };
                    }
                }
            }

        }
findMatch();
res.json(match);
  });
};
function addScores(dogName, dogData, userData, userScore){
    var tempUserScore = 0;
    for(var i = 0;i < 10;i++){
    tempUserScore += (Math.abs(parseInt(dogData[i]) - parseInt(userData[i])));
    };
    userScore.push({
        'name': dogName,
        'score': tempUserScore
        });
};
function compare(a, b) {
    if (a.score < b.score)
        return -1;
    if (a.score > b.score)
        return 1;
    return 0;
}