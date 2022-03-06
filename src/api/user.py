from flask import Blueprint, request, jsonify
import jwt
import json

from models import Blogs, User, db

user_apis = Blueprint('user_apis', __name__)
secret = "secret"

@user_apis.route('/info', methods=['POST'])
def info():
    request_payload = json.loads(request.data)
    token = request_payload['token']

    response = dict()
    try:
        token_payload = jwt.decode(token, secret, algorithms='HS256')
        username = token_payload['username']
        user = User.query.filter_by(username = username).first()
        response['firstname'] = user.firstname
        response['lastname'] = user.lastname
        response['email_id'] = user.email_id
        response['username'] = user.username
        print(response)
    except:
        return 'User not authenticated', 401

    return jsonify(response)

@user_apis.route('/blog/add', methods=['POST'])
def add_blog():
    request_payload = json.loads(request.data)
    username = request_payload['username']
    blog_content = request_payload['blog_content']

    response = dict()
    try:
        blog = Blogs(username, blog_content)
        db.session.add(blog)
        db.session.commit()
        response['success'] = "ok"
    except:
        return 'Blog can\'t be added', 400

    return jsonify(response)

@user_apis.route('/blog/get', methods=['POST'])
def get_blog():
    request_payload = json.loads(request.data)
    username = request_payload['username']

    response = list()
    try:
        blogs = Blogs.query.filter_by(user_username=username).all()
        for blog in blogs:
            blog_dict = dict()
            blog_dict['blog_id'] = blog.blog_id
            blog_dict['blog_content'] = blog.blog_content
            response.append(blog_dict)
    except:
        return 'Invalid user', 400

    return jsonify(response)

