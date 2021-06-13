from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///coffee-ordering-system.db"
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ""

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.Text)
    order_information = db.Column(db.Text)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __str__(self):
        return f'{self.id} {self.customer} {self.order}'


def order_serializer(order):
    return {
        'id': order.id,
        'customer': order.customer_name,
        'order': order.order_information,
    }


@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(order_serializer, Order.query.all())])


@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    print(request_data)
    order = Order(customer_name=request_data['customer'], order_information=request_data['order'])

    db.session.add(order)
    db.session.commit()

    return {'201': 'todo created successfully'}


@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(order_serializer, Order.query.filter_by(id=id))])


@app.route('/api/<int:id>', methods=['DELETE'])
def delete(id):
    Order.query.filter_by(id=id).delete()
    db.session.commit()

    return {'204': 'Delete successfully'}


if __name__ == '__main__':
    app.run()