import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Pupil, Place } from "@/components/pupil";

export const usePupilsStore = defineStore(
    "pupils",
    () => {
        const pupils = ref<Pupil[]>([]);
        const pupilMap = computed<Map<string, Pupil>>(() => {
            const res: Map<string, Pupil> = new Map();
            pupils.value.forEach((el) => {
                res.set(el.uuid, el);
            });
            return res;
        });
        const pupilSet = computed<Set<Pupil>>(() => {
            return new Set(pupils.value);
        });
        const pupilInRows = computed<Map<Place, Pupil[]>>(() => {
            const res: Map<Place, Pupil[]> = new Map();
            pupils.value.forEach((el) => {
                if (el.place === Place.NONE) {
                    return;
                }
                const temp = res.get(el.place);
                if (!temp) {
                    res.set(el.place, [el]);
                }
                else {
                    temp.push(el);
                }
            });
            return res;
        });
        return { pupils, pupilMap, pupilSet, pupilInRows };
    },
    {
        persist: true,
    },
);
