// Code adapted from https://github.com/mrchenliang/learning-node

import { getMonstersFromRepository, updateMonstersInRepository, deleteMonsterFromRepository, createMonsterInRepository } from "../repositories/monsterRepository.js";

export const getMonsters = async (req, res) => {
  try {
    const monsters = await getMonstersFromRepository();
    res.status(200).send(monsters);
  } catch (e) {
    console.log("Failed to get monsters: ", e); 
    res.status(400).send("Get failed");
  }
}

export const getMonster = async (req, res) => {
  try {
    const { id } = req.params;
    const monster = await getMonstersFromRepository({ id: id });
    res.status(200).send(monster);
  } catch (e) {
    console.log("Failed to get monster: ", e); 
    res.status(400).send("Get failed");
  }
}

export const createMonster = async (req, res) => {
  try {
    const monster = await createMonsterInRepository( req.body );
    res.status(201).send(monster);
  } catch (e) {
    console.log("Failed to create monster: ", e); 
    res.status(400).send('Create failed. You likely did not include all required fields: "name":, "address": {"city":}, "image_url": ');
  }
}

export const updateMonster = async (req, res) => {
  try {
    const { id } = req.params;
    const monster = await updateMonstersInRepository(id, req);
    // returns -1 if it does not exist in database
    if (monster === -1) {
      res.status(400).send("The monster you are trying to update with id " + id + " likely does not exist.")
    } else {
      res.status(200).send(monster);
    }
  } catch (e) {
    console.log("Failed to update monster: ", e); 
    res.status(400).send("Update failed");
  }
}

export const deleteMonster = async (req, res) => {
  const { id } = req.params;
  try {
    const monster = await deleteMonsterFromRepository(id);
    if (monster) {
      res.status(200).send("The following monster was deleted: "+ monster);
    } else {
      res.status(400).send("The monster you are trying to delete with id "+ id +" likely does not exist or was already deleted.");
    }
  } catch (e) {
    console.log("Failed to delete monster: ", e); 
    res.status(400).send("Monster delete failed.");
  }
}
