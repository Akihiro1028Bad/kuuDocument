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

    // パーティクル用Canvasの作成と初期化
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    kuuButton.parentNode.insertBefore(canvas, kuuButton); // kuuButtonの前にcanvasを挿入
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = kuuButton.offsetWidth;
        canvas.height = kuuButton.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = kuuButton.offsetTop + 'px';
        canvas.style.left = kuuButton.offsetLeft + 'px';
        canvas.style.pointerEvents = 'none'; // Canvasがクリックイベントを邪魔しないように
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // 初期化時に一度実行

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 360}, 50%, 50%)`; // カラフルな色
            this.life = 100; // パーティクルの寿命
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--; // 寿命を減らす
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    let particlesArray = [];

    function createParticles() {
        for (let i = 0; i < 20; i++) {
            particlesArray.push(new Particle(kuuButton.offsetWidth / 2, kuuButton.offsetHeight / 2));
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            if (particlesArray[i].life <= 0) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // バイブレーション機能の確認
    function vibrate() {
        if (navigator.vibrate) {
            navigator.vibrate(50); // 50ミリ秒バイブレーション
        }
    }

    // くぅーボタンがクリックされた時の処理
    kuuButton.addEventListener('click', function() {
        count++; // 連打数を増やす
        updateKuuText(); // くぅーテキストを更新

        if (count > maxCount) {
            maxCount = count; // 最高連打数を更新
        }

        if (count % 10 === 0) { // 例: 10回クリックごとにレベルアップ
            levelUp(); // レベルアップ
        }

        updateDisplay(); // 表示を更新

        // パーティクル生成
        createParticles();

        vibrate(); // バイブレーション
    });

    // リセットボタンがクリックされた時の処理
    resetButton.addEventListener('click', function() {
        if (confirm("リセットしますか？")) {
            level = 1; // レベルを初期化
            count = 0; // 連打数を初期化
            maxCount = 0; // 最高連打数を初期化
            title = "くぅー見習い"; // 称号を初期化
            kuuVariations.length = 8; // 初期状態のバリエーションに戻す
            updateDisplay(); // 表示を更新
            kuuText.textContent = "くぅー"; // くぅーテキストを初期化
        }

        vibrate(); // バイブレーション
    });

    function updateDisplay() {
        levelDisplay.textContent = level;
        titleDisplay.textContent = title;
        countDisplay.textContent = count;
        maxCountDisplay.textContent = maxCount;

        // レベルアップアニメーションの適用
        levelDisplay.classList.add('level-up-animation');
        titleDisplay.classList.add('level-up-animation');
        setTimeout(() => {
            levelDisplay.classList.remove('level-up-animation');
            titleDisplay.classList.remove('level-up-animation');
        }, 500);
    }

    updateDisplay(); // 初期表示
});