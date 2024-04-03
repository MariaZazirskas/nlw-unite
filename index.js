let participantes = [
    {
    nome: "Daniel",
    email: "dc.assis@yahoo.com.br",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Maria",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 15, 45),
        dataCheckIn: null
    },
    {
        nome: "João",
        email: "joao@hotmail.com",
        dataInscricao: new Date(2024, 2, 24, 10, 10),
        dataCheckIn: new Date(2024, 2, 26, 18, 15)
    },
    {
        nome: "Ana",
        email: "ana@example.com",
        dataInscricao: new Date(2024, 2, 25, 14, 30),
        dataCheckIn: new Date(2024, 2, 27, 12, 0)
    },
    {
        nome: "Pedro",
        email: "pedro@teste.com",
        dataInscricao: new Date(2024, 2, 26, 20, 0),
        dataCheckIn: null
    },
    {
        nome: "Mariana",
        email: "mariana@example.org",
        dataInscricao: new Date(2024, 2, 27, 17, 15),
        dataCheckIn: new Date(2024, 2, 29, 15, 20)
    },
    {
        nome: "Lucas",
        email: "lucas@teste.com",
        dataInscricao: new Date(2024, 2, 28, 12, 45),
        dataCheckIn: new Date(2024, 2, 30, 10, 10)
    },
    {
        nome: "Carla",
        email: "carla@example.com",
        dataInscricao: new Date(2024, 2, 29, 8, 0),
        dataCheckIn: new Date(2024, 3, 1, 16, 30)
    },
    {
        nome: "Rafael",
        email: "rafael@example.org",
        dataInscricao: new Date(2024, 2, 30, 16, 30),
        dataCheckIn: new Date(2024, 3, 2, 11, 45)
    },
    {
        nome: "Juliana",
        email: "juliana@teste.com",
        dataInscricao: new Date(2024, 2, 31, 13, 20),
        dataCheckIn: new Date(2024, 3, 3, 19, 15)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
    if (participante.dataCheckIn == null) {
        dataCheckIn = `
        <button
        data-email="${participante.email}"
            onclick="fazerCheckIn(event)" 
        >
        Confirmar Check-in
        </button>
        `
    }

    return `
      <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong><br>
            <small>
                ${participante.email}
            </small>    
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""

    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()
    
    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // verificar se o participante já existe
    const participanteExiste = participantes.find((p) =>
        p.email == participante.email
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
    // confirmar se realmente quer fazer check-in
    const mensagemConfirmacao = ('Tem certeza que deseja fazer o check-in?')
    
    if (confirm(mensagemConfirmacao) == false) {
        return
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find((p) =>
        p.email == event.target.dataset.email
    )

    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()


    // atualizar a lista de participantes
    atualizarLista(participantes)
    }