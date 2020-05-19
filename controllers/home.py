
'''
Preset controller by torn for / route
'''
from .modules import *


class base_hanlder(tornado.web.RequestHandler):
       def get_current_user(self):
              return self.get_secure_cookie('user')

'''simple chat socket conexion without Database'''

class main_request_handler(base_hanlder):
    @tornado.web.authenticated
    def get(self):
        script="<script>localStorage.setItem('user','{}')</script>".format(tornado.escape.xhtml_escape(self.get_current_user()))
        self.write(script)
        self.render('index.html')

class SimpleWebSocket(tornado.websocket.WebSocketHandler):
    connections = set()

    def open(self):
        self.connections.add(self)

    def on_message(self, message):
        [client.write_message(message) for client in self.connections]

    def on_close(self):
        self.connections.remove(self)


class login_request_handler(base_hanlder):
   def get(self):
      self.write('''<html><body><form action="/login" method="post">
                   <center>
                   User Name: <input type="text" name="name">
                   <input type="submit" value="Sign in">
                   </center>
                   </form></body></html>
      ''')
   def post(self):
      user=self.set_secure_cookie('user',self.get_argument('name'))
      self.redirect(url='/',permanent=False,status=302)