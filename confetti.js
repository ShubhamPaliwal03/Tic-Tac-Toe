var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

document.getElementById('confetti-button')
    .addEventListener('click', () => {

        // 1.

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

        // 2.

        // var end = Date.now() + (15 * 250);

        // var colors = ['#ffd700', '#c0c0c0'];

        // // var colors = ['#e6a12b', '#31e4cd'];

        // // var colors = ['#0007fff', '#ff1493'];

        // (function frame() {
        //     confetti({
        //         particleCount: 2,
        //         angle: 60,
        //         spread: 55,
        //         origin: { x: 0 },
        //         colors: colors
        //     });
        //     confetti({
        //         particleCount: 2,
        //         angle: 120,
        //         spread: 55,
        //         origin: { x: 1 },
        //         colors: colors
        //     }
        // );

        // if (Date.now() < end) {
        //     requestAnimationFrame(frame);
        // }
        // }());
    });