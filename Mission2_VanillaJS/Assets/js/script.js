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

function rand(min, max) {
    return (Math.random() * (max - min) ) + min;
};
function randInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// https://javascript.info/js-animation#back-bow-shooting
function back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
};
// https://javascript.info/js-animation#elastic-animation
function elastic(x, timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}

let grassLoop = new Animate(
        duration=10000, 
        draw=function(progress) {
            document.querySelectorAll('#grass').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + progress * 100 + "vw)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.LOOP
    );
let fmountainLoop = new Animate(
        duration=17500, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-front').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + progress * 100 + "vw)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.LOOP
    );
let mmountainLoop = new Animate(
        duration=32500, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-mid').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + progress * 100 + "vw)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.LOOP
    );
let bmountainLoop = new Animate(
        duration=50000, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-back').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + progress * 100 + "vw)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.LOOP
    );
let grassIn = new Animate(
        duration=800, 
        draw=function(progress) {
            document.querySelectorAll('#grass').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var bottom = el.style['bottom'];
                    el.style['bottom'] = "calc(-100vh + " + bottom + " + " + progress * 100 + "vh)";
                }
            );
        },
        timing=function(timeFraction) {
            return 1 - back(0.22, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=grassLoop
    );
let fmountainIn = new Animate(
        duration=1000, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-front').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var bottom = el.style['bottom'];
                    el.style['bottom'] = "calc(-100vh + " + bottom + " + " + progress * 100 + "vh)";
                }
            );
        },
        timing=function(timeFraction) {
            return 1 - back(0.15, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=fmountainLoop
    );
let mmountainIn = new Animate(
        duration=1250, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-mid').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var bottom = el.style['bottom'];
                    el.style['bottom'] = "calc(-100vh + " + bottom + " + " + progress * 100 + "vh)";
                }
            );
        },
        timing=function(timeFraction) {
            return 1 - back(0.5, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=mmountainLoop,
    );
let bmountainIn = new Animate(
        duration=1750, 
        draw=function(progress) {
            document.querySelectorAll('#mountain-back').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var bottom = el.style['bottom'];
                    el.style['bottom'] = "calc(-100vh + " + bottom + " + " + progress * 100 + "vh)";
                }
            );
        },
        timing=function(timeFraction) {
            return 1 - back(1.2, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=bmountainLoop
    );
let sunIn = new Animate(
        duration=2000, 
        draw=function(progress) {
            document.querySelectorAll('#sun, .sunlight-back').forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var top = el.style['top'];
                    var width = el.style['width'];
                    var left = el.style['left'];
                    //el.style['top'] = "calc(100vh + " + top + " - " + progress * 100 + "vh)";
                    el.style['width'] = "calc("+ width +" * "+ progress +")";
                    el.style['top'] = "calc("+ top +" + (calc("+ width +" * "+ (1-progress) +")/2)";
                    el.style['left'] = "calc("+ left +" + (calc("+ width +" * "+ (1-progress) +")/2)";
                }
            );
        },
        timing=function(timeFraction) {
            return 1 - elastic(1.5, 1 - timeFraction);
        },
        type=AnimateType.NORMAL
    );

function doDialog1() {
    var n = 1
    let textDialogTypeIn = new Animate(
        duration=500, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elText = el.querySelector(".chat-text");
            var text = elText.getAttribute('text');
            var textLength = text.length;

            elText.innerHTML = text.substr(0, Math.floor(textLength * progress));
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.NORMAL
    );
    let textDialogIn = new Animate(
        duration=500, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elText = el.querySelector(".chat-text");
            elText.style.cssText = elText.getAttribute('init');
            var textWidth = elText.style['width'];
            var textPaddingX = elText.style['padding-left'];
            var textPaddingY = elText.style['padding-top'];

            //elText.style['bottom'] = "calc(-100vh + " + textBottom + " + " + progress * 100 + "vh)";
            elText.style['width'] = "calc(" + textWidth + " * " + progress * 1 + ")";
            elText.style['padding-left'] = "calc(" + textPaddingX + " * " + progress * 1 + ")";
            elText.style['padding-right'] = "calc(" + textPaddingX + " * " + progress * 1 + ")";
            elText.style['padding-top'] = "calc(" + textPaddingY + " * " + progress * 1 + ")";
            elText.style['padding-bottom'] = "calc(" + textPaddingY + " * " + progress * 1 + ")";
            
        },
        timing=function(timeFraction) {
            return 1 - back(1.2, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=textDialogTypeIn
    );
    let dialogIn = new Animate(
        duration=1000, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elImage = el;//.querySelector(".chat-image");
            var elText = el.querySelector(".chat-text");
            elImage.style.cssText = elImage.getAttribute('init');
            
            var imageBottom = elImage.style['bottom'];
            
            elImage.style['bottom'] = "calc(-100vh + " + imageBottom + " + " + progress * 100 + "vh)";

            elText.style['width'] = "0px";
            elText.style['padding-top'] = "0px";
            elText.style['padding-bottom'] = "0px";
            elText.style['padding-left'] = "0px";
            elText.style['padding-right'] = "0px";
            elText.innerHTML = "";
        },
        timing=function(timeFraction) {
            return 1 - back(1.2, 1 - timeFraction);
        },
        type=AnimateType.NORMAL,
        end=textDialogIn
    );
    dialogIn.start();
}

function doExitDialog1() {
    var n = 1
    let dialogOut = new Animate(
        duration=1000, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elImage = el;//.querySelector(".chat-image");
            elImage.style.cssText = elImage.getAttribute('init');
            
            var imageBottom = elImage.style['bottom'];
            
            elImage.style['bottom'] = "calc(" + imageBottom + " - " + progress * 100 + "vh)";
        },
        timing=function(timeFraction) {
            return back(1.2, timeFraction);
        },
        type=AnimateType.NORMAL
    );
    let textDialogOut = new Animate(
        duration=500, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elText = el.querySelector(".chat-text");
            elText.style.cssText = elText.getAttribute('init');
            var textWidth = elText.style['width'];
            var textPaddingX = elText.style['padding-left'];
            var textPaddingY = elText.style['padding-top'];

            //elText.style['bottom'] = "calc(-100vh + " + textBottom + " + " + progress * 100 + "vh)";
            elText.style['width'] = "calc(" + textWidth + " * " + (1 - (progress * 1)) + ")";
            elText.style['padding-left'] = "calc(" + textPaddingX + " * " + (1 - (progress * 1)) + ")";
            elText.style['padding-right'] = "calc(" + textPaddingX + " * " + (1 - (progress * 1)) + ")";
            elText.style['padding-top'] = "calc(" + textPaddingY + " * " + (1 - (progress * 1)) + ")";
            elText.style['padding-bottom'] = "calc(" + textPaddingY + " * " + (1 - (progress * 1)) + ")";
            elText.innerHTML = "";
        },
        timing=function(timeFraction) {
            return back(1.2, timeFraction);
        },
        type=AnimateType.NORMAL,
        end=dialogOut
    );
    
    let textDialogTypeOut = new Animate(
        duration=500, 
        draw=function(progress) {
            el = document.querySelector("#chat-"+n)
            var elText = el.querySelector(".chat-text");
            var text = elText.getAttribute('text');
            var textLength = text.length;

            elText.innerHTML = text.substr(0, textLength - Math.floor(textLength * progress));
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.NORMAL,
        end=textDialogOut
    );
    textDialogTypeOut.start();
    sleep(1500);
}

function cloudMaker(n, durationIn, leftIn, durationAnimation, leftAnimation, durationOut, leftOut) {
    // var n = 2;
    // var durationIn = 2500;
    // var leftIn = 10; //vw
    // var durationAnimation = 2500;
    // var leftAnimation = 10; //vw
    // var durationOut = 2500;
    // var leftOut = 10; //vw

    let cloudsOut = new Animate(
        duration=durationOut, 
        draw=function(progress) {
            document.querySelectorAll("#cloud-"+n).forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var filter = el.style['filter'];
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + leftIn + "vw" + " + " + leftAnimation + "vw" + " + " + progress * leftOut + "vw)";
                    el.style['filter'] += "opacity("+ (100 - Math.floor(progress * 100)) +"%)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.NORMAL
    );
    let cloudsAnimation = new Animate(
        duration=durationAnimation, 
        draw=function(progress) {
            document.querySelectorAll("#cloud-"+n).forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + leftIn + "vw" + " + " + progress * leftAnimation + "vw)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.NORMAL,
        end=cloudsOut
    );
    let cloudsIn = new Animate(
        duration=durationIn, 
        draw=function(progress) {
            document.querySelectorAll("#cloud-"+n).forEach(
                function(el) {
                    el.style.cssText = el.getAttribute('init');
                    var left = el.style['left'];
                    el.style['left'] = "calc(" + left + " + " + progress * leftIn + "vw)";
                    el.style['filter'] += "opacity("+ Math.floor(progress * 100) +"%)";
                }
            );
        },
        timing=function(timeFraction) {
            return timeFraction;
        },
        type=AnimateType.NORMAL,
        end=cloudsAnimation
    );
    cloudsIn.start();

    var _durationIn = randInteger(1500, 3000);
    var _leftIn = randInteger(1, 8); //vw
    var _durationAnimation = _durationIn;
    var _leftAnimation = _leftIn + randInteger(1, 5); //vw
    var _durationOut = _durationIn;
    var _leftOut = _leftAnimation + randInteger(1, 2); //vw
    setTimeout(cloudMaker, randInteger(2500, 10000) + durationIn + durationAnimation + durationOut, n, _durationIn, _leftIn, _durationAnimation, _leftAnimation, _durationOut, _leftOut);
}

document.querySelectorAll('img').forEach(
        function(el) {
            el.setAttribute('draggable', false);
        }
    );
    
// init inline css
function initCss() {
    console.log("Window Loaded!");
    var el;
    el = document.querySelector('body')
    el.style['position'] = "relative";
    el.style['min-height'] = "100%";
    el.style['background-image'] = "url('Assets/img/layer1_1_background.png')";
    el.style['background-size'] = "auto 100%";
    el.style['background-repeat'] = "repeat-x";
    el.style['height'] = "100vh";
    el.style['overflow'] = "hidden";
    el.setAttribute("init", el.style.cssText);

    document.querySelectorAll('#sun').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "var(--sun-width)";
            el.style['aspect-ratio'] = "1/1";
            el.style['height'] = "auto";
            el.style['top'] = "calc(100vh * 0.125)";
            el.style['left'] = "calc(100vw * 0.5 - calc(var(--sun-width)/2))";
        el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('.sunlight-back').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "calc(var(--sun-width) + var(--sun-margin))";
            el.style['aspect-ratio'] = "1/1";
            el.style['height'] = "auto";
            el.style['top'] = "calc((100vh * 0.125) - (var(--sun-margin)/2))";
            el.style['left'] = "calc((100vw * 0.5 - calc(var(--sun-width)/2)) - calc(var(--sun-margin)/2))";
            el.style['background'] = "radial-gradient(circle at center, yellow 50%, #FFFF0000 70%, #FFFF0000 100%)";
        el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('[id*=cloud-]').forEach(
        function(el) {
            var id = el.getAttribute('id');
            var height = el.naturalHeight;
            var width = el.naturalWidth;
            
            id = id.substring(id.indexOf('cloud-') + 6);
            el.style['position'] = "absolute";
            
            el.style['height'] = "var(--cloud-height)";
            el.style['width'] = "auto";
            el.style['max-width'] = width + "px";
            el.style['max-height'] = height + "px";
            var top = rand(0, 0.4);
            var left = Math.random();

            el.style['top'] = "calc(100vh * "+ top +")";
            el.style['left'] = "calc(100vw * "+ left +")";
            if(id != 11 && id != 12) {
                // https://codepen.io/sosuke/pen/Pjoqqp
                el.style['filter'] += " invert(6%) sepia(49%) saturate(500%) hue-rotate(335deg) brightness(110%) contrast(101%) opacity(75%)";
            }
            el.setAttribute("init", el.style.cssText);
        }
    );
    

    document.querySelectorAll('#mountain-back').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "100%";
            el.style['height'] = "auto";
            el.style['bottom'] = "calc(calc(100vw * 0.165) + calc(3vh))";
            el.style['left'] = "0";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('#mountain-mid').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "100%";
            el.style['height'] = "auto";
            el.style['bottom'] = "calc(calc(100vw * 0.12) + calc(3vh))";
            el.style['left'] = "0";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('#mountain-front').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "100%";
            el.style['height'] = "auto";
            el.style['bottom'] = "0";
            el.style['left'] = "0";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('#grass').forEach(
        function(el) {
            el.style['position'] = "absolute";
            el.style['width'] = "100%";
            el.style['height'] = "auto";
            el.style['bottom'] = "0";
            el.style['left'] = "0";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('[class*=blur-]').forEach(
        function(el) {
            var px = el.className.substring(el.className.indexOf('blur-') + 5);
            el.style['filter'] += " blur("+ px +"px)";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('.slide-anim').forEach(
        function(el) {
            el.style['width'] = "100%";
            el.style['height'] = "auto";
            el.setAttribute("init", el.style.cssText);
        }
    );

    document.querySelectorAll('[id*=chat-]').forEach(
        function(el) {
            var elImage = el.querySelector(".chat-image");
            var elText = el.querySelector(".chat-text");
            var imageHeight = elImage.naturalHeight;
            var imageWidth = elImage.naturalWidth;

            elImage.style['height'] = "auto";
            elImage.style['width'] = "20vw";
            elImage.style['max-width'] = imageWidth + "px";
            elImage.style['max-height'] = imageHeight + "px";
            elImage.style['bottom'] = "0vh";
            elImage.style['left'] = "0vw";

            var textLeft = "calc(min(20vw, "+ imageWidth +"px) + var(--chat-gap))";
            elText.style['left'] = textLeft;
            elText.style['height'] = "calc(min(auto + 10px, "+ imageHeight +"px)/2)";
            elText.style['width'] = "calc(100vw - min("+ textLeft +", "+ imageWidth +"px) - var(--chat-gap) - 10px - 5vw)";
            elText.style['bottom'] = "25%";
            
            elText.style['padding-left'] = "50px";
            elText.style['padding-right'] = "50px";
            elText.style['padding-top'] = "10px";
            elText.style['padding-bottom'] = "10px";

            el.style['bottom'] = "0vh";
            el.style['left'] = "0vw";
            el.style['display'] = "";
            
            el.setAttribute("init", el.style.cssText);
            elImage.setAttribute("init", elImage.style.cssText);
            elText.setAttribute("init", elText.style.cssText);
        
        }
    );

    // !important class
    document.querySelectorAll('.slider.slide-anim').forEach(
        function(el) {
            el.style['left'] = "calc(-100vw + 2px)";
            el.setAttribute("init", el.style.cssText);
        }
    );

    // first condition before going in
    document.querySelectorAll('[id*=cloud-]').forEach(
        function(el) {
            el.style['filter'] += " opacity(0%)";
        }
    );
    document.querySelectorAll('#sun, #mountain-back, #mountain-mid, #mountain-front, #grass').forEach(
        function(el) {
            el.style['top'] = "100vh";
        }
    );
    document.querySelectorAll('[id*=chat-]').forEach(
        function(el) {
            el.style['bottom'] = "-100vh";
            el.querySelector('.chat-text').style['padding'] = "0px";
            el.querySelector('.chat-text').style['width'] = "0px";
        }
    );
};

// init animation queue
function initAnimation() {
    // animation in
    fmountainIn.start();
    mmountainIn.start();
    bmountainIn.start();
    grassIn.start();
    for(var n = 1; n < 13; n++) {
        var _durationIn = randInteger(1500, 3000);
        var _leftIn = randInteger(1, 8); //vw
        var _durationAnimation = _durationIn;
        var _leftAnimation = _leftIn + randInteger(1, 5); //vw
        var _durationOut = _durationIn;
        var _leftOut = _leftAnimation + randInteger(1, 2); //vw
        setTimeout(cloudMaker, randInteger(1000, 10000), n, _durationIn, _leftIn, _durationAnimation, _leftAnimation, _durationOut, _leftOut);
    }
}

let isInDialog = false;
let lastClick = 0;
document.addEventListener('click', function() {
    var now = performance.now();
    // limit rate every 2 seconds
    if(grassLoop.isRun && bmountainLoop.isRun && mmountainLoop.isRun && fmountainLoop.isRun && now - lastClick > 2000) {
        lastClick = now;
        if(!isInDialog) {
            grassLoop.pause();
            bmountainLoop.pause();
            mmountainLoop.pause();
            fmountainLoop.pause();
            doDialog1();
        } else {
            grassLoop.resume();
            bmountainLoop.resume();
            mmountainLoop.resume();
            fmountainLoop.resume();
            doExitDialog1();
        }
        isInDialog ^= true;
    }
    
});

(function(){
    function id(v){return document.getElementById(v); }
    function loadPage() {
        initCss();
        var ovrl = id("overlay"),
            prog = id("progress"),
            stat = id("progstat"),
            img = document.images,
            c = 0;
            tot = img.length;

        function imgLoaded(){
            c += 1;
            var perc = ((100/tot*c) << 0) +"%";
            prog.style.width = perc;
            stat.innerHTML = "Loading "+ perc;
            if(c===tot) return doneLoading();
        }
        function doneLoading(){
            sunIn.start();
            setTimeout(function(){ 
                ovrl.style.opacity = 0;
                setTimeout(function() {
                    initAnimation();
                    ovrl.style.display = "none";
                }, 1200);
                
            }, 2000);
        }
        for(var i=0; i<tot; i++) {
            var tImg     = new Image();
            tImg.onload  = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src     = img[i].src;
        }    
    }
    document.addEventListener('DOMContentLoaded', loadPage, false);
    }());