// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuMdKVGlrhYeW3E0Acn-Fs4r76e3q0Crk",
    authDomain: "bootcamp-62054.firebaseapp.com",
    databaseURL: "https://bootcamp-62054.firebaseio.com",
    projectId: "bootcamp-62054",
    storageBucket: "bootcamp-62054.appspot.com",
    messagingSenderId: "262852101163"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  $("#add-train-button").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirstTime = $("#first-train-time-input").val().trim();
    var trainFreq = parseInt($("#frequency-input").val().trim());

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainFirstTime,
      freq: trainFreq
    };
  
    // Uploads train data to the database
    db.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);
  
    // Alert
    alert("Train schedule added successfully!");
  
    // Clears all of the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  db.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirstTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Console log user's train data
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirstTime);
    console.log(trainFreq);
  
    // Calculate each train's next arrival time and minutes away
    var trainFirstTimeConv = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDiff = currentTime.diff(moment(trainFirstTimeConv), "minutes");
    var timeRemaining = timeDiff % trainFreq;
    var trainMinsAway = trainFreq - timeRemaining;
    var trainNext = moment().add(trainMinsAway, "minutes");
    
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + trainNext + "</td><td>" + trainMinsAway + "</td></tr>");
  });