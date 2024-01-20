<script setup lang="ts">
import type { Pupil } from './pupil';

interface Props {
    pupil: Pupil;
    friend: boolean;
    votes?: number;
}

const props = defineProps<Props>();

</script>
<template>
    <div class="pupil" :class="{friend: props.friend}">
        <div>{{ props.pupil.name }}</div>
        <p v-if="friend">{{ props.votes }}</p>
    </div>
</template>
<style scoped>
.pupil {
    width: 100px;
    height: 50px;
    text-align: center;
    border: 1px solid darkcyan;
}
.friend {
    border-color: lightblue;
}
</style>