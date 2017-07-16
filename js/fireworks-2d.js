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

function launch(){
    core_entity_create({
      'properties': {
        'color': '#' + core_random_hex(),
        'dx': Math.random() * 4 - 2,
        'dy': -Math.random() * 2 - canvas_height / 200,
        'timer': core_random_integer({
          'max': 200,
        }) + 100,
        'x': core_mouse['x'],
        'y': canvas_height,
      },
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
                    core_entity_create({
                      'properties': {
                        'children': 0,
                        'color': '#' + core_random_hex(),
                        'dx': Math.random() * 3 - 1.5,
                        'dy': Math.random() * 3 - 1.5,
                        'timer': core_random_integer({
                          'max': 90,
                        }) + 40,
                        'x': core_entities[entity]['x'],
                        'y': core_entities[entity]['y'],
                      },
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
          'todo': launch,
        },
      },
      'title': 'Fireworks-2D.htm',
    });
    canvas_init();

    core_entity_set({
      'default': true,
      'properties': {
        'children': 10,
        'height': 4,
        'width': 4,
      },
      'type': '_fireworks',
    });
}
