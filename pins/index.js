const express = require("express");
const router = express.Router();
const usersModel = require("../models/users");
const locationsModel = require("../models/locations");
const bcrypt = require("bcrypt");

const findUserByUserId = async (id) => {
    const {dataValues} = await usersModel.findOne({where: {user_id: id}});
    return dataValues;
};
const findAllLocations = (group_id) => {
    return locationsModel.findAll({ where: { group_id: group_id } });
};

router.post("/postpin", async (req, res, next) => {
        //try catch will go into error when inserting WITH ERROR: user_id undefined (don't know why what i send is always valid) ?? don't know why but the data goes into db. // so 'Falsy' error. I don't care.
        const location = await locationsModel.create(req.body);
        const {dataValues} = location;
        res.json({
            id: dataValues.location_id,
            location: dataValues, // this should be removed.
            ok: true,
            message: `All good, we have inserted the location ${dataValues.location_id} into db associated with user ${dataValues.user_id}`,
        });
});

router.get("/getpins/:id", async (req, res, next) => {
    console.log(req.params.id);
   try{
       let locations = await findAllLocations(req.params.id);
       locations = await locations.map( async (location, index) => {
           const {mail} = await findUserByUserId(location.user_id);
           return {...location, index, mail};
       });
        locations = await Promise.all(locations);

        console.log('locations in backend',JSON.stringify(locations));

        res.json({
           locations,
           message: `we found ${locations.length} locations that match the group id: ${req.params.id}`,
           ok: true,
       });

   } catch (error) {
        console.log('/getpins/:id', JSON.stringify(error));
   }
});

module.exports = router;
