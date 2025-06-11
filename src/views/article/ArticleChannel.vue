<script setup>
import { ref } from 'vue'
import { artArticleListService, artArticleDeleteService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'

const tableData = ref([])
const loading = ref(false)
const dialog = ref()
const getArticleList = async () => {
  loading.value = true
  const res = await artArticleListService()
  tableData.value = res.data.data
  console.log(tableData.value)
  loading.value = false
}
getArticleList()
const handleDelete = (row) => {
  const id= row.id
  // 确认删除操作
  ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 调用删除接口
    artArticleDeleteService(id).then(() => {
      ElMessage.success('删除成功')
      getArticleList()
    }).catch(err => {
      ElMessage.error('删除失败: ' + err.message)
    })
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
const handleAdd = () => {
  dialog.value.openDialog()
}
const handleEdit = (row) => {
  dialog.value.openDialog(row)
  }
const handleSuccess = () => {
  getArticleList()
}
</script>

<template>
<article-container title="文章频道">
  <template #extra>
    <el-button type="primary" @click="handleAdd">添加分类</el-button>
  </template>
 <el-table :data="tableData" style="width: 100%" v-loading="loading">
    <el-table-column label="序号" width="180" type="index"></el-table-column>
    <el-table-column label="分类名称"  prop="cate_name"></el-table-column>
    <el-table-column label="分类别名"  prop="cate_alias"></el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="{row}">
        <el-button
         :icon="Edit"
          circle
          plain
          type="primary"
          size="small"
          @click="handleEdit(row)">
        </el-button>
        <el-button
          :icon="Delete"
          circle
          plain
          type="danger"
          @click="handleDelete(row)"
        >
        </el-button>
      </template>
    </el-table-column>
    <template #empty>
      <div class="empty-box">
        <el-empty description="暂无数据"></el-empty>
      </div>
    </template>
  </el-table>
  <channel-edit ref="dialog" @success="handleSuccess" />
</article-container>
</template>
<style lang="scss" scoped>


</style>