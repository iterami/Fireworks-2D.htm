'use strict';

function draw_logic(){
    for(var entity in core_entities){
        canvas_buffer.fillStyle = core_entities[entity]['color'];
        canvas_buffer.fillRect(
          core_entities[entity]['x'],
          core_entities[entity]['y'],
          core_entities[entity]['width'],
          core_entities[entity]['height']
        );
    }
}

function launch(firework){
    var firework = firework || {};
    firework['children'] = firework['children'] !== void 0
      ? firework['children']
      : 10;
    firework['color'] = firework['color'] || '#' + core_random_hex();
    firework['dx'] = firework['dx'] || Math.random() * 4 - 2;
    firework['dy'] = firework['dy'] || -Math.random() * 2 - canvas_height / 200;
    firework['height'] = firework['height'] || 4;
    firework['timer'] = firework['timer'] || core_random_integer({
      'max': 200,
    }) + 100;
    firework['width'] = firework['width'] || 4;
    firework['x'] = firework['x'] || core_mouse['x'];
    firework['y'] = firework['y'] || canvas_height;

    core_entity_create({
      'properties': firework,
    });
}

function logic(){
    if(core_mouse['down']){
        launch();
    }

    for(var entity in core_entities){
        core_entities[entity]['x'] += core_entities[entity]['dx'];
        core_entities[entity]['y'] += core_entities[entity]['dy'];

        core_entities[entity]['dy'] += .02;
        core_entities[entity]['dx'] *= .99;

        core_entities[entity]['timer'] -= 1;
        if(core_entities[entity]['timer'] <= 0){
            if(core_entities[entity]['children'] > 0){
                var loop_counter = core_entities[entity]['children'] - 1;
                do{
                    launch({
                      'children': 0,
                      'dx': Math.random() * 3 - 1.5,
                      'dy': Math.random() * 3 - 1.5,
                      'timer': core_random_integer({
                        'max': 90,
                      }) + 40,
                      'x': core_entities[entity]['x'],
                      'y': core_entities[entity]['y'],
                    });
                }while(loop_counter--);
            }

            core_entity_remove({
              'entities': [
                entity,
              ],
            });
        }
    }
}

function repo_init(){
    core_repo_init({
      'keybinds': {
        'all': {
          'todo': function(){
              launch();
          },
        },
      },
      'title': 'Fireworks-2D.htm',
    });
    canvas_init();
}
