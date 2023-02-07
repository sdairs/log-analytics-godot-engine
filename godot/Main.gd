extends Node

@export var mob_scene: PackedScene
var score
var logger
var match_id = Marshalls.utf8_to_base64(str(Time.get_unix_time_from_system())+OS.get_unique_id())

# Called when the node enters the scene tree for the first time.
func _ready():
	logger = self.get_node("/root/Main/logger")
	if logger:
		logger.log(logger.log_levels.INFO, logger.event_types.LOAD_SCENE, {'scene_name': str(self.name)})

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func _on_start_timer_timeout():
	$MobTimer.start()
	$ScoreTimer.start()

func _on_score_timer_timeout():
	score += 1
	$HUD.update_score(score)

func _on_mob_timer_timeout():
	var mob = mob_scene.instantiate()
	var mob_spawn_location = get_node("MobPath/MobSpawnLocation")
	mob_spawn_location.progress_ratio = randi()
	var direction = mob_spawn_location.rotation + PI / 2
	mob.position = mob_spawn_location.position
	direction += randf_range(-PI / 4, PI / 4)
	mob.rotation = direction
	var velocity = Vector2(randf_range(150.0, 250.0), 0.0)
	mob.linear_velocity = velocity.rotated(direction)
	add_child(mob)
	
func game_over():
	if logger:
		logger.log(logger.log_levels.INFO, logger.event_types.GAME_END, {'match_id': str(match_id), 'score': score})
	$ScoreTimer.stop()
	$MobTimer.stop()
	$HUD.show_game_over()
	
func new_game():
	if logger:
		logger.log(logger.log_levels.INFO, logger.event_types.GAME_START, {'match_id': str(match_id)})
	get_tree().call_group("mobs", "queue_free")
	score = 0
	$Player.start($StartPosition.position)
	$StartTimer.start()
	$HUD.update_score(score)
	$HUD.show_message("Get Ready")
