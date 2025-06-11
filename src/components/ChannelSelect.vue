<script setup>
import { artArticleListService} from '@/api/article'
import { ref } from 'vue'
const channelList=ref([])
// 
const emit=defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: [Number, String],
  },
  width: {
    type: String,
    default: '200px',
  },
},

)
const getChannelList = async () => {
  const res = await artArticleListService()
    channelList.value = res.data.data
    console.log(channelList.value[0].id)
}
getChannelList()
</script>
<template>
   <el-select placeholder="请选择" :style="{width} " :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <el-option v-for="item in channelList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
  </el-select>
</template>