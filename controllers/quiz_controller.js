// GET /question
/*
exports.question =function(req,res,next){
	var answer =req.query.answer || '';
	var par =req.query.parametro || '';
	
	res.render('quizzes/question',{question:'Capital de Portugal',answer: answer,question1:'Quién descubrió América'});
	
};



// GET /check
  exports.check = function(req,res,next){

  	var answer= req.query.answer ||"";
  	var par =req.query.parametro || "";
  	


  	
    if((par==="Portugal")&&(answer==="Lisboa")){

    result='Correcta';
  	res.render('quizzes/result',{result:result, answer: answer});
  }else if((par==="América")&&(answer==="Cristobal Colón" || answer==="Colón")){
  	result='Correcta';
    res.render('quizzes/result',{result:result, answer: answer});
  }
  else{
  	result='Incorrecta'
  	res.render('quizzes/result',{result:result, answer: answer});
  }
    
  };
  */
 
var models = require('../models');
var Sequelize = require('sequelize');

//Autoload el quiz asociado a :quizId
exports.load = function(req,res,next, quizId){
	models.Quiz.findById(quizId,{include: [ models.Comment]}).then(function(quiz){
		if(quiz){
			req.quiz =quiz;
			next();
		}else{
			next(new Error('No existe quizId=' +quizId));
		}
	}).catch(function(error){ next(error);});

	
};

//GET /quizzes
exports.index= function(req,res,next){

  var quizzes = models.Quiz.findAll();

  res.render('quizzes/index.ejs', { quizzes:quizzes});

};


//Adri
//GET /quizzes
//exports.index= function(req,res,next){
//models.Quiz.findAll().then(function(quizzes){
//res.render('quizzes/index.ejs',{quizzes:quizzes});
//}).catch(function(error){next(error);});
//};



//GET /quizzes/:quizId
exports.show=function(req,res,next){

var quizId = Number(req.params.quizId);

var quiz = models.Quiz.findById(quizId);

if(quiz){
  res.render('quizzes/show',{quiz:quiz});
} else{
  next(new Error ('No existe ningún quiz con id=' + quizId));
}

};



//Adri
//GET /quizzes/:quizId
//exports.show=function(req,res,next){
//models.Quiz.findById(req.params.quizId).then(function(quiz){ // Busca la primera pregunta
//if(quiz){
//var answer = req.query.answer || '';
//res.render('quizzes/show',{quiz: req.quiz, answer:answer});
//}
//else{
//throw new Error('No existe ese quiz en la BBDD.');
//}
//}).catch(function(error){next(error);});
//};




//GET /quizzes/new
exports.new =function(req,res,next){

  var quiz = { question: "", answer: ""};

  res.render('quizzes/new', {quiz: quiz});

};



//Adri
//GET /quizzes/new
//exports.new =function(req,res,next){
  //var quiz =models.Quiz.build({question:"",answer:""});
  //res.render('quizzes/new',{quiz:quiz});
//};



//POST/quizzes/create
 exports.create =function(req,res,next){

var quiz = {
  question: req.body.question,
  answer: req.body.answer
};

//validar que no estan vacios
if(!quiz.question || !quiz.answer){
  res.render('quizzes/new', {quiz:quiz});
  return;
}

//guarda el nuevo quiz
quiz = models.Quiz.create(quiz);

res.redirect('/quizzes/' + quiz.id);
};









 //Adri
 //POST/quizzes/create
 //exports.create =function(req,res,next){
  //var quiz = models.Quiz.build({ question : req.body.quiz.question,
                                  //answer : req.body.quiz.answer});

  //guarda en DB los campos pregunta y respuesta de quiz
  //quiz.save({fields: ["question", "answer"]}).then(function(quiz){
    //req.flash('success','Quiz creado con éxito.');
    //res.redirect('/quizzes'); //res.redirect: //Redirección HTTP a lista de preguntas
  //}).catch(Sequelize.ValidationError, function(error){
    //req.flash('error','Errores en el formulario:');
    //for (var i in error.errors){
      //req.flash('error',error.errors[i].value);
    //};
    //res.render('quizzes/new',{quiz:quiz});

  //}).catch(function(error) {
    //req.flash('error', 'Error al crear un Quiz: '+error.message);
          //next(error);
  //});
 //};



// GET /quizzes/ :id/edit
 exports.edit = function(req,res,next){

  var quizId = Number(req.params.quizId);

  var quiz = models.Quiz.findById(quizId);

  if(quiz){
    res.render('quizzes/edit', {quiz:quiz});
  }else{
    next(new Error ('No existe ningun quiz con id=' + quizId));
  }

};






//Adri
// GET /quizzes/ :id/edit
 //exports.edit = function(req,res,next){
  //var quiz = req.quiz; //req.quiz: autoload
                       // de instancia de quiz
  //res.render('quizzes/edit',{quiz: quiz});                     
 //};



// PUT /quizzes/:id
exports.update = function(req, res, next){

var quizId = Number(req.params.quizId);

var quiz = models.Quiz.findById(quizId);

if(quiz){
    quiz.question = req.body.question;
    quiz.answer = req.body.answer;

    models.Quiz.update(quiz);

    res.redirect('/quizzes/' + quizId);
  }else{
    next(new Error ('No existe ningun quiz con id=' + quizId));
  }
};


//Adri
// PUT /quizzes/:id
//exports.update = function(req, res, next){

 // req.quiz.question = req.body.quiz.question;
 // req.quiz.answer = req.body.quiz.answer;

 // req.quiz.save({fields: ["question", "answer"]}).then(function(quiz){
    //req.flash('success','Quiz editado con éxito.');//Redirección HTTP a lista de preguntas.
 // }).catch(Sequelize.ValidationError, function(error){

    //req.flash('error','Errores en el formulario:');
    //for(var i in error.errors){
          //req.flash('error', error.errors[i].value);
   // };
   // res.render('quizzes/edit',{quiz: req.quiz});
  //}).catch(function(error){
    //req.flash('error','Error al editar el Quiz: '+error.message);
    //next(error);
  //});
 //};



// DELETE /quizzes/:id
 exports.destroy = function(req, res, next) {

var quizId = Number(req.params.quizId);

var quiz = models.Quiz.findById(quizId);

if(quiz){
  models.Quiz.destroy(quiz);

  res.redirect('/quizzes');
}else{
  next(new Error('No existe ningún quiz con id =' + quizId));
}

};



//Adri
// DELETE /quizzes/:id
 //exports.destroy = function(req, res, next) {
 // req.quiz.destroy().then(function(){
   // req.flash('success','Quiz borrado con éxito.');
    //res.redirect('/quizzes');
  //}).catch(function(error){
    //req.flash('error','Error al editar el Quiz: '+error.message);
    //next(error);
  //});
 //};


//GET /quizzes/:id/play
exports.play = function(req,res,next){


var answer = req.query.answer || '';

var quizId = Number(req.params.quizId);

var quiz = models.Quiz.findById(quizId);


if(quiz){
  res.render('quizzes/play',{
               quiz: quiz,
               answer: answer
             });
}else{

  next(new Error('No existe ningún quiz con id =' + quizId));

}

};



//GET /quizzes/:id/check
exports.check = function(req,res,next){

  var answer = req.query.answer || "";

  var quizId = Number(req.params.quizId);

  var quiz = models.Quiz.findById(quizId);

  var result = answer.toLowerCase().trim() === quiz.answer.toLowerCase().trim();
 

if(quiz){
    res.render('quizzes/result', {
      quiz:quiz,
      result:result,
      answer:answer
    });

}else {
  next(new Error('No existe ningún quiz con id=' + quizId));
}

};



//Adri
//GET /quizzes/:id/check
//exports.check = function(req,res,next){
//models.Quiz.findById(req.params.quizId).then(function(quiz){ //Busca la primera pregunta
//if(quiz){
//var answer = req.query.answer ||"";
//var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
//res.render('quizzes/result',{quiz: req.quiz,result :result, answer: answer});
//}
//else{
//throw new Error('No existe ese quiz en la BBDD.');
//}
//}).catch(function(error){next(error);});
//};




//GET /quizzes
/*exports.search=function(res,req,next){
models.Quiz.findAll({where :["quiz.question like ?", search]}).then(function(quizzes){
var search = req.query.search || "";
res.render('/quizzes',{search :search});
res.render('/quizzes/search',{pregunta : quiz.question});
}).catch(function(error){next(error);});
}*/
