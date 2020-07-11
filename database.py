
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

# #//////////create database
# # Sets an object to utilize the default declarative base in SQL Alchemy
Base = declarative_base()
# Creates Classes which will serve as the anchor points for our Tables
class Rep(Base):
    __tablename__ = 'Representative'
    id = Column(Integer, primary_key=True)
    Name = Column(String(255))
    District = Column(String(255))
    Party = Column(String(255))
    Gender = Column(String(255))
    Pop = Column(String(255))


representatives =["Buddy Carter",
                    "Sanford Bishop Jr.",
                    "Drew Ferguson IV",
                    "Henry “Hank” Johnson Jr.",
                    "John Lewis",
                    "Lucy McBath",
                    "Rob Woodall",
                    "Austin Scott",
                    "Doug Collins",
                    "Jody Hice",
                    "Barry Loudermilk",
                    "Rick Allen",
                    "David Scott",
                    "Tom Graves",
                    "David Perdue",
                    "Kelly Loeffler"
    ]

districts = ["1", "2","3","4","5","6","7","8","9","10","11","12","13","14","0","0"]
party  = ["R", "D","R","D","D","D","R","R","R","R","R","R","D","R","R","R"]
gender = ["M", "M","M","M","M","F","M","M","M","M","M","M","M","M","M","F"]
population = ["539387","473245","602082","491317","502193","567076","642070","530981","609141",
"567614","583126","523257","564612","691975","0","0"]

reps =[]
rep1 = Rep(Name=representatives[0], District=districts[0],Party=party[0],Gender=gender[0],Pop=population[0])
rep2 = Rep(Name=representatives[1], District=districts[1],Party=party[1],Gender=gender[1],Pop=population[1])
rep3 = Rep(Name=representatives[2], District=districts[2],Party=party[2],Gender=gender[2],Pop=population[2])
rep4 = Rep(Name=representatives[3], District=districts[3],Party=party[3],Gender=gender[3],Pop=population[3])
rep5 = Rep(Name=representatives[4], District=districts[4],Party=party[4],Gender=gender[4],Pop=population[4])
rep6 = Rep(Name=representatives[5], District=districts[5],Party=party[5],Gender=gender[5],Pop=population[5])
rep7 = Rep(Name=representatives[6], District=districts[6],Party=party[6],Gender=gender[6],Pop=population[6])
rep8 = Rep(Name=representatives[7], District=districts[7],Party=party[7],Gender=gender[7],Pop=population[7])
rep9 = Rep(Name=representatives[8], District=districts[8],Party=party[8],Gender=gender[8],Pop=population[8])
rep10 = Rep(Name=representatives[9], District=districts[9],Party=party[9],Gender=gender[9],Pop=population[9])
rep11 = Rep(Name=representatives[10], District=districts[10],Party=party[10],Gender=gender[10],Pop=population[10])
rep12 = Rep(Name=representatives[11], District=districts[11],Party=party[11],Gender=gender[11],Pop=population[11])
rep13 = Rep(Name=representatives[12], District=districts[12],Party=party[12],Gender=gender[12],Pop=population[12])
rep14 = Rep(Name=representatives[13], District=districts[13],Party=party[13],Gender=gender[13],Pop=population[13])
rep15 = Rep(Name=representatives[14], District=districts[14],Party=party[14],Gender=gender[14],Pop=population[14])
rep16 = Rep(Name=representatives[15], District=districts[15],Party=party[15],Gender=gender[15],Pop=population[15])

# Creates a connection to our DB
engine = create_engine("sqlite:///static/data/reps.sqlite")
conn = engine.connect()

#this is important to drop all first to avoid multiple entries
Base.metadata.drop_all(engine)

Base.metadata.create_all(engine)
from sqlalchemy.orm import Session
session = Session(bind=engine)
session.add(rep1)
session.add(rep2)
session.add(rep3)
session.add(rep4)
session.add(rep5)
session.add(rep6)
session.add(rep7)
session.add(rep8)
session.add(rep9)
session.add(rep10)
session.add(rep11)
session.add(rep12)
session.add(rep13)
session.add(rep14)
session.add(rep15)
session.add(rep16)
session.commit()
session.close()


# # Create a SQL connection to our SQLite database
# con = sqlite3.connect("./static/data/reps.sqlite")
# cur = con.cursor()
# cur.execute('SELECT * FROM Representative')
# data = cur.fetchall()
# #print(data[0])

# print(data)
# # creates a Flask application, named app
# app = Flask(__name__)

# @app.route("/")
# def hello():
    
#     return render_template('index.html', data=data)

# @app.route("/route1")
# def hello1():  
#     return jsonify(data)

# #use this route for the  other data
# # @app.route("/route2")
# # def hello2():   
# #     #return jsonify(somedata)


# # run the application on the main prompt or console
# if __name__ == "__main__":
#     app.run(debug=True)


