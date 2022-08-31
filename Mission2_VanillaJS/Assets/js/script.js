const AnimateType = {
    NORMAL: 0,
    LOOP: 1
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
        deltaTime: 0
    }

    animateFunction = function animate(time) {
        this.proc.timeFraction = (time - this.proc.start) / this.duration;
        if (this.proc.timeFraction > 1) this.proc.timeFraction = 1;
  
        let progress = this.timing(this.proc.timeFraction)
        this.draw(progress);
  
        if (this.proc.timeFraction < 1 && this.isRun && !this.isPause) {
            this.handle = requestAnimationFrame(animate);
        }
    };
    animateLoopFunction = function animate(time) {
        if (!this.proc.isReverse) {
            this.proc.timeFraction = (time - this.proc.start) / this.duration;
        }
        else {
          this.proc.timeFraction = ((this.proc.start+this.duration) - time) / this.duration;
        }
        if (this.proc.timeFraction > 1) {
          this.proc.timeFraction = 1;
          this.proc.isReverse = true;
          this.proc.start = performance.now();
        }
        if (this.proc.timeFraction < 0) {
          this.proc.timeFraction = 0;
          this.proc.isReverse = false;
          this.proc.start = performance.now();
        }
    
        let progress = this.timing(this.proc.timeFraction)
        this.draw(progress);
    
        if (this.isRun && !this.isPause) {
          this.handle = requestAnimationFrame(this.callback.call);
        }
    };
    
    callback = {
        call: null
    }
    
    constructor(duration, draw, timing, type) {
        this.duration = duration;
        this.draw = draw;
        this.timing = timing;
        this.type = type;
        switch(this.type) {
            case AnimateType.NORMAL:
                this.callback.call = (this.animateFunction).bind(this);
                break;
            case AnimateType.LOOP:
                this.callback.call = (this.animateLoopFunction).bind(this);
                break;
        }
        
    }

    start() {
        if(!this.isRun) {
            this.isRun = true;
            this.isPause = false;
            this.animating();
        }
    }

    resume() {
        if(this.isRun && this.isPause) {
            this.isPause = false;
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