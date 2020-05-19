
from controllers import *
from tornado.web import url
route = [
		url(
			r"/",
			home.main_request_handler
		),
		url(
		r'/websocket',
		home.SimpleWebSocket
		),
		url(
			r'/login',
			home.login_request_handler
		)
]
					