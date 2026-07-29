// Elementos da página
const campoSenha = document.getElementById("campo-senha");
const numeroCaracteres = document.getElementById("numero-caracteres");

const btnMais = document.getElementById("aumentar");
const btnMenos = document.getElementById("diminuir");
const btnCopiar = document.getElementById("copiar");

const chkMaiusculas = document.getElementById("maiusculo");
const chkMinusculas = document.getElementById("minusculo");
const chkNumeros = document.getElementById("numero");
const chkSimbolos = document.getElementById("simbolo");

const barraForca = document.getElementById("forca");

// Quantidade inicial
let tamanho = 12;

// Conjuntos de caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()_-+=[]{}<>?/|";

// Gera uma senha
function gerarSenha() {

    let caracteres = "";

    if (chkMaiusculas.checked) {
        caracteres += letrasMaiusculas;
    }

    if (chkMinusculas.checked) {
        caracteres += letrasMinusculas;
    }

    if (chkNumeros.checked) {
        caracteres += numeros;
    }

    if (chkSimbolos.checked) {
        caracteres += simbolos;
    }

    // Evita gerar senha vazia
    if (caracteres.length === 0) {
        campoSenha.value = "";
        atualizarForca();
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;

    atualizarForca();
}

// Atualiza a barra de força
function atualizarForca() {

    let pontos = 0;

    if (chkMaiusculas.checked) pontos++;
    if (chkMinusculas.checked) pontos++;
    if (chkNumeros.checked) pontos++;
    if (chkSimbolos.checked) pontos++;

    if (tamanho >= 12) pontos++;
    if (tamanho >= 16) pontos++;
    if (tamanho >= 20) pontos++;

    barraForca.className = "";

    if (pontos <= 3) {
        barraForca.classList.add("fraca");
    }
    else if (pontos <= 5) {
        barraForca.classList.add("media");
    }
    else {
        barraForca.classList.add("forte");
    }
}

// Botão +
btnMais.addEventListener("click", () => {

    if (tamanho < 30) {

        tamanho++;

        numeroCaracteres.textContent = tamanho;

        gerarSenha();
    }

});

// Botão -
btnMenos.addEventListener("click", () => {

    if (tamanho > 4) {

        tamanho--;

        numeroCaracteres.textContent = tamanho;

        gerarSenha();
    }

});

// Sempre que mudar alguma opção
chkMaiusculas.addEventListener("change", gerarSenha);
chkMinusculas.addEventListener("change", gerarSenha);
chkNumeros.addEventListener("change", gerarSenha);
chkSimbolos.addEventListener("change", gerarSenha);

// Copiar senha
btnCopiar.addEventListener("click", async () => {

    if (campoSenha.value === "") return;

    try {

        await navigator.clipboard.writeText(campoSenha.value);

        btnCopiar.textContent = "✅ Copiado!";

        setTimeout(() => {
            btnCopiar.textContent = "📋 Copiar";
        }, 1500);

    } catch (erro) {

        campoSenha.select();
        document.execCommand("copy");

        btnCopiar.textContent = "✅ Copiado!";

        setTimeout(() => {
            btnCopiar.textContent = "📋 Copiar";
        }, 1500);
    }

});

// Gera a primeira senha ao abrir a página
gerarSenha();
