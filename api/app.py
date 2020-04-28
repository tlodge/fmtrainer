#!/usr/bin/env python
from importlib import import_module
import subprocess
import base64
import json
import os
from os import path, mkdir
import io
import errno
import time
import re
from select import select

try:
   from StringIO import StringIO
except ImportError:
    from io import StringIO
from flask import Flask, render_template, Response, request, jsonify

# Raspberry Pi camera module (requires picamera package)
#from camera import Camera
from classifier import Classifier
from PIL import Image
import numpy as np

clients=0


##camera = Camera(training_mode=False)
category = Classifier()

mygenerator = None
gesturetype = None
readyForImage = True
imageIndexes = {}
gestureDict = {}

with open('categories.json') as file:
  gestureDict = json.load(file)

print("gestureDict", gestureDict)

app = Flask(__name__)


def _keyfor(s):

  # Remove all non-word characters (everything except numbers and letters)
  s = re.sub(r"[^\w\s]", '', s)

  # Replace all runs of whitespace with a single dash
  s = re.sub(r"\s+", '_', s)

  return s.lower()

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


@app.route('/trains')
def trains():
    def inner():
        proc = subprocess.Popen(
                ['python3 train.py data val_data'],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
                )
        # pass data until client disconnects, then terminate
        # see https://stackoverflow.com/questions/18511119/stop-processing-flask-route-if-request-aborted
        try:
            awaiting = [proc.stdout, proc.stderr]
            while awaiting:
                # wait for output on one or more pipes, or for proc to close a pipe
                ready, _, _ = select(awaiting, [], [])
                for pipe in ready:
                    line = pipe.readline()
                    if line:
                        # some output to report
                        #print ("sending line:", line.replace('\n', '\\n'))
                        #print(line.replace('\n', '\n'))
                        yield line.rstrip()
                        # + '<br/>\n'
                    else:
                        # EOF, pipe was closed by proc
                        awaiting.remove(pipe)
            if proc.poll() is None:
                print("process closed stdout and stderr but didn't terminate; terminating now.")
                proc.terminate()

        except GeneratorExit:
            # occurs when new output is yielded to a disconnected client
            print('client disconnected, killing process')
            proc.terminate()

        # wait for proc to finish and get return code
        ret_code = proc.wait()
        print("process return code:", ret_code)
    try:
      subprocess.call(['rm', '-rf', 'val_data'])
    except:
      print("no val_data to remove")

    subprocess.call(['python3', 'validate_split.py', 'data'])
    return Response(inner(), mimetype='text/html')

@app.route('/train')
def train():
  global readyForImage, gesturetype
  readyForImage = False
  gesturetype = None
 
  try:
    subprocess.call(['rm', '-rf', 'val_data'])
  except:
    print("no val_data to remove")
  subprocess.call(['python3', 'validate_split.py', 'data'])
  subprocess.call(['python3', 'train.py', 'data', 'val_data'])
  return "success"

@app.route('/record/<gesture>', methods=['GET'])
def record(gesture):
   global gesturetype, gestureDict
   gesturetype = gesture
   return "success"


@app.route('/image', methods=['POST'])
def image():
  global imageIndexes, gestureDict, gesturetype
 
  if gesturetype is not None:
    
    if not _keyfor(gesturetype) in gestureDict:
      gestureDict[_keyfor(gesturetype)] = len(gestureDict)
      with open('categories.json', 'w') as file:
        file.write(json.dumps(gestureDict))
    
    if not _keyfor(gesturetype) in imageIndexes.keys():
      imageIndexes[_keyfor(gesturetype)] = 0

    img_data = request.json['image'].replace("data:image/png;base64,", "").encode()
    index = imageIndexes[_keyfor(gesturetype)]

    dirname = path.join("./data", str(gestureDict[_keyfor(gesturetype)]))

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

@app.route('/classify', methods=['POST'])
def classify():
  global category
  img_data = request.json['image'].replace("data:image/png;base64,", "").encode()
  buf = io.BytesIO(base64.decodebytes(img_data))
  img = Image.open(buf).convert('RGB')
  category.classify(img)
  return jsonify(request.json)

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=False)
