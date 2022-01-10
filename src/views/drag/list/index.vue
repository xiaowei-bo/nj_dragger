<template>
    <div class="drag-list">
        <Header />
        <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            label-suffix="："
            class="search-form clearfix"
            size="small"
        >
            <el-form-item label="活动ID">
                <el-input v-model="searchForm.id" placeholder="请输入活动ID" />
            </el-form-item>
            <el-form-item label="活动标题">
                <el-input v-model="searchForm.title" placeholder="请输入活动标题" />
            </el-form-item>
            <el-form-item label="活动作者">
                <el-input v-model="searchForm.author" placeholder="请输入活动作者" />
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" @click="getActivityList">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="activity-wrapper">
            <div
                class="activity-item add-btn"
                @click="createActivity"
            >
                <i class="el-icon-plus"></i>
            </div>
            <div
                v-for="(item, index) in activityList"
                :key="index"
                class="activity-item"
                @click="editActivity(item.id)"
            >
                <div class="image-box">
                    <el-image
                        :src="checkImg(item.cover_image) || defaultImg"
                        class="image"
                        fit="cover"
                    >
                        <template v-slot:error>
                            <img :src="defaultImg" class="image" alt="" />
                        </template>
                    </el-image>
                </div>
                <div style="padding: 15px;">
                    <p class="txt">活动id：{{ item.id }}</p>
                    <p class="txt">标题：{{ item.title || "暂无" }}</p>
                </div>
            </div>
        </div>
        <el-pagination
            :current-page="searchForm.currentPage"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="searchForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchForm.totalPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getActivityList } from "@/api/drag";
import { checkImg } from "@/utils";
export default {
    name: "DragList",
    components: { Header },
    data() {
        return {
            searchForm: {
                id: "",
                title: "",
                author: "",
                currentPage: 1,
                pageSize: 20,
                totalPage: 0
            },
            activityList: [],
            checkImg,
            defaultImg: "data:image/jpeg;base64,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Gn/4ij+3PEv/AEB7D/wMb/4iiwHVIxZQSpU+hrP1/UP7K0G+vR96KFinu3RR+ZFVfD2tXOqyX0F7ax29xaSKjLHIXBDKGByQKreND5mn2Nn2ur+CNh6qG3H/ANBpW1sPoY9j4e1O1sLeK31p7dRGC0f2ZH+cjLHJ5OTk1YXRdbYgDxFISf8ApzjroY42kbCj6n0q/DCsQ45Pc0+ZhY56x8IRw61Fq15dPdXKRqMFQqlxkB8DuAcD0rpqKKTbYwooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAAea4yXTdU0G8uDY2Rv8ATZpGlWONwskLMcsADgMueR6V2dFNOwHFf2rqPfw3qn/fKf8AxVH9q6h/0Leqf98p/wDFV2tGKd12FY4r+1dR/wChc1T/AL5T/wCKo/tXUP8AoXNU/wC+U/8Aiq7XFGKOZdgscV/auof9C5qn/fKf/FUf2rqH/Quap/3yn/xVdrijFHMuwWOK/tXUP+hc1T/vlP8A4qj+1dR/6FzVP++U/wDiq7XFGKOZdgsedLea5Za7/aVj4d1ApMgjuoZAqhwPusCCeRkj6VrTSah4i1XSt+j3djBaTGeWS4KjPyFQBgnJya6+ihy8gsNRFjXaowKdRRUjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q=="
        };
    },
    methods: {
        handleCurrentChange(i) {
            this.searchForm.currentPage = i;
            this.getActivityList();
        },
        handleSizeChange(i) {
            this.searchForm.pageSize = i;
            this.getActivityList();
        },
        async getActivityList() {
            const res = await getActivityList(this.searchForm);
            this.activityList = res.list;
            this.searchForm.totalPage = res.total;
        },
        createActivity() {
            this.$router.push({
                name: "dragEdit",
                query: {
                    id: "-1"
                }
            });
        },
        editActivity(id) {
            this.$router.push({
                name: "dragEdit",
                query: {
                    id
                }
            });
        }
    },
    created() {
        this.getActivityList();
    },
    mounted() {
        document.onkeydown = e => {
            switch (e.code) {
                case "Enter":
                    this.getActivityList();
                    break;
            }
        };
    }
};
</script>

<style lang="scss">
.drag-list{
    width: 100%;
    height: 100%;
    .el-pagination{
        padding-left: 40px;
        padding-bottom: 40px;
    }
    .search-form{
        padding: 40px 40px 0 40px;
        .el-form-item{
            margin-right: 30px;
        }
    }
    .image-box{
        width: 100%;
        height: 150px;
        overflow: hidden;
        border-bottom: 1px solid #dcdfe63b;
        border-radius: 5px;
    }
    .image{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .activity-wrapper{
        padding: 0 20px 20px 20px;
        display: flex;
        flex-wrap: wrap;
        .activity-item{
            width: 150px;
            height: 220px;
            margin: 20px;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            font-size: 20px;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            &:hover{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
            }
            &.add-btn{
                text-align: center;
                line-height: 220px;
                &:hover{
                    color: #409eff;
                    background-color: #fff;
                    border-color: #409eff;
                }
            }
            .txt{
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
