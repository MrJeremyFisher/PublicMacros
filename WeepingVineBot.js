// Made by MrJeremyFisher
const farmLength = 18;
const farmWidth = 22;

// No touchy
const player = Player.getPlayer();
const inv = Player.openInventory();
const trueStartX = player.getX();
let startX = player.getX();
let startZ = player.getZ();
let trueStartZ = player.getZ();


Chat.log("§a Started Farming!");
World.playSound("block.note_block.pling", 1, 2);

function check() {
    try {
        nbt = player.getMainHand().getNBT();
        var compound = nbt.asCompoundHelper();
        if (compound.get("Damage").asNumberHelper().asInt() >= 237) {
            for (i = 9; i < 44; i++) {
                if (inv.getSlot(i).getName().getString() == "Shears" && compound.get("Damage").asNumberHelper().asInt() < 237) {
                    inv.swap(i, inv.getMap().get("hotbar")[0]);
                    Client.waitTick(1);
                    inv.setSelectedHotbarSlotIndex(inv.getMap().get("hotbar")[0]);
                    break;
                }
            }
        }
    } catch (err) {
        for (i = 9; i < 44; i++) {
            if (inv.getSlot(i).getName().getString() == "Shears") {
                inv.swap(i, inv.getMap().get("hotbar")[0]);
                Client.waitTick(1);
                inv.setSelectedHotbarSlotIndex(inv.getMap().get("hotbar")[0]);
                break;
            }
        }
    }
}

function getVine() {
    for (i = 9; i < 44; i++) {
        if (inv.getSlot(i).getName().getString() == "Weeping Vines") {
            inv.swap(i, inv.getMap().get("hotbar")[0]);
            Client.waitTick(1);
            inv.setSelectedHotbarSlotIndex(inv.getMap().get("hotbar")[0]);
            break;
        }
    }
}

player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
check();


while (player.getX() > trueStartX - farmWidth) {
    startX = player.getX();
    trueStartZ = player.getZ();
    while (player.getZ() > trueStartZ - farmLength - 0.8 && player.getX() > trueStartX - farmWidth) {
        inv.setSelectedHotbarSlotIndex(0);
        check();
        Client.waitTick(4);

        // Break first vine
        player.lookAt(180, 55);
        Client.waitTick(4);
        player.attack();
        Client.waitTick(2);

        // Break second vine
        player.lookAt(180, 0);
        Client.waitTick(4);
        player.attack();
        Client.waitTick(2);

        // Walk forward
        startZ = player.getZ();
        while (player.getZ() > startZ - 0.8 && player.getX() > trueStartX - farmWidth) {
            Player.moveForward(0);
            Client.waitTick();
        }

        // Centre playing
        player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
        Client.waitTick(2);

        // Break the rest of the vines
        player.lookAt(180, -90);
        KeyBind.keyBind('key.attack', true);
        Client.waitTick(4);
        KeyBind.keyBind('key.attack', false);
        Client.waitTick(2);

        // Grab vines
        getVine();
        Client.waitTick(4);

        // Replant vine
        KeyBind.keyBind('key.use', true);
        Client.waitTick(1);
        KeyBind.keyBind('key.use', false);

        // Check shears
        check();
    }


    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

    while (player.getX() > startX - 0.8 && player.getX() > trueStartX - farmWidth) {
        player.lookAt(90, 0);
        Player.moveForward(0);
        Client.waitTick();
    }

    startX = player.getX();
    trueStartZ = player.getZ();
    while (player.getZ() < trueStartZ + farmLength + 0.8 && player.getX() > trueStartX - farmWidth) {
        inv.setSelectedHotbarSlotIndex(0);
        check();
        Client.waitTick(4);

        // Break first vine
        player.lookAt(0, 55);
        Client.waitTick(4);
        player.attack();
        Client.waitTick(2);

        // Break second vine
        player.lookAt(0, 0);
        Client.waitTick(4);
        player.attack();
        Client.waitTick(2);

        // Walk forward
        startZ = player.getZ();
        while (player.getZ() < startZ + 0.8 && player.getX() > trueStartX - farmWidth) {
            Player.moveForward(0);
            Client.waitTick();
        }

        // Centre playing
        player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
        Client.waitTick(2);

        // Break the rest of the vines
        player.lookAt(0, -90);
        KeyBind.keyBind('key.attack', true);
        Client.waitTick(4);
        KeyBind.keyBind('key.attack', false);
        Client.waitTick(2);

        // Grab vines
        getVine();
        Client.waitTick(4);

        // Replant vine
        KeyBind.keyBind('key.use', true);
        Client.waitTick(1);
        KeyBind.keyBind('key.use', false);

        // Check shears
        check();
    }

    while (player.getX() > startX - 0.8 && player.getX() > trueStartX - farmWidth) {
        player.lookAt(90, 0);
        Player.moveForward(0);
        Client.waitTick();
    }

}