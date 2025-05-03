'use strict';

function launch(args){
    args = core_args({
      'args': args,
      'defaults': {
        'children': 10,
        'dx': Math.random() * 2 - 1,
        'dy': -Math.random() * 2 - canvas_properties['height'] / 200,
        'timer': core_random_integer({
          'max': 200,
        }) + 100,
        'x': core_mouse['x'],
        'y': canvas_properties['height'],
      },
    });

    entity_create({
      'properties': {
        'children': args['children'],
        'color': '#' + core_random_hex(),
        'dx': args['dx'],
        'dy': args['dy'],
        'id': entity_id_count,
        'timer': args['timer'],
        'x': args['x'],
        'y': args['y'],
      },
      'types': [
        'firework',
      ],
    });
}

function repo_drawlogic(){
    canvas_draw_path({
      'properties': {
        'fillStyle': canvas_gradient({
          'args': [
            0,
            canvas_properties['height'],
            0,
            0,
          ],
          'stops': [
            {
              'color': '#008',
            },
            {
              'color': '#000',
              'offset': 1,
            },
          ],
        }),
      },
      'vertices': [
        [
          'rect',
          0,
          0,
          canvas_properties['width'],
          canvas_properties['height'],
        ],
      ],
    });

    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'fillStyle': entity['color'],
          });
          canvas.fillRect(
            entity['x'],
            entity['y'],
            entity['width'],
            entity['height']
          );
      },
    });
}

function repo_logic(){
    if(core_mouse['down-0']
      || core_keys['KeyF']?.['state']){
        launch();
    }

    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': function(entity){
          entity['x'] += entity['dx'];
          entity['y'] += entity['dy'];

          entity['dy'] += .02;
          entity['dx'] *= .99;

          entity['timer'] -= 1;
          if(entity['timer'] <= 0){
              if(entity['children'] > 0){
                  let loop_counter = entity['children'] - 1;
                  do{
                      launch({
                        'children': 0,
                        'dx': Math.random() * 3 - 1.5,
                        'dy': Math.random() * 3 - 1.5,
                        'timer': core_random_integer({
                          'max': 90,
                        }) + 40,
                        'x': entity['x'],
                        'y': entity['y'],
                      });
                  }while(loop_counter--);
              }

              entity_remove({
                'entities': [
                  entity['id'],
                ],
              });
          }
      },
    });
}

function repo_init(){
    core_repo_init({
      'keybinds': {
        'KeyF': {},
      },
      'mousebinds': {},
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
    canvas_init({
      'cursor': 'pointer',
    });
}
