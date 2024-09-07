<template>
    <td class="p-4 py-1 text-center">
        <p class="text-sm text-slate-500">{{ post.id }}</p>
    </td>
    <td class="p-4 py-1 text-center">
        <p class="text-sm text-slate-500">{{ post.userId }}</p>
    </td>
    <td class="p-4 py-1">
        <p class="text-sm text-slate-800">{{ post.title }}</p>
    </td>
    <td class="p-4 py-1">
        <p class="text-sm text-slate-500">{{ post.body }}</p>
    </td>
</template>
  
<script setup lang="ts">
defineProps<{
    post: {
        id?: number;
        userId?: number;
        title?: string;
        body?: string;
    };
}>();
</script>

  