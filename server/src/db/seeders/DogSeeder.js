import { Dog, User } from "../../models/index.js";

class DogSeeder {
  static async seed() {

    const francis = await User.query().findOne("name", "Francis")
    const bob = await User.query().findOne("name", "Bob")
    const sara = await User.query().findOne("name", "Sara")

    const dogCollection = [
      {
        dogName: "Penny",
        pictureUrl: "https://ca.slack-edge.com/T02FDAF2S8L-U02FBQV6JBZ-e529da920ecc-512",
        userId: francis.id,
      },
      {
        dogName: "Steve",
        pictureUrl: "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
        userId: bob.id,
      },
      {
        dogName: "Frankie",
        pictureUrl:
          "https://i.guim.co.uk/img/media/c63dddb413272fb6e8c308f0298c6333b3e2084f/0_139_4256_2554/master/4256.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fed576179161a4ae8bf4dbe09ee40dc5",
        userId: sara.id,
      }
    ]

    for (const dog of dogCollection) {
      const existingDog = await Dog.query().findOne({ dogName: dog.dogName });
      if (!existingDog) {
        await Dog.query().insert(dog);
      }
    }
  }
}

export default DogSeeder;
