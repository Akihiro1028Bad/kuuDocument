// ページの対話要素
document.addEventListener('DOMContentLoaded', function() {
    const kuuText = document.getElementById('kuuText');
    const pronounceButton = document.getElementById('pronounceButton');
    const kuuUsageSection = document.getElementById('kuuUsage');

    //kuuText.style.animation = 'breathe 1.5s infinite ease-in-out';

    pronounceButton.addEventListener('click', function() {
        // すでにアニメーションが適用されていた場合、一旦削除して再適用
        kuuText.classList.remove('color-change');
        void kuuText.offsetWidth; // ← これでリセットを強制する
    
        // くぅーのテキスト変化
        kuuText.textContent = "くぅー！";
        
        // 複数のアニメーションを順番に適用
        kuuText.classList.add('color-change')

        setTimeout(() => {
            kuuText.classList.remove('color-change');
            kuuText.textContent = "くぅー";
        }, 3000);

    });
    
    // 使用カテゴリーの動的作成
    const usageCategories = [
        { icon: '🍺', label: 'リラックス', situations: ['温泉', 'コーヒー', 'ビール'] },
        { icon: '🌟', label: '感動', situations: ['絶景', 'スポーツ', '発明'] },
        { icon: '📢', label: '表現', situations: ['単独', '強調', 'フォーマル'] }
    ];
    
    // 使用カテゴリーを動的に作成
    let categoryHtml = `<h2>くぅーの使用場面</h2><div class="category-section">`;
    
    usageCategories.forEach(category => {
        categoryHtml += `
        <div class="section category-card">
            <div class="category-icon">${category.icon}</div>
            <h3>${category.label}</h3>
            <div style="margin-top: 0.5rem;">
                ${category.situations.map(sit => `<span class="tag">${sit}</span>`).join('')}
            </div>
        </div>`;
    });
    
    categoryHtml += `</div>`;
    kuuUsageSection.innerHTML = categoryHtml;
    
    // 例文の対話性を追加
    const examples = document.querySelectorAll('.example');
    examples.forEach(example => {
        example.addEventListener('click', function() {
            this.style.backgroundColor = '#e6f7ff';
            setTimeout(() => {
                // var(--light-bg)を使用する代わりに計算されたスタイル値を取得
                const lightBg = getComputedStyle(document.documentElement).getPropertyValue('--light-bg');
                this.style.backgroundColor = lightBg;
            }, 300);
        });
    });
    
    // ナビゲーションのスムーズスクロール
    const scrollToElements = document.querySelectorAll('a[href^="#"]');
    scrollToElements.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});