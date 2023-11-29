<script lang="ts" setup>
defineProps<{ modelValue: string | null }>()
const emit = defineEmits(['update:modelValue'])

const options = [
    { value: 'llama2-70b', label: 'Llama-2', icon: 'i-tabler-brand-meta' },
    { value: 'mistral-7b', label: 'Mistral', icon: 'i-tabler-letter-m' },
]
</script>

<template>
    <div>
        <GoTypography title size="small" color="lighter" info="The model used for the text completions.">
            Model
        </GoTypography>
        <div flex gap-3>
            <GoButtonSelect
                :options="options" w-full
                :model-value="modelValue"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
    </div>
</template>
