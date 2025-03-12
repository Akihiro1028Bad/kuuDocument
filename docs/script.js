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
});