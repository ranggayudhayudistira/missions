const AnimateType = {
    NORMAL: 0,
    LOOP: 1,
    LOOPREVERSE: 2
};

class Animate {
    type = 0;
    handle = null;
    isRun = false;
    isPause = false;
    duration = 0;
    draw;
    timing;
    
    proc = {
        start: 0,
        timeFraction: 0,
        isReverse: false,
        pauseTime: 0,
        deltaTime: 0
    }

    animateFunction = function animate(time) {
        time = time - this.proc.deltaTime;

        this.proc.timeFraction = (time - this.proc.start) / this.duration;
        if (this.proc.timeFraction > 1) this.proc.timeFraction = 1;
  
        let progress = this.timing(this.proc.timeFraction)
        this.draw(progress);

        if (this.proc.timeFraction < 1 && this.isRun && !this.isPause) {
            this.handle = requestAnimationFrame(this.callback.call);
        } else if (this.callback.end != null && this.proc.timeFraction >= 1) {
            this.callback.end.start();
        }
    };
    animateLoopFunction = function animate(time) {
        time = time - this.proc.deltaTime;

        this.proc.timeFraction = (time - this.proc.start) / this.duration;
        if (this.proc.timeFraction > 1) {
            this.proc.timeFraction = 1;
            this.proc.start = performance.now() - this.proc.deltaTime;
        }
  
        let progress = this.timing(this.proc.timeFraction)
        this.draw(progress);
  
        if (this.isRun && !this.isPause) {
            this.handle = requestAnimationFrame(this.callback.call);
        }
    };
    animateLoopReverseFunction = function animate(time) {
        time -= this.proc.deltaTime;
        //this.proc.start = this.proc.start + this.proc.deltaTime;
        
        if (!this.proc.isReverse) {
            this.proc.timeFraction = (time - this.proc.start) / this.duration;
        }
        else {
          this.proc.timeFraction = ((this.proc.start+this.duration) - time) / this.duration;
        }
        if (this.proc.timeFraction > 1) {
          this.proc.timeFraction = 1;
          this.proc.isReverse = true;
          this.proc.start = performance.now() - this.proc.deltaTime;
        }
        if (this.proc.timeFraction < 0) {
          this.proc.timeFraction = 0;
          this.proc.isReverse = false;
          this.proc.start = performance.now() - this.proc.deltaTime;
        }
    
        let progress = this.timing(this.proc.timeFraction)
        this.draw(progress);
    
        if (this.isRun && !this.isPause) {
          this.handle = requestAnimationFrame(this.callback.call);
        }
    };
    
    callback = {
        call: null,
        end: null
    }
    
    constructor(duration, draw, timing, type, end = null) {
        this.duration = duration;
        this.draw = draw;
        this.timing = timing;
        this.type = type;
        switch(this.type) {
            case AnimateType.NORMAL:
                this.callback.call = (this.animateFunction).bind(this);
                this.callback.end = end;
                break;
            case AnimateType.LOOP:
                this.callback.call = (this.animateLoopFunction).bind(this);
                break;
            case AnimateType.LOOPREVERSE:
                this.callback.call = (this.animateLoopReverseFunction).bind(this);
                break;
        }
        
    }

    start() {
        if(!this.isRun) {
            this.proc.pauseTime = 0;
            this.proc.deltaTime = 0;
            this.isRun = true;
            this.isPause = false;
            this.animating();
        }
    }

    resume() {
        if(this.isRun && this.isPause) {
            this.isPause = false;
            this.proc.deltaTime += performance.now() - this.proc.pauseTime;
            this.requestAnimate();
        }
    }

    stop() {
        if(this.isRun) {
            this.isPause = false;
            this.isRun = false;
            if(this.handle) {
                cancelAnimationFrame(this.handle);
                this.handle = null;
            }
        }
    }

    pause() {
        if(this.isRun && !this.isPause) {
            this.isPause = true;
            this.proc.pauseTime = performance.now();
            if(this.handle) {
                cancelAnimationFrame(this.handle);
            }
        }
    }

    // private
    requestAnimate() {
        requestAnimationFrame(this.callback.call);
    }
    animating() {
        this.proc.isReverse = false;
        this.proc.start = performance.now();
        if(this.handle != null) {
            this.isRun = true;
        }
        this.requestAnimate();
    }
}