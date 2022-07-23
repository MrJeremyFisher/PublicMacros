// Made by MrJeremyFisher
// Use unenchanted diamond axe, ask jer if you want to use ench diamond
// Change these
farmLength = 4; // Length of each row of tree from first dirt to last dirt
farmWidth = 2; // Width of farm


// No touchy ------------------------------------------
const player = Player.getPlayer();
const inv = Player.openInventory();

let startZ = player.getZ();
let startX = player.getX();
let startZRev;
let currentZ = player.getZ();
let currentX = player.getX();

Chat.log("§a Started Farming!");
World.playSound("block.note_block.pling", 1, 2);

// Align player with tree
player.lookAt(180, 0);
KeyBind.keyBind('key.forward', true);
Client.waitTick(30);
KeyBind.keyBind('key.forward', false);


player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
chopTree();
function chopTree() {
    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of row
    if (currentZ < (startZ - farmLength)) {
        scoot();
    }

    if (currentX <= ((startX - farmWidth))) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Break leaves of next tree
    inv.setSelectedHotbarSlotIndex(3);
    player.lookAt(180, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(10);
    KeyBind.keyBind('key.forward', false);

    // Grab axe
    inv.setSelectedHotbarSlotIndex(0);

    // Break base block
    KeyBind.keyBind('key.sneak', true);
    player.lookAt(145, 45);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(14);
    KeyBind.keyBind('key.attack', false);

    // Break second block
    player.lookAt(180, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(14);
    KeyBind.keyBind('key.attack', false);

    // Walk under tree
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(15);
    KeyBind.keyBind('key.sneak', false);
    KeyBind.keyBind('key.forward', false);

    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    // Break the rest of the tree
    player.lookAt(180, -90);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(75);
    KeyBind.keyBind('key.attack', false);
    Client.waitTick(10);

    // Replant
    if (inv.getSlot(1).getName().getString() != "Spruce Sapling") {
        for (i = 0; i < 35; i++) {
            Client.waitTick(1);
            if (inv.getSlot(i).getName().getString() == "Spruce Sapling") {
                inv.swap(i, inv.getMap().get("hotbar")[1]);
                Client.waitTick(1);
                break;
            }
        }
    }
    inv.setSelectedHotbarSlotIndex(1);
    player.lookAt(180, 90);
    KeyBind.keyBind('key.use', true);
    Client.waitTick(5);
    KeyBind.keyBind('key.use', false);
    Client.waitTick(10);

    // Break leaves of next tree
    inv.setSelectedHotbarSlotIndex(3);
    player.lookAt(180, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.attack', false);
    Client.waitTick(10);
    moveToNextTree();
}

function moveToNextTree() {
    // Look forward
    player.lookAt(180, 0);

    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of row
    if (currentZ < (startZ - farmLength)) {
        scoot();
    }

    // Check if at end of farm
    if (currentX <= ((startX - farmWidth))) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Walk to the base of the next tree
    KeyBind.keyBind('key.sneak', true);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.sneak', false);
    KeyBind.keyBind('key.forward', false);

    chopTree();

}

function scoot() {
    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of farm
    if (currentX + 2 < (startX - farmWidth)) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Break leaves
    player.lookAt(90, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(50);
    KeyBind.keyBind('key.attack', false);

    // Break other leaves
    player.lookAt(110, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(25);
    KeyBind.keyBind('key.attack', false);
    player.lookAt(90, 0);

    // Walk forward
    while (player.getX() - 0.5 > Math.floor(currentX - 3)) {
        if (currentX < ((startX - farmWidth) + 1)) {
            Chat.log("§a Stopped Farming!");
            World.playSound("block.note_block.pling", 1, 2);
            return (0);
        }
        KeyBind.keyBind('key.forward', true);
        KeyBind.keyBind('key.sneak', true);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', false);
        KeyBind.keyBind('key.sneak', false);
    }

    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    // Look
    player.lookAt(0, 0);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.forward', false);

    // Update ref coords for chopping
    startZRev = player.getZ();

    chopTreeRev();

}

function chopTreeRev() {

    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of row
    if (currentZ >= (startZRev + 1) + farmLength) {
        scootRev();
    }

    if (currentX <= ((startX - farmWidth))) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Break leaves of next tree
    inv.setSelectedHotbarSlotIndex(3);
    player.lookAt(0, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(10);
    KeyBind.keyBind('key.forward', false);
    // Grab axe
    inv.setSelectedHotbarSlotIndex(0);


    // Break base block
    KeyBind.keyBind('key.sneak', true);
    player.lookAt(-35, 45);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(14);
    KeyBind.keyBind('key.attack', false);

    // Break second block
    player.lookAt(0, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(14);
    KeyBind.keyBind('key.attack', false);

    // Walk under tree
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(15);
    KeyBind.keyBind('key.sneak', false);
    KeyBind.keyBind('key.forward', false);

    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    // Break the rest of the tree
    player.lookAt(0, -90);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(75);
    KeyBind.keyBind('key.attack', false);
    Client.waitTick(10);

    // Replant
    if (inv.getSlot(1).getName().getString() != "Spruce Sapling") {
        for (i = 0; i < 35; i++) {
            Client.waitTick(1);
            if (inv.getSlot(i).getName().getString() == "Spruce Sapling") {
                inv.swap(i, 1);
                Client.waitTick(1);
            }
        }
    }
    inv.setSelectedHotbarSlotIndex(1);
    player.lookAt(180, 90);
    KeyBind.keyBind('key.use', true);
    Client.waitTick(5);
    KeyBind.keyBind('key.use', false);
    Client.waitTick(10);

    // Break leaves of next tree
    inv.setSelectedHotbarSlotIndex(3);
    player.lookAt(0, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.attack', false);
    Client.waitTick(10);

    moveToNextTreeRev();

}

function moveToNextTreeRev() {
    // Look forward
    player.lookAt(0, 0);

    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of row
    if (currentZ >= (startZRev + 1) + farmLength) {
        scootRev();
    }

    if (currentX <= ((startX - farmWidth))) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Walk to the base of the next tree
    KeyBind.keyBind('key.sneak', true);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.sneak', false);
    KeyBind.keyBind('key.forward', false);

    chopTreeRev();

}

function scootRev() {
    Chat.log("Rev");
    // Update Current Z & X
    currentZ = player.getZ();
    currentX = player.getX();

    // Check if at end of farm
    if (currentX <= ((startX - farmWidth))) {
        Chat.log("§a Stopped Farming!");
        World.playSound("block.note_block.pling", 1, 2);
        return (0);
    }

    // Break leaves
    player.lookAt(90, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(50);
    KeyBind.keyBind('key.attack', false);

    // Break other leaves
    player.lookAt(70, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(25);
    KeyBind.keyBind('key.attack', false);
    player.lookAt(90, 0);

    // Walk forward
    while (player.getX() - 0.5 > Math.floor(currentX - 3)) {
        if (currentX <= ((startX - farmWidth))) {
            Chat.log("§a Stopped Farming!");
            World.playSound("block.note_block.pling", 1, 2);
            return (0);
        }
        KeyBind.keyBind('key.forward', true);
        KeyBind.keyBind('key.sneak', true);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', false);
        KeyBind.keyBind('key.sneak', false);
    }

    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    // Walk into tree
    player.lookAt(180, 0);
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(30);
    KeyBind.keyBind('key.forward', false);

    chopTree();

}


