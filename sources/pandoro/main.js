import { system, world, Player,Scoreboard } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import  { formMain } from "./work.js";
import  { formMain1 } from "./work2.js";
import  { formMain3 } from "./work3.js";
import "./shipin.js";
import "./occ.js";
import "./health.js";
const overworld = world.getDimension("overworld");
overworld.runCommand(`scoreboard objectives add health dummy`);
overworld.runCommand(`scoreboard objectives add healthmax dummy`);
overworld.runCommand(`scoreboard objectives add level dummy`);
overworld.runCommand(`scoreboard objectives add levelhealth dummy`);
overworld.runCommand(`scoreboard objectives add levelmagic dummy`);
overworld.runCommand(`scoreboard objectives add levelattack dummy`);
overworld.runCommand(`scoreboard objectives add levelresistance dummy`);
overworld.runCommand(`scoreboard objectives add levelwisdom dummy`);
overworld.runCommand(`scoreboard objectives add magic dummy`);
overworld.runCommand(`scoreboard objectives add magicmax dummy`);
overworld.runCommand(`scoreboard objectives add renwu0 dummy`);
overworld.runCommand(`scoreboard objectives add renwu1 dummy`);
overworld.runCommand(`scoreboard objectives add renwu2 dummy`);
overworld.runCommand(`scoreboard objectives add renwu3 dummy`);
overworld.runCommand(`scoreboard objectives add renwu4 dummy`);
world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    const hastagfirst = player.hasTag("firstjoinx");
    const Magic = world.scoreboard.getObjective('magic');
    const LMagic = world.scoreboard.getObjective('levelmagic');
    const Level = world.scoreboard.getObjective('level');
    const LHealth = world.scoreboard.getObjective('levelhealth');
    const LAttack = world.scoreboard.getObjective('levelattack');
    const LResistance = world.scoreboard.getObjective('levelresistance');
    const LWisdom = world.scoreboard.getObjective('levelwisdom');
    const Magicmax = world.scoreboard.getObjective('magicmax')
    const first = event.initialSpawn;
    if((first == true)&&(hastagfirst)){
        player.runCommandAsync(`kill @s[tag=yongyouzhiye]`);
        player.sendMessage('§a欢迎回到《星辰幻想2》，万分感谢你的游玩！');
    }
    if ((first == true)&&(!hastagfirst)) {
        player.sendMessage('§c欢迎来到《星辰幻想2：新纪元》的冒险世界！§d作者:Minecraft-皓星辰\n§a此为免费ADDON，不存在任何收费行为！如果发现自己被KILL，说明您游玩的存档加载过《星辰幻想1》，请使用新存档！\n§e作者QQ:2044098715');
        player.runCommandAsync(`give @s x:lihe4`);
        player.runCommandAsync(`kill @s[tag=yongyouzhiye]`);
        Magic.setScore(player, 100);
        LMagic.setScore(player, 0);
        Level.setScore(player, 0);
        LHealth.setScore(player, 0);
        LResistance.setScore(player, 0);
        LAttack.setScore(player, 0);
        LWisdom.setScore(player, 0);
        Magicmax.setScore(player, 200);
        player.addTag("firstjoinx");
    }

});

world.beforeEvents.chatSend.subscribe((event) => {
    const LEVEL = world.scoreboard.getObjective('level');
    const Player = event.sender;
    const LEVELs = LEVEL.getScore(Player);
    const name = event.sender.name;
    const Message = event.message;
    world.sendMessage('§a[冒险家]'+'§b['+name+']'+ '§c[Lv.'+ `${LEVELs}`+ ']§e'+Message);
    event.cancel = true;
});

world.afterEvents.itemUse.subscribe((use) => {
    if (use.itemStack.typeId == "x:renwubook3") {
        Mainmenu(use.source);
    }
});

function Mainmenu(player) {
    const form = new ActionFormData()
        .title('§c§l菜单')
        .body('菜单')
        .button('§c成长系统',"textures/ui/t3")
        .button('§d职业系统',"textures/ui/t12")
        .button('§b主线任务',"textures/ui/t27")
        .button('§a支线任务',"textures/ui/t28")
        .button('§e奖励任务',"textures/ui/t28")


    form.show(player).then((response) => {
        if (response.selection === 0) {
            Level(player);
        } ;
        if (response.selection === 1) {
            player.sendMessage(`§c还在完善中，敬请期待！`);
        } ;
        if (response.selection === 2) {
            formMain1(player);
        } ;
        if (response.selection === 3) {
            formMain(player);
        } ;
        if (response.selection === 4) {
            player.sendMessage(`§c还在完善中，敬请期待！`);
        } ;
    });
}
function occ(player){
    const hastagocc = player.hasTag("occ");
    if(!hastagocc){
        Selectocc(player);
    }
    else{
    const form = new ActionFormData()
        .title('§e§l职业系统')
        .body('你的职业为')
        .button('敬请期待',"textures/ui/t3")
    form.show(player).then((response) => {
            if (response.selection === 0) {
                player.addTag("occ");
                player.addTag("occmushi");
                occ(player);
            } ;
        });  
    }  
}
function Selectocc(player) {
    const form = new ActionFormData()
        .title('§c§l选择你的初始职业')
        .body('职业一览')
        .button('敬请期待',"textures/ui/t3")
        .button('敬请期待',"textures/ui/t3")
        .button('敬请期待',"textures/ui/t3")
        .button('敬请期待',"textures/ui/t3")
        .button('敬请期待',"textures/ui/t3")

    // form.show(player).then((response) => {
    //     if (response.selection === 0) {
    //         player.addTag("occ");
    //         player.addTag("occmushi");
    //         occ(player);
    //     } ;
    // });

}
function Level(player) {
    const LEVEL = world.scoreboard.getObjective('level');
    const LEVELH = world.scoreboard.getObjective('levelhealth');
    const LEVELA = world.scoreboard.getObjective('levelattack');
    const LEVELR = world.scoreboard.getObjective('levelresistance');
    const LEVELS = world.scoreboard.getObjective('levelwisdom');
    const LEVELM = world.scoreboard.getObjective('levelmagic');
    const Magicmax = world.scoreboard.getObjective('magicmax');
    const LEVELHs = LEVELH.getScore(player);
    const LEVELs = LEVEL.getScore(player);
    const LEVELAs = LEVELA.getScore(player);
    const LEVELRs = LEVELR.getScore(player);
    const LEVELSs = LEVELS.getScore(player);
    const LEVELMs = LEVELM.getScore(player);

    const form = new ActionFormData()
        .title('§c§l升级秘典')
        .body(`§e总等级:§c${LEVELs}§e级，提升等级需要支付对应等级数量的星辰币,升级时手里至少要有一个星辰币。\n§a生命提升:每1级增加2点最大生命值\n魔力精通:每1级增加5点最大法力值\n力量升级:每1级增加1点攻击力\n抗性增强:每5级增加百分之2伤害减免\n智慧领悟:每5级增加1点额外法力值恢复，每10级会增强一次职业技能`)
        .button(`§a生命提升:§c${LEVELHs}/50§a级\n §8使用§c${LEVELHs}§8星辰币来升级`,"textures/ui/t6")
        .button(`§d魔力精通:§c${LEVELMs}/50§d级\n §8使用§c${LEVELMs}§8星辰币来升级`,"textures/ui/t1")
        .button(`§6力量升级:§c${LEVELAs}/50§6级\n §8使用§c${LEVELAs}§8星辰币来升级`,"textures/ui/t15")
        .button(`§e抗性增强:§c${LEVELRs}/50§e级\n §8使用§c${LEVELRs}§8星辰币来升级`,"textures/ui/t5")
        .button(`§b智慧领悟:§c${LEVELSs}/50§b级\n §8使用§c${LEVELSs}§8星辰币来升级`,"textures/ui/t12")

    form.show(player).then((response) => {
        if (response.selection === 0) {
            if (LEVELHs < 50) {
                for (let i = 0; i < 36; i++) {
                    const inventory = player.getComponent("inventory").container.getItem(i);
                    if (inventory && inventory.typeId == "x:jinbi" && inventory.amount >= LEVELHs) {
                        player.triggerEvent(`x:uphealth${LEVELHs}`);
                        player.runCommandAsync(`clear @s x:jinbi 0 ${LEVELHs}`);
                        LEVEL.addScore(player, 1);
                        LEVELH.addScore(player, 1);
                        player.sendMessage(`§e升级成功！总等级提升到${LEVELs+1}级！`);
                        break;
                    };
                    if(i >= 35)
                    {
                        player.sendMessage(`§c升级失败！星辰币不足！！`);
                        break;
                    };
                }
            }
            else {
                player.sendMessage(`§c此项能力已满级！`);
            }
        };
        if (response.selection === 1) {
            if (LEVELMs < 50) {
                for (let i = 0; i < 36; i++) {
                    const inventory = player.getComponent("inventory").container.getItem(i);
                    if (inventory && inventory.typeId == "x:jinbi" && inventory.amount >= LEVELMs) {
                        player.runCommandAsync(`clear @s x:jinbi 0 ${LEVELMs}`);
                        LEVEL.addScore(player, 1);
                        LEVELM.addScore(player, 1);
                        Magicmax.addScore(player, 5);
                        player.sendMessage(`§e升级成功！总等级提升到${LEVELs+1}级！`);
                        break;
                    };
                    if(i >= 35)
                    {
                        player.sendMessage(`§c升级失败！星辰币不足！！`);
                        break;
                    };
                }
            }
            else {
                player.sendMessage(`§c此项能力已满级！`);
            }
        };
        if (response.selection === 2) {
            if (LEVELAs < 50) {
                for (let i = 0; i < 36; i++) {
                    const inventory = player.getComponent("inventory").container.getItem(i);
                    if (inventory && inventory.typeId == "x:jinbi" && inventory.amount >= LEVELAs) {
                        player.triggerEvent(`x:upattack${LEVELAs}`);
                        player.runCommandAsync(`clear @s x:jinbi 0 ${LEVELAs}`);
                        LEVEL.addScore(player, 1);
                        LEVELA.addScore(player, 1);
                        player.sendMessage(`§e升级成功！总等级提升到${LEVELs+1}级！`);
                        break;
                    };
                    if(i >= 35)
                    {
                        player.sendMessage(`§c升级失败！星辰币不足！！`);
                        break;
                    };
                }
            }
            else {
                player.sendMessage(`§c此项能力已满级！`);
            }
        };
        if (response.selection === 3) {
            if (LEVELRs < 50) {
                for (let i = 0; i < 36; i++) {
                    const inventory = player.getComponent("inventory").container.getItem(i);
                    if (inventory && inventory.typeId == "x:jinbi" && inventory.amount >= LEVELRs) {
                        player.runCommandAsync(`clear @s x:jinbi 0 ${LEVELRs}`);
                        LEVEL.addScore(player, 1);
                        LEVELR.addScore(player, 1);
                        player.sendMessage(`§e升级成功！总等级提升到${LEVELs+1}级！`);
                        if(LEVELRs%5==0){
                        player.triggerEvent(`x:upre${LEVELRs/5}`);
                        }
                        break;
                    };
                    if(i >= 35)
                    {
                        player.sendMessage(`§c升级失败！星辰币不足！！`);
                        break;
                    };
                }
            }
            else {
                player.sendMessage(`§c此项能力已满级！`);
            }
        };
        if (response.selection === 4) {
            if (LEVELSs < 50) {
                for (let i = 0; i < 36; i++) {
                    const inventory = player.getComponent("inventory").container.getItem(i);
                    if (inventory && inventory.typeId == "x:jinbi" && inventory.amount >= LEVELSs) {
                        player.runCommandAsync(`clear @s x:jinbi 0 ${LEVELSs}`);
                        LEVEL.addScore(player, 1);
                        LEVELS.addScore(player, 1);
                        player.sendMessage(`§e升级成功！总等级提升到${LEVELs+1}级！`);
                        break;
                    };
                    if(i >= 35)
                    {
                        player.sendMessage(`§c升级失败！星辰币不足！！`);
                        break;
                    };
                }
            }
            else {
                player.sendMessage(`§c此项能力已满级！`);
            }
        };
    });
};

system.runInterval(() => {
    const currentTick = system.currentTick;
    const magic = world.scoreboard.getObjective('magic');
    const wisdom = world.scoreboard.getObjective('levelwisdom');
    const magicmax = world.scoreboard.getObjective('magicmax')
    world.getAllPlayers().forEach((players => {
        const wisdom5 = wisdom.getScore(players);
        const CDA = wisdom5/5+1;
        if (currentTick % 20 === 0) {
            if (magic.getScore(players) < magicmax.getScore(players)) {
                magic.addScore(players, CDA)
            }
            if (magic.getScore(players) > magicmax.getScore(players)) {
                magic.setScore(players, magicmax.getScore(players))
            }
        };
    }))
});

