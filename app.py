
from flask import Flask ,Blueprint , render_template, redirect, url_for, request, session, jsonify, abort
from flask import Flask, request, jsonify, flash, redirect, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/login', methods=['GET', 'POST'])
def LOGIN():
    # daily_scheduler()
    
    if request.method == 'POST':
        print("email,password")
        email = request.form.get("username", "")
        password = request.form.get("password", "")
        print(email,password)
        print("email,password")
        if not email or not password:
            flash('Incorrect Username Or Password', 'error')
            return redirect(url_for('LOGIN'))
        
        elif email == 'qamber246@gmail.com' and password == '12345':
            return render_template('base.html')

    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
