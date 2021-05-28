class dbORM{

    constructor(database, version){
        this._request = window.indexedDB.open(database, version);
        request.addEventListener("success", () => {
            console.log("Success: " + request);
            console.log("Result: " + request.result);
        });
        
        request.addEventListener("error", () => {
            console.log("error: " + request.errorCode);
        });
            
        request.addEventListener("upgradeneeded", (evt) => {
            let db = evt.target.result;
            db.createObjectStore("Events", {keyPath: "id", autoincrement: true});
            console.log(db);
    
        });
    }

}
function connect(database, version){
    let request = window.indexedDB.open(database, version);
    
    request.addEventListener("success", () => {
        console.log("Success: " + request);
        console.log("Result: " + request.result);
    });
    
    request.addEventListener("error", () => {
        console.log("error: " + request.errorCode);
    });
        
    request.addEventListener("upgradeneeded", (evt) => {
        let db = evt.target.result;
        db.createObjectStore("Events", {keyPath: "id", autoincrement: true});
        console.log(db);

    });
}

function add(title, begDate){
    let db = connect("Events", 1);
    let transaction = db.result.transaction("ev", "readwrite");

    transaction.addEventListener("complete", () => {
        console.log("Transction Completed Successfully.");
    })

    transaction.addEventListener("error", () => {
        console.log("An error occurred.");
    })

}

add("asdas", "asdasdas");

// connect("Events", 1);

// window.indexedDB.deleteDatabase("Events");


// let DBDeleteRequest = window.indexedDB.deleteDatabase("Events");

// DBDeleteRequest.onerror = function(event) {
//   console.log("Error deleting database.");
// };

// DBDeleteRequest.onsuccess = function(event) {
//   console.log("Database deleted successfully");

//   console.log(event.result); // should be undefined
// };