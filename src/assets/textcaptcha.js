class captcha {
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(options) {
    this.options.stringLength = options.stringLength;
    this.options.lineNoise = options.lineNoise;
    this.options.dotNoise = options.dotNoise;
  }

  draw() {
    const canvasCreator = new helper(this.options);
    canvasCreator.prepareCanvas();
    canvasCreator.lineNoiseGenerator();
    canvasCreator.dotNoiseGenerator();
    const dataImage = canvasCreator.convertCanvasToImage();
    const code = canvasCreator.captcha;
    return { code: code, imageData: dataImage };
  }
}

class helper {
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  hexColor = '0123456789abcdef';
  captcha = null;
  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(options) {
    this.options.stringLength = options.stringLength;
    this.options.lineNoise = options.lineNoise;
    this.options.dotNoise = options.dotNoise;
  }

  generateStringForCaptcha(length = 6) {
    let index = null;
    let captchaString = '';
    for (let i = 0; i < length; i++) {
      index = Math.floor(Math.random() * (this.letters.length - 1));
      captchaString += this.letters.charAt(index);
    }
    return captchaString;
  }

  colorGenerator() {
    let index = null;
    let color = '#';
    for (let i = 0; i < 6; i++) {
      index = Math.floor(Math.random() * (this.hexColor.length - 1));
      color += this.hexColor.charAt(index);
    }

    return color;
  }

  lineNoiseGenerator(length = 25) {
    for (let i = 0; i < length; i++) {
      this.context.beginPath();
      this.context.moveTo(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
      );
      this.context.lineTo(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
      );
      this.context.strokeStyle = this.colorGenerator();
      this.context.lineWidth = 2;
      this.context.stroke();
    }
  }

  dotNoiseGenerator(length = 150) {
    for (let i = 0; i < length; i++) {
      this.context.fillStyle = this.colorGenerator();
      this.context.fillRect(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
        5,
        5,
      );
    }
  }

  convertCanvasToImage() {
    let base64StringImage = this.canvas.toDataURL();
    return base64StringImage;
  }

  prepareCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.canvas.style.border = "1px solid black";
    // this.canvas.style.width = "150px";
    // this.canvas.style.backgroundColor = this.colorGenerator();

    this.context.font = 'italic 75px Arial';
    this.context.fillStyle = this.colorGenerator();

    this.captcha = this.generateStringForCaptcha();
    this.context.fillText(this.captcha, 0, 100);
  }
}

function generateCaptcha() {
  const captcha = new captcha({
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  });

  return captcha.draw();
}
// let completed = false;
// if (!completed) {
//   updateCaptcha();
// }

// function updateCaptcha() {
//   // let code = document.getElementById("p");
//   let newCaptcha = generateCaptcha();
//   let data = newCaptcha.draw();
//   let captchaContainer = document.getElementById('captcha');
//   captchaContainer.src = data.imageData;
//   // code.textContent = data.code;
//   return data;
// }

// let data = updateCaptcha();
// let refresh = document.getElementById('refresh');
// refresh.addEventListener('click', update);

// function update() {
//   window.location.reload();
// }

// let input = document.getElementById('input');

// const inputForm = document.getElementById('form');
// inputForm.addEventListener('submit', onsubmit);

// const button = document.getElementById('submit');
// button.addEventListener('click', onsubmit);

// function onsubmit(event) {
//   event.preventDefault();
//   let userValue = input.value.toLowerCase();
//   if (userValue == data.code.toLowerCase()) {
//     console.log('you did it!');
//     completed = true;
//     congrats.style.opacity = 1;
//   } else {
//     completed = false;
//     congrats.textContent = 'WRONG!';
//     congrats.style.opacity = 1;
//     console.log('wrong');

//     updateCaptcha();
//   }
// }

// let congrats = document.getElementById('congrats');
// congrats.style.opacity = 0;
