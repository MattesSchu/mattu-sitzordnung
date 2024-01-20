<script setup lang="ts">
import { Pupil, Place } from "./pupil";
import { usePupilsStore } from "@/stores/pupils";
const pupilsStore = usePupilsStore();

function removePupil(pupil: Pupil): void {
    let idx = -1;
    for (let i = 0; i < pupilsStore.pupils.length; i++) {
        if (pupilsStore.pupils[i].uuid === pupil.uuid) {
            idx = i;
            break;
        }
    }
    if (idx === -1) {
        return;
    }
    pupilsStore.pupils.splice(idx, 1);
}

function getPupilChoices(myself: Pupil): Pupil[] {
    const res: Pupil[] = [];
    pupilsStore.pupils.forEach((el) => {
        if (el.uuid === myself.uuid) {
            return;
        }
        res.push(el);
    });
    res.sort((a, b) => {
        const aName = a.name.toUpperCase();
        const bName = b.name.toUpperCase();
        if (aName < bName) return -1;
        if (aName === bName) return 0;
        if (aName > bName) return 1;
        return 0;
    });
    return res;
}

function duplicate(pupil: Pupil): boolean {
    return (pupil.friend1 !== null && pupil.friend1 === pupil.friend2) ||
        (pupil.friend1 !== null && pupil.friend1 === pupil.friend3) ||
        (pupil.friend2 !== null && pupil.friend2 === pupil.friend3);
}

function unfinished(pupil: Pupil): boolean {
    return pupil.name === "" || pupil.place === Place.NONE;
}

function doubleNames(): string[] {
    const res: string[] = [];
    const nameSet: Set<string> = new Set();
    pupilsStore.pupils.forEach((el) => {
        if (nameSet.has(el.name)) {
            res.push(el.name);
        }
        else {
            nameSet.add(el.name);
        }
    });
    return res;
}
</script>
<template>
    <div class="list">
        <h1>Liste (... {{ pupilsStore.pupils.length }} SchülerInnen)</h1>
        <div
            v-for="pupil in pupilsStore.pupils"
            class="pupil"
            :class="{ error: duplicate(pupil) || unfinished(pupil) }"
        >
            <input type="text" placeholder="Name" class="friend" v-model="pupil.name" />
            <select v-model="pupil.friend1">
                <option :value=null>--Bitte wählen--</option>
                <option v-for="friend in getPupilChoices(pupil)" :value="friend.uuid">
                    {{ friend.name }}
                </option>
            </select>
            <select v-model="pupil.friend2">
                <option :value=null>--Bitte wählen--</option>
                <option v-for="friend in getPupilChoices(pupil)" :value="friend.uuid">
                    {{ friend.name }}
                </option>
            </select>
            <select v-model="pupil.friend3">
                <option :value=null>--Bitte wählen--</option>
                <option v-for="friend in getPupilChoices(pupil)" :value="friend.uuid">
                    {{ friend.name }}
                </option>
            </select>
            <select v-model="pupil.place">
                <option>{{ Place.FRONT }}</option>
                <option>{{ Place.MIDDLE }}</option>
                <option>{{ Place.BACK }}</option>
                <option>{{ Place.NONE }}</option>
            </select>
            <button @click="removePupil(pupil)">❌</button>
        </div>
        <button @click="pupilsStore.pupils.push(new Pupil())">➕</button>
        <div v-for="n in doubleNames()">{{ n }}</div>
    </div>
</template>
<style scoped>
.list {
    background-color: rgb(122, 122, 122);
    border: 1px solid rgb(180, 180, 180);
    border-radius: 10px;
    padding: 10px;
}

.pupil {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 2fr 1fr;
    gap: 10px;
    padding: 5px;
    margin: 2px 0px;
    border-radius: 5px;
}

.error {
    background-color: red;
}
</style>
