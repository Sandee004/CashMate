from datetime import datetime, timedelta

import bcrypt
import random
from flask import (
    Flask,
    flash,
    make_response,
    redirect,
    render_template,
    request,
    url_for,
)

from flask_session import Session
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session


app = Flask(__name__)
app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SECURE"] = True  # Enable secure session cookies (recommended for production)
app.config["SESSION_COOKIE_HTTPONLY"] = True  # Prevent JavaScript access to session cookies
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # Limit cookie scope to same-site requests
#Session(app)

db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    fullname = db.Column(db.String(50))
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    card_no = db.Column(db.Integer())
    #pin = db.Column(db.Integer)

    def __init__(self, fullname, username, phone, email, password, card_no):
        self.fullname = fullname
        self.username = username
        self.phone = phone
        self.email = email
        self.password = password
        self.card_no = card_no
        #self.pin = pin
    
@app.route('/', methods=["POST", "GET"])
def register():
    if request.method == "POST":
        fullname = request.form.get('fullname')
        username = request.form.get('username')
        phone = request.form.get('phone')
        email = request.form.get('email')
        password = request.form.get('password')
        mask = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        card_no = str(random.randint(10**15,(10**16)-1))
        
        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            flash("Username is taken")
            return redirect (url_for('register'))
        
        new_user = Users(fullname=fullname, username=username, phone=phone, email=email, password=mask, card_no=card_no)
        try:        
            db.session.add(new_user)
            db.session.commit()
            #flash("Welcome")
            return redirect(url_for('login'))
        except IntegrityError:
            db.session.rollback()
            flash("Email is already in use.")
    return render_template('register.html')


@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user = Users.query.filter_by(username=username).first()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
            response = make_response(redirect(url_for("homepage")))
            expiration = datetime.now() + timedelta(minutes=360)
            response.set_cookie("user_id", str(user.id), expires=expiration, httponly=True, secure=True)
            return response
        else:
            flash("Invalid credentials")
            return redirect(url_for("login"))
    else:
        return render_template("login.html")

    return render_template('login.html')
    
@app.route('/homepage')
def homepage():
    user_id = request.cookies.get("user_id")
    if not user_id:
        return redirect(url_for("login"))

    # Retrieve the user object from the database based on the user_id in the session cookie
    user = Users.query.get(user_id)
    if not user:
        flash("User not found")
        return redirect(url_for("login"))
    username = user.username
    full_name = user.fullname
    card_no = user.card_no

    return render_template('homepage.html', username=username, full_name=full_name, card_no=card_no)


@app.route('/profiles', methods=["GET", "POST"])
def profiles():
    if request.method == "POST":
        user_id = request.form.get("user_id")
        session = Session()
        user = session.get(Users, user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
        else:
            return redirect(url_for('profiles'))
    else:
        accounts = Users.query.all()
        return render_template('profiles.html', accounts=accounts)
    return redirect(url_for('profiles'))


@app.route('/receive')
def receive():
    return render_template('receive.html')


@app.route('/send')
def send():
    return render_template('send.html')
@app.route('/logout')
def logout():
    # Clear the session cookie and redirect to the login page
    response = make_response(redirect(url_for("login")))
    response.delete_cookie("user_id")
    return response

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        #db.drop_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81)
    