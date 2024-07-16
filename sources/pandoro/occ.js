import { system, world, Player,Scoreboard } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
world.afterEvents.itemUse.subscribe((use) => {
    if (use.itemStack.typeId == "x:occ1") {
        occ1(use.source);
    }
});
function occ1(player) {
    const smagic = world.scoreboard.getObjective('magic');
    const magic =smagic.getScore(player)
    const tag = player.hasTag("occmushi");
    if (tag != 1) {
        player.sendMessage(`§c你不是牧师职业，无法使用此技能。`);
    }
    if (tag == 1) {
        if (magic>=20){
            smagic.addScore(player, -20);
            player.addEffect("poison", 10*20,{ amplifier: 2 });
        }
        else{
            player.sendMessage(`§c法力不足`);
        }
    }
}