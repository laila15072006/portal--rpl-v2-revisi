var all_questions = [{
    question_string: "Dibawah ini yang bukan termasuk fungsi statistic adalah",
    choices: {
      correct: "=if()",
      wrong: ["=sum()", "=count() ", " Max() "]
    }
  }, {
    question_string: "Extensi yang di hasilkan oleh file spreadsheet adalah?",
    choices: {
      correct: "Xls",
      wrong: ["Mdb", "Doc", "Exe"]
    }
  }, {
    question_string: "Untuk menghitung rata-rata dalam suatu range kita menggunakan formula?",
    choices: {
      correct: "=average()",
      wrong: [" =sum()", " =count()", " =round()"]
    }
  }, {
    question_string: 'Extention atau format data file dokumen yang disimpan pada program Microsoft word adalah? ',
    choices: {
      correct: "Doc",
      wrong: ["Ppt", "Xls", "Html"]
    }
  }, {
    question_string: 'Untuk membuka program Microsoft Office dengan menu shortcut secara cepat maka digunakan alat bantu?',
    choices: {
      correct: "Keyboard",
      wrong: ["mouse", "Discatte", "Monitor"]
    }
  }];
  var Quiz = function(quiz_name) {
    this.quiz_name = quiz_name;
    this.questions = [];
  }
  Quiz.prototype.add_question = function(question) {
    var index_to_add_question = Math.floor(Math.random() * this.questions.length);
    this.questions.splice(index_to_add_question, 0, question);
  }
  Quiz.prototype.render = function(container) {
    var self = this;
    $('#quiz-results').hide();
    $('#quiz-name').text(this.quiz_name);
    var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');
    function change_question() {
      self.questions[current_question_index].render(question_container);
      $('#prev-question-button').prop('disabled', current_question_index === 0);
      $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);
      var all_questions_answered = true;
      for (var i = 0; i < self.questions.length; i++) {
        if (self.questions[i].user_choice_index === null) {
          all_questions_answered = false;
          break;
        }
      }
      $('#submit-button').prop('disabled', !all_questions_answered);
    }
    var current_question_index = 0;
    change_question();
    $('#prev-question-button').click(function() {
      if (current_question_index > 0) {
        current_question_index--;
        change_question();
      }
    });
   
    $('#next-question-button').click(function() {
      if (current_question_index < self.questions.length - 1) {
        current_question_index++;
        change_question();
      }
    });
    $('#submit-button').click(function() {
      var score = 0;
      for (var i = 0; i < self.questions.length; i++) {
        if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
          score++;
        }
      }
      var percentage = score / self.questions.length;
      console.log(percentage);
      var message;
      if (percentage === 1) {
        message = 'SEMPURNA!!!'
      } else if (percentage >= .75) {
        message = 'Cukup Baik.'
      } else if (percentage >= .5) {
        message = 'Semangat,Coba Lagi.'
      } else {
        message = 'Jangan Menyerah,Kamu Harus Mencobanya Lagi.'
      }
      $('#quiz-results-message').text(message);
      $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
      $('#quiz-results').slideDown();
      $('#quiz button').slideUp();
    });
    question_container.bind('user-select-change', function() {
      var all_questions_answered = true;
      for (var i = 0; i < self.questions.length; i++) {
        if (self.questions[i].user_choice_index === null) {
          all_questions_answered = false;
          break;
        }
      }
      $('#submit-button').prop('disabled', !all_questions_answered);
    });
  }
  
  var Question = function(question_string, correct_choice, wrong_choices) {
    // Private fields for an instance of a Question object.
    this.question_string = question_string;
    this.choices = [];
    this.user_choice_index = null; // Index of the user's choice selection
    
    // Random assign the correct choice an index
    this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);
    
    // Fill in this.choices with the choices
    var number_of_choices = wrong_choices.length + 1;
    for (var i = 0; i < number_of_choices; i++) {
      if (i === this.correct_choice_index) {
        this.choices[i] = correct_choice;
      } else {
        // Randomly pick a wrong choice to put in this index
        var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
        this.choices[i] = wrong_choices[wrong_choice_index];
        
        // Remove the wrong choice from the wrong choice array so that we don't pick it again
        wrong_choices.splice(wrong_choice_index, 1);
      }
    }
  }
  
  Question.prototype.render = function(container) {
  
    var self = this;
    
  
    var question_string_h2;
    if (container.children('h2').length === 0) {
      question_string_h2 = $('<h2>').appendTo(container);
    } else {
      question_string_h2 = container.children('h2').first();
    }
    question_string_h2.text(this.question_string);
    
  
    if (container.children('input[type=radio]').length > 0) {
      container.children('input[type=radio]').each(function() {
        var radio_button_id = $(this).attr('id');
        $(this).remove();
        container.children('label[for=' + radio_button_id + ']').remove();
      });
    }
    for (var i = 0; i < this.choices.length; i++) {
      var choice_radio_button = $('<input>')
        .attr('id', 'choices-' + i)
        .attr('type', 'radio')
        .attr('name', 'choices')
        .attr('value', 'choices-' + i)
        .attr('checked', i === this.user_choice_index)
        .appendTo(container);
      
  
      var choice_label = $('<label>')
        .text(this.choices[i])
        .attr('for', 'choices-' + i)
        .appendTo(container);
    }
    
    
    $('input[name=choices]').change(function(index) {
      var selected_radio_button_value = $('input[name=choices]:checked').val();
      
   
      self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
      
    
      container.trigger('user-select-change');
    });
  }
  
  
  $(document).ready(function() {
  
    var quiz = new Quiz('');
    
    for (var i = 0; i < all_questions.length; i++) {
  
      var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);
  
      quiz.add_question(question);
    }
  
    var quiz_container = $('#quiz');
    quiz.render(quiz_container);
  });