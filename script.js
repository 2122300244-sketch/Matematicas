// --- NAVEGACIÓN ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.navbar button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// --- CALCULADORA ---
let disp = document.getElementById('calc-display');
function cAdd(v) { disp.value === '0' ? disp.value = v : disp.value += v; }
function cClear() { disp.value = '0'; }
function cBack() { disp.value = disp.value.slice(0, -1) || '0'; }
function cFunc(f) { try { disp.value = eval(f + "(" + eval(disp.value) + ")").toFixed(4); } catch(e) { disp.value = "Error"; } }
function cEval() { try { disp.value = eval(disp.value.replace('×', '*').replace('÷', '/')); } catch(e) { disp.value = "Error"; } }

// --- MOTOR DEL QUIZZ ---
const questionsBank = {
    ed: [
        {q: "¿Factor integrante de y' + Py = Q?", a: ["e^∫Pdx", "∫Pdx", "e^P", "ln P"], c: 0},
        {q: "¿Orden de y'' + y = 0?", a: ["1", "2", "3", "4"], c: 1}
        // ... Agrega las otras 8 aquí
    ],
    laplace: [
        {q: "L{1} es:", a: ["1/s", "s", "1", "1/s^2"], c: 0},
        {q: "L{e^at} es:", a: ["1/(s-a)", "1/(s+a)", "s", "a"], c: 0}
        // ... Agrega las otras 8 aquí
    ],
    euler: [
        {q: "¿Qué es h en Euler?", a: ["Paso", "Error", "Altura", "Constante"], c: 0},
        {q: "Fórmula de Euler: y_n+1 = y_n +", a: ["h*f(x,y)", "f(x,y)", "h", "y/h"], c: 0}
        // ... Agrega las otras 8 aquí
    ]
};

let currentSet = [], qIdx = 0, scoreOk = 0, scoreErr = 0;

function initQuiz(tema) {
    currentSet = [...questionsBank[tema]].sort(() => Math.random() - 0.5);
    qIdx = 0; scoreOk = 0; scoreErr = 0;
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-body').style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    if(qIdx >= 10 || qIdx >= currentSet.length) return finishQuiz();
    const d = currentSet[qIdx];
    document.getElementById('q-idx').innerText = qIdx + 1;
    document.getElementById('q-ok').innerText = scoreOk;
    document.getElementById('q-text').innerText = d.q;
    
    const opts = document.getElementById('q-options');
    opts.innerHTML = "";
    d.a.forEach((item, i) => {
        const b = document.createElement('button');
        b.className = "option-btn";
        b.innerText = item;
        b.onclick = () => {
            if(i === d.c) scoreOk++; else scoreErr++;
            qIdx++;
            renderQuestion();
        };
        opts.appendChild(b);
    });
}

function finishQuiz() {
    document.getElementById('quiz-body').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    const p = (scoreOk/10)*100;
    document.getElementById('res-score').innerText = p + "%";
    document.getElementById('res-title').innerText = p >= 70 ? "¡Felicidades!" : "Sigue intentando";
}

function exitQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'block';
}