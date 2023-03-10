const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function realtor() {
  // const skyrimHouses = await prisma.house.create({
  //   data: {
  //     name: "Breezehome",
  //     slug: "breezehome",
  //     price: 5000,
  //     addPrice: 1800,
  //     description:
  //       "Located in the Plains District, Breezehome offers any experienced traveler the amenities they need to charge up, gear up, and prepare for a journey on the Tundra. With close access to Warmaidens, the town gate, and Dragonsreach, Breezehome is perfect for any companion or thane of Whiterun.",
  //     sellable: true,
  //     sold: false,
  //     upgrades: JSON.stringify([
  //       {
  //         upgrade: "Living Room",
  //         price: 250,
  //       },
  //       {
  //         upgrade: "Dining Room",
  //         price: 250,
  //       },
  //       {
  //         upgrade: "Kitchen",
  //         price: 300,
  //       },
  //       {
  //         upgrade: "Loft",
  //         price: 200,
  //       },
  //       {
  //         upgrade: "Bedroom",
  //         price: 300,
  //       },
  //       {
  //         upgrade: "Alchemy Laboratory",
  //         price: 500,
  //       },
  //       {
  //         upgrade: "Children's Bedroom",
  //         price: 500,
  //       },
  //     ]),
  //     image: JSON.stringify(["https://static.wikia.nocookie.net/elderscrolls/images/7/72/Breezhome_Improved.png/revision/latest?cb=20130118014012"]),
  //     locator: "Whiterun",
  //     province: "Skyrim"
  //   },
  // });
  // const hjerim = await prisma.house.create({
  //   data: {
  //     name: "Hjerim",
  //     slug: "hjerim",
  //     price: 12000,
  //     addPrice: 8500,
  //     description:
  //       "Positioned in the Valunstrad Quarter of Windhelm, Hjerim is a prime home located in the most opulent district of Windhelm, with close access to the storied Palace of Kings. Hjerim is an able and beautiful home, fit for any adventurer, only a skip away from the vast and rich Eastmarch Hold.",
  //     sellable: false,
  //     sellableReason: "Hjerim is currently not purchaseable due to the Stormcloak rebellion, with additional concerns of an active serial killer within Windhelm.",
  //     sold: false,
  //     upgrades: JSON.stringify([
  //       {
  //         upgrade: "Living Room",
  //         price: 1500,
  //       },
  //       {
  //         upgrade: "Armory",
  //         price: 2000,
  //       },
  //       {
  //         upgrade: "Enchanting Laboratory",
  //         price: 1500,
  //       },
  //       {
  //         upgrade: "Alchemy Laboratory",
  //         price: 1500,
  //       },
  //       {
  //         upgrade: "Bedroom",
  //         price: 1000,
  //       },
  //       {
  //         upgrade: "Kitchen",
  //         price: 1000,
  //       },
  //       {
  //         upgrade: "Children's Room",
  //         price: 1250,
  //       },
  //     ]),
  //     image: JSON.stringify(["https://static.wikia.nocookie.net/elderscrolls/images/7/7a/Hjerim_House.png/revision/latest?cb=20141014123212"]),
  //     locator: "Windhelm",
  //     province: "Skyrim"
  //   },
  // });
  // const honeyside = await prisma.house.create({
  //   data: {
  //     name: "Honeyside",
  //     slug: "honeyside",
  //     price: 8000,
  //     addPrice: 4300,
  //     description:
  //       "A beautiful home located near the bustling economic center of Riften with a gorgeous view of Lake Honrich, Honeyside is a gorgeous home for any adventurer or merchant. Purchase of Honeyside will come with complementary security detail.",
  //     sellable: false,
  //     sellableReason: "Honeyside is not purchaseable due to the Stormcloak rebellion and presence of the Thieves Guild within the city.",
  //     sold: false,
  //     upgrades: JSON.stringify([
  //       {
  //         upgrade: "Porch",
  //         price: 400,
  //       },
  //       {
  //         upgrade: "Garden",
  //         price: 800,
  //       },
  //       {
  //         upgrade: "Kitchen",
  //         price: 500,
  //       },
  //       {
  //         upgrade: "Enchanting Laboratory",
  //         price: 1000,
  //       },
  //       {
  //         upgrade: "Bedroom",
  //         price: 600,
  //       },
  //       {
  //         upgrade: "Alchemy Laboratory",
  //         price: 1000,
  //       },
  //       {
  //         upgrade: "Children's Bedroom",
  //         price: 250,
  //       },
  //     ]),
  //     image: JSON.stringify(["https://static.wikia.nocookie.net/elderscrolls/images/1/19/Honeyside.jpg/revision/latest?cb=20120227003816"]),
  //     locator: "Riften",
  //     province: "Skyrim"
  //   },
  // });
  // const myrwatch = await prisma.house.create({
  //   data: {
  //     name: "Myrwatch",
  //     slug: "myrwatch",
  //     price: 0,
  //     addPrice: 0,
  //     askingQuest: "With Imperial battlemages stretched thin and the College not responding to our requests, we ask that any adventurer seeking this home investigate mechanisms to open the tower, as well as deal with the Chaurus outside.",
  //     description:
  //       "A home with an ancient history, Myrwatch is an astute and venerated tower fit for any aspiring or established mage. Located in an isolated pocket of Hjaalmarch, Myrwatch is a great fit for any practicioner of magic looking for alone time and plenty of targets. Built by mages from the College of Winterhold, Myrwatch is certified to last a long time and withstand any of your spells.",
  //     sellable: true,
  //     sold: false,
  //     upgrades: JSON.stringify([]),
  //     image: JSON.stringify(["https://images.uesp.net/thumb/8/81/SR-place-Myrwatch.jpg/800px-SR-place-Myrwatch.jpg"]),
  //     locator: "Hjaalmarch",
  //     province: "Skyrim"
  //   },
  // });
  // const rosethorn = await prisma.house.create({
  //   data: {
  //     name: "Rosethorn Hall",
  //     slug: "rosethorn",
  //     price: 25000,
  //     addPrice: 23200,
  //     description:
  //       "Prepare for a life of luxury and splendor when your purchase this strikingly beautiful Skingrad estate, Rosethorn Hall. Positioned in the beautiful and large city of Skingrad, Rosethorn is only a hop awy from the finest wineries in Cyrodiil, making it perfect for any discerning wine connoisseur.",
  //     sellable: true,
  //     sold: false,
  //     upgrades: JSON.stringify([
  //       {
  //         upgrade: "Balcony",
  //         price: 3000,
  //       },
  //       {
  //         upgrade: "Dining Room",
  //         price: 1600,
  //       },
  //       {
  //         upgrade: "Kitchen",
  //         price: 1600,
  //       },
  //       {
  //         upgrade: "Interior Upgrades",
  //         price: 2600,
  //       },
  //       {
  //         upgrade: "Bedroom",
  //         price: 1600,
  //       },
  //       {
  //         upgrade: "Servants Quarters",
  //         price: 1600,
  //       },
  //       {
  //         upgrade: "Sitting Area",
  //         price: 1600,
  //       },
  //       {
  //         upgrade: "Storage",
  //         price: 1600
  //       },
  //       {
  //         upgrade: "Study",
  //         price: 1600
  //       },
  //       {
  //         upgrade: "Upper Hall Furnishings",
  //         price: 4800
  //       },
  //     ]),
  //     image: JSON.stringify(["https://images.uesp.net/thumb/6/6d/OB-place-Rosethorn_Hall.jpg/784px-OB-place-Rosethorn_Hall.jpg"]),
  //     locator: "Skingrad",
  //     province: "Cyrodiil"
  //   },
  // });
  // const benirus = await prisma.house.create({
  //   data: {
  //     name: "Benirus Manor",
  //     slug: "benirus",
  //     price: 5000,
  //     addPrice: 0,
  //     askingQuest: "Further upgrades to this home will require investigations into the ghost issue that some residents of Anvil have been reporting.",
  //     description: "Benirus Manor is a large manor located along the eastern side of the city of Anvil. Residents of Benirus Manor will find themselves a beautiful home with spacious interiors, large basement, and quick access to the most economically adventurous city in the Empire.",
  //     sellable: true,
  //     sold: false,
  //     upgrades: JSON.stringify([]),
  //     image: JSON.stringify(["https://images.uesp.net/thumb/e/e8/OB-place-Benirus_Manor_Restored.jpg/799px-OB-place-Benirus_Manor_Restored.jpg"]),
  //     locator: "Anvil",
  //     province: "Cyrodiil"
  //   },
  // });
}

realtor()