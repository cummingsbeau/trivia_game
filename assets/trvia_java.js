$(document).ready(function () {

  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',

  questions: {
    q1: 'The Mountain is the nickname for which character?',
    q2: "How many times has Sansa Stark been married?",
    q3: 'Who pushed young Bran Stark out of the window??',
    q4: 'What was the name of the castle where Arya and Gendry were held prisoner?',
    q5: "What deity does Melisandre, the Red Priestess, follow?",
    q6: 'Why does Daenerys banish Ser Jorah Mormont from Meereen?',
    q7: "Who is not on Arya Stark's kill list?"
  },
  options: {
    q1: ['Gerold Clegane', 'Hodor Clegane', 'Gregor Clegane', 'Sandor Clegane'],
    q2: ['Once', 'Twice', 'Three times', 'None'],
    q3: ['Tyrion Lannister', 'Jamie Lannister', 'Theon Greyjoy', 'Robert Baratheon'],
    q4: ['Harrenhal', 'Casterly Rock', 'Kings Landing', 'Moat Cailin'],
    q5: ['The Old Gods', 'The New Gods', 'The Lord Of Light', 'The Lord Of Fire'],
    q6: ['Spying', 'Being friendzoned by Daenerys', 'Unlikeable', 'Being infected by greyscale'],
    q7: ['Melisandre', 'Littlefinger', 'Cersei Lannister', 'The Mountain']
  },
  answers: {
    q1: 'Gregor Clegane',
    q2: 'Twice',
    q3: 'Jamie Lannister',
    q4: 'Harrenhal',
    q5: 'The Lord Of Light',
    q6: 'Spying',
    q7: 'Littlefinger',
  },

  startGame: function () {

    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();

    trivia.nextQuestion();

  },

  nextQuestion: function () {

    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);


    var questionOptions = Object.values(trivia.options)[trivia.currentSet];


    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },

  timerRunning: function () {

    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }

    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }

    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      $('#results')
        .html('<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>' +
          '<p>Please play again!</p>');


      $('#game').hide();


      $('#start').show();
    }

  },

  guessChecker: function () {

    var resultId;


    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }

    else {

      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Wrong ' + currentAnswer + '</h3>');
    }

  },

  guessResult: function () {


    trivia.currentSet++;


    $('.option').remove();
    $('#results h3').remove();


    trivia.nextQuestion();

  }

}