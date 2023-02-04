extends Control

var tinybird_client = preload("res://tinybird.gd")

const event_types = { 
	'LOAD_SCENE': 'LOAD_SCENE', 
	'UNLOAD_SCENE': 'UNLOAD_SCENE', 
	'ATTACH_CHILD': 'ATTACH_CHILD'
}

const log_levels = { 
	'LOAD_SCENE': 'INFO', 
	'UNLOAD_SCENE': 'WARN', 
	'ATTACH_CHILD': 'ERROR'
}

func _ready():
	pass

func log(log_level, event_type, event_data):
	var data = {
		'log_level': log_level,
		'event_type': event_type,
		'event_data': JSON.stringify(event_data)
	}
	self._send_to_tinybird(data)

	
func _send_to_tinybird(data):
	data.merge(_get_system_info())
	var client = tinybird_client.new()
	if client.init(data):
		print('Logger init successful')
	else:
		print('Logger init failed')
		return
	add_child(client)
	
func _get_system_info():
	var data = {
		'os_game_run_time' : Time.get_ticks_msec(),
		'os_time' : Time.get_unix_time_from_system(),
		'os_name' : OS.get_name(),
		'os_distribution' : OS.get_distribution_name(),
		'os_language' : OS.get_locale_language(),
		'os_executable_path' : OS.get_executable_path(),
		'os_model_name' : OS.get_model_name(),
		'os_proc_name' : OS.get_processor_name(),
		'os_proc_count' : OS.get_processor_count(),
		'os_thread_caller' : OS.get_thread_caller_id(),
		'os_unique_id' : OS.get_unique_id(),
		'os_version' : OS.get_version(),
		'os_video_adapter_driver_name' : OS.get_video_adapter_driver_info()[0] if len(OS.get_video_adapter_driver_info()) > 0 else "",
		'os_video_adapter_driver_version' : OS.get_video_adapter_driver_info()[1] if len(OS.get_video_adapter_driver_info()) > 0 else "",
		'os_is_debug' : OS.is_debug_build()
	}
	return data
