'use strict';

function draw_logic(){
    core_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': core_entities[entity]['color'],
            },
          });
          canvas_buffer.fillRect(
            core_entities[entity]['x'],
            core_entities[entity]['y'],
            core_entities[entity]['width'],
            core_entities[entity]['height']
          );
      },
    });
}

function logic(){
    if(core_mouse['down']){
        launch();
    }

    core_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
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
      },
    });
}

function repo_init(){
    core_repo_init({
      'entities': {
        'firework': {
          'default': true,
          'properties': {
            'children': 10,
            'height': 4,
            'width': 4,
          },
        },
      },
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
