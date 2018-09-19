'use strict';

function launch(args){
    args = core_args({
      'args': args,
      'defaults': {
        'children': 10,
        'dx': Math.random() * 4 - 2,
        'dy': -Math.random() * 2 - canvas_properties['height'] / 200,
        'timer': core_random_integer({
          'max': 200,
        }) + 100,
        'x': core_mouse['x'],
        'y': canvas_properties['height'],
      },
    });

    core_entity_create({
      'id': id_count,
      'properties': {
        'children': args['children'],
        'color': '#' + core_random_hex(),
        'dx': args['dx'],
        'dy': args['dy'],
        'timer': args['timer'],
        'x': args['x'],
        'y': args['y'],
      },
      'types': [
        'firework',
      ],
    });
    id_count++;
}
