var id, options;
//firebASE FOR STORING SHUTTLE IN realtime database.
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCuN-7SqZLt7ffNVWbnOV7w-aDu_5a0maw",
    authDomain: "dtu-shuttle.firebaseapp.com",
    databaseURL: "https://dtu-shuttle.firebaseio.com",
    projectId: "dtu-shuttle",
    storageBucket: "dtu-shuttle.appspot.com",
    messagingSenderId: "162781514789",
    appId: "1:162781514789:web:62cb93edc75647f20903cc",
    measurementId: "G-GFPXX061Q2"
  };
  // Initialize Firebase
  var firebase=require("firebase/app");
  require("firebase/database");
  var sphereKnn=require("sphere-knn");
  firebase.initializeApp(firebaseConfig);
  var database=firebase.database();
  //function to write coordinates+shuttlepoint to firebase.
  function writeshuttlelocation(shuttlepoint,latitude, longitude) {
  firebase.database().ref('shuttlelocation').set({
    shuttlepoint: shuttlepoint,
    shuttlelatitude: latitude,
    shuttlelongitude : longitude
  });
}
function pointObject(lat,lng,num){
    this.latitude=lat,
    this.longitude=lng,
    this.pointnum=num
}
var point1=new pointObject(28.541011, 77.157927,1);
var point2=new pointObject(28.540815, 77.158387,2);
var point3=new pointObject(28.540625, 77.158857,3);
var point4=new pointObject(28.540400, 77.159352,4);
var point5=new pointObject(28.540751, 77.159586,5);
var point6=new pointObject(28.541156, 77.159763,6);
lookup=sphereKnn([point1,point2,point3,point4,point5,point6]);
options ={
    enableHighAccuracy:true,
    timeout:1000,
    maximumage: 0
}
function liveLocation(evt){
	console.log(lookup(evt.coords.latitude,evt.coords.longitude,6))
    var currPointObj =lookup(evt.coords.latitude,evt.coords.longitude,6)[0];
    var currentPoint=currPointObj.pointnum;
    display(currentPointObj);
}
/**function userShuttleDistance(currentPoint,userPoint){
  var distance=Math.abs(currentPoint-userPoint)*50;
  return distance;
}**/
function display(currentPointObj){
  document.querySelector("h2").innerHTML="Shuttle is At Point"+currentPointObj.pointnum;
  //write coordinates+shuttlepoint to firebase.
  writeshuttlelocation(currentPointObj.latitude,currPointObj.longitude,currPointObj.pointnum);
  //var dist=userShuttleDistance(currentPoint,point1.pointnum);
  //document.querySelector("h3").innerHTML="Shuttle is at a distance "+dist+" metre";  
}
function error(evt){
    console.log("error");
}
function buttonclick(){
  id=navigator.geolocation.watchPosition(liveLocation,error,options);
}
document.querySelector(".btn").addEventListener("click",buttonclick);
document.querySelector(".btn2").addEventListener("click",function(){
	navigator.geolocation.clearWatch(id);
});