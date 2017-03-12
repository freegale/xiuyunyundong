"use strict"
const APIError = require("../rest").APIError;

let model = require("../model");

var gid = 0;

let fn_nextId = ()=>{
  gid++;
  return "t"+gid;
}

let fn_get = async (ctx,next)=>{
  let Todo = model.Todo;

  var todos = await Todo.findAll();
  console.log(JSON.stringify(todos));
  ctx.rest({
    todos:todos
  })
};

let fn_insert = async(ctx,next)=>{
  var t=ctx.request.body,todo;
  if(!t.name||!t.name.trim()){
    throw new APIError("invalid_input","missing name!");
  }

  if(!t.description||!t.description){
    throw new APIError("invalid_input","missing description!");
  }

  let Todo = model.Todo;
  await (async () => {
      todo = await Todo.create({
          name: t.name.trim(),
          description:t.description.trim()
      });
      console.log('created: ' + JSON.stringify(todo));
  })();

  ctx.rest(todo);
};

// 根据ID更新TODO
let fn_update = async(ctx,next)=>{
  var t=ctx.request.body,i,todo;
  var id = ctx.params.id;
  if(!t.name||!t.name.trim()){
    throw new APIError("invalid_input","missing name!");
  }

  if(!t.description||!t.description.trim()){
    throw new APIError("invalid_input","missing description!");
  }
  // 根据ID查找记录
  let Todo = model.Todo;

  var todos = await Todo.findAll({
    where:{
      id:id
    }
  });

  if(todos.length===0){
    throw new APIError("not found","Todo not found by id "+ctx.params.id);
  }else{
    // 找到记录后更新内容到数据库
    var count = await Todo.update({
      name:t.name,
      description:t.description
    },{
      where:{
        id:id
      }
    });
    if(count > 0){
      todo = todos[0];
      console.log("获取todos[0]的信息:"+JSON.stringify(todos[0]));
      todo["name"] = t.name;
      todo["description"] = t.description;
    }

    // 返回传输的对象

    ctx.rest(todo);
  }

};

let fn_delete = async(ctx,next)=>{
  var id = ctx.params.id;
  let Todo = model.Todo;

  var todos = await Todo.findAll({
    where:{
      id:id
    }
  });

  await Todo.destroy({
    where:{
      id:id
    }
  });
  console.log(JSON.stringify(todos));
  ctx.rest(todos);

}

module.exports = {
  "GET /api/todos":fn_get,
  "POST /api/todos":fn_insert,
  "PUT /api/todos/:id":fn_update,
  "DELETE /api/todos/:id":fn_delete
};
