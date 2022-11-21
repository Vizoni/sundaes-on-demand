import {render, screen } from '../../../test-utils/testing-library-utils'

import Options from './../Options'
import {OrderDetailsProvider} from '../../../contexts/OrderDetails'

describe("Options()", () => {
    test("Displays image for each scoop from the server", async () => {
        render(<Options optionType="scoops"/>, {wrapper: OrderDetailsProvider})

        // precisa usar o await pq esse elemento só é criado dps da chamada http (async)
        const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i}) // o ALT da img termina ($) com 'scoop'
        expect(scoopImages).toHaveLength(2);
        const altText = scoopImages.map((elem) => elem.alt);
        expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
    })
    test("Displays image for each topping from the server", async () => {
        render(<Options optionType="toppings"/>, {wrapper: OrderDetailsProvider})

        // precisa usar o await pq esse elemento só é criado dps da chamada http (async)
        const scoopImages = await screen.findAllByRole("img", {name: /topping$/i}) // o ALT da img termina ($) com 'scoop'
        expect(scoopImages).toHaveLength(3);
        const altText = scoopImages.map((elem) => elem.alt);
        expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"])
    })
})