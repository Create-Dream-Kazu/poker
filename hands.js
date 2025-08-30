document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
    // --- 強い役から ---
    { hand: ['A♣', 'K♣', 'Q♣', 'J♣', '10♣'], answer: 'ロイヤルフラッシュ' },
    { hand: ['9♥', '8♥', '7♥', '6♥', '5♥'], answer: 'ストレートフラッシュ' },
    { hand: ['4♠', '4♥', '4♦', '4♣', 'J♠'], answer: 'フォーカード' },
    { hand: ['Q♠', 'Q♦', 'Q♣', '9♥', '9♦'], answer: 'フルハウス' },

    // --- ミドルレンジ ---
    { hand: ['K♦', 'J♦', '9♦', '6♦', '3♦'], answer: 'フラッシュ' },
    { hand: ['K♠', 'Q♥', 'J♦', '10♣', '9♠'], answer: 'ストレート' },
    { hand: ['6♣', '6♦', '6♠', 'A♥', '3♣'], answer: 'スリーカード' },
    { hand: ['10♠', '10♦', '4♠', '4♣', 'A♣'], answer: 'ツーペア' },
    { hand: ['8♥', '8♠', 'K♦', '7♣', '2♦'], answer: 'ワンペア' },

    // --- 一番弱い ---
    { hand: ['K♠', 'J♥', '8♦', '5♣', '2♣'], answer: 'ハイカード（ブタ）' },

    // --- 追加バリエーション ---
    { hand: ['5♠', '4♠', '3♠', '2♠', 'A♠'], answer: 'ストレートフラッシュ（A-5）' },
    { hand: ['J♣', 'J♦', 'J♥', 'J♠', '2♣'], answer: 'フォーカード' },
    { hand: ['8♠', '8♥', '8♦', 'K♣', 'K♦'], answer: 'フルハウス' },
    { hand: ['A♥', 'J♥', '9♥', '6♥', '3♥'], answer: 'フラッシュ' },
    { hand: ['5♣', '6♦', '7♠', '8♥', '9♣'], answer: 'ストレート' },
    { hand: ['2♠', '2♦', '2♥', 'Q♣', '7♣'], answer: 'スリーカード' },
    { hand: ['A♠', 'A♦', '5♠', '5♦', '9♥'], answer: 'ツーペア' },
    { hand: ['K♠', 'K♥', '10♦', '7♣', '3♠'], answer: 'ワンペア' },
    { hand: ['Q♠', '10♦', '7♥', '5♠', '3♦'], answer: 'ハイカード（ブタ）' },

    // --- 比較問題 ---
    { 
        compare: [
            ['A♠', 'A♥', 'A♦', '2♣', '2♠'], 
            ['K♠', 'K♥', 'K♦', 'J♣', 'J♠']
        ], 
        answer: 'AAA22（フルハウス）が強い' 
    },
    { 
        compare: [
            ['Q♠', 'Q♥', 'Q♦', 'Q♣', '2♠'], 
            ['J♠', 'J♥', 'J♦', 'J♣', '9♥']
        ], 
        answer: 'QQQQ2（フォーカード）が強い' 
    },
    { 
        compare: [
            ['10♠', '9♠', '8♠', '7♠', '6♠'], 
            ['8♥', '7♥', '6♥', '5♥', '4♥']
        ], 
        answer: '10♠9♠8♠7♠6♠（ストレートフラッシュ）が強い' 
    },
    { 
        compare: [
            ['A♠', 'K♠', '8♠', '5♠', '3♠'], 
            ['K♥', 'Q♥', '9♥', '6♥', '2♥']
        ], 
        answer: 'A♠K♠8♠5♠3♠（フラッシュ）が強い' 
    },
    { 
        compare: [
            ['A♠', 'K♥', 'Q♦', 'J♣', '10♠'], 
            ['9♠', '8♥', '7♦', '6♣', '5♠']
        ], 
        answer: 'A♠K♥Q♦J♣10♠（ストレート）が強い' 
    },
    { 
        compare: [
            ['9♣', '9♦', '9♥', '9♠', 'A♣'], 
            ['8♣', '8♦', '8♥', '8♠', 'K♦']
        ], 
        answer: '9999A（フォーカード）が強い'
    },
    { 
        compare: [
            ['J♣', 'J♦', 'J♥', '7♣', '7♦'], 
            ['10♠', '10♥', '10♦', 'K♣', 'K♥']
        ], 
        answer: 'KKK10（フルハウス）が強い'
    },
    { 
        compare: [
            ['7♠', '6♠', '5♠', '4♠', '3♠'], 
            ['6♦', '5♦', '4♦', '3♦', '2♦']
        ], 
        answer: '76543（ストレートフラッシュ）が強い'
    },
    { 
        compare: [
            ['A♣', 'Q♣', '9♣', '6♣', '4♣'], 
            ['A♦', 'J♦', '10♦', '7♦', '5♦']
        ], 
        answer: 'AQ964クラブ（フラッシュ）が強い'
    },
    { 
        compare: [
            ['Q♠', 'J♥', '10♦', '9♣', '8♠'], 
            ['8♠', '7♥', '6♦', '5♣', '4♠']
        ], 
        answer: 'QJ1098（ストレート）が強い'
    },

    // --- 順位付け比較問題 ---
    { 
        rankCompare: [
            ['A♠', 'A♥', 'K♦', 'K♣', '2♠'], // ツーペア（AAとKK）
            ['Q♠', 'Q♥', 'Q♦', '8♣', '3♠'], // スリーカード（QQQ）
            ['J♣', 'J♦', '9♥', '9♠', '5♣']  // ツーペア（JJと99）
        ], 
        answer: 'QQQ83（スリーカード） > AA KK2（ツーペア） > JJ99 5（ツーペア）'
    },
    { 
        rankCompare: [
            ['10♣', '9♣', '8♣', '7♣', '6♣'], // ストレートフラッシュ
            ['K♠', 'K♥', 'K♦', 'K♣', '3♠'], // フォーカード
            ['A♥', 'A♦', 'A♣', '10♠', '10♦'] // フルハウス
        ], 
        answer: '10～6クラブ（ストレートフラッシュ） > KKKK3（フォーカード） > AAA1010（フルハウス）'
    },
    { 
        rankCompare: [
            ['A♠', 'K♠', '9♠', '6♠', '2♠'], // フラッシュ（Aハイ）
            ['K♥', 'Q♥', 'J♥', '8♥', '7♥'], // フラッシュ（Kハイ）
            ['Q♦', 'J♦', '10♦', '9♦', '8♦'] // ストレートフラッシュ
        ], 
        answer: 'Q～8ダイヤ（ストレートフラッシュ） > Aハイ♠フラッシュ > Kハイ♥フラッシュ'
    }

];

    const allOptions = ['ロイヤルフラッシュ', 'ストレートフラッシュ', 'フォーカード', 'フルハウス', 'フラッシュ', 'ストレート', 'スリーカード', 'ツーペア', 'ワンペア', 'ハイカード（ブタ）'];

    const quizDisplay = document.getElementById('quiz-display');
    const optionsContainer = document.getElementById('quiz-options');
    const submitButton = document.getElementById('quiz-submit-btn');
    const resultContainer = document.getElementById('quiz-result');

    let currentCorrectAnswer = '';

    function createCardHTML(cardString) {
        const suitMap = { '♠': 'spade', '♥': 'heart', '♦': 'diamond', '♣': 'club' };
        const suitChar = cardString.slice(-1);
        const rank = cardString.slice(0, -1);
        return `<div class="card ${suitMap[suitChar]}"><span>${rank}</span><span class="suit">${suitChar}</span></div>`;
    }

    function generateQuiz() {
        // クイズデータをシャッフルしてランダムな問題を選ぶ
        const shuffledQuiz = [...quizData].sort(() => Math.random() - 0.5);
        const currentQuestion = shuffledQuiz[0];
        currentCorrectAnswer = currentQuestion.answer;

        // カードを表示
        quizDisplay.innerHTML = `<div class="hand">${currentQuestion.hand.map(createCardHTML).join('')}</div>`;

        // 選択肢を生成（正解 + ダミー3つ）
        let options = [currentCorrectAnswer];
        let dummyOptions = allOptions.filter(opt => opt !== currentCorrectAnswer);
        dummyOptions.sort(() => Math.random() - 0.5);
        options = options.concat(dummyOptions.slice(0, 3));
        options.sort(() => Math.random() - 0.5); // 選択肢自体もシャッフル

        // 選択肢のラジオボタンを表示
        optionsContainer.innerHTML = options.map(opt => `
            <label>
                <input type="radio" name="quiz-option" value="${opt}"> ${opt}
            </label>
        `).join('');
        
        resultContainer.style.display = 'none';
    }

    function showResults() {
        const userAnswer = document.querySelector('input[name="quiz-option"]:checked');
        if (!userAnswer) {
            alert('選択肢を選んでください。');
            return;
        }

        if (userAnswer.value === currentCorrectAnswer) {
            resultContainer.textContent = '正解！素晴らしい！';
            resultContainer.className = 'correct';
        } else {
            resultContainer.textContent = `残念！正解は「${currentCorrectAnswer}」でした。もう一度挑戦してみよう！`;
            resultContainer.className = 'incorrect';
        }
        resultContainer.style.display = 'block';
        
        // 2秒後に次の問題へ
        setTimeout(generateQuiz, 2000);
    }

    submitButton.addEventListener('click', showResults);
    generateQuiz(); // ページ読み込み時に最初のクイズを生成
});