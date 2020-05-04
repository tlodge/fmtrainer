#from classifier import Classifier
#from PIL import Image
#import numpy as np
from sys import exit
from os import system
from glob import glob
directories = glob('./data[0-9]*/')
output = 'combined'

system('mkdir -p "%s"' % output)

total = 0

for directory in directories:
    directory = directory[:-1] if directory[-1] == '/' else directory
    subdirs = glob('%s/[0-9]/' % directory)

    for subdir in sorted(subdirs):
        print('Processing %s' % subdir)
        subdir = subdir[:-1]
        label = int(subdir.split('/')[-1])
        base = subdir.split('/')[-2]
        images = glob('%s/*.png' % subdir)

        system("mkdir -p '%s/%s'" % (output, label))
        for filename in images:
            system('cp "%s" "%s/%s/%s-%s"' % (filename, output, label, base, filename.split('/')[-1]))
            total += 1

print('%d images copied to %s' % (total, output))

#im = Image.open("./data/hands_up/00001.png")
#pix = np.array(im)
#print(pix)