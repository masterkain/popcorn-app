/*! videojs-progressTips - v0.1.0 - 2013-09-16
* https://github.com/mickey/videojs-progressTips
* Copyright (c) 2013 Michael Bensoussan; Licensed MIT */

/**
  Changes:
  - convert minutes in hours if above 60
**/
 
(function() {

  vjs.plugin('progressTips', function(options) {
    var init;
    init = function() {
      var player;
      if (this.techName !== "Html5") {
        return;
      }
      player = this;
      $(".vjs-progress-control").after($("      <div id='vjs-tip'>      <div id='vjs-tip-arrow'></div>      <div id='vjs-tip-inner'></div>      </div>    "));
      $(".vjs-progress-control").on("mousemove", function(event) {
        var barHeight, minutes, seconds, seekBar, timeInSeconds;
        seekBar = player.controlBar.progressControl.seekBar;
        timeInSeconds = seekBar.calculateDistance(event) * seekBar.player_.duration();
        if (timeInSeconds === seekBar.player_.duration()) {
          timeInSeconds = timeInSeconds - 0.1;
        }
        hours = Math.floor(timeInSeconds / 3600);
        minutes = Math.floor((timeInSeconds - hours * 3600) / 60 );
        seconds = Math.floor(timeInSeconds - hours * 3600 - minutes * 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (hours > 0) {
          $('#vjs-tip-inner').html("" + hours + ":" + minutes + ":" + seconds);
        } else {
          $('#vjs-tip-inner').html("" + minutes + ":" + seconds);
        }
        barHeight = $('.vjs-control-bar').height();
        $("#vjs-tip").css("top", "" + (event.pageY - $(this).offset().top - barHeight - 20) + "px").css("left", "" + (event.pageX - $(this).offset().left - 20) + "px").css("visibility", "visible");
        return;
      });
      $(".vjs-progress-control, .vjs-play-control").on("mouseout", function() {
        $("#vjs-tip").css("visibility", "hidden");
      });
    };
    this.on("loadedmetadata", init);
  });

}).call(this);
