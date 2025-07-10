<script>
  (function () {
    const head = document.head;

    // Load Poppins font
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    head.appendChild(font);

    // Load styles
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://starmencarnes.github.io/audience-analytics/style.css';
    head.appendChild(style);

    // Load main JS
    const script = document.createElement('script');
    script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
    script.defer = true;
    head.appendChild(script);
  })();
</script>
