import { Dog, User } from "../../models/index.js"

class DogSeeder {
  static async seed() {
    const francis = await User.query().findOne("name", "Francis")
    const bob = await User.query().findOne("name", "Bob")
    const sara = await User.query().findOne("name", "Sara")

    const dogCollection = [
      {
        dogName: "Penny",
        image: "https://dogs-rater-production.s3.amazonaws.com/1644532673025",
        userId: francis.id,
      },
      {
        dogName: "Steve",
        image: "https://dogs-rater-production.s3.amazonaws.com/1644532673025",
        userId: bob.id,
      },
      {
        dogName: "Frankie",
        image: "https://dogs-rater-production.s3.amazonaws.com/1644532673025",
        userId: sara.id,
      },
    ]

    for (const dog of dogCollection) {
      const existingDog = await Dog.query().findOne({ dogName: dog.dogName })
      if (!existingDog) {
        await Dog.query().insert(dog)
      }
    }
  }
}

export default DogSeeder
