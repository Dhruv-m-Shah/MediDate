# -*- coding: utf-8 -*-
"""
Created on Sat Feb  1 20:22:34 2020

@author: shahd
"""

from flask import Flask, request, jsonify, render_template
import asyncio
# MediDate Google Cloud Vision Applicaiton

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

d = {}  
initial_file = open("text1.txt")
raw_data = initial_file.read().split("\n")
initial_len = len(raw_data)

while True:
    new_file = open("text1.txt")
    new_raw_data = new_file.read().split("\n")
    new_len = len(new_raw_data)
    if new_len != initial_len:
        print(new_raw_data[-2])
        if(new_raw_data[-2] == "Red Pill"):
            d["Red"] += 1
        if(new_raw_data[-2] == "Blue Pill"):
            d["Blue"] += 1
        if(new_raw_data[-2] == "Green Pill"):
            d["Green"] += 1
            
    initial_len = new_len
@app.route('/newMedication', methods=['POST'])
def newPrescription():
    return jsonify({'data': d})



if __name__ == '__main__':
   app.run(debug=True)