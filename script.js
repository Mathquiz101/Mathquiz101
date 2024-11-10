 const quizQuestions = {
            "Number and Algebra": [
                {
                    question: "What is the value of x in the equation 2x + 5 = 13?",
                    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
                    correct: 1
                },
                {
                    question: "Which of the following is a prime number?",
                    options: ["15", "21", "23", "25"],
                    correct: 2
                },
                {
                    question: "Simplify: (3x² + 2x) - (x² - 3x)",
                    options: ["2x² + 5x", "2x² - x", "4x² - x", "4x² + 5x"],
                    correct: 0
                },
                {
                    question: "What is the factor of x² - 4?",
                    options: ["(x+2)(x+2)", "(x-2)(x+2)", "(x-2)(x-2)", "(x+4)(x-1)"],
                    correct: 1
                },
                {
                    question: "If a = 3 and b = -2, what is the value of a² + 2ab + b²?",
                    options: ["1", "5", "9", "13"],
                    correct: 0
                }
            ],
            "Sets and Functions": [
                {
                    question: "What is the domain of f(x) = 1/x?",
                    options: ["All real numbers", "All real numbers except 0", "All positive numbers", "All negative numbers"],
                    correct: 1
                },
                {
                    question: "If A = {1,2,3} and B = {2,3,4}, what is A ∩ B?",
                    options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{}"],
                    correct: 1
                },
                {
                    question: "Which of the following is a function?",
                    options: ["y = x²", "x = y²", "x² + y² = 1", "y = ±√x"],
                    correct: 0
                },
                {
                    question: "What is the range of f(x) = x²?",
                    options: ["All real numbers", "All non-negative real numbers", "All positive real numbers", "All negative real numbers"],
                    correct: 1
                },
                {
                    question: "If f(x) = 2x + 1 and g(x) = x², what is (f∘g)(2)?",
                    options: ["5", "7", "9", "11"],
                    correct: 1
                }
            ],
            "Trigonometry and Geometry": [
                {
                    question: "What is sin²θ + cos²θ equal to?",
                    options: ["0", "1", "2", "Depends on θ"],
                    correct: 1
                },
                {
                    question: "In a right triangle, if sin θ = 0.6, what is cos θ?",
                    options: ["0.6", "0.8", "1.0", "1.2"],
                    correct: 1
                },
                {
                    question: "What is the area of a circle with radius 5 units?",
                    options: ["25π", "10π", "15π", "20π"],
                    correct: 0
                },
                {
                    question: "What is the value of tan 45°?",
                    options: ["0", "1", "√2", "2"],
                    correct: 1
                },
                {
                    question: "In a triangle, if two angles are 60° and 70°, what is the third angle?",
                    options: ["50°", "45°", "55°", "40°"],
                    correct: 0
                }
            ]
        };

        function updateProgress() {
            const totalQuestions = 5;
            const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            
            const percentage = (answeredQuestions / totalQuestions) * 100;
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `Questions Answered: ${answeredQuestions}/${totalQuestions}`;
        }

        function createQuiz(topic) {
            const questions = quizQuestions[topic];
            if (!questions) return;

            const quizContainer = document.getElementById('quizContainer');
            const progressContainer = document.getElementById('progressContainer');
            
            quizContainer.style.display = 'block';
            progressContainer.style.display = 'block';
            quizContainer.innerHTML = '';

            questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-container';

                const questionText = document.createElement('div');
                questionText.className = 'question';
                questionText.textContent = `${index + 1}. ${q.question}`;

                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';

                q.options.forEach((opt, optIndex) => {
                    const option = document.createElement('label');
                    option.className = 'option';

                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `question${index}`;
                    radio.value = optIndex;
                    radio.addEventListener('change', updateProgress);

                    const optionText = document.createTextNode(opt);
                    const resultIndicator = document.createElement('span');
                    resultIndicator.className = 'result-indicator';
                    resultIndicator.innerHTML = '✓';

                    option.appendChild(radio);
                    option.appendChild(optionText);
                    option.appendChild(resultIndicator);
                    optionsDiv.appendChild(option);
                });

                questionDiv.appendChild(questionText);
                questionDiv.appendChild(optionsDiv);
                quizContainer.appendChild(questionDiv);
            });

            const submitButton = document.createElement('button');
            submitButton.className = 'submit-btn';
            submitButton.textContent = 'Submit Quiz';
            submitButton.onclick = checkAnswers;
            quizContainer.appendChild(submitButton);

            // Reset progress bar
            updateProgress();
        }

        function checkAnswers() {
            const questions = quizQuestions[document.getElementById('topicSelect').value];
            const questionContainers = document.querySelectorAll('.question-container');

            questionContainers.forEach((container, index) => {
                const selectedOption = container.querySelector(`input[name="question${index}"]:checked`);
                const resultIndicators = container.querySelectorAll('.result-indicator');

                resultIndicators.forEach(indicator => {
                    indicator.style.display = 'none';
                });

                if (selectedOption) {
                    const isCorrect = parseInt(selectedOption.value) === questions[index].correct;
                    const indicator = selectedOption.parentElement.querySelector('.result-indicator');
                    indicator.innerHTML = isCorrect ? '✓' : '✗';
                    indicator.className = `result-indicator ${isCorrect ? 'correct' : 'incorrect'}`;
                    indicator.style.display = 'inline';
                }
            });
        }

        document.getElementById('topicSelect').addEventListener('change', (e) => {
            createQuiz(e.target.value);
        });
