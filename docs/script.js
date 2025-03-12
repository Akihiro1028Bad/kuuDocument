document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');

    // ローディング画面を非表示にする
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
         // Intersection Observer APIを使ってセクションをフェードイン
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // 一度表示されたら監視を停止
                }
            });
        }, {
            threshold: 0.2 // 20% 表示されたら
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }, 2000); // アニメーションが終わる時間に合わせる

});