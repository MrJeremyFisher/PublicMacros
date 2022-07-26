// Not yet completed


const farmLength = 11; // Num of pumpkins
const farmWidth = 9; // Total width (incl. water and stems)

// No touchy ------------------------------------------
const player = Player.getPlayer();
const inv = Player.openInventory();
const startZ = player.getZ();
const startX = player.getX();

// Look at the first pumpkin
player.lookAt(-180, 40);

// Centre the player
player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

function lookForAxe() { // Searches the players inv for a diamond axe
    for (i = 0; i < 35; i++) {
        if (inv.getSlot(i).getName().getString() == "Diamond Axe") {
            inv.swap(i, inv.getMap().get("hotbar")[0])
            inv.setSelectedHotbarSlotIndex(0);
        }
    }
}


// Break row going NORTH
while (player.getZ() > startZ - farmLength - 1) {
    if (!rev) { 
        player.lookAt(-180, 40); 
    } else if (rev) {
        player.lookAt(0, 40); 
    }

    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
}

KeyBind.keyBind('key.forward', false);
KeyBind.keyBind('key.attack', false);


if ()
// Shift over one row going WEST
while (player.getX() > startX - 3) {
    player.lookAt(90, 0);
    KeyBind.keyBind('key.forward', true);
}
KeyBind.keyBind('key.forward', false);

// Centre the player
player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);