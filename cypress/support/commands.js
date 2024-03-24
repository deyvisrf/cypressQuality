import {faker} from '@faker-js/faker'

Cypress.Commands.add('createUser', user => {
    const novoUsuario = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
      };

    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: novoUsuario
    })
})

Cypress.Commands.add('updateUser', userId => {
    const usuarioAtualizado = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
      };

    cy.request({
        method: 'PUT',
        url: `/usuarios/${userId}`,
        body: usuarioAtualizado
    })
})

Cypress.Commands.add('deleteUser', userId => {
    cy.request({
        method: 'DELETE',
        url: `/usuarios/${userId}`,
    })
})

Cypress.Commands.add('getFirstUserId', () => {
    cy.request('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios').that.is.an('array').and.is.not.empty;
      const primeiroUsuarioId = response.body.usuarios[0]._id;
      return primeiroUsuarioId;
    });
  });
  