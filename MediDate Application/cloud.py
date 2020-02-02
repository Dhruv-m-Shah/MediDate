# -*- coding: utf-8 -*-
"""
Created on Sat Feb  1 11:24:44 2020

@author: shahd
"""
from flask import Flask, request, jsonify, render_template
import time
import asyncio
from multiprocessing import Process, Queue

from twilio.rest import Client

import threading
# MediDate Google Cloud Vision Applicaiton

app = Flask(__name__)
q = Queue()
run = 0
def foreground():
    d = {}
    arr = []
    arr = q.get()
    print(arr)
    d = detect_text(r'C:\Users\shahd\OneDrive\Desktop\MediDate Application\label.jpg')
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/newPrescription', methods=['GET'])
    def newPrescription():
        global run
        arr = q.get()
        print(arr)
        d["MorningClick"] = arr[0][0]
        d["NoonClick"] = arr[0][1]
        d["EveningClick"] = arr[0][2]
        if(((d["Qty"] - arr[0][0]*d["Morning"] - arr[0][1]*d["Noon"] - arr[0][2]*d["Evening"]) <= 10) and (run == 0)):
            twilio_send(d["Name"])
            run = run+1
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
    
    d = {"Name": "Advil", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Morning": 1, "Noon": 3,"Evening": 2, "MorningClick": 0, "NoonClick": 0, "EveningClick": 0}
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
        

def twilio_send(name):

    account_sid = 'ACd6b176bf94cfd75b60a1ae33f783dbbc'
    auth_token = '5854b6dec1a8b84a8b30708aaef899e3'
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                            body="Hey there! A customer from your pharmacy is running low on "+ name + " medication and needs more. When the order is ready for pick up, send us a text!",
                            from_='+14692084179',
                            to='+14167069819'
                            )

    print(message.sid)
        


def background():
    while(True):
        with open('text12.txt', 'r') as f:
            lines = f.read().splitlines()
            last_line = lines[-1]
            q.put([list(map(int, last_line.split()))])
            time.sleep(3)
        
f = threading.Thread(name='foreground', target=foreground)
b = threading.Thread(name = 'background', target = background)
f.start()
b.start()

