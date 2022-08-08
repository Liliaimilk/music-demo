<template>
  <div>
    <van-cell
      center
      :title="name"
      :label="author + source"
      :key="id"
      @click="fn()"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    author: String,
    id: Number,
    source: String,
  },
  methods: {
    fn() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.van-call {
  border-bottom: 1px solid lightgray;
}
</style>