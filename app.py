from flask import Flask, request, jsonify, Response, session
from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
import os
import json

# import pymysql
# conn = pymysql.connect(
#         host= applient.cvhkke0wsqzk.us-east-2.rds.amazonaws.com
#         port = 3306
#         user = applient
#         password = #applient#
#         db = applient
#         )


# Init app
app = Flask(__name__)
# basedir = os.path.abspath(os.path.dirname(__file__))
# Database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://applient:#applient#@applient.cvhkke0wsqzk.us-east-2.rds.amazonaws.com:3306/applient'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:!Applient!@localhost/applient_db'


#get endpoint for server, and db instance name for db

# 'mysql://{master username}:{db password}@{endpoint}/{db instance name}'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# engine = create_engine('mysql://applient:#applient#@applient.cvhkke0wsqzk.us-east-2.rds.amazonaws.com:3306/applient')
#to prevent connection issues?
# SQLALCHEMY_ENGINE_OPTIONS = {
#     "pool_pre_ping": True,
#     "pool_recycle": 300,
# }

# Init db
db = SQLAlchemy(app)
# Init ma
# ma = Marshmallow(app)


# User Class/Model
class User(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    cookieVal = db.Column(db.String(10), primary_key=True, unique=True)
    # description = db.Column(db.String(200))
    # price = db.Column(db.Float)
    # qty = db.Column(db.Integer)
    data = db.Column(db.String(10))
    data = db.Column(db.JSON)

    def __init__(self, cookieVal, data):
        self.cookieVal = cookieVal
        self.data = data
        # self.price = price
        # self.qty = qty


# # userData Schema
# class UserSchema(ma.Schema):
#     class Meta:
#         # fields = ('id', 'cookieVal', 'data')
#         fields = ('cookieVal', 'data')
#         # should i use this or give all the fields?
#         # fields = ('data')


# # Init schema
# User_schema = UserSchema(strict=True)
# Users_schema = UserSchema(many=True, strict=True)


#Test function
# @app.route('/')
# def test():
#     cookieVal = "input1"
#     dataString = "test123"
#     data = jsonify(dataString)
#     # data = request.args.get('applications')
#     user = User(cookieVal, data)
#     db.session.add(user)
#     db.session.commit()

#     #Get
#     user = db.session.get(User, cookieVal)
#     # userjson = User_schema.jsonify(user)

#     # return Response(jsonify(user.data), mimetype="application/json", status=200)
#     return "Hello World!"




# Create a User
@app.route('/', methods=['POST'])
def add_user():
	print("post reached")
    cookieVal = request.args.get('identifier')
    print("cookieVal" + cookieVal)
    # data = request.json['applications']
    data = jsonify(request.get_json(force=True))
    # data = request.args.get('applications')
    user = db.session.get(User, cookieVal)
    if user is None:
        user = User(cookieVal, data)
        db.session.add(user)
        print("user added")
    else:
        user.data = data

    db.session.commit()

    # return User_schema.jsonify(user)

    return Response(user.data, mimetype="application/json", status=200)


# # Get All User
# @app.route('/', methods=['GET'])
# def get_users():
#     all_users = User.query.all()
#     result = Users_schema.dump(all_users)
#     return jsonify(result.data)


# Get Single User
@app.route('/', methods=['GET'])
def get_user():
	print("get reached")
    cookieVal = request.args.get('identifier')
    print("cookieVal" + cookieVal)
    # user = User.query.get(cookieVal)
    user = db.session.get(User, cookieVal)
    # userjson = User_schema.jsonify(user)
    print("user gotten")
    return Response(user.data, mimetype="application/json", status=200)


# Update a User
@app.route('/', methods=['PUT'])
def update_user():
	print("put reached")
    cookieVal = request.args.get('identifier')
    print("cookieVal" + cookieVal)
    user = db.session.get(User, cookieVal)

    data = jsonify(request.get_json(force=True))

    user.data = data

    db.session.commit()

    return Response(user.data, mimetype="application/json", status=200)


# Delete User
@app.route('/', methods=['DELETE'])
def delete_product():
    cookieVal = request.args.get('identifier')
    # user = User.query.get(cookieVal)
    user = db.session.get(User, cookieVal)
    db.session.delete(user)
    db.session.commit()

    return user.data


# Run Server
if __name__ == '__main__':
    # app.run(debug=True)
    # app.run(host="0.0.0.0", port=5000, debug=True)
    db.create_all()
    # app.run(port=5000, debug=True)
    app.run(host="0.0.0.0", port=4000, debug=True)
    
