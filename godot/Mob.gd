extends RigidBody2D

var logger

# Called when the node enters the scene tree for the first time.
func _ready():
	logger = self.get_node("/root/Main/logger")
	if logger:
		logger.log('INFO', logger.event_types.LOAD_SCENE, {'scene_name': str(self.name)})
	$AnimatedSprite2D.play()
	var mob_types = $AnimatedSprite2D.get_sprite_frames().get_animation_names()
	$AnimatedSprite2D.animation = mob_types[randi() % mob_types.size()]


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_visible_on_screen_enabler_2d_screen_exited():
	queue_free()
