$(document).ready(function() {

	/* STARLY */

	function insertstarly() {
		counter++;
		var pos_x = $( window ).width()*Math.random();
		var pos_y = $( window ).height()*Math.random();
		$( ".starlys" ).append( "<div class='starly' id='starly-"+counter+"' style='bottom:"+pos_y+"px; left: "+pos_x+"px'><img src='https://i.ibb.co/ZNG7FT5/3fd9c84a-aa7c-4fd9-ae68-4fc475021cf2.jpg'/></div>" );
	}

	function createstarly () {
		insertstarly();
		starlys_creator = setInterval(function () {
			insertstarly()
		}, 2500);
	}

	function deletestarly () {
		if ($( ".starly" ).length>0) {
			clearInterval(starlys_creator);
			$( ".starly" ).remove();
			$('#timer span').text('24');
	  		starlyCounter.start();
	  		counter=0;
		}
	}

	var starlyCounter = new Countdown({
	    seconds:10,  // number of seconds to count down
	    onUpdateStatus: function(sec){

	    	$('#timer span').text(leftPad(sec,2));

	    }, // callback for each second
	    onCounterEnd: function(count){
	    	createstarly (count)
	    } // final action
	});

	counter=0;
	starlyCounter.start();
	$( document ).click(function() {
	  deletestarly ();
	});

	$( window ).resize(function() {
		deletestarly ();
	});

	function Countdown(options) {
	  var timer,
	  instance = this,
	  seconds = options.seconds || 10,
	  counter = 0,
	  updateStatus = options.onUpdateStatus || function () {},
	  counterEnd = options.onCounterEnd || function () {};

	  function decrementCounter() {
	    updateStatus(seconds);
	    if (seconds === 0) {
	    	counterEnd(counter);
	      /*counter++;
	      seconds = options.seconds || 10;
	      seconds++;*/
	      instance.stop();
	    }
	    seconds--;
	  }

	  this.start = function () {
	    clearInterval(timer);
	    timer = 0;
	    seconds = options.seconds;
	    timer = setInterval(decrementCounter, 1000);
	  };

	  this.stop = function () {
	    clearInterval(timer);
	  };
	}

	function leftPad(number, targetLength) {
	    var output = number + '';
	    while (output.length < targetLength) {
	        output = '0' + output;
	    }
	    return output;
	}

})
