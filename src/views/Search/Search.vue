<template>
  <div>
    <div class="search_wrap">
      <van-search
        shape="round"
        v-model="value"
        @input="press()"
        placeholder="请输入搜索关键词"
      />
      <div v-if="multResult.length == 0">
        <p class="hot_title">热门搜索</p>
        <div class="hot_name_wrap">
          <span
            class="hot_item"
            v-for="(obj, ind) in searchList"
            :key="ind"
            @click="clk(obj.first)"
          >
            {{ obj.first }}
          </span>
        </div>
      </div>

      <div v-else>
        <p class="hot_title">最佳匹配</p>
        <van-cell-group inset>
          <!-- 触底加载 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 搜索加载 -->
            <!-- <van-cell
              center
              :title="obj.name"
              :label="
                obj.ar[0].name +
                (obj.alia[0] == undefined ? '' : '-' + obj.alia[0])
              "
              v-for="obj in multResult"
              :key="obj.id"
            >
               使用 right-icon 插槽来自定义右侧图标 
              <template #right-icon>
                <van-icon name="play-circle-o" />
              </template>
            </van-cell> -->
            <SongItem
              v-for="obj in multResult"
              :key="obj.id"
              :name="obj.name"
              :author="obj.ar[0].name"
              :source="obj.alia[0] == undefined ? '' : '-' + obj.alia[0]"
              :id="obj.id"
            ></SongItem>
          </van-list>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { searchHotApi, searchHotResultApi } from "@/api";
import SongItem from "@/components/SongItem.vue";
export default {
  data() {
    return {
      value: "",
      searchList: [],
      multResult: [],
      loading: false,
      finished: false,
      offset: 1,
      timer: null,
    };
  },
  async created() {
    const res = await searchHotApi();
    console.log(res);
    this.searchList = res.data.result.hots;
    // console.log(this.value);
  },
  methods: {
    // async修饰的函数默认返回一个promise对象
    // return的是一个promise对象

    async getListFn() {
      return await searchHotResultApi({
        keywords: this.value,
        limit: 20,
        offset: (this.offset - 1) * 20,
      });
    },

    // 拿到getListFn的值用await提取结果
    async clk(val) {
      this.offset = 1;
      this.value = val;
      this.finished = false;
      const res = await this.getListFn();
      console.log(res);
      this.multResult = res.data.result.songs;
      this.loading = false;
      // this.searchResult=res
    },

    // 输入框搜索
    async press() {
      this.offset = 1;
      // console.log(val);
      // 防抖
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const res2 = await this.getListFn();
        // 输入框为空判断
        if (this.value == "" || res2.data.result.songs === undefined) {
          this.multResult = [];
          return;
        }
        this.multResult = res2.data.result.songs;
        console.log(this.multResult);
        this.loading = false;
      }, 900);
    },

    async onLoad() {
      // 触底事件(要加载下一页的数据咯), 内部会自动把loading改为true
      this.offset++;
      const res3 = await this.getListFn();
      console.log(res3.data.result.songs);
      // 返回值为空，数据加载完了判断
      if (res3.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.multResult = [...this.multResult, ...res3.data.result.songs];
      this.loading = false; // 本次加载完成
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped>
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
.van-cell-group {
  padding-bottom: 50px;
}
.van-search {
  padding-top: 50px;
}
</style>