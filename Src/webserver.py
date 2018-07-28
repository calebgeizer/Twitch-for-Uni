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

import matplotlib
matplotlib.use("TkAgg")
from matplotlib import pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2TkAgg
from matplotlib import gridspec
import numpy as np
from scipy.interpolate import griddata

import threading
from threading import Thread

import serial
import threading
import time
import readchar
import pylab
import numpy as np
import json
import math
import time

import socket
import time
import datetime
import struct
import StringIO
from threading import Thread

class ServerHandlerClass(SimpleHTTPServer.SimpleHTTPRequestHandler):
	def _set_headers(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()

	def do_POST(self):
		print "do_POST"
		content_length = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_length)
		print post_data
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
		

