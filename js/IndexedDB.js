let request = window.indexedDB.open("Events", 1);
let database = {};
 
request.addEventListener("success", () => {
    database = request.result;
    console.log("request: " + request);
    console.log("database: " + database);
});

request.addEventListener("error", () => {
    console.log("error: " + request.errorCode);
});

let dadosEvento = {title: "Walk with the dog", begDate: "2021-05-28"};

request.addEventListener("upgradeneeded", (evt) => {
    let db = evt.target.result;
    console.log("db: " + db);    
});

// let DBDeleteRequest = window.indexedDB.deleteDatabase("Events");

// DBDeleteRequest.onerror = function(event) {
//   console.log("Error deleting database.");
// };

// DBDeleteRequest.onsuccess = function(event) {
//   console.log("Database deleted successfully");

//   console.log(event.result); // should be undefined
// };