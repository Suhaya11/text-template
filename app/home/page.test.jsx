import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react";
import Home from "./page";

describe('fist test',()=>{
    it('should renders correctly',()=>{
 render(<Home/>)

        const thediv = screen.getByRole('heading',{level:2}
        )
       
        expect(thediv).toBeInTheDocument()
    })
})