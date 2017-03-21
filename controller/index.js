"use strict"
let model = require("../model");

let fn_index = async (ctx, next) => {

    ctx.render("index.html",{
      title:"welcome"
    })
};
var index = 0;
let fn_signin = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    var valid = false;

    let User = model.User;

    var user = await User.findAll({
        where: {
            name: email
        }
    });
    console.log("find "+user.length+` user with email(${email}) `);
    var testpassword = "";
    for (var i=0,j=user.length;i<j;i++) {
        testpassword = user[i].dataValues.password;
        if(testpassword==password){
          valid = true;
          break;
        }
    }

    if (valid) {
      index++;
      let name = ctx.request.body.email||"路人甲";
      let user = {
        id:index,
        name:name,
        image:index%10
      }

      let value = Buffer.from(JSON.stringify(user)).toString("base64");
      console.log(`set cookie value:${value}`);
      ctx.cookies.set("name",value);
      ctx.cookies.set("username",name);

        // 登录成功:
        ctx.render('login_success.html', {
            title: 'Sign In OK',
            name: email
        });


    } else {
        // 登录失败:
        ctx.render('login_failed.html', {
            title: 'Sign In Failed'
        });
    }
};

let fn_createUser = async (ctx, next) => {
    var obj = ctx.params.obj||"User";
    var name = ctx.params.name||"defaultName";
    var password = ctx.params.password||"12345";

    // 定义user模型
    let User = model.User;

    await (async () => {
        let user = await User.create({
            name: name,
            password:password
        });
        console.log('created: ' + JSON.stringify(user));
    })();
    // 登录成功:
    ctx.render('insert_success.html', {
        title: 'Create user OK',
        name: name
    });
};

let fn_chatroom = async(ctx,next)=>{
  var user = ctx.state.user;
  if(user){
    ctx.render('chat.html',{
      title:user.name+"-聊天室",
      name:user.name
    })
  }else{
    ctx.response.redirect("/signin");
  }
}

let fn_signout = async(ctx,next)=>{
  ctx.cookies.set("name","");
  ctx.response.redirect("/");
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'GET /create/:obj/:name/:password':fn_createUser,
    'GET /chat/:name':fn_chatroom,
    'GET /signout':fn_signout
};
