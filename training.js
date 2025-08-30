document.addEventListener('DOMContentLoaded', function() {
    const trainingScenarios = [
        // (シナリオデータは前回と同じ)
        {
            situation: 'あなたは2人のプレイヤーと対戦中。フロップが開かれました。あなたの手札はペアで、さらにフラッシュになる可能性も高いです。相手の一人がベットしてきました。あなたはどうする？',
            myHand: ['A♠', '8♠'],
            board: ['K♠', 'J♠', '2♦'],
            options: [
                { move: 'コール', explanation: '良い選択です。ポットに残って次のカードを見にいく価値は十分にあります。フラッシュが完成すれば非常に強い役になります。' },
                { move: 'レイズ', explanation: 'セミブラフとして強力な選択肢です。相手を今すぐ降ろさせる可能性があります。もしコールされても、スペードが出れば勝てる見込みが高いです。' },
                { move: 'フォールド', explanation: 'この状況でフォールドはもったいないでしょう。勝てる可能性が複数残されている強い手です。' }
            ]
        },
        {
            situation: '最後の1対1。あなたは最高の役、フルハウスを完成させました。相手が大きくベットしてきました。あなたはどうする？',
            myHand: ['A♥', 'A♦'],
            board: ['A♣', 'K♠', 'K♥', '5♦', '2♣'],
            options: [
                { move: 'フォールド', explanation: '絶対にありえません！これはナッツ（現状最強）の役です。最大限の利益を狙うべきです。' },
                { move: 'コール', explanation: '安全な手ですが、もっと利益を最大化できたかもしれません。相手がさらに強い役（フォーカードなど）を持っている可能性がゼロでない限り、レイズが最適です。' },
                { move: 'レイズ', explanation: '素晴らしい選択です！最強の手を持っているので、相手から最大限のチップを引き出すためにレイズ（オールインも含む）すべきです。' }
            ]
        }
        // ... 他のシナリオをここに追加 ...
    ];

    // (各要素の取得は前回と同じ)
    const situationText = document.getElementById('situation-text');
    const myHandContainer = document.getElementById('my-hand');
    const boardContainer = document.getElementById('board-cards');
    const optionsContainer = document.getElementById('action-options');
    const explanationBox = document.getElementById('explanation-box');
    const nextButton = document.getElementById('next-scenario-btn');

    // ...

    let shuffledScenarios = [];
    let currentScenarioIndex = 0;

    function createCardHTML(cardString) {
        const suitMap = { '♠': 'spade', '♥': 'heart', '♦': 'diamond', '♣': 'club' };
        const suitChar = cardString.slice(-1);
        const rank = cardString.slice(0, -1);
        return `<div class="card ${suitMap[suitChar]}"><span>${rank}</span><span class="suit">${suitChar}</span></div>`;
    }


    function loadScenario() {
        explanationBox.style.display = 'none';

        if (currentScenarioIndex >= shuffledScenarios.length) {
            situationText.innerHTML = "全てのトレーニングが終了しました！";
            myHandContainer.innerHTML = '';
            boardContainer.innerHTML = '';
            optionsContainer.innerHTML = '';
            return;
        }

        const scenario = shuffledScenarios[currentScenarioIndex];

        situationText.innerHTML = `<p>${scenario.situation}</p>`;
        myHandContainer.innerHTML = scenario.myHand.map(createCardHTML).join('');
        boardContainer.innerHTML = scenario.board.map(createCardHTML).join('');
        
        optionsContainer.innerHTML = '';
        scenario.options.forEach(opt => {
            const button = document.createElement('button');
            button.textContent = opt.move;
            button.onclick = () => {
                explanationBox.innerHTML = `<p><strong>${opt.move}を選んだあなたへ：</strong> ${opt.explanation}</p>`;
                explanationBox.style.display = 'block';
            };
            optionsContainer.appendChild(button);
        });
    }

    nextButton.addEventListener('click', () => {
        currentScenarioIndex++;
        loadScenario();
    });

    // ★★★ 変更点：最初にシナリオをシャッフルする ★★★
    shuffledScenarios = [...trainingScenarios].sort(() => Math.random() - 0.5);
    loadScenario(); // 最初のシナリオを読み込む
});