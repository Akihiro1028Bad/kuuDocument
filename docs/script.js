document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');

    // ローディング画面を非表示
    setTimeout(() => {
        loadingScreen.classList.add('hidden');

        // フェードインアニメーション
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('fade-in');
            }, 200 * index);
        });

    }, 2500);

    // くぅーボタンの機能
    const kuuButton = document.getElementById('kuu-button');
    const kuuText = document.getElementById('kuu-text');
    const levelDisplay = document.getElementById('level');
    const titleDisplay = document.getElementById('title');
    const countDisplay = document.getElementById('count');
    const maxCountDisplay = document.getElementById('max-count');
    const resetButton = document.getElementById('reset-button');

    let level = 1;
    let count = 0;
    let maxCount = 0;
    let title = "くぅー見習い";

    const kuuVariations = [
        "くぅー",
        "くぅ～～！",
        "クゥー…",
        "Ku-",
        "くううううう",
        "くぅっ！",
        "くぅ～ん",
        "くぅ？",
    ];

    const titles = [
        "くぅー見習い",
        "駆け出しのくぅー",
        "くぅーマスター",
        "くぅーソムリエ",
        "くぅーエヴァンジェリスト",
        "くぅー仙人",
        "くぅー神",
        "くぅーエンペラー",
        "リビングレジェンドくぅー",
        "くぅーの化身",
        "歩くくぅー",
        "くぅーそのもの"
    ];

    function updateDisplay() {
        levelDisplay.textContent = level;
        titleDisplay.textContent = title;
        countDisplay.textContent = count;
        maxCountDisplay.textContent = maxCount;
    }

    function updateKuuText() {
        const randomIndex = Math.floor(Math.random() * kuuVariations.length);
        kuuText.textContent = kuuVariations[randomIndex];
    }

    function levelUp() {
        level++;
        if (level <= titles.length) {
            title = titles[level - 1];
        } else {
            title = "伝説のくぅー";
        }
        kuuVariations.push("New Kuu Variation Lv." + level); // 新しいバリエーションを追加（レベルに応じて）
    }

    kuuButton.addEventListener('click', function() {
        count++;
        updateKuuText();

        if (count > maxCount) {
            maxCount = count;
        }

        if (count % 10 === 0) { // 例: 10回クリックごとにレベルアップ
            levelUp();
        }

        updateDisplay();
    });

    resetButton.addEventListener('click', function() {
        if (confirm("リセットしますか？")) {
            level = 1;
            count = 0;
            maxCount = 0;
            title = "くぅー見習い";
            kuuVariations.length = 8;  // 初期状態のバリエーションに戻す
            updateDisplay();
            kuuText.textContent = "くぅー";
        }
    });

    updateDisplay(); // 初期表示
});