#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SimpleHTTPServer
import SocketServer
import time
import socket
import datetime
import StringIO
from threading import Thread
import sys
import random
import struct
import json

chat = {}

class ServerHandlerClass(SimpleHTTPServer.SimpleHTTPRequestHandler):

	def _set_headers(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()

	def do_POST(self):
		global chat
		print "do_POST"
		content_length = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_length)
		print post_data
		if (":{" in post_data):
			python_obj = json.loads(post_data)
			chat.update(python_obj)
			print "Chat History start~~~~~~~~~~"
			print chat
			print "Chat History end~~~~~~~~~~"
		if ("Connection test" in post_data):
			self.wfile.write("Response success")

def runWebServer():
  PORT = 80
  Handler = ServerHandlerClass;
  Handler.extensions_map.update({
    '.webapp': 'application/xList-web-app-manifest+json',
  });

  httpd = SocketServer.TCPServer(("", PORT), Handler)

  print ("Serving at port", PORT)
  httpd.serve_forever()

if __name__ == '__main__':
		#Web server thread
		# webServerThread = Thread(target = runWebServer)
		# webServerThread.daemon = True
		# webServerThread.start()

		runWebServer();

		# while True:
		# 	time.sleep(5)
		

