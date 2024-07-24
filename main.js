$(document).ready(function () {
    // Máscaras
    $('#telefone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#cep').mask('00000-000');

    // Validação
    $.validator.addMethod("cpfBR", function(value, element) {
        value = value.replace(/\D/g, "");
        if (value.length !== 11 || /^(.)\1+$/.test(value)) {
            return false;
        }
        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(value.substring(i-1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(value.substring(9, 10))) {
            return false;
        }
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(value.substring(i-1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        return remainder === parseInt(value.substring(10, 11));
    }, "Por favor, insira um CPF válido.");

    $('#form').validate({
        rules: {
            nome: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true,
                minlength: 14 // Formato da máscara (00) 00000-0000
            },
            cpf: {
                required: true,
                cpfBR: true
            },
            endereco: {
                required: true,
                minlength: 10
            },
            cep: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            nome: {
                required: "Por favor, insira seu nome completo.",
                minlength: "Seu nome deve ter no mínimo 3 caracteres."
            },
            email: {
                required: "Por favor, insira seu e-mail.",
                email: "Por favor, insira um e-mail válido."
            },
            telefone: {
                required: "Por favor, insira seu telefone.",
                minlength: "Seu telefone deve estar no formato (00) 00000-0000."
            },
            cpf: {
                required: "Por favor, insira seu CPF.",
                cpfBR: "Por favor, insira um CPF válido."
            },
            endereco: {
                required: "Por favor, insira seu endereço completo.",
                minlength: "Seu endereço deve ter no mínimo 10 caracteres."
            },
            cep: {
                required: "Por favor, insira seu CEP.",
                minlength: "Seu CEP deve ter no mínimo 8 caracteres."
            }
        },
        submitHandler: function(form) {
            // Mensagem de sucesso
            alert("Cadastro realizado com sucesso!");
            form.reset(); // Limpa o formulário após o envio
        }
    });
});
