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
    session,
)

from flask_session import Session
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session, relationship

app = Flask(__name__)
app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config["SESSION_TYPE"] = "filesystem"
app.config[
    "SESSION_COOKIE_SECURE"] = True  # Enable secure session cookies (recommended for production)
app.config[
    "SESSION_COOKIE_HTTPONLY"] = True  # Prevent JavaScript access to session cookies
app.config[
    "SESSION_COOKIE_SAMESITE"] = "Lax"  # Limit cookie scope to same-site requests
#Session(app)

db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    fullname = db.Column(db.String(50))
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    card_no = db.Column(db.Integer())
    balance = db.Column(db.Integer(), default= 65000)

    transactions = relationship("Transactions", backref="user")

    def __init__(self, fullname, username, email, password, card_no, balance):
        self.fullname = fullname
        self.username = username
        self.email = email
        self.password = password
        self.card_no = card_no
        self.balance = balance


class Transactions(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    detail = db.Column(db.String(50))
    amt = db.Column(db.Integer())
    #balance = db.Column(db.Integer())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __init__(self, user_id, detail, amt):
        self.user_id = user_id
        self.detail = detail
        self.amt = amt
        


@app.route('/', methods=["POST", "GET"])
def register():
    if request.method == "POST":
        fullname = request.form.get('fullname')
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        mask = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cardNumber = str(random.randint(10**15, (10**16) - 1))
        card_no = ' '.join(cardNumber[i:i + 4]
                           for i in range(0, len(cardNumber), 4))

        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            flash("Username is taken")
            return redirect(url_for('register'))

        new_user = Users(fullname=fullname,
                         username=username,
                         email=email,
                         password=mask,
                         balance= 65000,
                         card_no=card_no)
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
            response.set_cookie("user_id",
                                str(user.id),
                                expires=expiration,
                                httponly=True,
                                secure=True)
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
    balance = user.balance

    transactions = Transactions.query.filter_by(user_id=user_id).all()

    return render_template('homepage.html',
                           user_id=user_id,
                           username=username,
                           full_name=full_name,
                           card_no=card_no,
                           balance=balance,
                           transactions=transactions)


@app.route('/profiles', methods=["GET", "POST"])
def profiles():
    if request.method == "POST":
        user_id = request.form.get("user_id")
        user = Users.query.get(user_id)
        #session = Session()
        #user = session.get(Users, user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
        else:
            return redirect(url_for('profiles'))
    else:
        accounts = Users.query.all()
        return render_template('profiles.html', accounts=accounts)
    return redirect(url_for('profiles'))


@app.route('/transactions', methods=["GET", "POST"])
def transactions():
    if request.method == "POST":
        transaction_id = request.form.get('transaction_id')
        if transaction_id:
            # Retrieve the transaction from the database
            transaction = Transactions.query.get(transaction_id)

            if transaction:
                # Delete the transaction
                db.session.delete(transaction)
                db.session.commit()

    # Retrieve the user's transactions from the database
    user_transactions = Transactions.query.all()

    return render_template('transactions.html', transactions=user_transactions)


@app.route('/transactions/delete/<int:transaction_id>', methods=['POST'])
#@app.route('/delete-transaction/<int:transaction_id>', methods=["POST"])
def delete_transaction(transaction_id):
    transaction = Transactions.query.get(transaction_id)

    if not transaction:
        flash("Transaction not found")
        return redirect(url_for('transactions'))

    # Retrieve the associated user
    user = transaction.user

    if not user:
        flash("User not found")
        return redirect(url_for('transactions'))
    user.balance += transaction.amt
    db.session.delete(transaction)
    db.session.commit()

    return redirect(url_for('transactions'))


@app.route('/receive')
def receive():
    return render_template('receive.html')


@app.route('/send', methods=["GET", "POST"])
def send():
    user_id = request.cookies.get("user_id")
    if request.method == "POST" and user_id:
        amount = int(request.form.get('amount'))
        user = Users.query.get(user_id)
        if user:
            if amount <= user.balance:
                # Perform the transaction
                user.balance -= amount
                # Save the updated balance to the database
                db.session.commit()
                # Redirect to the homepage
                session['amount'] = amount
                return redirect(url_for('transaction_description'))
                
            else:
                error = "Amount must be lower than or equal to your balance"
                return render_template('send.html', error=error)
        else:
            flash("User not found")
    return render_template('send.html')
    

@app.route('/transaction-description', methods=["GET", "POST"])
def transaction_description():
    if request.method == "POST":
        transaction_description = request.form.get('transaction_description')
        amount = session.get('amount')
        user_id = request.cookies.get("user_id")

        if user_id:
            user = Users.query.get(user_id)
            if user:
                new_transaction = Transactions(user_id=user.id, detail=transaction_description, amt=amount)
                db.session.add(new_transaction)
                db.session.commit()
                session.pop('amount')
                return redirect(url_for('homepage'))
            else:
                flash("User not found")
        else:
            flash("User not logged in")

    return render_template('transaction_description.html')
    

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
