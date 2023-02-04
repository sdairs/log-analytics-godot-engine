extends Node3D

func _ready():
	var logger = self.get_node("logger")
	logger.log('INFO', logger.event_types.LOAD_SCENE, {'scene_name': str(self.name)})
	pass

func _process(_delta):
	pass
