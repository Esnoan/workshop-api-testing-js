const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const expect = chai.expect;

describe('First Api Tests', () => {
});

it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
});

it('Consume GET Service with query parameters', async () => {
    const query = {
        name: 'John',
        age: '31',
        city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
});

it('Consume PATCH Service', async () => {

    const data = {
        name: 'John',
        age: '31',
        city: 'New York'
    };

    const response = await agent.patch('https://httpbin.org/patch').send(data);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('data');
    expect(response.body).to.have.property('json');
    expect(response.body.json).to.property('name');
});

it('Consume PUT Service', async () => {

    const data = {
        name: 'John',
        age: '31',
        city: 'New York'
    };

    const response = await agent.put('https://httpbin.org/put').send(data);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('data');
    expect(response.body).to.have.property('json');
    expect(response.body.json).to.property('age');
});

it('Consume DELETE Service', async () => {

    const data = {
        name: 'John',
        age: '31',
        city: 'New York'
    };

    const response = await agent.delete('https://httpbin.org/delete').send(data);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
    expect(response.body).to.have.property('data');
    expect(response.body).to.have.property('json');
    expect(response.body.json).to.property('city');
});

it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/headers');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.header).to.property('server').to.equal('nginx');
});
