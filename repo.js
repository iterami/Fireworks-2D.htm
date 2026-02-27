'use strict';

function draw_firework(entity){
    canvas_setproperties({
      'fillStyle': entity.color,
    });
    canvas.fillRect(
      entity.x,
      entity.y,
      entity.width,
      entity.height
    );
}

function launch({
  children = 10,
  dx = Math.random() * 2 - 1,
  dy = -Math.random() * 2 - canvas_properties.height / 200,
  timer = core_random_integer(200) + 100,
  x = core_pointer.x,
  y = canvas_properties.height,
} = {}){
    entity_create({
      'properties': {
        'children': children,
        'color': '#' + core_random_hex(),
        'dx': dx,
        'dy': dy,
        'id': entity_id_count,
        'timer': timer,
        'x': x,
        'y': y,
      },
      'types': [
        'firework',
      ],
    });
}

function move_firework(entity){
    entity.x += entity.dx;
    entity.y += entity.dy;

    entity.dy += .02;
    entity.dx *= .99;

    entity.timer -= 1;
    if(entity.timer <= 0){
        for(let i = 0; i < entity.children; i++){
            launch({
              'children': 0,
              'dx': Math.random() * 3 - 1.5,
              'dy': Math.random() * 3 - 1.5,
              'timer': core_random_integer(90) + 40,
              'x': entity.x,
              'y': entity.y,
            });
        }

        entity_remove({
          'entities': [
            entity.id,
          ],
        });
    }
}

function repo_drawlogic(){
    canvas_draw_path({
      'properties': {
        'fillStyle': canvas_gradient({
          'args': [
            0,
            canvas_properties.height,
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
          canvas_properties.width,
          canvas_properties.height,
        ],
      ],
    });

    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': draw_firework,
    });
}

function repo_init(){
    core_repo_init({
      'keybinds': {
        'KeyF': {},
      },
      'pointerbinds': {},
      'title': 'Fireworks-2D.htm',
    });
    entity_set({
      'defaults': true,
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

function repo_logic(){
    if(core_pointer.down_0
      || core_keys.KeyF.state){
        launch();
    }

    entity_group_modify({
      'groups': [
        'firework',
      ],
      'todo': move_firework,
    });
}
