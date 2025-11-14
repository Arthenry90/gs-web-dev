/* * Global Solution 2025 - Web Development
 * main.js
 * Script para validação de formulário com base nos requisitos.
 */

// --- REQUISITO 2: VETORES (Arrays) ---
// Vetor global para armazenar as habilidades adicionadas.
let habilidades = [];

// --- REQUISITO 4: MANIPULAÇÃO DO DOM ---
// Para otimizar, esperamos o DOM carregar antes de
// selecionar os elementos e adicionar os "ouvintes" de evento.
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleciona os elementos principais do DOM uma única vez
    const form = document.getElementById("futureSkillsForm");
    const btnAddHabilidade = document.getElementById("btnAddHabilidade");
    const btnSubmit = document.getElementById("btnSubmit");

    // Adiciona o "ouvinte" de evento para o botão de adicionar habilidade
    btnAddHabilidade.addEventListener("click", adicionarHabilidade);
    
    // Adiciona o "ouvinte" para o evento de SUBMISSÃO do formulário
    // Isso é melhor que o 'click' no botão, pois captura o 'Enter' também.
    form.addEventListener("submit", validarFormulario);
});

/**
 * Função para adicionar uma habilidade ao vetor 'habilidades'
 * e atualizar a lista (DOM).
 */
function adicionarHabilidade() {
    // Pega o elemento input da habilidade
    const input = document.getElementById("habilidadeInput");
    
    // Pega o valor e remove espaços em branco (Manipulação de String)
    const habilidadeTexto = input.value.trim();
    
    // Pega a <ul> onde as habilidades são listadas
    const listaUI = document.getElementById("listaHabilidades");

    // Só adiciona se o campo não estiver vazio
    if (habilidadeTexto !== "") {
        // --- REQUISITO 2: VETORES ---
        // Adiciona a habilidade ao vetor global
        habilidades.push(habilidadeTexto);
        
        // --- REQUISITO 4: MANIPULAÇÃO DO DOM ---
        // Cria um novo item de lista (<li>)
        const li = document.createElement("li");
        li.textContent = habilidadeTexto;
        
        // Adiciona o <li> na <ul>
        listaUI.appendChild(li);
        
        // Limpa o campo de input para a próxima adição
        input.value = "";
        input.focus(); // Coloca o foco de volta no input
    }
}


// --- REQUISITO 1: FUNÇÕES ---

/**
 * Função principal, chamada ao submeter o formulário.
 * Coordena todas as validações.
 * @param {Event} event - O evento de submissão do formulário.
 */
function validarFormulario(event) {
    // Impede o recarregamento padrão da página ao enviar
    event.preventDefault(); 
    
    // --- REQUISITO 2: VETORES (Arrays) ---
    // Inicia o vetor de erros vazio a cada tentativa de submissão
    let vetorErros = [];

    // --- REQUISITO 4: MANIPULAÇÃO DO DOM (Leitura) ---
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    
    // Para radios, precisamos de uma técnica diferente para pegar o valor
    const interesseRadio = document.querySelector('input[name="interesse"]:checked');

    // --- Validações ---
    
    // Nome
    if (nome === "") {
        vetorErros.push("O campo 'Nome Completo' é obrigatório.");
    }

    // CPF (usando função dedicada)
    const erroCpf = checarCPF(cpf); // Retorna string de erro ou null
    if (erroCpf) {
        vetorErros.push(erroCpf);
    }

    // E-mail (usando função dedicada)
    const erroEmail = checarEmail(email); // Retorna string de erro ou null
    if (erroEmail) {
        vetorErros.push(erroEmail);
    }

    // Interesse
    if (!interesseRadio) { // Se for null (nenhum selecionado)
        vetorErros.push("Selecione um 'Tipo de Interesse'.");
    }

    // Habilidades (Verifica o vetor 'habilidades')
    if (habilidades.length < 3) {
        vetorErros.push("Adicione pelo menos 3 habilidades à lista.");
    }

    // --- Decisão Final ---
    if (vetorErros.length > 0) {
        // Se houver erros, passa o VETOR DE ERROS para a função de feedback
        exibirFeedback(vetorErros, 'erro');
    } else {
        // Se estiver tudo OK, exibe o sucesso
        const interesseValor = interesseRadio.value;
        const resumoSucesso = [
            `Inscrição realizada com sucesso!`,
            `<strong>Nome:</strong> ${nome}`,
            `<strong>E-mail:</strong> ${email}`,
            `<strong>CPF:</strong> ${cpf}`,
            `<strong>Interesse:</strong> ${interesseValor}`,
            `<strong>Habilidades:</strong> ${habilidades.join(", ")}`
        ];
        
        // Passa um VETOR com a mensagem de sucesso
        exibirFeedback(resumoSucesso, 'sucesso');
        
        // Opcional: Limpar o formulário após o sucesso
        // document.getElementById("futureSkillsForm").reset();
        // habilidades = [];
        // document.getElementById("listaHabilidades").innerHTML = "";
    }
}

/**
 * Função dedicada para validar o CPF.
 * @param {string} cpf - O valor do CPF digitado.
 * @returns {string | null} - Retorna uma string de erro ou null se for válido.
 */
function checarCPF(cpf) {
    if (cpf === "") {
        return "O campo 'CPF' é obrigatório.";
    }
    
    // --- REQUISITO 3: MANIPULAÇÃO DE STRINGS ---
    // Remove todos os caracteres que não são dígitos (pontos, traços)
    const cpfLimpo = cpf.replace(/\D/g, ''); 
    
    if (cpfLimpo.length !== 11) {
        return "CPF inválido. Deve conter 11 dígitos.";
    }
    
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpfLimpo)) {
        return "CPF inválido (dígitos repetidos).";
    }

    // Se passou nas checagens, retorna null (sem erro)
    return null; 
}

/**
 * Função dedicada para validar o E-mail.
 * @param {string} email - O valor do e-mail digitado.
 * @returns {string | null} - Retorna uma string de erro ou null se for válido.
 */
function checarEmail(email) {
    if (email === "") {
        return "O campo 'E-mail' é obrigatório.";
    }

    // --- REQUISITO 3: MANIPULAÇÃO DE STRINGS ---
    // Converte para minúsculo para normalização
    const emailNormalizado = email.toLowerCase();
    
    // Regex simples para checar o formato básico (contém @ e .)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailNormalizado)) {
        return "Formato de e-mail inválido (deve conter '@' e '.').";
    }

    return null; // Sem erro
}

/**
 * Função para exibir o feedback (erros ou sucesso) na tela.
 * Recebe um VETOR de mensagens.
 * @param {string[]} vetorMensagens - O vetor de erros ou a msg de sucesso.
 * @param {'erro' | 'sucesso'} tipo - O tipo de feedback.
 */
function exibirFeedback(vetorMensagens, tipo) {
    // --- REQUISITO 4: MANIPULAÇÃO DO DOM (Escrita) ---
    const feedbackDiv = document.getElementById("feedback");

    // Limpa o conteúdo anterior
    feedbackDiv.innerHTML = "";
    
    if (tipo === 'erro') {
        // Aplica classes de estilo (definidas no CSS)
        feedbackDiv.className = 'feedback-erro';
        
        // Cria uma lista de erros
        let htmlErros = "<ul>";
        for (const msg of vetorMensagens) {
            htmlErros += `<li>${msg}</li>`;
        }
        htmlErros += "</ul>";
        
        feedbackDiv.innerHTML = htmlErros;
        
    } else if (tipo === 'sucesso') {
        // Aplica classes de estilo
        feedbackDiv.className = 'feedback-sucesso';
        
        // Junta o vetor de sucesso com quebras de linha
        feedbackDiv.innerHTML = vetorMensagens.join("<br>");
    }
}