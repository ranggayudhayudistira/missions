
function animate({duration, draw, timing}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction)
  
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  function animateLoop({duration, draw, timing, handle = null}) {
    let isReverse = false;
    let start = performance.now();
    if(handle != null) {
        handle.run = true;
    }
  
    return requestAnimationFrame(function animate(time) {
      var timeFraction;
      if (!isReverse) {
        timeFraction = (time - start) / duration;
      }
      else {
        timeFraction = ((start+duration) - time) / duration;
      }
      if (timeFraction > 1) {
        timeFraction = 1;
        isReverse = true;
        start = performance.now();
      }
      if (timeFraction < 0) {
        timeFraction = 0;
        isReverse = false;
        start = performance.now();
      }
  
      let progress = timing(timeFraction)
  
      draw(progress);
  
      if (handle == null || handle.run == true) {
        var frameHandle = requestAnimationFrame(animate);
        if(handle) {
            handle.id = frameHandle;
        }
      }
  
    });
  }