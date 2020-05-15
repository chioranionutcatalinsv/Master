const express = require("express");
const router = express.Router();
const usersModel = require("../models/users");
const groupsModel = require("../models/groups");
const bcrypt = require("bcrypt");

const findUserByEmail = async (email) => {
  return usersModel.findOne({ where: { mail: email } });
};

const findGroupByGroupName = (gName) => {
  return groupsModel.findOne({ where: { group_name: gName } });
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 8);
};

const getAlreadyCreatedOrNewGroup = async (groupName) => {
  let group = await findGroupByGroupName(groupName);

  if (!group) {
    //group was not found create new one for user
    group = await groupsModel.create({
      group_name: groupName,
    });
  }
  //group was found join group by assigning group id to user
  const { dataValues } = group;

  return { group_id: dataValues.group_id, group_name: dataValues.group_name };
};

const isAuthValid = (body) => {
  const { mail, password } = body;
  const isEmailValid = typeof mail === "string" && mail.trim();

  const isPasswordValid = typeof password === "string" && password.trim();

  return isEmailValid && isPasswordValid;
};

router.post("/login", async (req, res, next) => {
  if (!isAuthValid(req.body)) {
      next(new Error('Invalid user'));
  } else {
    const userIsDefined = await findUserByEmail(req.body.mail);
    if (userIsDefined) {
      //compare password with hash password
      const { dataValues } = userIsDefined;
      const isMatching = await bcrypt.compare(
        req.body.password,
        dataValues.password
      );
      console.log(isMatching, "isMatching");
      if (isMatching) {
        console.log(
          `All good, user ${dataValues.mail} logged! on group ${dataValues.group_id}`
        );
        //seting the cookie header,
        //check if react native has problems with cookie options
       /* res.cookie("user_id", dataValues.user_id, {
          httpOnly: true,
          signed: true,
          secure: true,
        });*/
        res.send({
            user: {
                user_id: dataValues.user_id,
                mail: dataValues.mail,
                group_id: dataValues.group_id,
            },
            ok: isMatching,
            message: "Logged In!",
        });
      }
        next(new Error('Invalid login data'));
    } else {
        next(new Error('Invalid login data'));
    }
  }
});

router.post("/signup", async (req, res, next) => {
  if (isAuthValid(req.body)) {
    const userAlreadyExists = await findUserByEmail(req.body.mail);
    if (userAlreadyExists) {
        next(new Error('User already exists'));
    } else {
      //create user hashed password and insert into db
      const hashedPassword = await hashPassword(req.body.password);
      const userGroup = await getAlreadyCreatedOrNewGroup(req.body.group_name);

      const user = {
        mail: req.body.mail,
        password: hashedPassword,
        group_id: userGroup.group_id,
      };
      const userCreated = await usersModel.create(user);
      res.json({
        id: userCreated.user_id,
        user: userCreated, // this should be removed.
        ok: true,
        message: `All good, user ${userCreated.mail} created! on group ${userGroup.group_name}`,
      });
      // redirect
    }
  } else {
      next(new Error('Invalid user'));
  }
});

module.exports = router;
