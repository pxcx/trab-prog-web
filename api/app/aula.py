from flask import jsonify
from flask import request
from flask_pymongo import ObjectId

class Aula:
	# construtor
	def __init__(self, mongo):
		self.mongo = mongo

	# metodo que lista todas as aulas
	def get_all(self):
		aulas = self.mongo.db.aulas
		output = []
		for aula in aulas.find():
			output.append({
				'id' : str(aula['_id']),
				'aula' : aula['aula'], 
				'sala' : aula['sala'], 
				'dia' : aula['dia'], 
				'inicio' : aula['inicio'], 
				'fim' : aula['fim'], 
				'professor' : aula['professor']
			})
		return jsonify({'result' : output})

	# metodo que lista as aulas por sala
	def get_by_sala(self, sala):
		aulas = self.mongo.db.aulas
		output = []
		for aula in aulas.find({'sala': sala}):
			output.append({
				'id' : str(aula['_id']),
				'aula' : aula['aula'], 
				'sala' : aula['sala'], 
				'dia' : aula['dia'], 
				'inicio' : aula['inicio'], 
				'fim' : aula['fim'], 
				'professor' : aula['professor']
			})
		return jsonify({'result' : output})
			

	# metodo que exclui uma aula
	def delete(self, id):
		aulas = self.mongo.db.aulas

		output = 'Nenhuma aula encontrada'
		if aulas.count({'_id': ObjectId(id) }) >= 1:
			result = aulas.delete_one({'_id': ObjectId(id)})
			output = str(result.deleted_count) + ' registro foi removido'
			
		return jsonify({'result' : output})
			

	# metodo que cadastra uma aula
	def add(self):
		aulas = self.mongo.db.aulas

		aula = request.json['aula']
		sala = str(request.json['sala'])
		dia = request.json['dia']
		inicio = request.json['inicio']
		fim = request.json['fim']
		professor = request.json['professor']

		aula_id = aulas.insert({
			'aula': aula, 
			'sala': sala, 
			'dia': dia, 
			'inicio': inicio, 
			'fim': fim, 
			'professor': professor
		})

		nova_aula = aulas.find_one({'_id': aula_id })
		output = {
			'id' : str(nova_aula['_id']),
			'aula' : nova_aula['aula'], 
			'sala' : nova_aula['sala'], 
			'dia' : nova_aula['dia'], 
			'inicio' : nova_aula['inicio'], 
			'fim' : nova_aula['fim'], 
			'professor' : nova_aula['professor']
		}
		return jsonify({'result' : output})

