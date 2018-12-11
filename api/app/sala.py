from flask import jsonify
from flask import request
from flask_pymongo import ObjectId

class Sala:
	# construtor
	def __init__(self, mongo):
		self.mongo = mongo

	# formata um objeto para o jsonfy
	def format(self, value):
		output = {
			'id' : str(value['_id']),
			'sala' : value['sala']
		}
		return output

	# metodo que lista todas as salas
	def get_all(self):
		salas = self.mongo.db.salas

		output = []
		for sala in salas.find():
			output.append(self.format(sala))
		return jsonify({'result' : output})
			

	# metodo que exclui uma sala
	def delete(self, id):
		salas = self.mongo.db.salas

		output = 'Nenhuma sala encontrada'
		if salas.count({'_id': ObjectId(id) }) >= 1:
			result = salas.delete_one({'_id': ObjectId(id)})
			output = str(result.deleted_count) + ' registro foi removido'
		return jsonify({'result' : output})
			

	# metodo que cadastra uma sala
	def add(self):
		salas = self.mongo.db.salas

		if request.json:
			sala = request.json['sala']
			sala_id = salas.insert({ 'sala': sala })
			new = salas.find_one({'_id': sala_id })
			return jsonify({'result' : self.format(new)})
		else:
			raise Exception('Faltam dados')
		

