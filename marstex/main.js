function login() {
    new WinBox(
        {
            // configuration:
            index: 10,
            id: "marstex-login",
            root: document.body,
            class: ["no-full", "no-max", "matrix"],

            // appearance:
            title: "LOGIN",
            //background: "#000",
            border: 4,
            header: 45,
            icon: false,

            // initial state:
            modal: true,
            max: true,
            min: false,
            hidden: false,                        

            // dimension:
            width: "50%",
            height: "50%",

            // position:
            x: "center",
            y: "center",

            // viewport boundaries:
            top: 50,
            right: 50,
            bottom: 0,
            left: 50,

            // contents (choose from):
            url: false,
            mount: false,
            //html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/K5JSRGhB-nM?si=SZZDfQR9lb_8b6af&amp;controls=0;autoplay=1" title="NASA International Space Station" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;" allowfullscreen></iframe>'
            //html: '<iframe width="560" height="315"  src="https://mars.nasa.gov/multimedia/videos/movies/20210425_IngenuityThirdFlightMastcamZ/20210425_IngenuityThirdFlightMastcamZ-1280.m4v" type="video/mp4" class="fp-engine" autoplay="autoplay" preload="none" x-webkit-airplay="allow"></iframe>'
        }
    );
}
function stars () {
    const canvas = document.getElementById("canvas");
    const c = canvas.getContext("2d");

    let w;
    let h;

    const setCanvasExtents = () => {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();

    window.onresize = () => {
      setCanvasExtents();
    };

    const makeStars = count => {
      const out = [];
      for (let i = 0; i < count; i++) {
        const s = {
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000
        };
        out.push(s);
      }
      return out;
    };

    let stars = makeStars(10000);

    const clear = () => {
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    const putPixel = (x, y, brightness) => {
      const intensity = brightness * 255;
      const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
      c.fillStyle = rgb;
      c.fillRect(x, y, 1, 1);
    };

    const moveStars = distance => {
      const count = stars.length;
      for (var i = 0; i < count; i++) {
        const s = stars[i];
        s.z -= distance;
        while (s.z <= 1) {
          s.z += 1000;
        }
      }
    };

    let prevTime;
    const init = time => {
      prevTime = time;
      requestAnimationFrame(tick);
    };

    const tick = time => {
      let elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * 0.1);

      clear();

      const cx = w / 2;
      const cy = h / 2;

      const count = stars.length;
      for (var i = 0; i < count; i++) {
        const star = stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w || y < 0 || y >= h) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        putPixel(x, y, b);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(init);

}