<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artArticleDelService, artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
const loading = ref(false)
const fromData = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const total = ref(0)
const articleEditRef=ref()
const onArticle = () => {
  articleEditRef.value.open({})
}
const getArticleList = async () => {
  loading.value = true
  try {
    const res = await artGetListService(params.value)
    fromData.value = res.data.data
    total.value = res.data.total
  } catch (error) {
    console.error('获取文章列表失败:', error)
  } finally {
    loading.value = false
  }
}
getArticleList()
const handleEdit = (row) => {
  articleEditRef.value.open(row)
  console.log('编辑行数据:', row)
}
const handleDelete = async (row) => {
  console.log('删除行数据:', row)
   await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artArticleDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>
<template>
<article-container title="文章管理">
  <template #extra>
    <el-button @click="onArticle" type="primary">发布文章</el-button>
  </template>
  <el-form style="width: 100%" :inline="true"  class="demo-form-inline">
    <el-form-item width="200" label="文章分类" >
        <channel-select v-model="params.cate_id"></channel-select>
    </el-form-item>
    <el-form-item width="200" label="发布状态">
      <el-select v-model="params.state" placeholder="请选择" style="width: 200px">
        <el-option label="已发布" value="已发布" />
        <el-option label="未发布" value="未发布" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="fromData" style="width: 100%" v-loading="loading">
    <el-table-column label="文章标题" width="350" type="index">
      <template #default="{ row }">
      <el-link type="primary" underline="never">{{ row.title }}</el-link>
    </template>
    </el-table-column>
    <el-table-column label="分类"  prop="cate_name"></el-table-column>
    <el-table-column label="发表时间" >
      <template #default="{ row }">
        {{ formatTime(row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="200" prop="state"></el-table-column>
    <el-table-column label="操作" width="200">
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
  <el-pagination
  v-model:current-page="params.pagenum"
  v-model:page-size="params.pagesize"
  :page-sizes="[2, 3, 4, 5, 10]"
  layout="jumper, total, sizes, prev, pager, next"
  background
  :total="total"
  @size-change="onSizeChange"
  @current-change="onCurrentChange"
  style="margin-top: 20px; justify-content: flex-end"
/>
<article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
</article-container>

</template>
<style lang="scss" scoped>


</style>