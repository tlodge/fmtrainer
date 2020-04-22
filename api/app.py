#!/usr/bin/env python
from importlib import import_module
import base64
import json
import os
from os import path, mkdir
import io
import errno
import time
import re
try:
   from StringIO import StringIO
except ImportError:
    from io import StringIO
from flask import Flask, render_template, Response, request, jsonify

# Raspberry Pi camera module (requires picamera package)
#from camera import Camera
from train import Trainer
from classifier import Classifier
from PIL import Image
import numpy as np

clients=0


##camera = Camera(training_mode=False)
trainer = Trainer()
category = Classifier()

mygenerator = None
gesturetype = None
readyForImage = True
imageIndexes = {}

app = Flask(__name__)


def _keyfor(s):

  # Remove all non-word characters (everything except numbers and letters)
  s = re.sub(r"[^\w\s]", '', s)

  # Replace all runs of whitespace with a single dash
  s = re.sub(r"\s+", '_', s)

  return s

@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


#def gen(camera):
#    """Video streaming generator function."""
#    num_frames = 0
#    while readyForImage:
#        frame = camera.next_frame()
#        image = Image.fromarray(frame)
#        with io.BytesIO() as output:
#          image.save(output, format="PNG")
#          if gesturetype is not None:
#            dirname = path.join("./data", gesturetype)
#            try:
#              mkdir(dirname)
#            except OSError as err:
#              if err.errno != errno.EEXIST:
#                raise err 

#            filename = (path.join(dirname, '%05d.png') % num_frames)
#            image.save(filename, "PNG")
#            num_frames += 1
          #turn to jpeg....
#          yield (b'--frame\r\n'
#               b'Content-Type: image/png\r\n\r\n' + output.getvalue() + b'\r\n')


@app.route('/done')
def done():
  global gesturetype
  print("setting gesture category to none")
  gesturetype=None
  return "success"
 
#@app.route('/video_feed')
#def video_feed():
#    global clients, mygenerator, readyForImage
#    clients += 1
#    print("video feed called!!", clients)
#    """Video streaming route. Put this in the src attribute of an img tag."""
#    if mygenerator is not None:
#      readyForImage=False
#      print("closed!!")

#    try:
#      mygenerator = gen(camera)
#    except:
#      print("error generating generator!")

#    return Response(mygenerator, mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/train')
def train():
  global readyForImage, gesturetype, trainer
  readyForImage = False
  gesturetype = None
  trainer.train()
  return "success"

@app.route('/record/<gesture>', methods=['GET'])
def record(gesture):
   global gesturetype
   gesturetype = gesture
   return "success"


@app.route('/image_original', methods=['POST'])
def image():
  global imageIndexes
 
  if gesturetype is not None:

    if not _keyfor(gesturetype) in imageIndexes.keys():
      imageIndexes[_keyfor(gesturetype)] = 0

    img_data = request.json['image'].replace("data:image/png;base64,", "").encode()
    index = imageIndexes[_keyfor(gesturetype)]

    dirname = path.join("./data", gesturetype)
     
    try:
      mkdir(dirname)
    except OSError as err:
      if err.errno != errno.EEXIST:
        raise err 
      
    filename = (path.join(dirname, '%05d.png') % index)
    imageIndexes[_keyfor(gesturetype)] = index+1
      
    with open(filename, "wb") as fh:
      fh.write(base64.decodebytes(img_data))
     
  return jsonify(request.json)

@app.route('/set_gesture', methods=['POST'])
def set_gesture():
   return jsonify(request.json)

@app.route('/image', methods=['POST'])
def classify():
  global category
  img_data = request.json['image'].replace("data:image/png;base64,", "").encode()
  buf = io.BytesIO(base64.decodebytes(img_data))
  img = Image.open(buf).convert('RGB')
  print (np.array(img))
  #category.classify(img)
  return jsonify(request.json)


  #img_data = request.json['image'].replace("data:image/png;base64,", "").encode()
  #category.classify()

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
