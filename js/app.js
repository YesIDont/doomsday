// IIFE that starts 

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());


// doomsday date of your choosing
var g = new Date(2019, 5, 7, 1),
	
 	// difference between today and target date,
 	// which will be calculated in milliseconds
    dif,
   	
   	// container for temporary date
    tmp,
    
    // object holding weeks, days, hours, minutes, seconds and milliseconds left
    t = {w: '', d: '', h: '', m: '', s: '', ms: ''},
    
    // html element reference, that will be used
    // to display calculated date
    targetElement = document.getElementById("timeLeft"),

    // separator
    sp = " . ",

    // date to display temporary variable;
    dd;


// function calculates remaining time and outputs it to "t" object
// argument: your target date / doomsday, must be JS date object
function howMuchTimeLeftTo(a) {

  tmp = new Date();

  // calculate difference between current and target date
  dif = (a.getTime()) - (tmp.getTime()),
  
  // how much days are left
  t.d = Math.abs(Math.floor(dif / 86400000)),

  // how much weeks is left
  t.w = Math.floor(t.d / 7),

  // hours
  t.h = Math.floor( (dif - (t.d * 86400000) ) / 3600000),

  //minutes
  t.m = Math.floor( (dif - (t.d * 86400000) - (t.h * 3600000)) / 60000),

  // seconds and milliseconds - not really calculated,
  // just displayed based on current date in descending order
  t.s = 60 - tmp.getSeconds(),
  t.ms = 1000 - tmp.getMilliseconds();

  return t;
}

// format displayed date so that there will be always 0
// in front of single numbers
function formatDate() {
	if(t.h < 10) {
		t.h = "0" + t.h;
	}
	if(t.m < 10) {
		t.m = "0" + t.m;
	}
	if(t.s < 10) {
		t.s = "0" + t.s;
	}
	if(t.ms < 10) {
		t.ms = "00" + t.ms;
	} else if (t.ms > 9 && t.ms < 100) {
		t.ms = "0" + t.ms;
	}
	return dd = t.d + "d" + sp +
				t.h + "g" + sp +
				t.m + "m" + sp +
				t.s + "s" + sp +
				t.ms + "ms";
}

// self referencing function calling requestAnimationFrame method
function animateCalc() {
  requestAnimationFrame(animateCalc);
  howMuchTimeLeftTo(g);
  formatDate();
  targetElement.innerHTML = dd;
}

function displayOnStart() {
  var weeksLeft = 40 - t.w;
  document.getElementById("currentWeek").innerHTML = weeksLeft;
}

window.addEventListener("load", function() { 
  animateCalc();
  displayOnStart();
});


