document.addEventListener('DOMContentLoaded', function() {

    const quizData = [
        {
            question: "相手が100チップ賭けた。自分も勝負したいが、これ以上は賭けたくない。どうする？",
            options: [
                { text: "コール", correct: true, explanation: "正解！相手と同じ額を出すのがコールです。正しく状況判断できています。" },
                { text: "レイズ", correct: false, explanation: "レイズはさらに上乗せすること。強気な時に使います。" },
                { text: "フォールド", correct: false, explanation: "フォールドはゲームから降りること。勝負したい時には選びません。" }
            ]
        },
        {
            question: "自分の手札に全く自信がない。このゲームから降りたい。どうする？",
            options: [
                { text: "ベット", correct: false, explanation: "ベットは最初にチップを賭けるアクションです。" },
                { text: "コール", correct: false, explanation: "コールは相手のベットを受けるアクション。降りる時には選びません。" },
                { text: "フォールド", correct: true, explanation: "正解！ゲームから降りるのがフォールド。被害を最小限に抑える賢明な判断です。" }
            ]
        },
        {
            question: "相手のベットに対して、さらに金額を上乗せしてプレッシャーをかけたい。どうする？",
            options: [
                { text: "レイズ", correct: true, explanation: "その通り！相手のベットに上乗せするのがレイズ。自分の手の強さを示すことができます。" },
                { text: "チェック", correct: false, explanation: "チェックは誰も賭けていない時にパスするアクションです。この場面では選べません。" },
                { text: "フォールド", correct: false, explanation: "フォールドはゲームから降りること。プレッシャーをかけるのとは逆のアクションです。" }
            ]
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const explanationContainer = document.getElementById('quiz-explanation');
    const nextButton = document.getElementById('next-quiz-btn');

    let shuffledQuestions = [];
    let currentQuestionIndex = 0;

    function startQuiz() {
        // 問題をシャッフル
        shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        loadQuestion();
    }

    function loadQuestion() {
        // コンテナをクリア
        quizContainer.innerHTML = '';
        explanationContainer.innerHTML = '';
        nextButton.style.display = 'none';

        if (currentQuestionIndex >= shuffledQuestions.length) {
            quizContainer.innerHTML = '<p>全てのクイズが終了しました！お疲れ様です。</p>';
            return;
        }

        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        
        // 質問文を表示
        const questionElement = document.createElement('p');
        questionElement.textContent = currentQuestion.question;
        quizContainer.appendChild(questionElement);

        // 選択肢を表示
        const optionsList = document.createElement('div');
        optionsList.className = 'quiz-options';
        
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.className = 'option-btn';
            button.onclick = () => showExplanation(option, optionsList);
            optionsList.appendChild(button);
        });

        quizContainer.appendChild(optionsList);
    }

    function showExplanation(selectedOption, optionsList) {
        // 全てのボタンを無効化
        Array.from(optionsList.children).forEach(btn => {
            btn.disabled = true;
            // 正解の選択肢をハイライト
            const optionData = shuffledQuestions[currentQuestionIndex].options.find(o => o.text === btn.textContent);
            if(optionData.correct) {
                btn.classList.add('option-correct');
            }
        });

        // 選択したボタンに結果を表示
        const clickedButton = Array.from(optionsList.children).find(btn => btn.textContent === selectedOption.text);
        if (!selectedOption.correct) {
            clickedButton.classList.add('option-incorrect');
        }

        // 解説を表示
        explanationContainer.innerHTML = `<p>${selectedOption.explanation}</p>`;
        
        // 次へボタンを表示
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // クイズ開始
    startQuiz();
});