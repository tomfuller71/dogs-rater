/* eslint-disable no-console */
import { connection } from "../boot.js";

import DogSeeder from "./seeders/DogSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";
import VoteSeeder from "./seeders/VoteSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding users...");
    await UserSeeder.seed();

    // include individual seed commands here
    console.log("seeding doggies...");
    await DogSeeder.seed();

    console.log("seeding reviews....");
    await ReviewSeeder.seed();

    console.log("seeding votes....");
    await VoteSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
