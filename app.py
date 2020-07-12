
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
cur.execute('SELECT * FROM Representatives')
rep_data = cur.fetchall()

cur.execute('SELECT * FROM Votes')
vote_data = cur.fetchall()

cur.execute('SELECT * FROM Sponsored')
sponsored_data = cur.fetchall()

print(vote_data[1])
print(rep_data[1])
print(sponsored_data[1])
# creates a Flask application, named app
app = Flask(__name__)

@app.route("/")
def hello():
    
    return render_template('index.html', data=rep_data)

@app.route("/reps")
def hello1():  
    return jsonify(rep_data)


#use this route for the  other data
@app.route("/votes")
def hello2():   
    return jsonify(vote_data)


@app.route("/sponsored")
def hello3():   
    return jsonify(vote_data)



# run the application on the main prompt or console
if __name__ == "__main__":
    app.run(debug=True)


