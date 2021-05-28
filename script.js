$(document).ready(function(){

    $('form').click(() => {
        $('#name-message, #email-message').attr('hidden', true);
    });

    $('form').submit(async (event) => {
        event.preventDefault();

        const { name, email } = event.target;
        console.log('Nome: ' + name.value, 'Email: ' + email.value)

        if(!validaNome(name)) {
            console.warn('Nome inválido')
            return
        }

        if (validaEmail(email)) {

            alert('Cadastrado com sucesso!')
            //await cadastrarAfiliado(name, email)

            $('#name').val('')
            $('#email').val('')
        }
    })

    const validaNome = (name) => {
        if(!name.value) {
            // $($('#name').attr("placeholder", `Por favor informe seu Nome Completo`))//.focus().blur();
             $('#name-message').attr('hidden', false);
             name.focus();
             return false;
        }

        const arr = name.value.split(' ')

        if(arr.length > 1) {
            if(arr[1] === '') {
                $('#name-message').attr('hidden', false);
                name.focus();
                return false;
            }
            return true;

        }else {
            $('#name-message').attr('hidden', false);
            //console.warn('Erro')
            return false;
        }
    }

    const validaEmail = (email) => {
        if(!email.value) {
           // $($('#email').attr("placeholder", `Por favor informe seu Email válido`))//.focus().blur();
           $('#email-message').attr('hidden', false);
           email.focus();
           return false;

        }else {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email.value)) {
                email.focus();
                // $("MsgErro").show()
                // .text('Por favor, informe um email válido.');

                $('#email-message').attr('hidden', false);
                return false;
            }
            return true;
        }
    }

    const cadastrarAfiliado = async (name, email) => {
        const submitBtnVal = $('.submit-btn').val()
        alert('enviando ...')
        await $.ajax({
            url: '',
            type: 'GET', //'POST',
            data : {
                nome: name,
                email,
            },
            beforeSend: () => {
                console.log('enviando ...')

                $('.submit-btn')
                    .attr('disabled', true)
                    .val('Enviando ...')
            }
        })
        .done((msg) => {
            $('#resultado').html(msg);
            alert('Afiliado cadastrado com sucesso!')
        })
        .fail((jqXHR, textStatus, msg) => {
            alert(`Erro! ${msg}`)
            console.warn(msg)
        })
        .then(() => {

           $('.submit-btn')
            .attr('disabled', false)
            .val(submitBtnVal)
        })
    }
});