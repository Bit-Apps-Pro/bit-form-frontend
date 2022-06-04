
export function iFrameClick(selector,config){
    cy.getIFrameBody().find(selector).click(config)
}