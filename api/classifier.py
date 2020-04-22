
from sys import argv, stderr, exit
from os import getenv

import numpy as np
import keras

class Classifier:

  def __init__(self):
    print("inited")
    self.model_file = "model.h5"
    self.model = keras.models.load_model(self.model_file)
    self.SMOOTH_FACTOR = 0.9
    self.smoothed = np.ones(self.model.output_shape[1:])
    self.smoothed /= len(self.smoothed)

  def classify(self, raw_image):
    x = np.array(raw_image) / 255.0 # preprocess values to be in the range 0-1
    
    # Keras expects an array of inputs and produces an array of outputs
    classes = self.model.predict(np.array([x]))[0]
    # Smooth the outputs - this adds latency but reduces oscillations between predictions
    self.smoothed = classes #smoothed * SMOOTH_FACTOR + classes * (1.0 - SMOOTH_FACTOR)
    selected = np.argmax(self.smoothed) # The selected class is the one with highest probability
    summary = 'Class %d [%s]' % (selected, ' '.join('%02.0f%%' % (99 * p) for p in self.smoothed))
    stderr.write('\r' + summary)