var max_guesses = 10;

var guess_count = 1;
var reset_button;


document.addEventListener('DOMContentLoaded', function() {
	var random_number = generateNumber();

	var guesses = document.querySelector('.guesses');
	var last_result = document.querySelector('.last-result');
	var low_or_high = document.querySelector('.low-or-high');

	var guess_submit = document.querySelector('.guess-submit');
	guess_submit.addEventListener('click', checkGuess);

	var guess_field = document.querySelector('.guess-field');
	guess_field.focus();


	function checkGuess() {
		var user_guess = Number(guess_field.value);

		if(guess_count === 1) {
			guesses.textContent = 'Previous Guesses: ';
		}

		guesses.textContent += user_guess.toString() + ' ';

		if(user_guess === random_number) {
			last_result.textContent = 'Congratulations!';
			last_result.style.backgroundColor = 'green';
			low_or_high.textContent = '';
			gameEnd();
		} else if(guess_count === max_guesses) {
			last_result.textContent = 'GAME OVER!!!';
			gameEnd();
		} else {
			last_result.textContent = 'Wrong!';
			last_result.style.backgroundColor = 'red';

			if(user_guess < random_number) {
				low_or_high.textContent = 'Too Low!';
				low_or_high.style.backgroundColor = 'red';
			} else if(user_guess > random_number) {
				low_or_high.textContent = 'Too High!';
				low_or_high.style.backgroundColor = 'blue';
			}
		}

		++guess_count;

		guess_field.value = '';
		guess_field.focus();
	}

	function gameEnd() {
		guess_field.disabled = true;
		guess_submit.disabled = true;

		reset_button = document.createElement('button');
		reset_button.textContent = 'Start New Game';
		reset_button.addEventListener('click', resetGame);
		document.body.appendChild(reset_button);
	}

	function resetGame() {
		guess_count = 1;

		var results = document.querySelectorAll('.result p');
		for(let i = 0; i < results.length; ++i) {
			results[i].textContent = '';
		}

		reset_button.parentNode.removeChild(reset_button);

		guess_field.disabled = false;
		guess_submit.disabled = false;

		guess_field.value = '';
		guess_field.focus();

		last_result.style.backgroundColor = 'white';

		random_number = generateNumber();
	}

	function generateNumber() {
		return Math.floor(Math.random() * 100) + 1;
	}
})
