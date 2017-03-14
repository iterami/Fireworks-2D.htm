'use strict';

function draw_logic(){
    for(var firework in fireworks){
        canvas_buffer.fillStyle = fireworks[firework]['color'];
        canvas_buffer.fillRect(
          fireworks[firework]['x'],
          fireworks[firework]['y'],
          fireworks[firework]['width'],
          fireworks[firework]['height']
        );
    }
}

function launch(firework){
    var firework = firework || {};
    firework['children'] = firework['children'] !== void 0
      ? firework['children']
      : 10;
    firework['color'] = firework['color'] || '#' + random_hex();
    firework['dx'] = firework['dx'] || Math.random() * 4 - 2;
    firework['dy'] = firework['dy'] || -(canvas_height / 200) - Math.random() * 2;
    firework['height'] = firework['height'] || 4;
    firework['timer'] = firework['timer'] || random_integer({
      'max': 200,
    }) + 100;
    firework['width'] = firework['width'] || 4;
    firework['x'] = firework['x'] || canvas_x;
    firework['y'] = firework['y'] || canvas_height;

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
                      'timer': random_integer({
                        'max': 99,
                      }) + 42,
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

var fireworks = [];

window.onload = function(e){
    canvas_init();
    input_init({
      'keybinds': {
        27: {
          'solo': true,
          'todo': function(){
              fireworks.length = 0;
          },
        },
        'all': {
          'todo': launch,
        },
      },
      'mousebinds': {
        'mousedown': {
          'todo': launch,
        },
      },
    });
    launch();
};
