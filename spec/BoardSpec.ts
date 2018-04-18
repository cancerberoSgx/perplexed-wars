import { Board } from "model/Board";

describe('Board', ()=>{
  it('should test', ()=>{
    expect(new Board().test1()).toBe('hello')
  })
})