document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const levelUpPopup = document.getElementById('level-up-popup');
    levelUpPopup.classList.add('hidden');

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
    const resetButton = document.getElementById('reset-button');
    const levelDisplay = document.getElementById('level');
    const titleDisplay = document.getElementById('title');
    const countDisplay = document.getElementById('count');
    const nextLevelDisplay = document.getElementById('next-level'); // 追加
    
    const playPronunciationButton = document.getElementById('play-pronunciation');
    const pronunciationAudio = document.getElementById('pronunciation-audio');

    playPronunciationButton.addEventListener('click', function() {

        // 再生開始時の処理
        pronunciationAudio.onplay = function() {
            console.log("再生開始");
            // ここに再生開始時の処理を追加
            // ボタンを無効化し、テキストを「再生中」に変更
            playPronunciationButton.disabled = true;
            playPronunciationButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 再生中...';
        };

        // 再生終了時の処理
        pronunciationAudio.onended = function() {
            console.log("再生終了");
            // ここに再生終了時の処理を追加
            playPronunciationButton.disabled = false;
            playPronunciationButton.innerHTML = '<i class="fas fa-play-circle"></i>発音を聞く';
        };
        pronunciationAudio.play();
    });


    let level = 1;
    let count = 0;
    let title = "くぅー見習い";
    let levelUpThreshold = 3; // レベルアップに必要な回数

    const kuuVariations = [
        "くぅー",
        "くぅ～～！",
        "クゥー…",
        "Ku-",
        "くううううう",
        "くぅっ！",
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
        "くぅーそのもの",
        "くぅー探検隊",
        "くぅー無限湧き",
        "くぅー最終形態",
        "くぅー・デ・オージャス",
        "くぅー警備隊長",
        "くぅー学概論教授",
        "くぅー is ライフ",
        "くぅーいただきました！",
        "くぅー year！",
        "くぅーしか勝たん",
        "くぅーの呼吸 壱ノ型",
        "くぅーに始まりくぅーに終わる",
        "くぅーで天下統一",
        "自走式くぅー",
        "くぅー型決戦兵器",
        "くぅーtime",
        "くぅーしか信じない",
        "くぅーの夢を見る",
        "今日もくぅー日和",
        "晩餐はくぅー",
        "くぅーダビデ像",
        "くぅービッグバン",
        "くぅーアルティメット",
        "くぅー・オブ・ジョイトイ",
        "くぅーこそ正義",
        "くぅーなる秩序",
        "くぅーリューション",
        "くぅーティスト",
        "くぅーニング",
        "くぅーカイザー",
        "くぅー将軍",
        "くぅー式アロマ",
        "くぅーミルフィーユ",
        "くぅーベルク",
        "くぅーバリア",
        "くぅーインパクト",
        "くぅーイノベーション",
        "くぅーエナジー",
        "くぅーマニアックス",
        "くぅーロマンス",
        "全知全能のくぅー",
        "くぅーとんきょう",
        "くぅーイズム",
        "くぅー！まかせんしゃい！",
        "くぅー食いねぇ！",
        "くぅー寝る！",
        "くぅー！許してヒヤシンス！",
        "くぅーは文化！",
        "くぅー！もはや意味不明！",
        "脳内くぅー再生マシーン",
        "くぅー言っときゃ何とかなる",
        "くぅー系YouTuber",
        "くぅーしか喋れない",
        "くぅー教教祖",
        "くぅーに全てを捧げた男",
        "くぅーの申し子",
        "くぅーって言いたいだけ",
        "くぅー！ふざけんな！",
        "くぅー！マジ卍！",
        "くぅーの権化",
        "くぅーしか愛せない",
        "くぅーチャンス！",
        "くぅー案件ください",
        "くぅー！それな！",
        "とりあえずくぅー",
        "くぅー！知らんけど！",
        "くぅー！うるせぇ！",
        "くぅーは裏切らない",
        "くぅー！おやすみプンプン！",
        "くぅー！エモい！",
        "くぅー！優勝！",
        "くぅー！草！",
        "くぅー！尊い！",
        //ここから追加
        "くぅー is GOD",
        "くぅーしか勝たん！【公式】",
        "くぅーで地球を救う",
        "くぅーの錬金術師",
        "くぅーデストロイヤー",
        "くぅー・ザ・ワールド",
        "くぅー・オブ・レジェンド",
        "くぅーファイナリスト",
        "くぅーインフルエンサー",
        "くぅーアドバイザー",
        "くぅーウォッチャー",
        "くぅーソウル",
        "くぅーメサイア",
        "くぅー・ターミネーター",
        "くぅーウェーブ",
        "くぅーエネルギー充填120%",
        "くぅーしか信じないbot",
        "くぅーで大草原",
        "くぅー！神ってる！",
        "くぅーで笑かす",
        "くぅーで一儲け",
        "くぅー！ワロタ",
        "くぅーしか言わないAI",
        "くぅーでフォースと共にあらんことを",
        "くぅーはエターナル",
        "くぅー・ジェダイマスター",
        "くぅー・シスの暗黒卿",
        "くぅーで意識高い系",
        "くぅーでバズる",
        "くぅーで一発逆転",
        "くぅーはジャスティス",
        "くぅーはロマン",
        "くぅーは永遠に不滅です！",
        "くぅーは芸術",
        "くぅーは飯テロ",
        "くぅーが足りない",
        "くぅーファースト",
        "くぅーしか目に入らない",
        "くぅーしか耳に入らない",
        "くぅーしか考えられない",
        "くぅー！それしか言えない！",
        "くぅー！もう限界！",
        "くぅー！助けて！",
        "くぅー！誰か止めて！",
        "くぅー！もうやめて！",
        "くぅー！勘弁して！",
        "くぅー！ごめんなさい！",
        "くぅー！許してください！",
        "くぅー！愛してる！",
        "くぅー！結婚して！",
        "くぅー！子供産んで！",
        "くぅー！養って！",
        "くぅー！貢ぎます！",
        "くぅー！ついていきます！",
        "くぅー！一生ついていきます！",
        "くぅー！マジ感謝！",
        "くぅー！神対応！",
        "くぅー！神！",
        "くぅー！マジ神！",
        "くぅー！仏！",
        "くぅー！マジ仏！",
        "くぅー！菩薩！",
        "くぅー！マジ菩薩！",
        "くぅー！天使！",
        "くぅー！マジ天使！",
        "くぅー！妖精！",
        "くぅー！マジ妖精！",
        "くぅー！女神！",
        "くぅー！マジ女神！",
        "くぅー！マジリスペクト！",
        "くぅー！マジリスペクトっす！",
        "くぅー！マジ卍解！",
        "くぅー！マジパネェ！",
        "くぅー！マジヤバくね！？",
        "くぅー！マジ神ってる！",
        "くぅー！マジ卍卍卍！",
        "くぅー！マジ卍しか勝たん！",
        "くぅー！マジ卍越えてレベチ！",
        "くぅー！マジでリスペクト案件！",
        "くぅー！マジで感謝しかない！",
        "くぅー！マジで神対応すぎて泣ける！",
        "くぅー！マジで神すぎて語彙力失う！",
        "くぅー！マジで生きる希望！",
        "くぅー！マジで生まれてきてよかった！",
        "くぅー！マジで出会えてよかった！",
        "くぅー！マジで感謝感激雨あられ！",
        "くぅー！マジで土下座案件！",
        "くぅー！マジで足を向けて寝れない！",
        "くぅー！マジで恩返ししたい！",
        "くぅー！マジで一生応援します！",
        "くぅー！マジで布教活動します！",
        "くぅー！マジで子々孫々まで語り継ぎます！",
        "くぅー！マジで国の宝！",
        "くぅー！マジで人類の希望！",
        "くぅー！マジで宇宙の真理！",
        "くぅー！マジでビッグバン！",
        "くぅー！マジで始まりの言葉！",
        "くぅー！マジで最後の言葉！",
        "くぅー！マジで永遠の愛！",
        "くぅー！マジでソウルメイト！",
        "くぅー！マジで運命の人！",
        "くぅー！マジで結婚してください！(再)",
        "くぅー！マジで愛してる！(再)",
        "くぅー！マジで尊死！",
        "くぅー！マジで語彙力崩壊！",
        "くぅー！マジで何もかもどうでもいい！",
        "くぅー！マジで人生勝ち組！",
        "くぅー！マジで世界平和！",
        "くぅー！マジでマジ卍！(完)"
    ];

    function updateDisplay() {
        levelDisplay.textContent = level;
        titleDisplay.textContent = title;
        countDisplay.textContent = count;
        nextLevelDisplay.textContent = levelUpThreshold - (count % levelUpThreshold); // 次のレベルまでの回数を計算
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
    
         // ポップアップのテキストを設定
        const levelUpMessage = document.getElementById('level-up-message');
        levelUpMessage.innerHTML = `レベルアップ！<br/>称号: ${title}`;

        // ポップアップを表示
        const levelUpPopup = document.getElementById('level-up-popup');
        levelUpPopup.classList.remove('hidden');
        levelUpPopup.classList.add('active');
        levelUpPopup.style.visibility = "visible";
        levelUpPopup.style.opacity = "1";
        levelUpPopup.style.animation = "popup-jump 0.5s ease-out";

        // アニメーションが終わった後に非表示にする
        setTimeout(() => {
            levelUpPopup.style.opacity = "0";
            levelUpPopup.style.visibility = "hidden";
            levelUpPopup.classList.remove('active');
        }, 1000); // 2秒後に非表示
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

    // 効果音を再生する関数（ランダム）
    function playRandomKuuSound() {
        const sound = document.getElementById('kuuSound');
        const sources = sound.getElementsByTagName('source');
        const randomIndex = Math.floor(Math.random() * sources.length);
        const randomSource = sources[randomIndex];

        // 新しいsourceをaudio要素に設定し、再生
        sound.src = randomSource.src;
        sound.load(); // 読み込み

        // 再生開始時の処理
        sound.onplay = function() {
            console.log("再生開始");
            // ここに再生開始時の処理を追加
            kuuButton.disabled = true;
            kuuButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>くぅー中...'
        };

        // 再生終了時の処理
        sound.onended = function() {
            console.log("再生終了");
            // ここに再生終了時の処理を追加
            kuuButton.disabled = false;
            kuuButton.innerHTML = 'くぅーする'
        };

        sound.play();  // 再生
    }

    // くぅーボタンがクリックされた時の処理
    kuuButton.addEventListener('click', function() {
        count++; // 連打数を増やす
        updateKuuText(); // くぅーテキストを更新

        if (count % levelUpThreshold === 0) { // 例: 10回クリックごとにレベルアップ
            levelUp(); // レベルアップ
        }

        updateDisplay(); // 表示を更新
        playRandomKuuSound(); // ランダムな効果音を再生

    });

    // リセットボタンがクリックされた時の処理
    resetButton.addEventListener('click', function() {
        if (confirm("リセットしますか？")) {
            level = 1; // レベルを初期化
            count = 0; // 連打数を初期化
            title = "くぅー見習い"; // 称号を初期化
            levelUpThreshold = 5; // レベルアップに必要な回数を初期化
            kuuVariations.length = 8; // 初期状態のバリエーションに戻す
            updateDisplay(); // 表示を更新
            kuuText.textContent = "くぅー"; // くぅーテキストを初期化
        }
    });

    updateDisplay(); // 初期表示
});