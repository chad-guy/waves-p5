let sketch = function (p) {
  const colorPalette = [
    [79, 70, 229], // indigo-600
    [219, 39, 119], // fuchsia-600
    [248, 113, 113], // rose-400
  ];

  // Variables para las ondas
  let time = 0;
  let numWaves = 8;
  let colors = [...colorPalette];

  p.setup = function () {
    // Crear canvas que se ajuste al contenedor
    let canvas = p.createCanvas(p.windowWidth, (p.windowWidth * 9) / 16);
    canvas.parent("canvasContainer");

    // Configuración inicial
    p.colorMode(p.RGB);
    p.background(0);
    p.noFill();
    p.strokeWeight(1.5);
  };

  p.draw = function () {
    // Fondo negro sólido en cada frame para eliminar rastros
    p.background(0);

    // Obtener posición relativa del mouse
    let mouseXRatio = p.constrain(p.mouseX / p.width, 0, 1);
    let mouseYRatio = p.constrain(p.mouseY / p.height, 0, 1);

    // Dibujar múltiples ondas
    for (let i = 0; i < numWaves; i++) {
      let color = colors[i % colors.length];

      // Amplitud basada en la posición vertical del mouse
      // Más abajo = ondas más amplias
      let amplitude = p.map(mouseYRatio, 0, 1, 5, 80);

      // Frecuencia basada en la posición horizontal del mouse
      // Más a la derecha = ondas más frecuentes
      let frequency = p.map(mouseXRatio, 0, 1, 0.0005, 0.003);

      // Fase relativa a la posición de la onda
      let phase = (i * p.PI) / (numWaves - 1);

      // Dibujar la onda actual
      drawWave(color, amplitude, frequency, phase, i);
    }

    // Incrementar tiempo para animación
    time += 0.02;
  };

  // Función para dibujar una onda compleja con armónicos
  function drawWave(color, amplitude, frequency, phase, index) {
    // Establecer color y grosor de trazo
    p.stroke(color[0], color[1], color[2], 200);
    p.strokeWeight(1.5 + index * 0.3);

    p.beginShape();
    // Usar menos puntos para mejor rendimiento - incremento de 10 en x
    for (let x = 0; x < p.width; x += 10) {
      // Línea base en el centro del canvas
      let y = p.height / 2;

      // Onda principal
      y += p.sin(x * frequency + time + phase) * amplitude;

      // Primera armónica (doble frecuencia, menor amplitud)
      y += p.sin(x * frequency * 2 + time * 1.2 + phase) * (amplitude * 0.2);

      // Segunda armónica (triple frecuencia, amplitud aún menor)
      y += p.sin(x * frequency * 3 + time * 0.7 + phase) * (amplitude * 0.1);

      // Distribuir verticalmente las ondas
      y += (index - (numWaves - 1) / 2) * 40;

      p.vertex(x, y);
    }
    p.endShape();
  }

  // Redimensionar canvas cuando cambia el tamaño de la ventana
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, (p.windowWidth * 9) / 16);
  };

  // Cambiar esquema de colores al hacer clic
  p.mouseClicked = function () {
    // Rotar los colores
    colors.push(colors.shift());
  };
};

// Init
new p5(sketch);
