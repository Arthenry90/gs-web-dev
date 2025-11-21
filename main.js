let habilidades = [];

// Inicializa os eventos assim que a página carrega
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("futureSkillsForm");
    const btnAddHabilidade = document.getElementById("btnAddHabilidade");

    btnAddHabilidade.addEventListener("click", adicionarHabilidade);
    form.addEventListener("submit", validarFormulario);
});

// Adiciona a skill no array e atualiza a lista visual (HTML)
function adicionarHabilidade() {
    const input = document.getElementById("habilidadeInput");
    const habilidadeTexto = input.value.trim();
    const listaUI = document.getElementById("listaHabilidades");

    if (habilidadeTexto !== "") {
        habilidades.push(habilidadeTexto);
        const li = document.createElement("li");
        li.textContent = habilidadeTexto;
        listaUI.appendChild(li);
        input.value = "";
        input.focus();
    }
}

// Valida todos os campos obrigatórios e regras de negócio
function validarFormulario(event) {
    event.preventDefault(); // Evita o refresh da página
    let vetorErros = [];

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const interesseRadio = document.querySelector('input[name="interesse"]:checked');

    // Verificações básicas
    if (nome === "") {
        vetorErros.push("O campo 'Nome Completo' é obrigatório.");
    }

    const erroCpf = checarCPF(cpf);
    if (erroCpf) vetorErros.push(erroCpf);

    const erroEmail = checarEmail(email);
    if (erroEmail) vetorErros.push(erroEmail);

    if (!interesseRadio) {
        vetorErros.push("Selecione um 'Tipo de Interesse'.");
    }

    if (habilidades.length < 3) {
        vetorErros.push("Adicione pelo menos 3 habilidades à lista.");
    }

    // Define se mostra erros ou sucesso
    if (vetorErros.length > 0) {
        exibirFeedback(vetorErros, 'erro');
    } else {
        const interesseValor = interesseRadio.value;
        const resumoSucesso = [
            `Inscrição realizada com sucesso!`,
            `<strong>Nome:</strong> ${nome}`,
            `<strong>E-mail:</strong> ${email}`,
            `<strong>CPF:</strong> ${cpf}`,
            `<strong>Interesse:</strong> ${interesseValor}`,
            `<strong>Habilidades:</strong> ${habilidades.join(", ")}`
        ];

        exibirFeedback(resumoSucesso, 'sucesso');
    }
}

// Verifica formato e repetição de dígitos no CPF
function checarCPF(cpf) {
    if (cpf === "") return "O campo 'CPF' é obrigatório.";

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) return "CPF inválido. Deve conter 11 dígitos.";
    if (/^(\d)\1+$/.test(cpfLimpo)) return "CPF inválido (dígitos repetidos).";

    return null;
}

// Valida o formato do e-mail via Regex
function checarEmail(email) {
    if (email === "") return "O campo 'E-mail' é obrigatório.";

    const emailNormalizado = email.toLowerCase();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailNormalizado)) {
        return "Formato de e-mail inválido (deve conter '@' e '.').";
    }

    return null;
}

// Manipula o DOM para mostrar mensagens de erro ou sucesso
function exibirFeedback(vetorMensagens, tipo) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.innerHTML = "";

    if (tipo === 'erro') {
        feedbackDiv.className = 'feedback-erro';
        let htmlErros = "<ul>";
        for (const msg of vetorMensagens) {
            htmlErros += `<li>${msg}</li>`;
        }
        htmlErros += "</ul>";
        feedbackDiv.innerHTML = htmlErros;
    } else if (tipo === 'sucesso') {
        feedbackDiv.className = 'feedback-sucesso';
        feedbackDiv.innerHTML = vetorMensagens.join("<br>");
    }
}