


export function getByTestId(testId){
    return cy.get(`[data-testid="${testId}"]`)    
}

export function hover(selector){
    return cy.get(selector).trigger('mouseover')
}