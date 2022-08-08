<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in reList" :key="obj.id"
        ><van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <van-cell-group inset>
      <!-- <van-cell
        center
        :title="obj.name"
        :label="
          obj.song.artists[0].name +
          (obj.song.alias[0] == undefined ? '' : '-' + obj.song.alias[0])
        "
        v-for="obj in newList"
        :key="obj.id"
      >
         使用 right-icon 插槽来自定义右侧图标 
      <template #right-icon>
          <van-icon name="play-circle-o" />
        </template>
      </van-cell> -->
      <SongItem
        v-for="obj in newList"
        :key="obj.id"
        :name="obj.name"
        :author="obj.song.artists[0].name"
        :source="obj.song.alias[0] == undefined ? '' : '-' + obj.song.alias[0]"
        :id="obj.id"
      ></SongItem>
    </van-cell-group>
  </div>
</template>

<script>
import { recommendMusicApi, newMusicApi } from "@/api";
import SongItem from "@/components/SongItem.vue";
export default {
  data() {
    return {
      reList: [],
      newList: [],
    };
  },
  async created() {
    const res = await recommendMusicApi({
      limit: 6,
    });
    const newRes = await newMusicApi({
      limit: 20,
    });
    // console.log(res);
    // console.log(newRes);
    this.reList = res.data.result;
    this.newList = newRes.data.result;
  },
  components: {
    SongItem,
  },
};
</script>

<style>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>