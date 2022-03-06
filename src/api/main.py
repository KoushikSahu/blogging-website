from flask import Flask
from auth import auth_apis
from user import user_apis
from flask_cors import CORS
from models import db

app: Flask
app = Flask(__name__)
app.register_blueprint(auth_apis)
app.register_blueprint(user_apis)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
CORS(app)

def main():
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(debug=True)

if __name__ == '__main__':
    main()

