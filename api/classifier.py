
from sys import argv, stderr, exit
from os import getenv
import numpy as np
import keras
import json
from os import system
from glob import glob

class Classifier:

  def __init__(self):
  
    directories = glob('./data[0-9]*/')
    self.model_file = "./combined/model.h5"

    if len(directories) == 1:
      self.model_file = "./%s/model.h5" % directories[0]
  
    self.model = keras.models.load_model(self.model_file)
    self.SMOOTH_FACTOR = 0.9
    self.smoothed = np.ones(self.model.output_shape[1:])
    self.smoothed /= len(self.smoothed)
    with open('categories.json') as file:
        gestureDict = json.load(file)
        self.categories = list(gestureDict.keys())
        print(self.categories)
    
  def classify(self, raw_image):
    x = np.array(raw_image) / 255.0 # preprocess values to be in the range 0-1
    # Keras expects an array of inputs and produces an array of outputs
    classes = self.model.predict(np.array([x]))[0]
    # Smooth the outputs - this adds latency but reduces oscillations between predictions
    self.smoothed = classes #smoothed * SMOOTH_FACTOR + classes * (1.0 - SMOOTH_FACTOR)
    selected = np.argmax(self.smoothed) # The selected class is the one with highest probability
    summary = 'Class %d [%s]' % (selected, ' '.join('%02.0f%%' % (99 * p) for p in self.smoothed))
   
    if (self.smoothed.max()):
       print("%d %s %s" % (selected, self.categories[selected], self.categories[self.smoothed.argmax()].replace("_", " ")))
       return "%s (%02.0f%%)" % (self.categories[self.smoothed.argmax()].replace("_", " "), 99*self.smoothed.max())
    return "unknown"
    #stderr.write('\r' + summary)