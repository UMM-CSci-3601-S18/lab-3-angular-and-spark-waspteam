import {browser, by, element, Key} from 'protractor';
import {Todo} from "../src/app/todos/todo";

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
    return element(by.className("ownerDisplay")).getAttribute("value");
  }

  // The following is ready to be implemented when there is an element with the id "todoStatus"
  /* getTodosByStatus(status: boolean) {
    let input = element(by.id("todoStatus"))
    input.click();
    input.select(status);
  } */

  selectUpKey() {
    browser.actions().sendKeys(Key.ARROW_UP).perform();
  }

  getTodoByCategory(category: string) {
    let input = element(by.id('todoCategory'));
    input.click();
    input.sendKeys(category);
    let categoryElement = element.all(by.className("categoryDisplay")).get(0);
    return categoryElement.getText();
  }

  getTodoByBody(body: string) {
    let input = element(by.id("todoBody"));
    input.click();
    input.sendKeys(body);
    let bodyElement = element.all(by.className("bodyDisplay")).get(0);
    return bodyElement.getText();
  }

  getUniqueTodo(todoID:string) {
    let todo = element(by.id(todoID)).getText();
    this.highlightElement(by.id(todoID));

    return todo;
  }
}
