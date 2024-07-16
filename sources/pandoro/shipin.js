import { EquipmentSlot, ItemStack, system, world } from '@minecraft/server';



function tagItemAdd(P, cont) {
	P.getTags().forEach((tag) => {
		let notag = tag.split("(-)");
		let i = notag[1];
		let baublesType = notag[0];
		if (baublesType === "head") {
			cont.setItem(0, new ItemStack(i));
		};
		if (baublesType === "ear") {
			cont.setItem(1, new ItemStack(i));
		};
		if (baublesType === "necklace") {
			cont.setItem(2, new ItemStack(i));
		};
		if (baublesType === "body") {
			cont.setItem(3, new ItemStack(i));
		};
		if (baublesType === "ring") {
			cont.setItem(4, new ItemStack(i));
		};
		if (baublesType === "hands") {
			cont.setItem(5, new ItemStack(i));
		};
	})
};


world.afterEvents.itemUse.subscribe((e) => {
	all: for (let place of ["ear", "head", "body", "ring", "hands", "necklace"]) {
		local: if (e.itemStack.hasTag("nb:" + place)) {
			for (let tg of e.source.getTags()) {
				if (tg.split("(-)")[0] == place) {
					break local;
				};
			};
			e.source.addTag(place + "(-)" + e.itemStack.typeId);
			e.source.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand);
			break all;
		}
	}
});
system.runInterval(async (event) => {
	try {
		world.getAllPlayers().forEach((P) => {

			if (true) {
				if (P.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand)?.typeId == "nb:baubles") {
					if (!P.hasTag("nbstart")) {
						var baublesEntity = P.dimension.spawnEntity("nb:inv_ent", P.location);
						baublesEntity.nameTag = "Baubles";
						tagItemAdd(P, baublesEntity.getComponent("inventory").container);
						P.setDynamicProperty("eid", baublesEntity.id)
						P.runCommand("tag @s add nbstart");
					} else if (P.getDynamicProperty("eid") !== "None") {
						let bEntity = world.getEntity(P.getDynamicProperty("eid"));
						bEntity.runCommandAsync("tp @s " + P.name);
						let bc = bEntity.getComponent("inventory").container;

						let item = bc.getItem(0);
						if (item && !(item.hasTag("nb:head"))) {
							P.dimension.spawnItem(item, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(0, null);
						};

						let item1 = bc.getItem(1);
						if (item1 && !(item1.hasTag("nb:ear"))) {
							P.dimension.spawnItem(item1, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(1, null);
						};
						let item2 = bc.getItem(2);
						if (item2 && !(item2.hasTag("nb:necklace"))) {
							P.dimension.spawnItem(item2, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(2, null);
						};
						let item3 = bc.getItem(3);
						if (item3 && !(item3.hasTag("nb:body"))) {
							P.dimension.spawnItem(item3, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(3, null);
						};
						let item4 = bc.getItem(4);
						if (item4 && !(item4.hasTag("nb:ring"))) {
							P.dimension.spawnItem(item4, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(4, null);
						};
						let item5 = bc.getItem(5);
						if (item5 && !(item5.hasTag("nb:hands"))) {
							P.dimension.spawnItem(item5, { x: P.location.x, y: P.location.y, z: P.location.z });
							bc.setItem(5, null);
						};

					};
				} else if (P.hasTag("nbstart") && P.getDynamicProperty("eid") !== "None") {
					let bc = world.getEntity(P.getDynamicProperty("eid")).getComponent("inventory").container;
					P.runCommand("tag @s remove nbstart");
					for (let de of P.getTags()) {
						if (["head", "ear", "necklace", "body", "ring", "hands"].includes(de.split("(-)")[0])) { P.runCommandAsync("tag @s remove " + de) };
					};
					let a1 = bc.getItem(0);
					if (a1) { P.runCommandAsync("tag @s add head(-)" + a1.typeId) };
					let a2 = bc.getItem(1);
					if (a2) { P.runCommandAsync("tag @s add ear(-)" + a2.typeId) };
					let a3 = bc.getItem(2);
					if (a3) { P.runCommandAsync("tag @s add necklace(-)" + a3.typeId) };
					let a4 = bc.getItem(3);
					if (a4) { P.runCommandAsync("tag @s add body(-)" + a4.typeId) };
					let a5 = bc.getItem(4);
					if (a5) { P.runCommandAsync("tag @s add ring(-)" + a5.typeId) };
					let a6 = bc.getItem(5);
					if (a6) { P.runCommandAsync("tag @s add hands(-)" + a6.typeId) };

					world.getEntity(P.getDynamicProperty("eid")).triggerEvent("minecraft:despawn");
				};
			};
		})
	} catch (e) { console.error(e) };
}, 0);