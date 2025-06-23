let grafico;

function calcular() {
  const p = parseFloat(document.getElementById("p").value);
  const rho = parseFloat(document.getElementById("rho").value);
  const v = parseFloat(document.getElementById("v").value);
  const g = parseFloat(document.getElementById("g").value);
  const h = parseFloat(document.getElementById("h").value);

  const datos = { p, rho, v, g, h };
  const vacios = Object.entries(datos).filter(([_, val]) => isNaN(val));

  if (vacios.length !== 1) {
    alert("Debe haber solo un campo vacío para calcular.");
    return;
  }

  const faltante = vacios[0][0];
  const energia = 
    (isNaN(p) ? 0 : p) +
    (isNaN(rho) || isNaN(v) ? 0 : 0.5 * rho * v ** 2) +
    (isNaN(rho) || isNaN(g) || isNaN(h) ? 0 : rho * g * h);

  let resultado = 0;
  switch (faltante) {
    case "p":
      resultado = energia - (0.5 * rho * v ** 2) - (rho * g * h);
      break;
    case "rho":
      resultado = p / (0.5 * v ** 2 + g * h);
      break;
    case "v":
      resultado = Math.sqrt((2 * (energia - p - rho * g * h)) / rho);
      break;
    case "g":
      resultado = (energia - p - 0.5 * rho * v ** 2) / (rho * h);
      break;
    case "h":
      resultado = (energia - p - 0.5 * rho * v ** 2) / (rho * g);
      break;
  }

  alert(`El valor de ${faltante} es: ${resultado.toFixed(2)}`);
  datos[faltante] = resultado;

  actualizarGrafico(datos);
}

function actualizarGrafico(valores) {
  const ctx = document.getElementById("grafico").getContext("2d");
  if (grafico) grafico.destroy();
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['P', 'ρ', 'v', 'g', 'h'],
      datasets: [{
        label: 'Valores Bernoulli',
        data: [valores.p, valores.rho, valores.v, valores.g, valores.h],
        backgroundColor: '#007BFF'
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

function limpiarGrafico() {
  if (grafico) grafico.destroy();
}
document.getElementsByTagName("h1")[0].style.fontSize = "6vw";