<template>
  <AppPage>
    <wd-text :text="text"></wd-text>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('芦叶满汀洲，寒沙带浅流。二十年重过南楼。')
</script>