from classifier import Classifier
from PIL import Image
import numpy as np

im = Image.open("./data/hands_up/00001.png")
pix = np.array(im)
print(pix)