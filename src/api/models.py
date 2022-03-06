from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    email_id = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    def __init__(self,
            firstname,
            lastname,
            email_id,
            username,
            password_hash):
        self.firstname = firstname
        self.lastname = lastname
        self.email_id = email_id
        self.username = username
        self.password_hash = password_hash

class Blogs(db.Model):
    blog_id = db.Column(db.Integer, primary_key=True)
    user_username = db.Column(db.String, nullable=False)
    blog_content = db.Column(db.String, nullable=False)

    def __init__(self,
            user_username, 
            blog_content
            ):
        self.user_username = user_username
        self.blog_content = blog_content

