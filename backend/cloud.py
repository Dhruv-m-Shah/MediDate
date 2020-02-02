# -*- coding: utf-8 -*-
"""
Created on Sat Feb  1 11:24:44 2020

@author: shahd
"""
from flask import Flask, request, jsonify, render_template
import time
import asyncio
from multiprocessing import Process, Queue

import threading
# MediDate Google Cloud Vision Applicaiton

app = Flask(__name__)
q = Queue()

def foreground():
    d = {}
    arr = []
    arr = q.get()
    print(arr)
    d = detect_text(r'C:\Users\shahd\OneDrive\Desktop\MediDate Application\label.jpg')
    @app.route('/')
    def index():
        return render_template('index.html')


    @app.route('/newPrescription', methods=['POST'])
    def newPrescription():
        arr = q.get()
        print(arr)
        return jsonify({'data': d})

    
    
    if __name__ == '__main__':
       app.run(debug=True)
       
def detect_text(path):
    """Detects text in the file."""
    from google.cloud import vision
    import io
    import os
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=r"C:\Users\shahd\OneDrive\Desktop\MediDate Application\MediDate_Credentials\steel-aileron-266916-d88c69f449c7.json"
# Imports the Google Cloud client library
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    d = {"Name": 0, "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 0, "Blue": 0,"Green": 0}
    count = 0
    for text in texts:
        if(text.description == "Rx" or text.description == "Rx#" or text.description == "#" or text.description == "Rx:" or text.description == "Rx:#" or text.description == "Rx: #" or text.description == ":"):
            count = 1
            continue
        if(text.description[0:2] == "Qty"):
            d["Qty"] = text.description[3:len(text.description)-1]
            
        if(count == 1):
            d["RX"] = text.description
            count = 0
        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in text.bounding_poly.vertices])

        print('bounds: {}'.format(','.join(vertices)))
    return d

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
        

        


def background():
    while(True):
        with open('text3.txt', 'r') as f:
            lines = f.read().splitlines()
            last_line = lines[-1]
            q.put([list(map(int, last_line.split()))])
            time.sleep(1)
        
f = threading.Thread(name='foreground', target=foreground)
b = threading.Thread(name = 'background', target = background)
f.start()
b.start()

