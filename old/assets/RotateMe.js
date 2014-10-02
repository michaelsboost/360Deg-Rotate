$.fn.RotateMe = function() {
  $this = $(this);
  $this.append('<div class="handle rotatable"></div>');
  
  $(".rotatable").on("mousedown touchstart", function() {
    rotateable = 1;
    if (rotateable) {
      $this.each(function() {
        var body = $(document),
            angler = $this.find(".rotatable").parent();
        
        angler.on("mousedown touchstart", mouseDown);
        body.on("mouseup touchend", mouseUp);
        
        function setAngle(value) {
          angler.css("transform", "rotate(" + value + "deg)");
        }
        
        function mouseDown(event) {
          body.on("mousemove.rotatable", handleMove);
          body.on("touchmove.rotatable", handleMove);
          handleMove(event);
          event.preventDefault();
        }
        
        function mouseUp(event) {
          body.off("mousemove.rotatable", handleMove);
          body.off("touchmove.rotatable", handleMove);
          rotateable = false;
        }
        
        function handleMove(event) {
          if (rotateable) {
            var mouseX = event.pageX;
            var mouseY = event.pageY;
            
            setAngle(0);
            var ofs = angler.offset();
            ofs.left += angler.height()/2;
            ofs.top += angler.width()/2;
            
            var x = mouseX - ofs.left;
            var y = mouseY - ofs.top;
            
            var angle = Math.atan2(x, y) * 180 / Math.PI;
            angle = 180 - angle;
            // strip decimal, go between 0-360
            angle = ((angle + 360) | 0) % 360;
            setAngle(angle);
          }
        }
      });
    }
  });
};
