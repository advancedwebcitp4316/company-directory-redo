<script setup>
import { faker } from '@faker-js/faker';

const firstname = faker.person.firstName();

</script>
<template>
{{ firstname }} <br />
</template>