document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores de entrada
    const m = parseFloat(document.getElementById("mass").value);
    const c = parseFloat(document.getElementById("damping").value);
    const k = parseFloat(document.getElementById("spring").value);
    const T = parseFloat(document.getElementById("time").value);

    // Variables para el cálculo
    const dt = 0.1; // Intervalo de tiempo
    const steps = Math.floor(T / dt);
    const times = [];
    const positions = [];
    
    // Inicializar condiciones
    const A = 1; // Amplitud inicial
    const B = 0; // Velocidad inicial

    // Calcular el movimiento
    for (let i = 0; i <= steps; i++) {
        const t = i * dt;
        times.push(t);

        // Calcular la solución dependiendo del tipo de amortiguamiento
        let x;
        const discriminant = c * c - 4 * m * k;

        if (discriminant > 0) {
            // Sobreamortiguado
            const r1 = (-c + Math.sqrt(discriminant)) / (2 * m);
            const r2 = (-c - Math.sqrt(discriminant)) / (2 * m);
            x = (A * Math.exp(r1 * t)) + (B * Math.exp(r2 * t));
        } else if (discriminant === 0) {
            // Críticamente amortiguado
            const r = -c / (2 * m);
            x = (A + B * t) * Math.exp(r * t);
        } else {
            // Subamortiguado
            const omega = Math.sqrt(k / m);
            const alpha = -c / (2 * m);
            x = Math.exp(alpha * t) * (A * Math.cos(omega * t) + B * Math.sin(omega * t));
        }

        positions.push(x);
    }

    // Gráfico de resultados
    const ctx = document.getElementById("oscillationChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Desplazamiento (x)',
                data: positions,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Desplazamiento (m)'
                    }
                }
            }
        }
    });
});
