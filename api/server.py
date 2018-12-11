from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask_pymongo import PyMongo, ObjectId
# app modules
from app.aula import Aula
from app.sala import Sala
from app.user import User

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'horarios'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/horarios'

mongo = PyMongo(app)

# mensagem de erro padrao
def send_error(error):
	msg = str(error)
	# msg especifica para keyerror
	if type(error) is KeyError:
		msg = 'O campo ' + str(error) + ' é obrigatório'
	return jsonify({'result' : 	'error' , 'reason': msg})

# ROTAS AULA
@app.route('/aula', methods=['GET'])
def get_all_aulas():
	try:
		aulas = Aula(mongo)
		return aulas.get_all(), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/aula/<sala>', methods=['GET'])
def get_aulas_by_sala(sala):
	try:
		aulas = Aula(mongo)
		return aulas.get_by_sala(sala), 200
	except Exception as e:
		return send_error(e), 500
	

@app.route('/aula/<id>', methods=['DELETE'])
def delete_aula(id):
	try:
		aulas = Aula(mongo)
		return aulas.delete(id), 200
	except Exception as e:
		return send_error(e), 500
	

@app.route('/aula', methods=['POST'])
def add_aula():
	try:
		aulas = Aula(mongo)
		return aulas.add(), 200
	except Exception as e:
		return send_error(e), 500

# ROTAS SALA
@app.route('/sala', methods=['GET'])
def get_all_salas():
	try:
		salas = Sala(mongo)
		return salas.get_all(), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/sala/<id>', methods=['DELETE'])
def delete_sala(id):
	try:
		salas = Sala(mongo)
		return salas.delete(id), 200
	except Exception as e:
		return send_error(e), 500
	

@app.route('/sala', methods=['POST'])
def add_sala():
	try:
		salas = Sala(mongo)
		return salas.add(), 200
	except Exception as e:
		return send_error(e), 500

# ROTAS USUARIO
@app.route('/user', methods=['GET'])
def call_get_all_users():
	try:
		api = User(mongo)
		return api.get_all(), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/user/<id>', methods=['GET'])
def call_get_user_by_id(id):
	try:
		api = User(mongo)
		return api.get_by_id(id), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/user/<id>', methods=['DELETE'])
def call_delete_user(id):
	try:
		api = User(mongo)
		return api.delete(), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/login', methods=['POST'])
def call_login_user():
	try:
		api = User(mongo)
		return api.login(), 200
	except Exception as e:
		return send_error(e), 500

@app.route('/user', methods=['POST'])
def call_add_user():
	try:
		api = User(mongo)
		return api.add()
	except Exception as e:
		return send_error(e), 500

if __name__ == '__main__':
    app.run(debug=True)
