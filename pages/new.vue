<script setup>
const router = useRouter();
const config = useRuntimeConfig();
const trainerName = ref("");
const onSubmit = async () => {
  console.log(trainerName.value);
  const response = await fetch(`${config.backendOrigin}/api/trainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: trainerName.value, }),
  });
  if (!response.ok) return;
  router.push(`/trainer/${trainerName.value}`);
}
const valid = computed(() => trainerName.value.length > 0);
</script>

<template>
  <div>
    <h1>あたらしくはじめる</h1>
    <p>では　はじめに　きみの　なまえを　おしえてもらおう！</p>
    <form @submit.prevent>
      {{ trainerName }}
      なまえ
      <p>とくていの　もじは　とりのぞかれるぞ！</p>
      <input v-model="trainerName" type="text" >
      <input :disabled="!valid" type="button" value="決定"  @click="onSubmit()" />
    </form>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
