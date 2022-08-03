const farmLength = 81; // Num of pumpkins
const farmWidth = 80; // Total width (incl. water and stems)
const toolType = "Iron Axe"; // Name of tool to use (no underscores, capital letters)
const toolDamage = 200;
// No touchy ------------------------------------------
const player = Player.getPlayer();
const inv = Player.openInventory();
const trueStartX = player.getX();
const startY = player.getY();
let startX = player.getX();
let startZ = player.getZ();

// Look at the first pumpkin
player.lookAt(-180, 40);

// Centre the player
player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

Chat.log("§a Started Farming!");
World.playSound("block.note_block.pling", 1, 2);

function lookForAxe() { // Searches the players inv for a tool
    for (i = 0; i < 35; i++) {
        if (inv.getSlot(i).getName().getString() == toolType) {
            inv.swap(i, inv.getMap().get("hotbar")[0])
            inv.setSelectedHotbarSlotIndex(0);
        }
    }
}


while (player.getX() > trueStartX - farmWidth && player.getY() == startY) {
    lookForAxe();
    KeyBind.keyBind('key.sneak', true);
    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
    // Break row going NORTH
    while (player.getZ() > startZ - farmLength - 1 && player.getY() == startY) {
        player.lookAt(-180, 40);
        Client.waitTick(1);
    }

    KeyBind.keyBind('key.forward', false);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.sneak', false);

    // Put pumpkins in chest
    Client.waitTick(5);
    player.lookAt(-180, 40);
    player.interact();
    Client.waitTick(5);
    let inv2 = Player.openInventory();
    for (i = 27; i < 62; i++) {
        if (inv2.getSlot(i).getName().getString() == "Pumpkin") {
            inv2.quick(i);
            Client.waitTick(1);
        }
    }
    Client.waitTick(5);
    inv2.close();
    Client.waitTick(5);

    // Shift over one row going WEST
    KeyBind.keyBind('key.sneak', true);
    startX = player.getX();
    while (player.getX() > startX - 3 && player.getY() == startY) {
        player.lookAt(90, 0);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', true);
    }

    KeyBind.keyBind('key.forward', false);

    // Centre the player
    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    // Break row going SOUTH
    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
    while (player.getZ() < startZ && player.getY() == startY) {
        player.lookAt(0, 40);
        Client.waitTick(1);
    }

    KeyBind.keyBind('key.forward', false);
    KeyBind.keyBind('key.attack', false);

    // Shift over one row going WEST
    startX = player.getX();
    while (player.getX() > startX - 2 && player.getY() == startY) {
        player.lookAt(90, 0);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', true);
    }

    KeyBind.keyBind('key.forward', false);

    // Centre the player
    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
}
