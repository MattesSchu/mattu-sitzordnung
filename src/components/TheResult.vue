<script setup lang="ts">
import { usePupilsStore } from "@/stores/pupils";
import { Place, type Pupil } from "./pupil";
const pupilStore = usePupilsStore();

interface PupilHappiness {
    pupil: Pupil;
    missing: Pupil[];
    nearby: Pupil[];
}

function whoIsHappy(): PupilHappiness[] {
    const res: PupilHappiness[] = [];
    pupilStore.pupils.forEach((el) => {
        if (el.place === Place.NONE) {
            return;
        }
        let curr: PupilHappiness = { pupil: el, missing: [], nearby: [] };
        if (el.friend1) {
            const f1 = pupilStore.pupilMap.get(el.friend1);
            if (f1) {
                if (el.place === f1.place) {
                    curr.nearby.push(f1);
                } else {
                    curr.missing.push(f1);
                }
            }
        }
        if (el.friend2) {
            const f2 = pupilStore.pupilMap.get(el.friend2);
            if (f2) {
                if (el.place === f2.place) {
                    curr.nearby.push(f2);
                } else {
                    curr.missing.push(f2);
                }
            }
        }
        if (el.friend3) {
            const f3 = pupilStore.pupilMap.get(el.friend3);
            if (f3) {
                if (el.place === f3.place) {
                    curr.nearby.push(f3);
                } else {
                    curr.missing.push(f3);
                }
            }
        }
        res.push(curr);
    });
    res.sort((a, b) => {
        if (a.missing > b.missing) return -1;
        if (a.missing === b.missing) return 0;
        if (a.missing < b.missing) return 1;
        return 0;
    });
    return res;
}

function happiness(ph: PupilHappiness): string {
    if (ph.missing > ph.nearby) {
        return "☹️";
    }
    else if (ph.missing < ph.nearby) {
        return "🙂";
    }
    else {
        return "😐";
    }
}
</script>
<template>
    <div class="result">
        <div v-for="ph in whoIsHappy()">
            ... {{ happiness(ph)  }}
            {{ ph.pupil.name }}: { missing: {{ ph.missing.length }}, nearby:
            {{ ph.nearby.length }} }
        </div>
    </div>
</template>
<style scoped>
.result {
    background-color: rgb(122, 122, 122);
    border: 1px solid rgb(180, 180, 180);
    border-radius: 10px;
    padding: 10px;
}
</style>
