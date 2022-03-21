var myCharacteristic;
    const btn = document.getElementById("btn");
    const text1 = document.getElementById("batt_lev");
    const text2 = document.getElementById("speed");
    const text3 = document.getElementById("bpm_data");
    const text4 = document.getElementById("sp02_data");
    const bot_L = document.getElementById("left_Border");
    const bot_R = document.getElementById("right_Border");
    const bot_B = document.getElementById("bot_Border");

setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    am_pm = "AM";
    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
  
    let currentTime = hour + ":" 
            + min + " " + am_pm;
  
    document.getElementById("time").innerHTML = currentTime;
}
showTime();

  btn.addEventListener("click", async event =>{
        startButton();
   })

  function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  for (let i = 0; i < value.byteLength; i++) {
    a.push(value.getUint8(i));
  }
     log1(a[0]);
     log2(a[1]);
     log3(a[2]);
     log4(a[3]);
     shadowShow1(a[4]);
     shadowShow2(a[5]);
     shadowShow3(a[6]);
     
 }


function shadowShow1(i) {
    var j = Boolean(i);
    if(j){
        bot_L.style.opacity = '1';
    }else{
        bot_L.style.opacity = '0';
    }
}
function shadowShow2(i) {
    var j = Boolean(i);
    if(j){
        bot_R.style.opacity = '1';
    }else{
        bot_R.style.opacity = '0';
    }
}
function shadowShow3(i) {
    var j = Boolean(i);
    if(j){
        bot_B.style.opacity = '1';
    }else{
        bot_B.style.opacity = '0';
    }
}
function log1(data) {
  text1.innerHTML = data + "%"; 
}
function log2(data) {
  text2.innerHTML = data; 
}
function log3(data) {
  text3.innerHTML = data; 
}
function log4(data) {
  text4.innerHTML = data; 
}


function startButton() {
  navigator.bluetooth.requestDevice({
     acceptAllDevices: true,
     optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
  })
  .then(device => {
//       log('Connecting to GATT Server...' + device.name );
    return device.gatt.connect();
  })
  .then(server => {
//       log('Getting Service...');
   return server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
  })
  .then(service => {
//       log('Getting Characteristic...');
      return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
  })
  .then(characteristic => {
   myCharacteristic = characteristic;
    return myCharacteristic.startNotifications().then(_ => {
    // log('> Notifications started');
    myCharacteristic.addEventListener('characteristicvaluechanged',
    handleNotifications);
    });
  })
  .catch(error => {
     log(error);
  });
}
