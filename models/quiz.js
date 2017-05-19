//modelo de quizzes
var quizzes = [

{ id:1,
   question:"Capital de Italia",
   answer:"Roma"
},

{ id:2,
   question:"Capital de Francia",
   answer:"París"
},

{ id:3,
   question:"Capital de España",
   answer:"Madrid"
},

{ id:4,
   question:"Capital de Portugal",
   answer:"Lisboa"
}];

//Añade quiz como último elemento del array
//y devuelve quiz con quiz.id actualizado.

var nextId = quizzes.length + 1;

//Añade nuevo objeto al final del array y devuelve objeto actualizado con id
//Crea un nuevo quiz con los valores pasados como parametro
exports.create = function(quiz){

var quiz = {
	id:nextId++,
	question:(quiz.question || "").trim(),
	answer: (quiz.answer || "").trim()
};

quizzes.push(quiz);

return quiz;
};



//Actualiza el objeto de quiz con parámetros pasados
exports.update = function(quiz){

	var index = quizzes.findIndex(function(q){
		return quiz.id === q.id;

	});

if(index >= 0){
	quizzes [index] = {
		id:nextId++,
	    question:(quiz.question || "").trim(),
	    answer: (quiz.answer || "").trim()
	};
}

};




//Devuelve array con todos los objetos de la BBDD
exports.findAll= function(){
	return quizzes;
};
//Devulve objeto con identificador id
exports.findById= function(id){
	return quizzes.find(function(quiz){
		return quiz.id === q.id;
    });
};

//Elimina objeto con identificador id del array
exports.destroy = function(quiz){
     
     var index = quizzes.findIndex(function(q){
     	return quiz.id === q.id;
     });

     if(index >= 0){
     	quizzes.splice(index,1);
     }
};

















};