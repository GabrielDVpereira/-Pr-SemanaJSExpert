const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");
const TodoRepository = require("../src/todoRepository");

describe("todoRepository", () => {
  let todoRepository;
  let sandbox;
  before(() => {
    todoRepository = new TodoRepository();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("methods signature", () => {
    it("should call insertOne from loki", () => {
      const functionName = "insertOne";
      const expectedReturn = true;
      sandbox
        .stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const data = { name: "Gabriel" };

      const result = todoRepository.create(data);

      expect(result).to.be.ok;
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data))
        .to.be.ok;
    });
    it("should call find from loki", () => {
      const mockDatabase = [
        {
          name: "teste",
          age: 90,
          meta: { revision: 0, created: 1611626876684, version: 0 },
          $loki: 1,
        },
        {
          name: "teste2",
          age: 90,
          meta: { revision: 0, created: 1611626876685, version: 0 },
          $loki: 2,
        },
      ];

      const functionName = "find";
      const expectedReturn = mockDatabase;
      sandbox
        .stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const result = todoRepository.list();

      expect(result).does.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    });
  });
});
