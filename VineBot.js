// Made by MrJeremyFisher
const farmLength = 80;

// No touchy
const player = Player.getPlayer();
const inv = Player.openInventory();
let startX = player.getX();
const startY = player.getY();

Chat.log("§a Started Farming!");
World.playSound("block.note_block.pling", 1, 2);

function check() {
    if (startY != player.getY()) {
        KeyBind.keyBind('key.attack', false);
        KeyBind.keyBind('key.right', false);
        KeyBind.keyBind('key.sneak', false);
        KeyBind.keyBind('key.forward', false);
        World.playSound("block.note_block.pling", 1.5, 2);
        endScript();
    } else {
        try {
            nbt = player.getMainHand().getNBT();
            var compound = nbt.asCompoundHelper();
            if (compound.get("Damage").asNumberHelper().asInt() >= 238 - 1) {
                for (i = 0; i < 35; i++) {
                    if (inv.getSlot(i).getName().getString() == "Shears") {
                        inv.swap(i, inv.getMap().get("hotbar")[0]);
                        Client.waitTick(1);
                        inv.setSelectedHotbarSlotIndex(inv.getMap().get("hotbar")[0]);
                    }
                }

            }
        } catch (err) {
            for (i = 0; i < 35; i++) {
                if (inv.getSlot(i).getName().getString() == "Shears") {
                    inv.swap(i, inv.getMap().get("hotbar")[0]);
                    Client.waitTick(1);
                    inv.setSelectedHotbarSlotIndex(inv.getMap().get("hotbar")[0]);
                }
            }
        }
    }
}


while (startY == player.getY()) {
    check();
    startX = player.getX();
    KeyBind.keyBind('key.sneak', true);
    player.lookAt(0, 15);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(12);
    KeyBind.keyBind('key.forward', false);

    while (player.getX() > startX - (farmLength - 1) && startY == player.getY()) {
        check();
        player.lookAt(0, 15);
        KeyBind.keyBind('key.attack', true);
        KeyBind.keyBind('key.right', true);
        KeyBind.keyBind('key.forward', true);
        Client.waitTick(1);
    }

    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.right', false);
    KeyBind.keyBind('key.forward', false);

    player.lookAt(180, 15);

    KeyBind.keyBind('key.forward', true);
    Client.waitTick(12);
    KeyBind.keyBind('key.forward', false);

    check();
    startX = player.getX();
    while (player.getX() < startX + (farmLength - 1) && startY == player.getY()) {
        check();
        Client.waitTick(1);
        KeyBind.keyBind('key.attack', true);
        KeyBind.keyBind('key.right', true);
        KeyBind.keyBind('key.forward', true);
        player.lookAt(180, 15);
    }
}

function endScript() {
    return (0);
}