from flask import Blueprint, request, jsonify
import hashlib
import jwt
import json

from models import User, db

auth_apis = Blueprint('auth_apis', __name__)
secret = "secret"

@auth_apis.route('/login', methods=['POST'])
def login():
    login_data = json.loads(request.data)
    username = login_data['username']
    password = login_data['password']
    pswd_hash = hashlib.sha256(password.encode()).hexdigest()

    response = {
        "token": None
    }
    user = User.query.filter_by(username=username).first()
    if user != None:
        if user.password_hash == pswd_hash:
            response_body = {
                "username": username
            }
            encoded_jwt = jwt.encode(response_body, secret, algorithm="HS256")
            response["token"] = encoded_jwt
        else:
            return "Password not matching", 400
    else:
        return "User not found", 404

    return jsonify(response)

@auth_apis.route('/signup', methods=['POST'])
def signup():
    user_data = json.loads(request.data)
    firstname = user_data['firstname']
    lastname = user_data['lastname']
    email_id = user_data['email_id']
    username = user_data['username']
    password = user_data['password']

    pswd_hash = hashlib.sha256(password.encode()).hexdigest()

    response = {
        "token": None
    }
    if User.query.filter_by(username=username).first() == None:
        user = User(firstname, lastname, email_id, username, pswd_hash)
        db.session.add(user)
        db.session.commit()
        
        response_body = {
            "username": username
        }
        encoded_jwt = jwt.encode(response_body, secret, algorithm="HS256")
        response["token"] = encoded_jwt
    else:
        return "Username not unique", 400

    return jsonify(response)

