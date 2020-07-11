
from flask import Flask,jsonify
from flask import render_template
# Imports the method used for connecting to DBs
from sqlalchemy import create_engine

# Imports the methods needed to abstract classes into tables
from sqlalchemy.ext.declarative import declarative_base
# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Float 
import sqlite3
import json



# Create a SQL connection to our SQLite database
con = sqlite3.connect("./static/data/reps.sqlite")
cur = con.cursor()
cur.execute('SELECT * FROM Representative')
data = cur.fetchall()
#print(data[0])

print(data)
# creates a Flask application, named app
app = Flask(__name__)

@app.route("/")
def hello():
    
    return render_template('index.html', data=data)

@app.route("/route1")
def hello1():  
    return jsonify(data)

#use this route for the  other data
# @app.route("/route2")
# def hello2():   
#     #return jsonify(somedata)


# run the application on the main prompt or console
if __name__ == "__main__":
    app.run(debug=True)


