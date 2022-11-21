import {render, screen, waitFor} from '../../../test-utils/testing-library-utils'
import OrderEntry from './../OrderEntry'
import { rest } from 'msw'
import {server} from './../../../mocks/server'


test("Handles error for scoops and toppings routes", async () => {
    // cria um novo handler acima do que foi criado no handlers
    // esse aqui vai ser pra simular erro 500 do servidor
    server.resetHandlers(rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        res(ctx.status(500))
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        res(ctx.status(500))
    }))
    render(<OrderEntry updatePhase={jest.fn()}/>)
    // usar o await com waitFor para testes em que o 'await findBy' não dá conta de esperar o async
    // nesse exemplo ele tem 2 carregamentos (topping e scooping), qndo um deles retorna, o handler já entende
    // que é aquele trecho de código que vai mudar, portanto ele já aciona o gatilho (executa o findby) enqnto
    // o elemento aind n foi renderizado
    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2)
    })
})