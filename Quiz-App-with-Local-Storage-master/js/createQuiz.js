document.getElementById('question-form').addEventListener('submit', function(event) {
    event.preventDefault();
 
    var question = document.getElementById('question').value.trim();
    var option1 = document.getElementById('option1').value.trim();
    var option2 = document.getElementById('option2').value.trim();
    var option3 = document.getElementById('option3').value.trim();
    var option4 = document.getElementById('option4').value.trim();
    var correctOption = parseInt(document.getElementById('correct-option').value);
    console.log(data);
 
    if (question !== '' && option1 !== '' && option2 !== '' && option3 !== '' && option4 !== '' && !isNaN(correctOption) && correctOption >= 1 && correctOption <= 4) {
        // Prepare data to send
        var data = {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correctOption: correctOption
        };
 
        // Send POST request to server
        fetch('http://localhost:5502/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Question saved successfully!');
            
            document.getElementById('question-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the question.');
        });
    } else {
        alert('Please fill in all fields correctly.');
    }
});
