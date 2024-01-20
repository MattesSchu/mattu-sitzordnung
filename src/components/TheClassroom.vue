<script setup lang="ts">
import { ref } from "vue";
import { usePupilsStore } from "@/stores/pupils";
import ThePupil from "./ThePupil.vue";
import { Place, Pupil } from "./pupil";
interface FriendInRow {
    pupil: Pupil;
    cnt: number;
}

const pupilStore = usePupilsStore();
const showFriends = ref(false);

function addFriendToMap(map: Map<string, number>, friendId: string | null) {
    if (!friendId || friendId === null || friendId === undefined || !friendId || friendId === "") {
        return;
    }
    let cur = map.get(friendId);
    map.set(friendId, cur ? cur + 1 : 1);
}

function getFriendInRow(place: Place): FriendInRow[] {
    const map: Map<string, number> = new Map();
    const pupilsInRow = pupilStore.pupilInRows.get(place);
    if (!pupilsInRow) {
        return [];
    }
    pupilStore.pupils.forEach((el) => {
        if (el.place === place) {
            addFriendToMap(map, el.friend1);
            addFriendToMap(map, el.friend2);
            addFriendToMap(map, el.friend3);
        }
    });
    const res: FriendInRow[] = [];
    map.forEach((val, key) => {
        const curr: Pupil | undefined = pupilStore.pupilMap.get(key);
        if (!curr) {
            return;
        }
        res.push({ pupil: curr, cnt: val });
    });
    return res;
}
</script>
<template>
    <div class="classroom">
        <h1>Klassenraum</h1>
        <input type="checkbox" v-model="showFriends" id="showFriends" />
        <label for="showFriends">Freunde Metrik</label>
        <div class="roomrow">
            <h2>Vorne</h2>
            <div class="section">
                <ThePupil
                    v-for="p in pupilStore.pupilInRows.get(Place.FRONT)"
                    :pupil="p"
                    :friend="false"
                />
            </div>
            <div class="section" v-if="showFriends">
                <ThePupil
                    v-for="f in getFriendInRow(Place.FRONT)"
                    :pupil="f.pupil"
                    :friend="true"
                    :votes="f.cnt"
                />
            </div>
        </div>
        <div class="roomrow">
            <h2>Mitte</h2>
            <div class="section">
                <ThePupil
                    v-for="p in pupilStore.pupilInRows.get(Place.MIDDLE)"
                    :pupil="p"
                    :friend="false"
                />
            </div>
            <div class="section" v-if="showFriends">
                <ThePupil
                    v-for="f in getFriendInRow(Place.MIDDLE)"
                    :pupil="f.pupil"
                    :friend="true"
                    :votes="f.cnt"
                />
            </div>
        </div>
        <div class="roomrow">
            <h2>Hinten</h2>
            <div class="section">
                <ThePupil
                    v-for="p in pupilStore.pupilInRows.get(Place.BACK)"
                    :pupil="p"
                    :friend="false"
                />
            </div>
            <div class="section" v-if="showFriends">
                <ThePupil
                    v-for="f in getFriendInRow(Place.BACK)"
                    :pupil="f.pupil"
                    :friend="true"
                    :votes="f.cnt"
                />
            </div>
        </div>
    </div>
</template>
<style scoped>
.classroom {
    background-color: rgb(122, 122, 122);
    border: 1px solid rgb(180, 180, 180);
    border-radius: 10px;
    padding: 10px;
}
.section {
    min-height: 20px;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.roomrow {
    background-color: rgb(80, 80, 80);
    border-radius: 10px;
    padding: 10px;
    margin: 10px 5px;
}
</style>
