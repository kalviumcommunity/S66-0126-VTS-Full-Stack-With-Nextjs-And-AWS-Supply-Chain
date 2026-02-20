import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create a demo user
    const demoUser = await prisma.user.upsert({
        where: { email: "demo@artroot.co" },
        update: {},
        create: {
            name: "Demo User",
            email: "demo@artroot.co",
            password: hashPassword("demo123"),
        },
    });
    console.log("✅ Demo user:", demoUser.email);

    // Products
    const products = [
        { title: "Warli Village Life", artist: "Savita Bhoir", origin: "Maharashtra, India", price: 85, rating: 4.9, reviews: 38, image: "https://picsum.photos/seed/warli/800/800", tag: "Painting", material: "Natural pigments on handmade paper", badge: "Bestseller" },
        { title: "Kente Heritage Cloth", artist: "Kofi Mensah", origin: "Ashanti Region, Ghana", price: 140, rating: 5.0, reviews: 22, image: "https://picsum.photos/seed/kente/800/800", tag: "Textile", material: "Hand-woven cotton & silk", badge: "Fair Trade" },
        { title: "Madhubani Peacock Garden", artist: "Urmila Devi", origin: "Bihar, India", price: 110, rating: 4.8, reviews: 51, image: "https://picsum.photos/seed/madhubani/800/800", tag: "Painting", material: "Vegetable dyes on handmade paper", badge: "Certified" },
        { title: "Ancestral Tribal Mask", artist: "Amara Diallo", origin: "Bamako, Mali", price: 220, rating: 4.9, reviews: 15, image: "https://picsum.photos/seed/mask/800/800", tag: "Sculpture", material: "Hand-carved Iroko wood", badge: "Rare" },
        { title: "Sacred Sun Weaving", artist: "Yara Quispe", origin: "Pisac, Cusco, Peru", price: 175, rating: 4.9, reviews: 29, image: "https://picsum.photos/seed/weaving/800/800", tag: "Textile", material: "Alpaca wool with natural Andean dyes", badge: "Handloomed" },
        { title: "Forest Spirit Totem", artist: "Dawit Haile", origin: "Addis Ababa, Ethiopia", price: 310, rating: 5.0, reviews: 8, image: "https://picsum.photos/seed/totem/800/800", tag: "Sculpture", material: "Hand-carved olive wood & beads", badge: "Rare" },
        { title: "Kalamkari Story Scroll", artist: "Padma Reddy", origin: "Andhra Pradesh, India", price: 95, rating: 4.7, reviews: 44, image: "https://picsum.photos/seed/scroll/800/800", tag: "Painting", material: "Hand-block printed on cotton fabric", badge: "Certified" },
        { title: "Ndebele Bead Collar", artist: "Zanele Mokoena", origin: "Mpumalanga, South Africa", price: 135, rating: 4.8, reviews: 33, image: "https://picsum.photos/seed/collar/800/800", tag: "Jewellery", material: "Seed beads on leather backing", badge: "Fair Trade" },
        { title: "Gond Tree of Life", artist: "Ram Singh Urveti", origin: "Madhya Pradesh, India", price: 130, rating: 4.9, reviews: 57, image: "https://picsum.photos/seed/tree/800/800", tag: "Painting", material: "Acrylic on canvas, traditional Gond motifs", badge: "Bestseller" },
        { title: "Bogolan Mud Cloth", artist: "Fatoumata Coulibaly", origin: "Ségou, Mali", price: 160, rating: 4.8, reviews: 19, image: "https://picsum.photos/seed/mud/800/800", tag: "Textile", material: "Fermented mud-dyed cotton strip cloth", badge: "Certified" },
        { title: "Pattachitra Ramayana", artist: "Aparna Moharana", origin: "Puri, Odisha, India", price: 200, rating: 5.0, reviews: 13, image: "https://picsum.photos/seed/ramayana/800/800", tag: "Painting", material: "Stone colours on treated palm leaf", badge: "Rare" },
        { title: "Tuareg Silver Pendant", artist: "Aghali Ag Boua", origin: "Agadez, Niger", price: 88, rating: 4.7, reviews: 41, image: "https://picsum.photos/seed/pendant/800/800", tag: "Jewellery", material: "Sterling silver with geometric etchings", badge: "Handcrafted" },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { id: p.title.toLowerCase().replace(/\s+/g, "-") },
            update: p,
            create: { id: p.title.toLowerCase().replace(/\s+/g, "-"), ...p },
        });
    }
    console.log(`✅ ${products.length} products seeded`);

    // Artists
    const artists = [
        { name: "Savita Bhoir", craft: "Warli Painting", origin: "Palghar, Maharashtra, India", bio: "Savita belongs to the Warli tribe and has been painting since age 9. Her work depicts the rhythm of daily village life — harvests, dances, and nature — using age-old geometric forms.", image: "https://picsum.photos/seed/savita/500/500", artworks: 24, rating: 4.9, sold: 183, specialty: ["Warli", "Folk Art", "Ritual Paintings"] },
        { name: "Kofi Mensah", craft: "Kente Weaving", origin: "Bonwire, Ashanti Region, Ghana", bio: "Kofi is a 4th-generation master weaver from the birthplace of Kente cloth. Each strip he weaves carries a proverb, a history, and a message — a language only the cloth can speak.", image: "https://picsum.photos/seed/kofi/500/500", artworks: 17, rating: 5.0, sold: 94, specialty: ["Kente", "Silk Weaving", "Royal Patterns"] },
        { name: "Yara Quispe", craft: "Andean Beadwork & Embroidery", origin: "Pisac, Cusco, Peru", bio: "Yara's vibrant beadwork and embroidered textiles fuse Andean Quechua symbolism with contemporary color. She trains other women in her community, preserving art that spans 2,000 years.", image: "https://picsum.photos/seed/yara/500/500", artworks: 31, rating: 4.8, sold: 215, specialty: ["Beadwork", "Quechua Textiles", "Natural Dyes"] },
        { name: "Amara Diallo", craft: "Wood Carving & Mask Making", origin: "Bamako, Mali", bio: "Amara's carved masks and totems draw from Bambara ceremonial traditions. Each piece takes weeks of work, infused with spiritual meaning passed down from his grandfather, a village shaman.", image: "https://picsum.photos/seed/amara/500/500", artworks: 19, rating: 4.9, sold: 67, specialty: ["Iroko Wood", "Ceremonial Masks", "Totems"] },
        { name: "Urmila Devi", craft: "Madhubani Painting", origin: "Madhubani, Bihar, India", bio: "Urmila is a Padma Shri award-winning Madhubani artist. Her paintings narrate scenes from Hindu epics using intricate line work and bold vegetable dyes on handmade paper and cloth.", image: "https://picsum.photos/seed/urmila/500/500", artworks: 42, rating: 5.0, sold: 389, specialty: ["Madhubani", "Mithila Art", "Epic Narratives"] },
        { name: "Zanele Mokoena", craft: "Ndebele Beadwork", origin: "Mpumalanga, South Africa", bio: "Zanele creates traditional Ndebele beaded aprons, collars, and wall panels whose geometric patterns encode social status and life milestones. Her work has been exhibited across Europe.", image: "https://picsum.photos/seed/zanele/500/500", artworks: 28, rating: 4.8, sold: 142, specialty: ["Ndebele", "Seed Beadwork", "Wearable Art"] },
        { name: "Dawit Haile", craft: "Ethiopian Woodwork & Painting", origin: "Lalibela, Ethiopia", bio: "Inspired by the rock-hewn churches of Lalibela, Dawit carves sacred iconography into olive wood and creates tempera paintings on goat hide — a tradition over 800 years old.", image: "https://picsum.photos/seed/dawit/500/500", artworks: 15, rating: 4.7, sold: 53, specialty: ["Olive Wood", "Coptic Icons", "Hide Painting"] },
        { name: "Padma Reddy", craft: "Kalamkari & Block Printing", origin: "Srikalahasti, Andhra Pradesh, India", bio: "Padma uses a sharpened bamboo pen dipped in fermented iron solution to draw intricate Kalamkari scenes by hand on cotton. No two of her pieces are ever the same.", image: "https://picsum.photos/seed/padma/500/500", artworks: 36, rating: 4.9, sold: 204, specialty: ["Kalamkari", "Natural Dyes", "Block Print"] },
        { name: "Fatoumata Coulibaly", craft: "Bogolan Mud Cloth", origin: "Ségou, Mali", bio: "Fatoumata creates authentic Bogolan cloth using fermented mud and plant-based dyes. The abstract symbols she weaves into each cloth are a form of secret feminine language unique to her village.", image: "https://picsum.photos/seed/fatoumata/500/500", artworks: 22, rating: 4.8, sold: 91, specialty: ["Mud Cloth", "Natural Pigments", "Textile Art"] },
    ];

    for (const a of artists) {
        await prisma.artist.upsert({
            where: { id: a.name.toLowerCase().replace(/\s+/g, "-") },
            update: a,
            create: { id: a.name.toLowerCase().replace(/\s+/g, "-"), ...a },
        });
    }
    console.log(`✅ ${artists.length} artists seeded`);

    console.log("🎉 Seeding complete!");
}

main()
    .catch(e => {
        console.error("Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
