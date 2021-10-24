'use strict';

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': entity_entities[entity]['color'],
            },
          });
          canvas_buffer.fillRect(
            entity_entities[entity]['x'],
            entity_entities[entity]['y'],
            entity_entities[entity]['width'],
            entity_entities[entity]['height']
          );
      },
    });
}

function repo_logic(){
    if(core_mouse['down-0']){
        launch();
    }

    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
          entity_entities[entity]['x'] += entity_entities[entity]['dx'];
          entity_entities[entity]['y'] += entity_entities[entity]['dy'];

          entity_entities[entity]['dy'] += .02;
          entity_entities[entity]['dx'] *= .99;

          entity_entities[entity]['timer'] -= 1;
          if(entity_entities[entity]['timer'] <= 0){
              if(entity_entities[entity]['children'] > 0){
                  let loop_counter = entity_entities[entity]['children'] - 1;
                  do{
                      launch({
                        'children': 0,
                        'dx': Math.random() * 3 - 1.5,
                        'dy': Math.random() * 3 - 1.5,
                        'timer': core_random_integer({
                          'max': 90,
                        }) + 40,
                        'x': entity_entities[entity]['x'],
                        'y': entity_entities[entity]['y'],
                      });
                  }while(loop_counter--);
              }

              entity_remove({
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
      'keybinds': {
        'all': {
          'todo': function(){
              launch();
          },
        },
      },
      'title': 'Fireworks-2D.htm',
    });
    entity_set({
      'default': true,
      'properties': {
        'children': 10,
        'height': 4,
        'width': 4,
      },
      'type': 'firework',
    });
    canvas_init();
}
