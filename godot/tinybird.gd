extends HTTPRequest

var data = ""
var config = ConfigFile.new()


func init(data):
	var err = config.load("res://config.ini")
	if err != OK:
		return false
	self.data = JSON.stringify(data)
	return true

func _ready():
	self.set_use_threads(true)
	self.request_completed.connect(self._handle_response)
	self._send_to_tinybird()

func _send_to_tinybird():
	var tinybird_token = ""
	if config.has_section('logging'):
		tinybird_token = config.get_value('logging', 'tinybird_token', '')
	var headers = ["Content-Type: application/json"]
	var tinybird_url = str("https://api.tinybird.co/v0/events?name=logs&token=",tinybird_token)
	self.request(tinybird_url, headers, 2, data)

func _handle_response(result, response_code, headers, body):
	if response_code == 202:
		print('Successfully sent to Tinybird!')
	else:
		print('There was an error sending to Tinybird!')
