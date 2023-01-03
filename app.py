from flask import Flask, request, jsonify, Response, session
import requests
import json
import os

domain = os.getenv("domain")
url = "http://" + domain + ":3000/predict"

# from flask_cors import CORS, cross_origin


# import pymysql
# conn = pymysql.connect(
#         host= applient.cvhkke0wsqzk.us-east-2.rds.amazonaws.com
#         port = 3306
#         user = applient
#         password = #applient#
#         db = applient
#         )


# Init app
app = Flask(__name__, static_folder="static", static_url_path='')

@app.route('/')
def serve():
    return app.send_static_file('index.html')

@app.route('/predict', methods =["POST"])
def predict():
    # return jsonify(test="test")
    # print(request.data, type(request.data))
    data = json.loads(request.data)
    # print(json.dumps(data, indent=4))
    # return jsonify(data)
    response_raw = requests.post(url, json=data)
    # # print(json.loads(response.text), type(json.loads(response.text)))
    # response = Response(response=response_raw, mimetype='application/json', status=200)
    response = Response(response=response_raw.text, status=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    print("post returning",response)
    return response
    # return "HI"
    


@app.route('/predict', methods=['OPTIONS'])
def sending_headers():
    # return jsonify(test="test")
    print("options reached")
    test_response = jsonify(message="Simple server is running")
    response = Response(test_response, status=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    print("options returning")
    return response

@app.route('/hello', methods =["GET"])
def hello():

    response = Response(response="Hello world! Adnan Here", status=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    print("get returning",response)
    return response
    # return "HI"
@app.route('/hello', methods=['OPTIONS'])
def hello_headers():
    # return jsonify(test="test")
    print("options reached")
    test_response = jsonify(message="Simple server is running")
    response = Response(test_response, status=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    print("options returning")
    return response

if __name__ == '__main__':
    app.run(threaded=True, port=5000)
