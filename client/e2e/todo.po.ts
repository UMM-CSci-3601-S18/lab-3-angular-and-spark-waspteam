import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAnOwner(name: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(name);
  }

  // The following is ready to be implemented when there is an element with the id "todoStatus"
  /* getTodosByStatus(status: boolean) {
    let input = element(by.id("todoStatus"))
    input.click();
    input.select(status);
  } */

  getTodoCategoryByCategory(category: string) {
    let input = element(by.id('todoCategory'));
    input.click();
    input.sendKeys(category);

    let el = element.all(by.css('.categoryDisplay')).first();
    let container = element.all(by.css('.todoContainer')).first();
    container.click();
    let result = el.getText();
    return result;
  }

  getTodoBodyByBody(body: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
    let container = element.all(by.css('.todoContainer')).first();
    container.click();
    return element.all(by.css('.bodyDisplay')).first().getText();
  }

  getTodoStatusByStatus(status: string) {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(status);
    let containter = element.all(by.css('.todoContainter')).first();
    containter.click();
    return element.all(by.css('.statusClickDisplay')).first().getText();
  }

  getUniqueTodo(todoID:string) {
    let todo = element(by.id(todoID)).getText();
    this.highlightElement(by.id(todoID));

    return todo;
  }
}
