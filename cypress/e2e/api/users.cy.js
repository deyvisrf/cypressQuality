describe('Teste GET do endpoint /usuarios', () => {
  it('Deve retornar uma lista de usuários', () => {
    cy.request('GET', '/usuarios')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios').that.is.an('array').and.is.not.empty;
      });
  });
});

describe('Teste POST para criar um usuário', () => {
  it('Deve criar um novo usuário com sucesso', () => {   
    cy.createUser()
    .then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').that.is.a('string').and.is.not.empty;
    });
  });
});

describe('Teste PUT para atualizar um usuário', () => {
  it('Deve atualizar um usuário com sucesso', () => {
    cy.getFirstUserId().then((primeiroUsuarioId) => {
      cy.updateUser(primeiroUsuarioId).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body).to.have.property('message', 'Registro alterado com sucesso');
      });
    });
  });
});

describe('Teste DELETE para excluir um usuário', () => {
  it('Deve excluir um usuário com sucesso', () => {
    cy.getFirstUserId().then((primeiroUsuarioId) => {
      cy.deleteUser(primeiroUsuarioId).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  });
});




