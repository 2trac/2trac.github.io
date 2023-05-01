/**
 * <Salvar a resposta feita ao termo>
 * @param opcao
 */
function salvarRespostaTermo(opcao, opcao_anteiror) {
    var msg;

    $("#requisicao").val("salvarRespostaTermo");

    if (opcao == 'S') {
        $('#adpresposta').val('S');
        statusMsg = 'Seu status atual é: Adesão Pendente. \n\n';
        msg = statusMsg + 'Tem certeza que deseja realizar a adesão ao Programa Tempo Integral?';
        msgTitle = "Termo";
        colorBtn = "#1AB394";
    }

    if (opcao == 'N') {
        $('#adpresposta').val('N');
        statusMsg = 'Seu status atual é: Adesão Pendente. \n\n';
        msg = statusMsg + 'Tem certeza que deseja não realizar a adesão ao Programa Tempo Integral?';
        msgTitle = "Termo";
        colorBtn = "#ed5565";
    }

    if (opcao == 'C') {
        $('#adpresposta').val('C');
        if (opcao_anteiror == 'S') {
            statusMsg = 'Seu status atual é: Adesão Realizada. \n\n';
            msg = statusMsg + 'Tem certeza que deseja cancelar a Adesão ao Programa Tempo Integral?';
            msgTitle = "Cancelamento de Termo";
        }
        if (opcao_anteiror == 'N') {
            statusMsg = 'Seu status atual é: Adesão Não Realizada. \n\n';
            msg = statusMsg + 'Tem certeza que deseja cancelar a Adesão Não Realizada?';
            msgTitle = "Cancelamento de Termo";
        }

        colorBtn = "#f8ac59";
    }

    swal({
        title: "Atenção!",
        text: msg,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: colorBtn,
        confirmButtonText: "Sim, tenho certeza!",
        cancelButtonText: "Cancelar",
        closeOnCancel: true,
        closeOnConfirm: "on"
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: window.location.href,
                type: 'post',
                cache: false,
                data: $('#formulario-aceite-termo').serialize(),
                success: function(resp) {
                    swal({
                            title: msgTitle,
                            text: resp,
                            html: true
                        },
                        function() {
                            location.reload();
                        }
                    );
                }
            });
        }
    });
}

/**
 * <Subimete o formulario para a impressão em PDF>
 */
function imprimir() {
    $('#pti_termo_adesao').print({
        stylesheet: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css",
        prepend: "",
        append: "",
        mediaPrint: true
    });
    return false;
}

//main
$(function() {
    $('.active a').css('background-color', '#eee');
});