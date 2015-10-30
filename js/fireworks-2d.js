'use strict';

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    for(var firework in fireworks){
        buffer.fillStyle = fireworks[firework]['color'];
        buffer.fillRect(
          fireworks[firework]['x'],
          fireworks[firework]['y'],
          fireworks[firework]['width'],
          fireworks[firework]['height']
        );
    }

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function launch(firework){
    var firework = firework || {};
    firework['children'] = firework['children'] !== void 0
      ? firework['children']
      : 10;
    firework['color'] = firework['color'] || random_hex();
    firework['dx'] = firework['dx'] || Math.random() * 4 - 2;
    firework['dy'] = firework['dy'] || -(height / 200) - Math.random() * 2;
    firework['height'] = firework['height'] || 4;
    firework['timer'] = firework['timer'] || 100 + Math.floor(Math.random() * 200);
    firework['width'] = firework['width'] || 4;
    firework['x'] = firework['x'] || x;
    firework['y'] = firework['y'] || height;

    fireworks.push(firework);
}

function logic(){
    for(var firework in fireworks){
        fireworks[firework]['x'] += fireworks[firework]['dx'];
        fireworks[firework]['y'] += fireworks[firework]['dy'];

        fireworks[firework]['dy'] += .02;
        fireworks[firework]['dx'] *= .99;

        fireworks[firework]['timer'] -= 1;
        if(fireworks[firework]['timer'] <= 0){
            if(fireworks[firework]['children'] > 0){
                var loop_counter = fireworks[firework]['children'] - 1;
                do{
                    launch({
                      'children': 0,
                      'dx': Math.random() * 3 - 1.5,
                      'dy': Math.random() * 3 - 1.5,
                      'x': fireworks[firework]['x'],
                      'timer': 42 + Math.floor(Math.random() * 99),
                      'y': fireworks[firework]['y'],
                    });
                }while(loop_counter--);
            }

            fireworks.splice(
              firework,
              1
            );
        }
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var fireworks = [];
var height = 0;
var width = 0;
var x = 0;
var y = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: clear.
    if(key === 27){
        fireworks.length = 0;

    }else{
        launch();
    }
};

window.onload = function(e){
    resize();
    launch();

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      30
    );
};

window.onmousedown =
  window.ontouchstart = function(e){
    launch();
};

window.onresize = resize;
