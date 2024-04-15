//Chamadas para Api de Usuários
const login = () =>{
  let email = document.getElementById("email").value;

  if(email)
  {
    let url = "http://127.0.0.1:5000/usuario?email=" + email;
    fetch(url, {
      method: "get"
    }).then((response) => response.json()).then((data) =>
    {
      if(data.administrador)
      {
        exibirMain(data);
      }
      else{
        document.getElementById("email").style.border = "1px solid red";
      }
    }).catch((error) =>
    {
      console.error("Error:", error);
    });
  }
};

const getUsuarios = async () => {
  let url = "http://127.0.0.1:5000/usuarios";
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirTelaUsuarios(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const obterUsuarioEditar = async (id) => {
  let url = "http://127.0.0.1:5000/usuariobyid?id=" + id;
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirUsuarioTela(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postAdicionarUsuario = async (administrador, email, nome) => {
  const formData = new FormData();
  formData.append("administrador", administrador);
  formData.append("email", email);
  formData.append("nome", nome);

  let url = "http://127.0.0.1:5000/usuario";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    inserirTelaUsuarios(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const deletaUsuario = async (id) => {
  let url = "http://127.0.0.1:5000/usuario?id=" + id;
  fetch(url, {
    method: "delete"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirTelaUsuarios(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postEditarUsuario = async (id, administrador, email, nome) => {
  const formData = new FormData();
  formData.append("administrador", administrador);
  formData.append("email", email);
  formData.append("nome", nome);
  formData.append("id", id);

  let url = "http://127.0.0.1:5000/editarusuario";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    inserirTelaUsuarios(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

//Chamadas para Api de Seções
const getSecoes = async () => {
  let url = "http://127.0.0.1:5000/secoes";
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirTelaSecoes(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getSecao = async (id, callback) => {
  let url = "http://127.0.0.1:5000/secao?id=" + id;
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postadicionarSecao = async (nome) => {
  const formData = new FormData();
  formData.append("nome", nome);

  let url = "http://127.0.0.1:5000/secao";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    inserirTelaSecoes(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const postEditarSecao = async (id, nome) => {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("id", id);

  let url = "http://127.0.0.1:5000/editarsecao";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    inserirTelaSecoes(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const deletaSecao = async (id) => {
  let url = "http://127.0.0.1:5000/secao?id=" + id;
  fetch(url, {
    method: "delete"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirTelaSecoes(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//Chamadas para Api de Documentos
const getDocumentos = async (secao) => {
  let url = "http://127.0.0.1:5000/documentos?secao_id=" + secao.id;
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirTelaDocumentos(data, secao.id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getDocumento = async (id, secaoId) => {
  let url = "http://127.0.0.1:5000/documento?id=" + id;
  fetch(url, {
    method: "get"
  })
    .then((response) => response.json())
    .then((data) => {
      inserirDocumentoTela(data, secaoId);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postadicionarDocumento = async (nome, novaSecao, antigaSecao) => {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("secao_id", novaSecao);

  let url = "http://127.0.0.1:5000/documento";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    getDocumentos({id: antigaSecao});
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const deletaDocumento = async (id, secaoId) => {
  let url = "http://127.0.0.1:5000/documento?id=" + id;
  fetch(url, {
    method: "delete"
  })
    .then((response) => response.json())
    .then((data) => {
      getDocumentos({id: secaoId});
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postEditarDocumento = async (id, nome, novaSecao, antigaSecao) => {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("secao_id", novaSecao);
  formData.append("id", id);

  let url = "http://127.0.0.1:5000/editardocumento";
  fetch(url, {
    body: formData,
    method: "post"
  })
  .then((response) => response.json())
  .then((data) => {
    getDocumentos({id: antigaSecao});
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const exibirMain = () => {
  document.getElementById("titulo").innerHTML = "Painel Administrativo";
  document.getElementById("login").style.display = "none";
  document.getElementById("usuarios").style.display = "none";
  document.getElementById("usuario").style.display = "none";
  document.getElementById("secoes").style.display = "none";
  document.getElementById("secao").style.display = "none";
  document.getElementById("opcoes").style.display = "block";
};

const persistirEditarDocumento = (id, secaoId) => {
  let nome = document.getElementById("documentoNome").value;
  let secao = document.getElementById("documentoSecao").value;

  postEditarDocumento(id, nome, secao, secaoId);
};

const persistirEditarSecao = (id) => {
  let nome = document.getElementById("secaoNome").value;

  postEditarSecao(id, nome);
};

const persistirEditarUsuario = (id) => {
  let administrador = document.getElementById("fieldAdministrador").value;
  let email = document.getElementById("fieldEmail").value;
  let nome = document.getElementById("usuarioNome").value;

  postEditarUsuario(id, administrador, email, nome);
};

const adicionarDocumento = (secaoId) => {
  let nome = document.getElementById("documentoNome").value;
  let secao = document.getElementById("documentoSecao").value;

  postadicionarDocumento(nome, secao, secaoId);
};

const adicionarSecao = () => {
  let nome = document.getElementById("secaoNome").value;

  postadicionarSecao(nome);
};

const adicionarUsuario = () => {
  let administrador = document.getElementById("fieldAdministrador").value;
  let email = document.getElementById("fieldEmail").value;
  let nome = document.getElementById("usuarioNome").value;

  postAdicionarUsuario(administrador, email, nome);
};

const voltarSecoes = () => {
  let ids = document.getElementById("voltarSecoes").getAttribute("idS");
  getSecao(ids, getDocumentos);
};

const inserirTelaDocumentos = (dados, secaoId) => {
  const documentosDiv = document.getElementsByClassName("documento");
  if(documentosDiv.length > 0)
  {
    let divsTodel = [];
    [].forEach.call(documentosDiv, function(documentoDiv) {
      divsTodel.push(documentoDiv.id);
    });
    divsTodel.forEach((idToDel) =>{
      const divToDel = document.getElementById(idToDel);
      divToDel.remove();
    });
  }
  document.getElementById("voltarDocumentos").setAttribute("idS", secaoId);
  document.getElementById("adicionarDocumentos").setAttribute("idS", secaoId);

  document.getElementById("titulo").innerHTML = "Documentos";
  document.getElementById("opcoes").style.display = "none";
  document.getElementById("documento").style.display = "none";
  document.getElementById("secoes").style.display = "none";
  document.getElementById("secao").style.display = "none";

  let documentosElement = document.getElementById("documentos");
  documentosElement.style.display = "block";
  dados.documentos.forEach((documento, indice) => {
    let novaDiv = document.createElement("div");
    let novaId = "documentos" + indice;
    novaDiv.classList.add("linha");
    novaDiv.classList.add("documento");
    novaDiv.id = novaId;

    documentosElement.appendChild(novaDiv);

    let novaSpan = document.createElement("span");
    novaSpan.id = "span" + indice;
    novaSpan.innerHTML = documento.nome;

    let novaDivAppend = document.getElementById(novaId);
    novaDivAppend.appendChild(novaSpan);

    let buttonEditar = document.createElement("button");
    buttonEditar.id = "buttonE" + indice;
    buttonEditar.innerHTML = "Editar";
    buttonEditar.setAttribute("idA", documento.id);
    buttonEditar.setAttribute("idS", documento.secao_id);
    buttonEditar.onclick = function(){
      editarDocumento(this.getAttribute("idA"), secaoId);
    };
    novaDivAppend.appendChild(buttonEditar);

    let buttonDeletar = document.createElement("button");
    buttonDeletar.id = "buttonD" + indice;
    buttonDeletar.innerHTML = "Deletar";
    buttonDeletar.setAttribute("idA", documento.id);
    buttonDeletar.onclick = function(){
      deletarDocumento(this.getAttribute("idA"), secaoId);
    };
    novaDivAppend.appendChild(buttonDeletar);
  });
};

const inserirTelaSecoes = (dados) => {
  const secoesDiv = document.getElementsByClassName("secao");
  if(secoesDiv.length > 0)
  {
    let divsTodel = [];
    [].forEach.call(secoesDiv, function(secaoDiv) {
      divsTodel.push(secaoDiv.id);
    });
    divsTodel.forEach((idToDel) =>{
      const divToDel = document.getElementById(idToDel);
      divToDel.remove();
    });
  }
  document.getElementById("titulo").innerHTML = "Seções";
  document.getElementById("opcoes").style.display = "none";
  document.getElementById("secao").style.display = "none";
  document.getElementById("documentos").style.display = "none";
  document.getElementById("documento").style.display = "none";

  let secoesElement = document.getElementById("secoes");
  secoesElement.style.display = "block";
  dados.secoes.forEach((secao, indice) => {
    let novaDiv = document.createElement("div");
    let novaId = "secoes" + indice;
    novaDiv.classList.add("linha");
    novaDiv.classList.add("secao");
    novaDiv.id = novaId;

    secoesElement.appendChild(novaDiv);

    let novaSpan = document.createElement("span");
    novaSpan.id = "span" + indice;
    novaSpan.innerHTML = secao.nome;

    let novaDivAppend = document.getElementById(novaId);
    novaDivAppend.appendChild(novaSpan);

    let buttonEditar = document.createElement("button");
    buttonEditar.id = "buttonE" + indice;
    buttonEditar.innerHTML = "Editar";
    buttonEditar.setAttribute("idA", secao.id);
    buttonEditar.onclick = function(){
      editarSecao(this.getAttribute("idA"));
    };
    novaDivAppend.appendChild(buttonEditar);

    let buttonDeletar = document.createElement("button");
    buttonDeletar.id = "buttonD" + indice;
    buttonDeletar.innerHTML = "Deletar";
    buttonDeletar.setAttribute("idA", secao.id);
    buttonDeletar.onclick = function(){
      deletarSecao(this.getAttribute("idA"));
    };
    novaDivAppend.appendChild(buttonDeletar);

    let buttonAcessar = document.createElement("button");
    buttonAcessar.id = "buttonD" + indice;
    buttonAcessar.innerHTML = "Acessar Documentos";
    buttonAcessar.setAttribute("idA", secao.id);
    buttonAcessar.onclick = function(){
      getSecao(this.getAttribute("idA"), getDocumentos);
    };
    novaDivAppend.appendChild(buttonAcessar);
  });
};

const inserirTelaUsuarios = (dados) => {
  const usuariosDiv = document.getElementsByClassName("usuario");
  if(usuariosDiv.length > 0)
  {
    let divsTodel = [];
    [].forEach.call(usuariosDiv, function(usuarioDiv) {
      divsTodel.push(usuarioDiv.id);
    });
    divsTodel.forEach((idToDel) =>{
      const divToDel = document.getElementById(idToDel);
      divToDel.remove();
    });
  }
  document.getElementById("titulo").innerHTML = "Usuarios";
  document.getElementById("opcoes").style.display = "none";
  document.getElementById("usuario").style.display = "none";

  let usuariosElement = document.getElementById("usuarios");
  usuariosElement.style.display = "block";
  dados.usuarios.forEach((usuario, indice) => {
    let novaDiv = document.createElement("div");
    let novaId = "usuarios" + indice;
    novaDiv.classList.add("linha");
    novaDiv.classList.add("usuario");
    novaDiv.id = novaId;

    usuariosElement.appendChild(novaDiv);

    let novaSpan = document.createElement("span");
    novaSpan.id = "span" + indice;
    novaSpan.innerHTML = usuario.nome + ": " + usuario.email;

    let novaDivAppend = document.getElementById(novaId);
    novaDivAppend.appendChild(novaSpan);

    let buttonEditar = document.createElement("button");
    buttonEditar.id = "buttonE" + indice;
    buttonEditar.innerHTML = "Editar";
    buttonEditar.setAttribute("idA", usuario.id);
    buttonEditar.onclick = function(){
      editarUsuario(this.getAttribute("idA"));
    };
    novaDivAppend.appendChild(buttonEditar);

    let buttonDeletar = document.createElement("button");
    buttonDeletar.id = "buttonD" + indice;
    buttonDeletar.innerHTML = "Deletar";
    buttonDeletar.setAttribute("idA", usuario.id);
    buttonDeletar.onclick = function(){
      deletarUsuario(this.getAttribute("idA"));
    };
    novaDivAppend.appendChild(buttonDeletar);
  });
};

const usuarioBotaoCancelar = () => {
  let buttonCancelar = document.createElement("button");
  buttonCancelar.innerHTML = "Cancelar";
  buttonCancelar.onclick = function(){
    getUsuarios();
  };

  document.getElementById("usuarioEditar").appendChild(buttonCancelar);
};

const documentoBotaoCancelar = (secaoId) => {
  let buttonCancelar = document.createElement("button");
  buttonCancelar.innerHTML = "Cancelar";
  buttonCancelar.setAttribute("idS", secaoId);
  buttonCancelar.onclick = function(){
    getDocumentos({id: secaoId});
  };

  document.getElementById("documentoEditar").appendChild(buttonCancelar);
};

const secaoBotaoCancelar = () => {
  let buttonCancelar = document.createElement("button");
  buttonCancelar.innerHTML = "Cancelar";
  buttonCancelar.onclick = function(){
    getSecoes();
  };

  document.getElementById("secaoEditar").appendChild(buttonCancelar);
};

const editarDocumento = (id, secaoId) => {
  let buttonEditar = document.createElement("button");
  buttonEditar.innerHTML = "Editar";
  buttonEditar.setAttribute("idA", id);
  buttonEditar.onclick = function(){
    persistirEditarDocumento(this.getAttribute("idA"), secaoId);
  };

  document.getElementById("documentoEditar").innerHTML = "";
  document.getElementById("documentoEditar").appendChild(buttonEditar);

  documentoBotaoCancelar(secaoId);
  documentoTelaAddEdit("Editar");
  getDocumento(id, secaoId);
};

const editarSecao = (id) => {
  let buttonEditar = document.createElement("button");
  buttonEditar.innerHTML = "Editar";
  buttonEditar.setAttribute("idA", id);
  buttonEditar.onclick = function(){
    persistirEditarSecao(this.getAttribute("idA"));
  };

  document.getElementById("secaoEditar").innerHTML = "";
  document.getElementById("secaoEditar").appendChild(buttonEditar);

  secaoBotaoCancelar();
  secaoTelaAddEdit("Editar");
  getSecao(id, inserirSecaoTela);
};

const editarUsuario = (id) => {
  let buttonEditar = document.createElement("button");
  buttonEditar.innerHTML = "Editar";
  buttonEditar.setAttribute("idA", id);
  buttonEditar.onclick = function(){
    persistirEditarUsuario(this.getAttribute("idA"));
  };

  document.getElementById("usuarioEditar").innerHTML = "";
  document.getElementById("usuarioEditar").appendChild(buttonEditar);

  usuarioBotaoCancelar();
  usuarioTelaAddEdit("Editar");
  obterUsuarioEditar(id);
};

const adicionarDocumentos = () =>{
  let addDocObj = document.getElementById("adicionarDocumentos");
  let secaoId = addDocObj.getAttribute("idS");

  let buttonAdicionar = document.createElement("button");
  buttonAdicionar.innerHTML = "Adicionar";
  buttonAdicionar.setAttribute("idS", secaoId);
  buttonAdicionar.onclick = function(){
    adicionarDocumento(secaoId);
  };
  document.getElementById("documentoEditar").innerHTML = "";
  document.getElementById("documentoEditar").appendChild(buttonAdicionar);

  documentoBotaoCancelar(secaoId);
  inserirDocumentoTela({nome: "",secao_id: secaoId});
  documentoTelaAddEdit("Adicionar");
};

const adicionarSecoes = () =>{
  let buttonAdicionar = document.createElement("button");
  buttonAdicionar.innerHTML = "Adicionar";
  buttonAdicionar.onclick = function(){
    adicionarSecao();
  };
  document.getElementById("secaoEditar").innerHTML = "";
  document.getElementById("secaoEditar").appendChild(buttonAdicionar);

  secaoBotaoCancelar();
  inserirSecaoTela({nome: ""});
  secaoTelaAddEdit("Adicionar");
};

const adicionarUsuarios = () =>{
  let buttonAdicionar = document.createElement("button");
  buttonAdicionar.innerHTML = "Adicionar";
  buttonAdicionar.onclick = function(){
    adicionarUsuario();
  };
  document.getElementById("usuarioEditar").innerHTML = "";
  document.getElementById("usuarioEditar").appendChild(buttonAdicionar);

  usuarioBotaoCancelar();
  inserirUsuarioTela({administrador: "",email: "",nome: ""});
  usuarioTelaAddEdit("Adicionar");
};

const inserirDocumentoTela = (dado) => {
  if(dado.nome)
  {
    document.getElementById("documentoNome").value = dado.nome;
    document.getElementById("documentoSecao").value = dado.secao_id;
  }
  else{
    if(dado.secao_id)
    {
      let docSecObj = document.getElementById("documentoSecao");
      docSecObj.value = dado.secao_id;
      docSecObj.parentElement.style.display = "none";
    }
  }
};

const inserirSecaoTela = (dado) => {
  document.getElementById("secaoNome").value = dado.nome;
};

const inserirUsuarioTela = (dado) => {
  document.getElementById("fieldAdministrador").value = dado.administrador;
  document.getElementById("fieldEmail").value = dado.email;
  document.getElementById("usuarioNome").value = dado.nome;
};

const documentoTelaAddEdit = (texto) =>{
  document.getElementById("titulo").innerHTML = texto;
  document.getElementById("documentos").style.display = "none";
  document.getElementById("documento").style.display = "block";
};

const secaoTelaAddEdit = (texto) =>{
  document.getElementById("titulo").innerHTML = texto;
  document.getElementById("secoes").style.display = "none";
  document.getElementById("secao").style.display = "block";
};

const usuarioTelaAddEdit = (texto) =>{
  document.getElementById("titulo").innerHTML = texto;
  document.getElementById("usuarios").style.display = "none";
  document.getElementById("usuario").style.display = "block";
};

const deletarDocumento = (id, secaoId) => {
  if (confirm("Certeza que deseja deletar?"))
  {
    deletaDocumento(id, secaoId);
  }
};

const deletarSecao = (id) => {
  if (confirm("Certeza que deseja deletar?"))
  {
    deletaSecao(id);
  }
};

const deletarUsuario = (id) => {
  if (confirm("Certeza que deseja deletar?"))
  {
    deletaUsuario(id);
  }
};