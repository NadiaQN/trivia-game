
$.ajax({
  url: 'https://opentdb.com/api.php?amount=20&category=27',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    // For que recorre la data
    for (i = 0; i < data.results.length; i++) {
      // obtengo las preguntas
      const question = data.results[i].question;
      // la respuesta correcta
      const answerCorrect = data.results[i].correct_answer;
      // las respuestas incorrectas
      const answersIncorrect = data.results[i].incorrect_answers;
      // array vacio donde ingresar todas las respuestas
      let answers = [];
      answers.push(answerCorrect);
      for (j = 0; j < answersIncorrect.length; j++) {
        answers.push(answersIncorrect[j]);
      }
      // Si la pregunta es de tipo true o false se imprime de la primera manera
      // hay un i + 20 para evitar que los id se repitan y que estos puedan marcarse de manera correcta
      if (data.results[i].type === 'boolean') {
        $('.question-wall').append('<div class="questions"><h5>Question ' + (i + 1) + '</h5><h6>' + question + '</h6><p class="left-align"><input class="with-gap" name="answers-option' + i + '" type="radio" value="' + answers[0] + '" id="boolean' + i + '"/><label for="boolean' + i + '">' + answers[0] + '</label></p><p class="left-align"><input class="with-gap" value="' + answers[1] + '" name="answers-option' + i + '" type="radio" id="boolean' + (i + 21) + '"/><label for="boolean' + (i + 21) + '">' + answers[1] + '</label></p><button class="go btn">GO!</button></div>');
      // Si la pregunta es multiple se imprimira de la siguiente manera
      } else if (data.results[i].type === 'multiple') {
        $('.question-wall').append('<div class="questions"><h5>Question ' + (i + 1) + '</h5><h6>' + question + '</h6><p class="left-align"><input class="with-gap" value="' + answers[0] + '" name="answers-option' + i + '" type="radio" id="' + answers[0] + '"/><label for="' + answers[0] + '">' + answers[0] + '</label></p><p class="left-align"><input class="with-gap" value="' + answers[1] + '" name="answers-option' + i + '" type="radio" id="' + answers[1] + '"/><label for="' + answers[1] + '">' + answers[1] + '</label></p><p class="left-align"><input class="with-gap" value="' + answers[2] + '" name="answers-option' + i + '" type="radio" id="' + answers[2] + '"/><label for="' + answers[2] + '">' + answers[2] + '</label></p><p class="left-align"><input class="with-gap" value="' + answers[3] + '" name="answers-option' + i + '" type="radio" id="' + answers[3] + '"/><label for="' + answers[3] + '">' + answers[3] + '</label></p><button class="go btn">GO!</button></div>'); 
      }
      $('.questions').hide();
      $('.questions:eq(0)').show();
      let conQuestion = 0;
      let nextQuestion = $('.questions').index();
      conQuestion = nextQuestion;
      $('.go').click(function() {
        if ($('.with-gap[name="answers-option' + i + ']:checked') ) {
          conQuestion++;
          $('.questions').hide();
          $('.questions:eq(' + conQuestion + ')').show();
        } else {
          console.log('Game Over');
        }
      }); 
    }
  }
});
